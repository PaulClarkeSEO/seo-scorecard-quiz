import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { calculateCategoryScores, calculateTotalScore } from '@/lib/scoring';
import { generateEmailContent, generateNotificationEmail } from '@/lib/email-templates';
import { getPostmarkClient, POSTMARK_FROM_EMAIL } from '@/lib/postmark';
import { Category } from '@/types';
import { sortedQuestions } from '@/lib/questions';

const NOTIFICATION_EMAIL = 'hello@blackandwhiteboy.com';

export async function POST(request: NextRequest) {
  try {
    const { leadId } = await request.json();

    if (!leadId) {
      return NextResponse.json(
        { error: 'Lead ID is required' },
        { status: 400 }
      );
    }

    const supabase = createServerClient();

    // Get all responses for this lead
    const { data: responses, error: respError } = await supabase
      .from('responses')
      .select('question_id, answer, category, points')
      .eq('lead_id', leadId);

    if (respError) {
      console.error('Error fetching responses:', respError);
      throw new Error('Failed to fetch responses');
    }

    if (!responses || responses.length === 0) {
      return NextResponse.json(
        { error: 'No responses found for this lead' },
        { status: 400 }
      );
    }

    // Calculate scores
    const categoryScores = calculateCategoryScores(
      responses.map(r => ({ category: r.category as Category, points: r.points }))
    );
    const totalScore = calculateTotalScore(categoryScores);

    // Was this lead already scored? If so, don't email again (double submits, refreshes)
    const { data: existingLead } = await supabase
      .from('leads')
      .select('completed_at')
      .eq('id', leadId)
      .single();
    const alreadyCompleted = Boolean(existingLead?.completed_at);

    // Unscored qualifier (question 0), shown in the notification email
    const turnoverAnswer = responses.find(r => r.question_id === 0)?.answer;
    const turnover = sortedQuestions
      .find(q => q.id === 0)
      ?.options.find(o => o.value === turnoverAnswer)?.label;

    // Update lead with scores
    // Note: Database columns still use old names for backwards compatibility
    // gbp -> gmb_score, visibility -> keywords_score, website -> website_score
    // TODO: Add ai_score column and rename others in future migration
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        completed_at: new Date().toISOString(),
        total_score: totalScore.percentage,
        score_level: totalScore.level,
        gmb_score: categoryScores.find(c => c.category === 'gbp')?.percentage,
        keywords_score: categoryScores.find(c => c.category === 'visibility')?.percentage,
        website_score: categoryScores.find(c => c.category === 'website')?.percentage
      })
      .eq('id', leadId);

    if (updateError) {
      console.error('Error updating lead:', updateError);
      throw new Error('Failed to update lead scores');
    }

    // Get lead details for email (including GDPR data)
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('first_name, last_name, email, website_url, gdpr_consent, gdpr_consent_at')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      console.error('Error fetching lead:', leadError);
      throw new Error('Failed to fetch lead details');
    }

    // Send emails once per lead. Notification goes first and in its own try,
    // so a bad lead address (bounce/reject) can't stop us hearing about the lead.
    if (!alreadyCompleted) {
      const postmarkClient = getPostmarkClient();

      try {
        const notificationContent = generateNotificationEmail({
          firstName: lead.first_name,
          lastName: lead.last_name,
          email: lead.email,
          websiteUrl: lead.website_url,
          gdprConsent: lead.gdpr_consent,
          gdprConsentAt: lead.gdpr_consent_at,
          turnover
        }, totalScore);

        console.log('Sending notification email to:', NOTIFICATION_EMAIL);
        await postmarkClient.sendEmail({
          From: POSTMARK_FROM_EMAIL,
          To: NOTIFICATION_EMAIL,
          Subject: notificationContent.subject,
          HtmlBody: notificationContent.htmlBody,
          TextBody: notificationContent.textBody,
          MessageStream: 'outbound'
        });
        console.log('Notification email sent successfully');
      } catch (emailError) {
        console.error('Error sending notification email:', emailError);
      }

      try {
        const emailContent = generateEmailContent({
          firstName: lead.first_name,
          lastName: lead.last_name,
          email: lead.email,
          websiteUrl: lead.website_url
        }, totalScore);

        console.log('Sending user report email to:', lead.email);
        await postmarkClient.sendEmail({
          From: POSTMARK_FROM_EMAIL,
          To: lead.email,
          Subject: emailContent.subject,
          HtmlBody: emailContent.htmlBody,
          TextBody: emailContent.textBody,
          MessageStream: 'outbound'
        });
        console.log('User email sent successfully');
      } catch (emailError) {
        // Don't fail the request if email fails, just log it
        console.error('Error sending user report email:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      score: totalScore,
      leadId
    });
  } catch (error) {
    console.error('Error calculating score:', error);
    return NextResponse.json(
      { error: 'Failed to calculate score' },
      { status: 500 }
    );
  }
}
