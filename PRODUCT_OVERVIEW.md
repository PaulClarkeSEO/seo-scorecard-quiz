# SEO Scorecard Quiz - Product Overview

## What It Is

The SEO Scorecard Quiz is a lead generation tool that assesses local businesses' SEO readiness across 4 key categories. Users answer 22 questions and receive an instant score with a detailed breakdown, plus an email report.

**Live URL:** `local-seo-scorecard.blackandwhiteboy.com`

---

## Current Features

### Lead Capture
- First name, last name, email, website URL
- GDPR-compliant consent checkbox with timestamp logging
- Leads stored in Supabase database

### Quiz Flow
- 22 questions across 4 categories
- Progress bar showing completion percentage
- Back button to revisit previous questions
- Category indicator showing current section

### Scoring System
- Overall percentage score (0-100%)
- Score levels: Low (0-40%), Medium (41-70%), High (71-100%)
- Individual category scores with personalised feedback

### Results Page
- Visual score display with colour coding (red/amber/green)
- Category-by-category breakdown with icons
- Personalised feedback based on score level
- CTA button linking to `/30-mins-meeting/`

### Email Reports
- Instant email to user with full score breakdown
- Notification email to business (hello@blackandwhiteboy.com)
- GDPR consent status included in notification

---

## The 4 Categories

### 1. Google Business Profile (6 questions)
- Profile verification status
- Profile completeness
- Posting frequency
- Review response habits
- Products/services listings
- Google Business messaging usage

### 2. Local Visibility (5 questions)
- Search ranking awareness
- Directory listings (Yelp, Bing, Apple Maps)
- NAP consistency (Name, Address, Phone)
- Location-specific pages
- Rank tracking practices

### 3. Website Fundamentals (6 questions)
- Mobile load speed
- Call-to-action presence
- Testimonials/reviews display
- Dedicated service pages
- Contact information visibility
- Blog/content section

### 4. AI & Future-Readiness (5 questions)
- AI content creation tools usage
- AI chatbot implementation
- AI search engine recommendations (ChatGPT, Perplexity, Google AI)
- Structured data for voice assistants
- FAQ content for AI search results

---

## Technical Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16.1.1 (App Router) |
| Hosting | Vercel |
| Database | Supabase (PostgreSQL) |
| Email | Postmark |
| Styling | Tailwind CSS |
| Language | TypeScript |

---

## Database Schema

### `leads` table
- id, first_name, last_name, email, website_url
- gdpr_consent, gdpr_consent_at
- total_score, score_level
- gmb_score, keywords_score, website_score (legacy column names)
- created_at, completed_at

### `responses` table
- id, lead_id, question_id
- answer, points, category
- created_at

---

## Landing Page Structure (VSL Format)

1. **Hero Section** - Headline, subheadline, primary CTA
2. **Statistics Section** - 97%, 46%, 88% local search stats
3. **Problem Agitation** - "Sound Familiar?" pain points
4. **Solution Section** - 4 categories overview
5. **What You'll Get** - Benefits list
6. **How It Works** - 3-step process
7. **Trust Section** - 10+ years, 100s helped, ROI focused
8. **FAQ Section** - Common objections addressed
9. **Final CTA** - Lead capture form

---

## Future Development Opportunities

### Phase 1: Database-Driven Questions
Move questions from code to database for easier management:
- A/B test different question wording
- Adjust scoring weights without deployments
- Enable/disable questions dynamically

### Phase 2: Industry-Specific Quizzes
Create tailored versions for different verticals:

| Industry | Focus Areas |
|----------|-------------|
| **Restaurants/Hospitality** | Reviews, photos, menus, reservations |
| **Professional Services** | Credentials, thought leadership, trust signals |
| **Retail/E-commerce** | Products, inventory, shopping features |
| **Home Services** | Service areas, before/after galleries, scheduling |
| **Healthcare** | HIPAA considerations, appointment booking, reviews |

Each would have:
- Custom landing page with industry-specific copy
- Tailored questions relevant to that business type
- Industry benchmarks for scoring
- Targeted email follow-up sequences

### Phase 3: Enhanced Analytics
- Conversion tracking per traffic source
- Drop-off analysis (which questions lose users)
- Score distribution analytics
- A/B testing framework for landing page elements

### Phase 4: Integration Options
- CRM integration (HubSpot, Pipedrive, etc.)
- Calendar booking integration (Calendly, Cal.com)
- Slack/email notifications with lead scoring
- Zapier/Make webhooks for automation

### Phase 5: Advanced Features
- PDF report generation
- Competitor comparison tool
- Progress tracking (retake quiz over time)
- White-label version for agencies

---

## Environment Variables Required

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
POSTMARK_API_KEY=
POSTMARK_FROM_EMAIL=
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `app/page.tsx` | Landing page route |
| `app/quiz/page.tsx` | Quiz flow logic |
| `app/results/[id]/page.tsx` | Results display |
| `components/landing/LandingPage.tsx` | VSL landing page |
| `lib/questions.ts` | All 22 questions defined |
| `lib/scoring.ts` | Score calculation logic |
| `lib/email-templates.ts` | Email HTML templates |
| `types/index.ts` | TypeScript type definitions |

---

## Maintenance Notes

### Adding/Editing Questions
Edit `lib/questions.ts` - each question has:
- `id`: Unique number
- `text`: Question text
- `category`: 'gbp' | 'visibility' | 'website' | 'ai'
- `options`: Array of { label, value, points }

### Updating Email Content
Edit `lib/email-templates.ts` - contains:
- `generateEmailContent()` - User report
- `generateNotificationEmail()` - Business notification
- `getCategoryFeedback()` - Per-category feedback text

### Changing Scoring Logic
Edit `lib/scoring.ts` - handles:
- Category score calculation
- Total score aggregation
- Score level thresholds

---

## Document Version
Last updated: January 2026
