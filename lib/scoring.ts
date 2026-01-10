import { Category, CategoryScore, TotalScore, ScoreLevel } from '@/types';

export function calculateCategoryScores(responses: { category: Category; points: number }[]): CategoryScore[] {
  const categoryTotals: Record<Category, { score: number; maxScore: number }> = {
    gmb: { score: 0, maxScore: 60 },      // 6 questions × 10 points
    keywords: { score: 0, maxScore: 50 }, // 5 questions × 10 points
    website: { score: 0, maxScore: 110 }  // 11 questions × 10 points
  };

  responses.forEach(r => {
    if (categoryTotals[r.category]) {
      categoryTotals[r.category].score += r.points;
    }
  });

  return Object.entries(categoryTotals).map(([category, { score, maxScore }]) => {
    const percentage = Math.round((score / maxScore) * 100);
    return {
      category: category as Category,
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
    case 'gmb': return 'Google My Business';
    case 'keywords': return 'Local Keywords';
    case 'website': return 'Website Audit';
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
