import { Question, Category, AnswerOption } from '@/types';

export type { Category, AnswerOption };

export const questions: Question[] = [
  // Google My Business Category (Questions 1-5, 14)
  {
    id: 1,
    text: "Do you have a verified Google My Business listing?",
    category: "gmb",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },
  {
    id: 2,
    text: "Is your business information accurate and up to date on your Google My Business listing?",
    category: "gmb",
    options: ["yes", "no", "maybe"],
    points: { yes: 10, no: 0, maybe: 5 }
  },
  {
    id: 3,
    text: "Do you regularly post updates, photos, and promotions on your Google My Business listing?",
    category: "gmb",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },
  {
    id: 4,
    text: "Have you responded to all customer reviews on your Google My Business listing?",
    category: "gmb",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },
  {
    id: 5,
    text: "Do you actively monitor and analyse the insights and data provided by your Google My Business listing?",
    category: "gmb",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },

  // Local Keywords Category (Questions 6, 7)
  {
    id: 6,
    text: "Does your website have location-specific landing pages for each target area you serve?",
    category: "keywords",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },
  {
    id: 7,
    text: "Have you submitted your website to local online directories with accurate NAP (Name, Address, Phone) information?",
    category: "keywords",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },

  // Website Audit Category (Questions 8-13)
  {
    id: 8,
    text: "Does your website have an XML sitemap?",
    category: "website",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },
  {
    id: 9,
    text: "Is your website mobile-friendly and responsive?",
    category: "website",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },
  {
    id: 10,
    text: "Is your website loading quickly, under 3 seconds? (According to Core Web Vitals)",
    category: "website",
    options: ["yes", "no", "maybe"],
    points: { yes: 10, no: 0, maybe: 5 }
  },
  {
    id: 11,
    text: "Is your website content unique, well-written, and relevant to your target audience?",
    category: "website",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },
  {
    id: 12,
    text: "Do you have a well-structured navigation menu that makes it easy for visitors to find information on your website?",
    category: "website",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },
  {
    id: 13,
    text: "Is your website free from broken links and error pages?",
    category: "website",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },

  // GMB Question 14
  {
    id: 14,
    text: "Does your GMB listing include a comprehensive list of services or products you offer?",
    category: "gmb",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },

  // Local Keywords Category (Questions 15-17)
  {
    id: 15,
    text: "Do you actively collect reviews for your business?",
    category: "keywords",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },
  {
    id: 16,
    text: "Are you ranking in the top 3 for the keywords you want to?",
    category: "keywords",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },
  {
    id: 17,
    text: "Are you getting new enquiries from your website?",
    category: "keywords",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },

  // Website Audit Category (Questions 18-22)
  {
    id: 18,
    text: "Do you have a lead magnet on your website to get prospects to opt in to your mailing list?",
    category: "website",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },
  {
    id: 19,
    text: "Do you understand your customer pain points and clearly demonstrate these in your content and show how you can solve them?",
    category: "website",
    options: ["yes", "no", "maybe"],
    points: { yes: 10, no: 0, maybe: 5 }
  },
  {
    id: 20,
    text: "Have you set up Google Analytics and Google Search Console and use the data to help inform your marketing strategy?",
    category: "website",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },
  {
    id: 21,
    text: "Do you regularly update your website with fresh content?",
    category: "website",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
  },
  {
    id: 22,
    text: "Are customer testimonials and case studies prominently featured on your site?",
    category: "website",
    options: ["yes", "no"],
    points: { yes: 10, no: 0 }
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
  return getQuestionsByCategory(category).length * 10;
}
