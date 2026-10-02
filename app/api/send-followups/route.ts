import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { getPostmarkClient } from '@/lib/postmark';

// Vercel Cron — daily at 09:00 UK (08:00 UTC)
// For each lead:
//   - created >= 3 days ago + email_2_sent_at IS NULL  → send Email 2
//   - created >= 7 days ago + email_3_sent_at IS NULL  → send Email 3
// Idempotent: timestamp is written after each send, so reruns don't double-send.

const CAL_LINK = process.env.CAL_LINK || 'https://blackandwhiteboy.com/30-mins-meeting/';
const NURTURE_FROM = process.env.NURTURE_FROM_EMAIL || 'paul@blackandwhiteboy.com';
const TOOL_NAME = 'SEO Scorecard';
const TOOL_URL = 'https://local-seo-scorecard.blackandwhiteboy.com';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

type Lead = {
  id: string;
  first_name: string | null;
  email: string;
  website_url: string | null;
  total_score: number | null;
  score_level: string | null;
};

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization') || '';
  const expected = `Bearer ${process.env.CRON_SECRET || ''}`;
  if (!process.env.CRON_SECRET || authHeader !== expected) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const summary = {
    day3: { found: 0, sent: 0, failed: 0 },
    day7: { found: 0, sent: 0, failed: 0 }
  };

  try {
    const supabase = createServerClient();
    const postmark = getPostmarkClient();

    // Day 3 — Email 2
    const { data: day3Leads, error: err3 } = await supabase
      .from('leads')
      .select('id, first_name, email, website_url, total_score, score_level, completed_at')
      .lte('created_at', threeDaysAgo)
      .is('email_2_sent_at', null)
      .not('email', 'is', null)
      .not('completed_at', 'is', null);

    if (err3) throw err3;
    summary.day3.found = day3Leads?.length || 0;

    for (const lead of (day3Leads || []) as Lead[]) {
      try {
        const { subject, text, html } = buildEmail2(lead);
        await postmark.sendEmail({
          From: `Paul Clarke <${NURTURE_FROM}>`,
          To: lead.email,
          Subject: subject,
          TextBody: text,
          HtmlBody: html,
          MessageStream: 'outbound'
        });
        await supabase
          .from('leads')
          .update({ email_2_sent_at: new Date().toISOString() })
          .eq('id', lead.id);
        summary.day3.sent++;
      } catch (err) {
        summary.day3.failed++;
        console.error(`Day 3 send failed for ${lead.id}:`, (err as Error).message);
      }
    }

    // Day 7 — Email 3
    const { data: day7Leads, error: err7 } = await supabase
      .from('leads')
      .select('id, first_name, email, website_url, total_score, score_level, completed_at')
      .lte('created_at', sevenDaysAgo)
      .is('email_3_sent_at', null)
      .not('email', 'is', null)
      .not('completed_at', 'is', null);

    if (err7) throw err7;
    summary.day7.found = day7Leads?.length || 0;

    for (const lead of (day7Leads || []) as Lead[]) {
      try {
        const { subject, text, html } = buildEmail3(lead);
        await postmark.sendEmail({
          From: `Paul Clarke <${NURTURE_FROM}>`,
          To: lead.email,
          Subject: subject,
          TextBody: text,
          HtmlBody: html,
          MessageStream: 'outbound'
        });
        await supabase
          .from('leads')
          .update({ email_3_sent_at: new Date().toISOString() })
          .eq('id', lead.id);
        summary.day7.sent++;
      } catch (err) {
        summary.day7.failed++;
        console.error(`Day 7 send failed for ${lead.id}:`, (err as Error).message);
      }
    }

    return NextResponse.json({ ok: true, summary, runAt: now.toISOString() });
  } catch (err) {
    console.error('Cron failed:', err);
    return NextResponse.json(
      { ok: false, error: (err as Error).message, summary },
      { status: 500 }
    );
  }
}

/* ============================================================ */
/* EMAIL 2 — DAY 3                                              */
/* ============================================================ */

function buildEmail2(lead: Lead) {
  const firstName = lead.first_name || 'there';
  const level = (lead.score_level || '').toLowerCase();

  const levelAngle: Record<string, string> = {
    high: "You came out of the scorecard strong. Which is great, but it's also where most people stop looking. The question worth asking now is which of the four areas is weakest, because that's where your next jump comes from.",
    medium: "You're scoring in the middle across the board. The pattern I see most often is that one area is genuinely solid and the others have gaps that feel smaller than they are. Fixing the right one first makes the biggest difference.",
    low: "A low score isn't a bad place to be. It means the gains are in front of you, not behind you. But the order matters. Most businesses try to fix everything at once and end up fixing nothing."
  };
  const angle = levelAngle[level] || "Thanks for taking the scorecard.";

  const subject = `One thing to sort first, ${firstName}`;

  const text = `
Hi ${firstName},

Quick follow-up on your ${TOOL_NAME} from a few days ago.

${angle}

The four areas the scorecard tests are:

- Found by buyers (whether buyers find you when they search for what you do)
- AI search (whether ChatGPT and Google's AI recommend you)
- Website (whether your site turns visits into enquiries)
- Pipeline and ROI (whether you know where your work comes from)

If you are not sure which one to tackle first, that's normally the sign you need another set of eyes on it. Happy to do that. 30 minutes, free, no pitch:

${CAL_LINK}

I'll look at your scorecard before the call so we go straight to what matters.

Either way, thanks for giving it a go.

Paul

Paul Clarke
Black and White Boy SEO
${TOOL_URL}
  `.trim();

  const html = renderNurtureHTML({
    preheader: "Which area to fix first, and why the order matters.",
    heading: `One thing to sort first, ${firstName}`,
    bodyParagraphs: [
      `Quick follow-up on your <strong>${TOOL_NAME}</strong> from a few days ago.`,
      angle,
      `The four areas the scorecard tests are:`
    ],
    bullets: [
      `<strong>Found by buyers</strong>: whether buyers find you when they search for what you do`,
      `<strong>AI search</strong>: whether ChatGPT and Google's AI recommend you`,
      `<strong>Website</strong>: whether your site turns visits into enquiries`,
      `<strong>Pipeline and ROI</strong>: whether you know where your work comes from`
    ],
    closingParagraphs: [
      `If you are not sure which one to tackle first, that's normally the sign you need another set of eyes on it. Happy to do that. 30 minutes, free, no pitch.`,
      `I'll look at your scorecard before the call so we go straight to what matters.`
    ],
    ctaText: 'Book a 30-min review',
    ctaLink: CAL_LINK,
    signOff: 'Paul'
  });

  return { subject, text, html };
}

