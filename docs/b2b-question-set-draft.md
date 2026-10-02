# B2B Scorecard — Draft Question Set

Status: APPROVED 2026-10-02 (Q5 option A). Built on branch `b2b-scorecard`, not deployed. The qualifier made it 17 questions in the UI.

Target: UK SMEs, £500k–£2m turnover. ICP 1 manufacturing, ICP 2 B2B services. Source: WorkOS `00-brain/customers.md`.

## Changes vs current quiz

- 22 questions → 16 + 1 unscored qualifier. MDs are time-poor.
- Drop all Google Business Profile questions. Local-business only.
- Uses buyer language: "enquiries", "buyers", "capability", "accreditations".
- Keep the 4 category database keys (`gbp`, `visibility`, `website`, `ai`) and change only the display names. No database migration.

| DB key | New display name |
|---|---|
| `gbp` | Found By Buyers |
| `visibility` | AI Search Visibility |
| `website` | Website That Wins Enquiries |
| `ai` | Pipeline & ROI |

Scoring: best answer 10, then 6, 2, 0. Each category max 40. Total max 160.

## Qualifier (unscored, shown first)

**Q0. What is your annual turnover?**
Under £500k / £500k–£2m / £2m–£10m / Over £10m
→ Every option scores 0. It is stored in responses so lead alerts can show it.

## Found By Buyers (`gbp`)

1. **When a buyer searches for what you make or do (not your company name), where do you show up?**
   Top 3 (10) / Page 1 (6) / Page 2 or later (2) / Don't know (0)
2. **Does each core service, capability or sector you want to win have its own page?**
   Yes, each one (10) / Some do (6) / One general page (2) / No (0)
3. **Do your key pages show the proof buyers check: accreditations (e.g. ISO), case studies, named clients?**
   Yes, on the key pages (10) / Somewhere on the site (6) / No (0)
4. **In the last 12 months, has your website brought an enquiry from a company you had never heard of?**
   Yes, regularly (10) / Once or twice (6) / No (0) / Don't know (0)

## AI Search Visibility (`visibility`)

5. **Ask ChatGPT "Who are the best [your service] companies in the UK?" Are you named?**
   Yes (10) / Sometimes (6) / No (2) / Never checked (0)
6. **When AI tools describe your business, are they accurate (what you do, sectors, location)?**
   Yes (10) / Partly (6) / No (2) / Never checked (0)
7. **Is your business mentioned on other sites: trade bodies, industry press, supplier lists, directories?**
   Lots (10) / A few (6) / Hardly any (2) / Don't know (0)
8. **Does your site answer the questions buyers ask before they shortlist: lead times, minimum orders, process, pricing approach?**
   Yes, clearly (10) / Some of them (6) / No (0)

## Website That Wins Enquiries (`website`)

9. **Can a visitor find how to contact you on every page in under 5 seconds?**
   Yes (10) / Only on the contact page (2) / Not sure (0)
10. **Do you know your website's enquiry rate (enquiries divided by visitors)?**
    Yes (10) / Roughly (6) / No (0)
11. **Does your site load fast on a phone?**
    Yes, we've tested it (10) / I think so (6) / No or not sure (0)
12. **When did you last update your main service pages?**
    In the last 6 months (10) / 6–24 months ago (6) / Over 2 years ago (2) / Don't know (0)

## Pipeline & ROI (`ai`)

13. **How much of your new business comes from your single biggest source (one customer, sector or referral partner)?**
    Under 25% (10) / 25–50% (6) / Over 50% (2) / Don't know (0)
14. **Do you track which channel each enquiry came from?**
    Every enquiry (10) / Some (6) / No (0)
15. **Could you say in pounds what your marketing returned last year?**
    Yes (10) / Roughly (6) / No (0)
16. **Who looks after your marketing?**
    A dedicated person or partner with a plan (10) / Me, when I have time (2) / Nobody, really (0)

## Also needs changing (not in this file)

- Landing page copy: "Is Your Business Invisible to Local Customers?" and the local stats (97% / 46% / 88%).
- Result page text per category (`lib/scoring.ts`) and email templates (`lib/email-templates.ts`) for the new names.
- Category names in `components/results/CategoryBreakdown.tsx`.
- "Takes 5 minutes" → "Takes 3 minutes".
