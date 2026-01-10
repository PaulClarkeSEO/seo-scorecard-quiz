'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import ScoreSummary from '@/components/results/ScoreSummary';
import CategoryBreakdown from '@/components/results/CategoryBreakdown';
import CTASection from '@/components/results/CTASection';
import ScoreChart from '@/components/ui/ScoreChart';
import { TotalScore } from '@/types';

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const [score, setScore] = useState<TotalScore | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get score from session storage first
    const storedScore = sessionStorage.getItem('scoreData');
    if (storedScore) {
      try {
        setScore(JSON.parse(storedScore));
        setIsLoading(false);
        return;
      } catch {
        console.error('Failed to parse stored score');
      }
    }

    // If no stored score, redirect to home
    // In a real app, you might fetch the score from the API here
    router.push('/');
  }, [router]);

  if (isLoading || !score) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">Loading your results...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <section className="bg-base py-16">
        <div className="container mx-auto px-4">
          <ScoreSummary score={score} />
        </div>
      </section>

      {/* Results Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Chart Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-base mb-6 text-center">
                Score Distribution
              </h2>
              <ScoreChart categories={score.categories} />
            </div>

            {/* Category Breakdown */}
            <CategoryBreakdown categories={score.categories} />

            {/* Insights Section */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-base mb-6 pb-4 border-b-2 border-primary">
                What This Means For Your Business
              </h2>

              {score.level === 'high' ? (
                <div className="space-y-4">
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                    <h3 className="font-semibold text-green-800 mb-2">Congratulations!</h3>
                    <p className="text-green-700">
                      Your business is leveraging many best practices in terms of Google My Business
                      utilisation, local SEO, and website optimisation. Your efforts are likely
                      translating into greater online visibility, more leads, and a strong competitive
                      edge in your local market.
                    </p>
                  </div>
                  <p className="text-gray-600">
                    However, the digital landscape is always evolving. To maintain your lead and
                    discover new growth opportunities, consider a strategy call with our specialists.
                  </p>
                </div>
              ) : score.level === 'medium' ? (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                    <h3 className="font-semibold text-yellow-800 mb-2">Room for Growth</h3>
                    <p className="text-yellow-700">
                      You&apos;ve made progress with your online presence, but there&apos;s significant room
                      for improvement. You&apos;re competing, but not yet dominating.
                    </p>
                  </div>
                  <p className="text-gray-600">
                    With some focused effort on the areas highlighted above, you could see substantial
                    improvements in your search visibility and lead generation.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <h3 className="font-semibold text-red-800 mb-2">Time for Action</h3>
                    <p className="text-red-700">
                      Your current score indicates that your business has significant untapped
                      potential online. The good news? This means there are plenty of opportunities
                      for quick wins.
                    </p>
                  </div>
                  <p className="text-gray-600">
                    Right now, your competitors who have optimised their online presence are capturing
                    leads that could be yours. But with the right strategy, you can turn this around.
                  </p>
                </div>
              )}
            </div>

            {/* Email Confirmation */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <svg className="w-12 h-12 text-blue-500 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="font-semibold text-blue-800 mb-2">Check Your Inbox!</h3>
              <p className="text-blue-700">
                We&apos;ve sent a detailed copy of this report to your email address for future reference.
              </p>
            </div>

            {/* CTA Section */}
            <CTASection score={score} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Black And White Boy. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
