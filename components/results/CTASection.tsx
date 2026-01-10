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
        Ready to Dominate Local Search?
      </h2>

      {score.level === 'high' ? (
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Your SEO foundation is strong! Let&apos;s explore advanced strategies
          to maintain your lead and discover new growth opportunities.
        </p>
      ) : (
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          Book a free 30-minute strategy session with our SEO experts.
          We&apos;ll review your results and share actionable tips to improve
          your rankings and generate more leads.
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
          No pressure, no obligation - just actionable insights you can use
          whether you work with us or not.
        </p>
      </div>
    </div>
  );
}