/* ============================================================ */
/* EMAIL 3 — DAY 7                                              */
/* ============================================================ */

function buildEmail3(lead: Lead) {
  const firstName = lead.first_name || 'there';

  const subject = `${firstName}, still thinking about it?`;

  const text = `
Hi ${firstName},

Last one from me, promise.

You took the ${TOOL_NAME} a week ago. Thought I'd check in once in case the results sparked a question.

Three things I can do in a free 30-minute call:

1. Walk through your specific scorecard and flag the one or two gaps that matter most
2. Tell you honestly whether they're worth fixing yourself or need help
3. Sketch out what the first 90 days of work would actually look like if you did want help

No pitch. If it turns out your search is already in decent shape, I'll tell you. That's the job.

${CAL_LINK}

If it is not the right time, no worries. Just hit reply and let me know so I stop emailing.

Paul

Paul Clarke
Black and White Boy SEO
${TOOL_URL}
  `.trim();

  const html = renderNurtureHTML({
    preheader: "Free 30 minutes to walk through your scorecard together.",
    heading: `Still thinking about it, ${firstName}?`,
    bodyParagraphs: [
      `Last one from me, promise.`,
      `You took the <strong>${TOOL_NAME}</strong> a week ago. Thought I'd check in once in case the results sparked a question.`,
      `Three things I can do in a free 30-minute call:`
    ],
    bullets: [
      `Walk through your specific scorecard and flag the one or two gaps that matter most`,
      `Tell you honestly whether they're worth fixing yourself or need help`,
      `Sketch out what the first 90 days of work would actually look like if you did want help`
    ],
    closingParagraphs: [
      `No pitch. If it turns out your search is already in decent shape, I'll tell you. That's the job.`,
      `If it is not the right time, no worries. Just hit reply and let me know so I stop emailing.`
    ],
    ctaText: 'Book the 30 minutes',
    ctaLink: CAL_LINK,
    signOff: 'Paul'
  });

  return { subject, text, html };
}

/* ============================================================ */
/* SHARED HTML RENDERER                                         */
/* ============================================================ */

type RenderArgs = {
  preheader: string;
  heading: string;
  bodyParagraphs: string[];
  bullets?: string[];
  closingParagraphs: string[];
  ctaText: string;
  ctaLink: string;
  signOff: string;
};

function renderNurtureHTML(args: RenderArgs) {
  const { preheader, heading, bodyParagraphs, bullets, closingParagraphs, ctaText, ctaLink, signOff } = args;

  const bodyHTML = bodyParagraphs
    .map(p => `<p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.65; color: #1f2937;">${p}</p>`)
    .join('');
  const bulletsHTML = bullets && bullets.length
    ? `<ul style="margin: 0 0 20px 0; padding-left: 22px; color: #1f2937;">${bullets.map(b => `<li style="margin-bottom: 8px; line-height: 1.6;">${b}</li>`).join('')}</ul>`
    : '';
  const closingHTML = closingParagraphs
    .map(p => `<p style="margin: 0 0 16px 0; font-size: 16px; line-height: 1.65; color: #1f2937;">${p}</p>`)
    .join('');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${heading}</title>
</head>
<body style="margin: 0; padding: 0; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <div style="display: none; max-height: 0; overflow: hidden;">${preheader}</div>
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #f5f5f5; padding: 24px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="background: #07133d; padding: 24px 32px; color: #ffffff;">
              <div style="font-size: 14px; opacity: 0.75; letter-spacing: 0.5px;">BLACK AND WHITE BOY SEO</div>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px 32px 8px 32px;">
              <h1 style="margin: 0 0 20px 0; font-size: 22px; line-height: 1.3; color: #07133d; font-weight: 700;">${heading}</h1>
              ${bodyHTML}
              ${bulletsHTML}
              ${closingHTML}
            </td>
          </tr>
          <tr>
            <td align="center" style="padding: 8px 32px 36px 32px;">
              <a href="${ctaLink}" style="display: inline-block; background: #fec404; color: #07133d; padding: 14px 32px; border-radius: 9999px; text-decoration: none; font-weight: 700; font-size: 15px; letter-spacing: 0.02em;">${ctaText} &rarr;</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <p style="margin: 0; font-size: 16px; color: #1f2937;">${signOff}</p>
              <p style="margin: 12px 0 0 0; font-size: 13px; color: #6b7280; line-height: 1.5;">
                Paul Clarke<br>
                Black and White Boy SEO<br>
                <a href="https://blackandwhiteboy.com" style="color: #fec404; text-decoration: none;">blackandwhiteboy.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
