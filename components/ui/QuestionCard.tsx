'use client';

import { QuestionOption } from '@/types';
import Button from './Button';

interface QuestionCardProps {
  questionNumber: number;
  question: string;
  options: QuestionOption[];
  onAnswer: (answer: string) => void;
  onBack?: () => void;
  showBack: boolean;
  selectedAnswer?: string;
  isSubmitting?: boolean;
}

export default function QuestionCard({
  questionNumber,
  question,
  options,
  onAnswer,
  onBack,
  showBack,
  selectedAnswer,
  isSubmitting
}: QuestionCardProps) {
  return (
    <div className="max-w-2xl mx-auto">
      {showBack && (
        <button
          onClick={onBack}
          className="flex items-center text-gray-300 hover:text-primary mb-6 transition-colors"
          disabled={isSubmitting}
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          BACK
        </button>
      )}

      <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-8">
        <div className="mb-6">
          <span className="text-sm font-semibold text-primary">
            Question {questionNumber}
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-semibold text-white mb-8 leading-relaxed">
          {question}
        </h2>

        <div className="flex flex-wrap gap-4">
          {options.map((option) => (
            <Button
              key={option.value}
              onClick={() => onAnswer(option.value)}
              variant={selectedAnswer === option.value ? 'secondary' : 'primary'}
              size="lg"
              className="min-w-[140px]"
              disabled={isSubmitting}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
