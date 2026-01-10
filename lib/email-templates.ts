import { TotalScore, CategoryScore, ScoreLevel } from '@/types';

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  websiteUrl: string;
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
      <h2>Ready to Dominate Local Search?</h2>
      <p>Book a free 30-minute strategy session with our SEO experts and discover how to improve your rankings.</p>
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

READY TO DOMINATE LOCAL SEARCH?
Book a free 30-minute strategy session with our SEO experts.
Visit: https://blackandwhiteboy.com/30-mins-meeting/

Best regards,
Black And White Boy SEO Team
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

function getCategoryName(category: string): string {
  switch (category) {
    case 'gmb': return 'Google My Business';
    case 'keywords': return 'Local Keywords';
    case 'website': return 'Website Audit';
    default: return category;
  }
}

function getCategoryFeedback(cat: CategoryScore): string {
  if (cat.level === 'high') {
    switch (cat.category) {
      case 'gmb': return 'Excellent work! Your Google My Business presence is well-optimized.';
      case 'keywords': return 'Great job! Your local keyword strategy is on point.';
      case 'website': return 'Fantastic! Your website is well-optimized for search engines.';
    }
  } else if (cat.level === 'medium') {
    switch (cat.category) {
      case 'gmb': return 'Good progress, but there are opportunities to strengthen your GMB presence.';
      case 'keywords': return 'You have a foundation, but your local keyword strategy needs work.';
      case 'website': return 'Your website has potential, but several areas need attention.';
    }
  } else {
    switch (cat.category) {
      case 'gmb': return 'Your Google My Business needs significant attention to compete locally.';
      case 'keywords': return 'Your local keyword presence is minimal - this is a priority area.';
      case 'website': return 'Your website requires substantial improvements for better SEO performance.';
    }
  }
  return '';
}

function generatePositiveReflection(score: TotalScore): string {
  if (score.level === 'high') {
    return `
      <div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #155724; margin-top: 0;">Congratulations!</h3>
        <p>Scoring in the <strong>High</strong> range is a commendable achievement! Your business is leveraging many best practices in terms of Google My Business utilisation, local SEO, and website optimisation. Your efforts are likely translating into greater online visibility, more leads, and a strong competitive edge in your local market.</p>
      </div>
    `;
  } else if (score.level === 'medium') {
    return `
      <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #856404; margin-top: 0;">Good Foundation</h3>
        <p>You've made progress with your online presence, but there's significant room for improvement. You're competing, but not yet dominating. With some focused effort on the areas highlighted below, you could see substantial improvements in your search visibility and lead generation.</p>
      </div>
    `;
  } else {
    return `
      <div style="background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #721c24; margin-top: 0;">Time for Action</h3>
        <p>Your current score indicates that your business has significant untapped potential online. The good news? This means there are plenty of opportunities for quick wins that could dramatically improve your visibility and lead flow.</p>
      </div>
    `;
  }
}

function generatePASContent(score: TotalScore): string {
  if (score.level === 'high') {
    return `
      <div class="solution">
        <h3 style="color: #155724; margin-top: 0;">Maintain Your Lead</h3>
        <p>However, the digital landscape is always evolving, and there's an ongoing need to adapt and innovate to stay ahead. To ensure you maintain this lead and explore new opportunities for growth, consider a strategy call with our specialists.</p>
        <p>We can provide advanced insights and strategies to not only sustain your current success but also identify new avenues for further growth and optimization.</p>
      </div>
    `;
  }

  // PAS for Medium/Low scores
  return `
    <div class="problem">
      <h3 style="color: #856404; margin-top: 0;">The Problem</h3>
      <p>Right now, your competitors who have optimized their online presence are capturing leads that could be yours. Every day without a strong SEO strategy means potential customers are finding your competitors instead of you.</p>
      <p>${score.level === 'low' ? 'With a score of ' + score.percentage + '%, your business is likely invisible to most local searchers.' : 'Your current score shows gaps that are costing you visibility and leads.'}</p>
    </div>

    <div class="agitate">
      <h3 style="color: #721c24; margin-top: 0;">Why This Matters</h3>
      <p>Consider this: <strong>46% of all Google searches have local intent</strong>, and <strong>88% of consumers who do a local search on their smartphone visit a related store within a week</strong>.</p>
      <p>If your business isn't showing up in local search results, you're essentially handing those customers to your competitors. Every week that passes is another week of lost revenue and missed opportunities.</p>
      <p>The longer you wait, the more entrenched your competitors become, making it harder and more expensive to catch up.</p>
    </div>

    <div class="solution">
      <h3 style="color: #155724; margin-top: 0;">The Solution</h3>
      <p>The good news is that these issues are fixable, and we specialize in helping businesses exactly like yours transform their online presence.</p>
      <p>In a free 30-minute strategy session, we'll:</p>
      <ul>
        <li>Review your specific weak areas identified in this assessment</li>
        <li>Share 3-5 quick wins you can implement immediately</li>
        <li>Outline a roadmap to improve your scores and start generating more leads</li>
      </ul>
      <p><strong>No pressure, no obligation</strong> - just actionable insights you can use whether you work with us or not.</p>
    </div>
  `;
}

function getTextPASContent(score: TotalScore): string {
  if (score.level === 'high') {
    return `
MAINTAIN YOUR LEAD
The digital landscape is always evolving. To stay ahead, consider a strategy call with our specialists to identify new growth opportunities.
    `;
  }

  return `
THE PROBLEM
Your competitors with optimized online presence are capturing leads that could be yours. ${score.level === 'low' ? 'With a score of ' + score.percentage + '%, your business is likely invisible to most local searchers.' : 'Your current score shows gaps that are costing you visibility.'}

WHY THIS MATTERS
46% of all Google searches have local intent, and 88% of consumers who do a local search visit a related store within a week. If you're not showing up, you're handing customers to competitors.

THE SOLUTION
These issues are fixable. Book a free 30-minute strategy session where we'll review your weak areas, share quick wins, and outline a roadmap to improve your scores.
  `;
}

export function generateNotificationEmail(lead: LeadData, score: TotalScore): { subject: string; htmlBody: string; textBody: string } {
  const subject = `New SEO Scorecard Lead: ${lead.firstName} ${lead.lastName} - ${score.percentage}%`;

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

OVERALL SCORE: ${score.percentage}% (${getScoreTitle(score.level)})

CATEGORY BREAKDOWN:
${score.categories.map(cat => `- ${getCategoryName(cat.category)}: ${cat.percentage}% (${cat.level.toUpperCase()})`).join('\n')}

Reply to this lead at: ${lead.email}
  `;

  return { subject, htmlBody, textBody };
}
