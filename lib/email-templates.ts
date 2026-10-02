import { TotalScore, ScoreLevel } from '@/types';
import { getCategoryName, getCategoryFeedback } from './scoring';

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  websiteUrl: string;
  gdprConsent?: boolean;
  gdprConsentAt?: string;
  turnover?: string;
}

export function generateEmailContent(lead: LeadData, score: TotalScore): { subject: string; htmlBody: string; textBody: string } {
  const subject = `Your SEO Scorecard Results: ${score.percentage}% - ${getScoreTitle(score.level)}`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #07133d; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #07133d; color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .score-badge { background: ${getScoreColor(score.level)}; color: white; font-size: 48px; font-weight: bold; padding: 20px 40px; border-radius: 10px; display: inline-block; margin: 20px 0; }
    .content { background: #f8f9fa; padding: 30px; }
    .category { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid ${getScoreColor(score.level)}; }
    .category h3 { margin: 0 0 10px 0; color: #07133d; }
    .category-score { font-size: 24px; font-weight: bold; color: ${getScoreColor(score.level)}; }
    .cta-section { background: #07133d; color: white; padding: 30px; text-align: center; border-radius: 0 0 10px 10px; }
    .cta-button { background: #fec404; color: #07133d; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 5px; display: inline-block; margin-top: 15px; }
    .problem { background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .agitate { background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .solution { background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your SEO Scorecard Results</h1>
      <div class="score-badge">${score.percentage}%</div>
      <p style="font-size: 20px; margin: 0;">${getScoreTitle(score.level)}</p>
    </div>

    <div class="content">
      <p>Hi ${lead.firstName},</p>

      <p>Thank you for completing our SEO Scorecard assessment for <strong>${lead.websiteUrl}</strong>.</p>

      ${generatePositiveReflection(score)}

      <h2 style="color: #07133d; border-bottom: 2px solid #fec404; padding-bottom: 10px;">Your Category Breakdown</h2>

      ${score.categories.map(cat => `
        <div class="category">
          <h3>${getCategoryName(cat.category)}</h3>
          <span class="category-score">${cat.percentage}%</span>
          <span style="color: ${getScoreColor(cat.level)}; margin-left: 10px;">(${cat.level.toUpperCase()})</span>
          <p style="margin-top: 10px; color: #666;">${getCategoryFeedback(cat)}</p>
        </div>
      `).join('')}

      ${generatePASContent(score)}
    </div>

    <div class="cta-section">
      <h2>Want to know which gap to close first?</h2>
      <p>Book a free 30-minute call with Paul. We'll go through your scorecard and check where you stand in Google and AI search.</p>
      <a href="https://blackandwhiteboy.com/30-mins-meeting/" class="cta-button">Book Your Free Consultation</a>
    </div>
  </div>
</body>
</html>
  `;

  const textBody = `
Your SEO Scorecard Results: ${score.percentage}% - ${getScoreTitle(score.level)}

Hi ${lead.firstName},

Thank you for completing our SEO Scorecard assessment for ${lead.websiteUrl}.

YOUR OVERALL SCORE: ${score.percentage}%

CATEGORY BREAKDOWN:
${score.categories.map(cat => `- ${getCategoryName(cat.category)}: ${cat.percentage}% (${cat.level.toUpperCase()})`).join('\n')}

${getTextPASContent(score)}

WANT TO KNOW WHICH GAP TO CLOSE FIRST?
Book a free 30-minute call with Paul. We'll go through your scorecard and check where you stand in Google and AI search.
Visit: https://blackandwhiteboy.com/30-mins-meeting/

Paul Clarke
Black And White Boy SEO
  `;

  return { subject, htmlBody, textBody };
}

function getScoreTitle(level: ScoreLevel): string {
  switch (level) {
    case 'high': return 'Leading The Pack!';
    case 'medium': return 'Room for Growth';
    case 'low': return 'Time to Take Action';
    default: return 'Your Results';
  }
}

function getScoreColor(level: ScoreLevel): string {
  switch (level) {
    case 'high': return '#22c55e';
    case 'medium': return '#f59e0b';
    case 'low': return '#ef4444';
    default: return '#07133d';
  }
}

function generatePositiveReflection(score: TotalScore): string {
  if (score.level === 'high') {
    return `
      <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #155724; margin-top: 0;">You're ahead of most</h3>
        <p>Buyers can find you, your site gives them reasons to get in touch, and you can see where your work comes from. Most businesses your size can't say that.</p>
      </div>
    `;
  } else if (score.level === 'medium') {
    return `
      <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #856404; margin-top: 0;">Good foundation, real gaps</h3>
        <p>You're getting some enquiries from search, but not as many as you could. Buyers who don't find you, or don't find what they need, shortlist someone else. The breakdown below shows where.</p>
      </div>
    `;
  } else {
    return `
      <div style="background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #721c24; margin-top: 0;">The gains are in front of you</h3>
        <p>Right now, most buyers who search for what you do won't find you. That's fixable, and the first fixes are usually the cheapest.</p>
      </div>
    `;
  }
}

function generatePASContent(score: TotalScore): string {
  if (score.level === 'high') {
    return `
      <div class="solution">
        <h3 style="color: #155724; margin-top: 0;">Staying ahead</h3>
        <p>Search is changing fast. Buyers now ask ChatGPT and Google's AI for supplier shortlists before they visit a single website. The businesses those tools recommend today will be hard to dislodge.</p>
        <p>On a 30-minute call we can check where you stand in AI search and find your next gain.</p>
      </div>
    `;
  }

  // PAS for Medium/Low scores
  return `
    <div class="problem">
      <h3 style="color: #856404; margin-top: 0;">The problem</h3>
      <p>When a buyer searches for what you do, or asks an AI tool for a shortlist, the businesses that show up get the enquiry. ${score.level === 'low' ? 'With a score of ' + score.percentage + '%, that is mostly your competitors.' : 'Your score shows gaps where buyers are going elsewhere.'}</p>
    </div>

    <div class="agitate">
      <h3 style="color: #721c24; margin-top: 0;">Why it matters</h3>
      <p>If too much of your work comes from one customer, sector or referral partner, a single change can hit your turnover hard. Search and AI visibility give you a source of enquiries you control.</p>
      <p>The longer competitors hold those spots, the harder and more expensive they are to win back.</p>
    </div>

    <div class="solution">
      <h3 style="color: #155724; margin-top: 0;">What to do next</h3>
      <p>In a free 30-minute call, we'll:</p>
      <ul>
        <li>Go through the weak areas in your scorecard</li>
        <li>Check where you show up in Google and AI search today</li>
        <li>Give you 3 to 5 fixes you can start on straight away</li>
      </ul>
      <p><strong>No pitch, no obligation.</strong> If your search is already in good shape, we'll tell you.</p>
    </div>
  `;
}

function getTextPASContent(score: TotalScore): string {
  if (score.level === 'high') {
    return `
STAYING AHEAD
Buyers now ask ChatGPT and Google's AI for supplier shortlists. On a 30-minute call we can check where you stand in AI search and find your next gain.
    `;
  }

  return `
THE PROBLEM
When a buyer searches for what you do, the businesses that show up get the enquiry. ${score.level === 'low' ? 'With a score of ' + score.percentage + '%, that is mostly your competitors.' : 'Your score shows gaps where buyers are going elsewhere.'}

WHY IT MATTERS
If too much of your work comes from one customer, sector or referral partner, a single change can hit your turnover hard. Search and AI visibility give you a source of enquiries you control.

WHAT TO DO NEXT
In a free 30-minute call we'll go through your weak areas, check where you show up in Google and AI search, and give you 3 to 5 fixes to start on. No pitch, no obligation.
  `;
}

export function generateNotificationEmail(lead: LeadData, score: TotalScore): { subject: string; htmlBody: string; textBody: string } {
  const subject = `New SEO Scorecard Lead: ${lead.firstName} ${lead.lastName} - ${score.percentage}%${lead.turnover ? ` - ${lead.turnover}` : ''}`;

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Poppins', Arial, sans-serif; line-height: 1.6; color: #07133d; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #07133d; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
    .lead-details { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; }
    .lead-details h3 { margin: 0 0 15px 0; color: #07133d; border-bottom: 2px solid #fec404; padding-bottom: 10px; }
    .detail-row { display: flex; padding: 8px 0; border-bottom: 1px solid #eee; }
    .detail-label { font-weight: bold; width: 120px; color: #666; }
    .detail-value { color: #07133d; }
    .score-badge { background: ${getScoreColor(score.level)}; color: white; font-size: 32px; font-weight: bold; padding: 15px 30px; border-radius: 10px; display: inline-block; margin: 10px 0; }
    .category { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid ${getScoreColor(score.level)}; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New SEO Scorecard Lead</h1>
      <div class="score-badge">${score.percentage}%</div>
      <p style="margin: 0;">${getScoreTitle(score.level)}</p>
    </div>

    <div class="content">
      <div class="lead-details">
        <h3>Lead Details</h3>
        <div class="detail-row">
          <span class="detail-label">Name:</span>
          <span class="detail-value">${lead.firstName} ${lead.lastName}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Email:</span>
          <span class="detail-value"><a href="mailto:${lead.email}">${lead.email}</a></span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Website:</span>
          <span class="detail-value"><a href="${lead.websiteUrl}" target="_blank">${lead.websiteUrl}</a></span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Turnover:</span>
          <span class="detail-value">${lead.turnover ?? 'Not given'}</span>
        </div>
      </div>

      <div class="lead-details" style="background: ${lead.gdprConsent ? '#d4edda' : '#f8d7da'};">
        <h3>GDPR Consent</h3>
        <div class="detail-row">
          <span class="detail-label">Status:</span>
          <span class="detail-value" style="color: ${lead.gdprConsent ? '#155724' : '#721c24'}; font-weight: bold;">
            ${lead.gdprConsent ? 'CONSENTED' : 'NOT CONSENTED'}
          </span>
        </div>
        ${lead.gdprConsentAt ? `
        <div class="detail-row">
          <span class="detail-label">Timestamp:</span>
          <span class="detail-value">${new Date(lead.gdprConsentAt).toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'long' })}</span>
        </div>
        ` : ''}
        <p style="margin: 10px 0 0 0; font-size: 12px; color: #666;">
          Lead agreed to receive SEO assessment results and marketing emails.
        </p>
      </div>

      <div class="lead-details">
        <h3>Score Breakdown</h3>
        ${score.categories.map(cat => `
          <div class="category">
            <strong>${getCategoryName(cat.category)}:</strong>
            <span style="color: ${getScoreColor(cat.level)}; font-weight: bold;">${cat.percentage}%</span>
            <span style="color: #666;"> (${cat.level.toUpperCase()})</span>
          </div>
        `).join('')}
      </div>

      <p style="text-align: center; margin-top: 20px;">
        <a href="mailto:${lead.email}?subject=Your%20SEO%20Scorecard%20Results"
           style="background: #fec404; color: #07133d; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 5px;">
          Reply to Lead
        </a>
      </p>
    </div>
  </div>
</body>
</html>
  `;

  const textBody = `
NEW SEO SCORECARD LEAD

LEAD DETAILS:
Name: ${lead.firstName} ${lead.lastName}
Email: ${lead.email}
Website: ${lead.websiteUrl}
Turnover: ${lead.turnover ?? 'Not given'}

GDPR CONSENT:
Status: ${lead.gdprConsent ? 'CONSENTED' : 'NOT CONSENTED'}
${lead.gdprConsentAt ? `Timestamp: ${new Date(lead.gdprConsentAt).toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'long' })}` : ''}
Lead agreed to receive SEO assessment results and marketing emails.

OVERALL SCORE: ${score.percentage}% (${getScoreTitle(score.level)})

CATEGORY BREAKDOWN:
${score.categories.map(cat => `- ${getCategoryName(cat.category)}: ${cat.percentage}% (${cat.level.toUpperCase()})`).join('\n')}

Reply to this lead at: ${lead.email}
  `;

  return { subject, htmlBody, textBody };
}
