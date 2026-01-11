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
    case 'gbp': return 'Google Business Profile';
    case 'visibility': return 'Local Visibility';
    case 'website': return 'Website Fundamentals';
    case 'ai': return 'AI & Future-Readiness';
    default: return category;
  }
}

export function getScoreTitle(level: ScoreLevel): string {
  switch (level) {
    case 'high': return 'Leading The Pack!';
    case 'medium': return 'Room for Growth';
    case 'low': return 'Time to Take Action';
    default: return 'Your Results';
  }
}
