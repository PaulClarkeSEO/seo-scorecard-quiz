import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { calculateCategoryScores, calculateTotalScore } from '@/lib/scoring';
import { generateEmailContent, generateNotificationEmail } from '@/lib/email-templates';
import { getPostmarkClient, POSTMARK_FROM_EMAIL } from '@/lib/postmark';

const NOTIFICATION_EMAIL = 'hello@blackandwhiteboy.com';
import { Category } from '@/types';

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

    // Get lead details
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('first_name, last_name, email, website_url')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      console.error('Error fetching lead:', leadError);
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    // Get all responses for this lead
    const { data: responses, error: respError } = await supabase
      .from('responses')
      .select('category, points')
      .eq('lead_id', leadId);

    if (respError || !responses || responses.length === 0) {
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

    // Generate and send email
    const emailContent = generateEmailContent({
      firstName: lead.first_name,
      lastName: lead.last_name,
      email: lead.email,
      websiteUrl: lead.website_url
    }, totalScore);

    const postmarkClient = getPostmarkClient();

    // Send report to the lead
    await postmarkClient.sendEmail({
      From: POSTMARK_FROM_EMAIL,
      To: lead.email,
      Subject: emailContent.subject,
      HtmlBody: emailContent.htmlBody,
      TextBody: emailContent.textBody,
      MessageStream: 'outbound'
    });

    // Send notification to the business
    const notificationContent = generateNotificationEmail({
      firstName: lead.first_name,
      lastName: lead.last_name,
      email: lead.email,
      websiteUrl: lead.website_url
    }, totalScore);

    await postmarkClient.sendEmail({
      From: POSTMARK_FROM_EMAIL,
      To: NOTIFICATION_EMAIL,
      Subject: notificationContent.subject,
      HtmlBody: notificationContent.htmlBody,
      TextBody: notificationContent.textBody,
      MessageStream: 'outbound'
    });

    return NextResponse.json({
      success: true,
      message: 'Report sent successfully'
    });
  } catch (error) {
    console.error('Error sending report:', error);
    return NextResponse.json(
      { error: 'Failed to send report' },
      { status: 500 }
    );
  }
}
