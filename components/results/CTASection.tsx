'use client';

import Button from '@/components/ui/Button';
import { TotalScore } from '@/types';

interface CTASectionProps {
  score: TotalScore;
}

export default function CTASection({ score }: CTASectionProps) {
  return (
    <div className="bg-base rounded-xl p-8 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Want to know which gap to close first?
      </h2>

      {score.level === 'high' ? (
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          You&apos;re ahead of most. On a free 30-minute call we&apos;ll check where
          you stand in AI search and find your next gain.
        </p>
      ) : (
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Book a free 30-minute call with Paul. We&apos;ll go through your scorecard,
          check where you show up in Google and AI search, and give you 3 to 5
          fixes you can start on straight away.
        </p>
      )}

      <div className="flex justify-center">
        <a
          href="https://blackandwhiteboy.com/30-mins-meeting/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary" size="lg">
            Book Your Free Consultation
          </Button>
        </a>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-700">
        <p className="text-gray-400 text-sm">
          No pitch, no obligation. If your search is already in good shape,
          we&apos;ll tell you.
        </p>
      </div>
    </div>
  );
}
