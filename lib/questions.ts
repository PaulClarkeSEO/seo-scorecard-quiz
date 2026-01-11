import { Question, Category } from '@/types';

export type { Category };

export const questions: Question[] = [
  // Category 1: Google Business Profile (6 questions)
  {
    id: 1,
    text: "Do you have a verified Google Business Profile?",
    category: "gbp",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 2,
    text: "How complete is your Google Business Profile?",
    category: "gbp",
    options: [
      { label: "Fully complete with photos, hours, and services", value: "full", points: 10 },
      { label: "Partially complete", value: "partial", points: 5 },
      { label: "Just the basics", value: "basic", points: 2 },
      { label: "Not sure", value: "unsure", points: 0 }
    ]
  },
  {
    id: 3,
    text: "How often do you post updates to your Google Business Profile?",
    category: "gbp",
    options: [
      { label: "Weekly", value: "weekly", points: 10 },
      { label: "Monthly", value: "monthly", points: 6 },
      { label: "Rarely", value: "rarely", points: 2 },
      { label: "Never", value: "never", points: 0 }
    ]
  },
  {
    id: 4,
    text: "Do you actively respond to Google reviews?",
    category: "gbp",
    options: [
      { label: "Within 24 hours", value: "24h", points: 10 },
      { label: "Within a week", value: "week", points: 6 },
      { label: "Sometimes", value: "sometimes", points: 3 },
      { label: "Never", value: "never", points: 0 }
    ]
  },
  {
    id: 5,
    text: "Have you added products or services to your Google Business Profile?",
    category: "gbp",
    options: [
      { label: "Yes, all of them", value: "all", points: 10 },
      { label: "Some", value: "some", points: 5 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 6,
    text: "Do you use Google Business messaging?",
    category: "gbp",
    options: [
      { label: "Yes, actively", value: "active", points: 10 },
      { label: "Set up but rarely use", value: "rarely", points: 4 },
      { label: "No", value: "no", points: 0 }
    ]
  },

  // Category 2: Local Visibility (5 questions)
  {
    id: 7,
    text: "When someone searches for your service near them, where do you typically appear?",
    category: "visibility",
    options: [
      { label: "Top 3 results", value: "top3", points: 10 },
      { label: "First page", value: "page1", points: 6 },
      { label: "Second page or later", value: "page2plus", points: 2 },
      { label: "Don't know", value: "unknown", points: 0 }
    ]
  },
  {
    id: 8,
    text: "Are you listed on other directories (Yelp, Bing Places, Apple Maps)?",
    category: "visibility",
    options: [
      { label: "Yes, all major ones", value: "all", points: 10 },
      { label: "A few", value: "some", points: 5 },
      { label: "Just Google", value: "google_only", points: 2 },
      { label: "None", value: "none", points: 0 }
    ]
  },
  {
    id: 9,
    text: "Is your business name, address, and phone number consistent across all listings?",
    category: "visibility",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Mostly", value: "mostly", points: 5 },
      { label: "Not sure", value: "unsure", points: 2 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 10,
    text: "Do you have location-specific pages for each area you serve?",
    category: "visibility",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Some", value: "some", points: 5 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 11,
    text: "Do you track your local search rankings?",
    category: "visibility",
    options: [
      { label: "Yes, regularly", value: "regularly", points: 10 },
      { label: "Occasionally", value: "occasionally", points: 5 },
      { label: "No", value: "no", points: 0 }
    ]
  },

  // Category 3: Website Fundamentals (6 questions)
  {
    id: 12,
    text: "Does your website load in under 3 seconds on mobile?",
    category: "website",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Not sure", value: "unsure", points: 3 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 13,
    text: "Does your website have a clear call-to-action on every page?",
    category: "website",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Some pages", value: "some", points: 5 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 14,
    text: "Do you have customer testimonials or reviews on your website?",
    category: "website",
    options: [
      { label: "Yes, prominently displayed", value: "prominent", points: 10 },
      { label: "Yes, but hidden away", value: "hidden", points: 4 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 15,
    text: "Does your website have dedicated service pages for each offering?",
    category: "website",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Some", value: "some", points: 5 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 16,
    text: "Is your contact information visible on every page?",
    category: "website",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Just on the contact page", value: "contact_only", points: 3 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 17,
    text: "Do you have a blog or content section?",
    category: "website",
    options: [
      { label: "Yes, updated regularly", value: "regular", points: 10 },
      { label: "Yes, but rarely updated", value: "rarely", points: 4 },
      { label: "No", value: "no", points: 0 }
    ]
  },

  // Category 4: AI & Future-Readiness (5 questions)
  {
    id: 18,
    text: "Are you using AI tools to help create content for your business?",
    category: "ai",
    options: [
      { label: "Yes, regularly", value: "regularly", points: 10 },
      { label: "Experimenting", value: "experimenting", points: 5 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 19,
    text: "Does your website have an AI chatbot or automated chat?",
    category: "ai",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Planning to", value: "planning", points: 3 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 20,
    text: "Are AI search engines (like ChatGPT, Perplexity, Google AI) recommending your brand?",
    category: "ai",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Sometimes", value: "sometimes", points: 6 },
      { label: "Not sure", value: "unsure", points: 2 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 21,
    text: "Is your business information structured for AI assistants (like Siri, Alexa, Google Assistant)?",
    category: "ai",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Partially", value: "partial", points: 5 },
      { label: "Not sure", value: "unsure", points: 2 },
      { label: "No", value: "no", points: 0 }
    ]
  },
  {
    id: 22,
    text: "Do you have FAQ content that could be picked up by AI search results?",
    category: "ai",
    options: [
      { label: "Yes", value: "yes", points: 10 },
      { label: "Some", value: "some", points: 5 },
      { label: "No", value: "no", points: 0 }
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
