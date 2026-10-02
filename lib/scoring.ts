import { Category, CategoryScore, TotalScore, ScoreLevel } from '@/types';
import { getCategoryMaxScore } from './questions';

export function calculateCategoryScores(responses: { category: Category; points: number }[]): CategoryScore[] {
  const categories: Category[] = ['gbp', 'visibility', 'website', 'ai'];

  const categoryTotals: Record<Category, { score: number; maxScore: number }> = {
    gbp: { score: 0, maxScore: getCategoryMaxScore('gbp') },           // 6 questions
    visibility: { score: 0, maxScore: getCategoryMaxScore('visibility') }, // 5 questions
    website: { score: 0, maxScore: getCategoryMaxScore('website') },   // 6 questions
    ai: { score: 0, maxScore: getCategoryMaxScore('ai') }              // 5 questions
  };

  responses.forEach(r => {
    if (categoryTotals[r.category]) {
      categoryTotals[r.category].score += r.points;
    }
  });

  return categories.map(category => {
    const { score, maxScore } = categoryTotals[category];
    const percentage = Math.round((score / maxScore) * 100);
    return {
      category,
      score,
      maxScore,
      percentage,
      level: getScoreLevel(percentage)
    };
  });
}

export function calculateTotalScore(categoryScores: CategoryScore[]): TotalScore {
  const total = categoryScores.reduce((sum, c) => sum + c.score, 0);
  const maxTotal = categoryScores.reduce((sum, c) => sum + c.maxScore, 0);
  const percentage = Math.round((total / maxTotal) * 100);

  return {
    total,
    maxTotal,
    percentage,
    level: getScoreLevel(percentage),
    categories: categoryScores
  };
}

export function getScoreLevel(percentage: number): ScoreLevel {
  if (percentage >= 70) return 'high';
  if (percentage >= 40) return 'medium';
  return 'low';
}

export function getScoreColor(level: ScoreLevel): string {
  switch (level) {
    case 'high': return '#22c55e';
    case 'medium': return '#f59e0b';
    case 'low': return '#ef4444';
    default: return '#07133d';
  }
}

export function getCategoryName(category: Category): string {
  switch (category) {
    case 'gbp': return 'Found By Buyers';
    case 'visibility': return 'AI Search Visibility';
    case 'website': return 'Website That Wins Enquiries';
    case 'ai': return 'Pipeline & ROI';
    default: return category;
  }
}

export function getCategoryFeedback(cat: CategoryScore): string {
  const feedback: Record<Category, Record<ScoreLevel, string>> = {
    gbp: {
      high: 'Buyers who search for what you do are finding you, and your pages give them reasons to trust you.',
      medium: 'Some buyers find you, but gaps in your service pages or proof mean others shortlist a competitor first.',
      low: 'Buyers searching for what you do are mostly finding your competitors. This is the first gap to close.'
    },
    visibility: {
      high: 'AI tools know who you are and describe you well. Few businesses your size are here yet.',
      medium: 'AI tools know some of your story, but not enough to recommend you with confidence.',
      low: 'AI tools are shortlisting suppliers for your buyers, and you are not on the list yet.'
    },
    website: {
      high: 'Your site is built to turn visits into enquiries, and you can see whether it works.',
      medium: 'Your site does a job, but you are likely losing enquiries you never see.',
      low: 'Your site is costing you enquiries. Visitors arrive, cannot find what they need, and leave.'
    },
    ai: {
      high: 'You know where your work comes from and what your marketing returns. That puts you ahead of most.',
      medium: 'You have some visibility of your pipeline, but not enough to know what to spend more on.',
      low: 'Your new business depends on too few sources, and you cannot see what your marketing returns.'
    }
  };
  return feedback[cat.category]?.[cat.level] ?? '';
}

export function getScoreTitle(level: ScoreLevel): string {
  switch (level) {
    case 'high': return 'Leading The Pack!';
    case 'medium': return 'Room for Growth';
    case 'low': return 'Time to Take Action';
    default: return 'Your Results';
  }
}
