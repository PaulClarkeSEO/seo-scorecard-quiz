'use client';

import { CategoryScore } from '@/types';
import { getCategoryName, getScoreColor } from '@/lib/scoring';

interface CategoryBreakdownProps {
  categories: CategoryScore[];
}

export default function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'gbp':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      case 'visibility':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        );
      case 'website':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'ai':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getFeedback = (cat: CategoryScore) => {
    if (cat.level === 'high') {
      switch (cat.category) {
        case 'gbp': return 'Excellent work! Your Google Business Profile is well-optimised.';
        case 'visibility': return 'Great job! Your local visibility strategy is on point.';
        case 'website': return 'Fantastic! Your website fundamentals are solid.';
        case 'ai': return 'Impressive! You\'re ahead of the curve with AI readiness.';
      }
    } else if (cat.level === 'medium') {
      switch (cat.category) {
        case 'gbp': return 'Good progress, but there are opportunities to strengthen your profile.';
        case 'visibility': return 'You have a foundation, but your local visibility needs work.';
        case 'website': return 'Your website has potential, but several areas need attention.';
        case 'ai': return 'You\'re getting started with AI, but there\'s room to grow.';
      }
    } else {
      switch (cat.category) {
        case 'gbp': return 'Your Google Business Profile needs significant attention to compete locally.';
        case 'visibility': return 'Your local visibility is minimal - this is a priority area.';
        case 'website': return 'Your website requires substantial improvements for better performance.';
        case 'ai': return 'AI is reshaping search - it\'s time to start preparing.';
      }
    }
    return '';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-base mb-6 pb-4 border-b-2 border-primary">
        Category Breakdown
      </h2>

      <div className="space-y-6">
        {categories.map((cat) => {
          const color = getScoreColor(cat.level);
          return (
            <div
              key={cat.category}
              className="border-l-4 rounded-lg p-6 bg-gray-50"
              style={{ borderLeftColor: color }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <span style={{ color }}>{getCategoryIcon(cat.category)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-base">
                    {getCategoryName(cat.category)}
                  </h3>
                </div>
                <div className="text-right">
                  <span
                    className="text-3xl font-bold"
                    style={{ color }}
                  >
                    {cat.percentage}%
                  </span>
                  <span
                    className="block text-sm font-medium uppercase"
                    style={{ color }}
                  >
                    {cat.level}
                  </span>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${cat.percentage}%`,
                    backgroundColor: color
                  }}
                />
              </div>

              <p className="text-gray-600 text-sm">
                {getFeedback(cat)}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                Score: {cat.score} / {cat.maxScore} points
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
