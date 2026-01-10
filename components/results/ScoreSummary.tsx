'use client';

import { TotalScore } from '@/types';
import { getScoreColor, getScoreTitle } from '@/lib/scoring';

interface ScoreSummaryProps {
  score: TotalScore;
}

export default function ScoreSummary({ score }: ScoreSummaryProps) {
  const scoreColor = getScoreColor(score.level);
  const title = getScoreTitle(score.level);

  return (
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Your SEO Scorecard Results
      </h1>

      <div
        className="inline-block rounded-2xl px-12 py-8 my-6"
        style={{ backgroundColor: scoreColor }}
      >
        <span className="text-6xl md:text-7xl font-bold text-white">
          {score.percentage}%
        </span>
      </div>

      <p className="text-2xl font-semibold text-white mb-2">{title}</p>

      <p className="text-gray-300 max-w-xl mx-auto">
        {score.level === 'high' && (
          "Your business is leveraging many SEO best practices. Keep up the great work!"
        )}
        {score.level === 'medium' && (
          "You've made progress, but there's room for improvement to boost your visibility."
        )}
        {score.level === 'low' && (
          "There are significant opportunities to improve your online presence and capture more leads."
        )}
      </p>
    </div>
  );
}
