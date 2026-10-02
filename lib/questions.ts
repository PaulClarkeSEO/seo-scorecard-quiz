import { Question, Category } from '@/types';

export type { Category };

export const questions: Question[] = [
  // Qualifier (unscored): every option is 0 points, so category totals are unaffected
  {
    id: 0,
    text: "What is your company's annual turnover?",
    category: "ai",
    categoryLabel: "About Your Business",
    options: [
      { label: "Under £500k", value: "under-500k", points: 0 },
      { label: "£500k–£2m", value: "500k-2m", points: 0 },
      { label: "£2m–£10m", value: "2m-10m", points: 0 },
      { label: "Over £10m", value: "over-10m", points: 0 }
    ]
  },

  // Category 1: Found By Buyers (DB key 'gbp', 4 questions)
  {
    id: 1,
    text: "When a buyer searches for what you make or do (not your company name), where do you show up?",
    category: "gbp",
    options: [
      { label: "Top 3", value: "top3", points: 10 },
      { label: "Page 1", value: "page1", points: 6 },
      { label: "Page 2 or later", value: "page2plus", points: 2 },
      { label: "Don't know", value: "unknown", points: 0 }
    ]
  },
  {
    id: 2,
    text: "Does each core service, capability or sector you want to win have its own page?",
    category: "gbp",
    options: [
      { label: "Yes, each one", value: "each", points: 10 },
      { label: "Some do", value: "some", points: 6 },
      { label: "One general page", value: "one", points: 2 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 3,
    text: "Do your key pages show the proof buyers check: accreditations (e.g. ISO), case studies, named clients?",
    category: "gbp",
    options: [
      { label: "Yes, on the key pages", value: "key-pages", points: 10 },
      { label: "Somewhere on the site", value: "somewhere", points: 6 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 4,
    text: "In the last 12 months, has your website brought an enquiry from a company you had never heard of?",
    category: "gbp",
    options: [
      { label: "Yes, regularly", value: "regularly", points: 10 },
      { label: "Once or twice", value: "once-twice", points: 6 },
      { label: "No", value: "no", points: 0 },
      { label: "Don't know", value: "unknown", points: 0 }
    ]
  },

  // Category 2: AI Search Visibility (DB key 'visibility', 4 questions)
  {
    id: 5,
    text: "Ask ChatGPT \"Who are the best [your service] companies in the UK?\" Are you named?",
    category: "visibility",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Sometimes", value: "sometimes", points: 6 },
      { label: "No", value: "no", points: 2 },
      { label: "Never checked", value: "unchecked", points: 0 }
    ]
  },
  {
    id: 6,
    text: "When AI tools describe your business, are they accurate (what you do, sectors, location)?",
    category: "visibility",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Partly", value: "partly", points: 6 },
      { label: "No", value: "no", points: 2 },
      { label: "Never checked", value: "unchecked", points: 0 }
    ]
  },
  {
    id: 7,
    text: "Is your business mentioned on other sites: trade bodies, industry press, supplier lists, directories?",
    category: "visibility",
    options: [
      { label: "Lots", value: "lots", points: 10 },
      { label: "A few", value: "few", points: 6 },
      { label: "Hardly any", value: "hardly", points: 2 },
      { label: "Don't know", value: "unknown", points: 0 }
    ]
  },
  {
    id: 8,
    text: "Does your site answer the questions buyers ask before they shortlist: lead times, minimum orders, process, pricing approach?",
    category: "visibility",
    options: [
      { label: "Yes, clearly", value: "clearly", points: 10 },
      { label: "Some of them", value: "some", points: 6 },
      { label: "No", value: "no", points: 0 }
    ]
  },

  // Category 3: Website That Wins Enquiries (DB key 'website', 4 questions)
  {
    id: 9,
    text: "Can a visitor find how to contact you on every page in under 5 seconds?",
    category: "website",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Only on the contact page", value: "contact-only", points: 2 },
      { label: "Not sure", value: "unsure", points: 0 }
    ]
  },
  {
    id: 10,
    text: "Do you know your website's enquiry rate (enquiries divided by visitors)?",
    category: "website",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Roughly", value: "roughly", points: 6 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 11,
    text: "Does your site load fast on a phone?",
    category: "website",
    options: [
      { label: "Yes, we've tested it", value: "tested", points: 10 },
      { label: "I think so", value: "think-so", points: 6 },
      { label: "No or not sure", value: "no", points: 0 }
    ]
  },
  {
    id: 12,
    text: "When did you last update your main service pages?",
    category: "website",
    options: [
      { label: "In the last 6 months", value: "6m", points: 10 },
      { label: "6–24 months ago", value: "6-24m", points: 6 },
      { label: "Over 2 years ago", value: "2y-plus", points: 2 },
      { label: "Don't know", value: "unknown", points: 0 }
    ]
  },

  // Category 4: Pipeline & ROI (DB key 'ai', 4 questions)
  {
    id: 13,
    text: "How much of your new business comes from your single biggest source (one customer, sector or referral partner)?",
    category: "ai",
    options: [
      { label: "Under 25%", value: "under-25", points: 10 },
      { label: "25–50%", value: "25-50", points: 6 },
      { label: "Over 50%", value: "over-50", points: 2 },
      { label: "Don't know", value: "unknown", points: 0 }
    ]
  },
  {
    id: 14,
    text: "Do you track which channel each enquiry came from?",
    category: "ai",
    options: [
      { label: "Every enquiry", value: "every", points: 10 },
      { label: "Some", value: "some", points: 6 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 15,
    text: "Could you say in pounds what your marketing returned last year?",
    category: "ai",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Roughly", value: "roughly", points: 6 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 16,
    text: "Who looks after your marketing?",
    category: "ai",
    options: [
      { label: "A dedicated person or partner with a plan", value: "dedicated", points: 10 },
      { label: "Me, when I have time", value: "me", points: 2 },
      { label: "Nobody, really", value: "nobody", points: 0 }
    ]
  }
];

// Sort questions by ID for quiz flow
export const sortedQuestions = [...questions].sort((a, b) => a.id - b.id);

// Get total number of questions
export const totalQuestions = questions.length;

// Get questions by category
export function getQuestionsByCategory(category: Category): Question[] {
  return questions.filter(q => q.category === category);
}

// Get max possible score for a category
export function getCategoryMaxScore(category: Category): number {
  return getQuestionsByCategory(category).reduce((total, q) => {
    const maxPoints = Math.max(...q.options.map(o => o.points));
    return total + maxPoints;
  }, 0);
}

// Get total max score
export function getTotalMaxScore(): number {
  return questions.reduce((total, q) => {
    const maxPoints = Math.max(...q.options.map(o => o.points));
    return total + maxPoints;
  }, 0);
}
