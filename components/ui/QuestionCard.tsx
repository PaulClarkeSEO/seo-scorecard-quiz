'use client';

import { AnswerOption } from '@/types';
import Button from './Button';

interface QuestionCardProps {
  questionNumber: number;
  question: string;
  options: AnswerOption[];
  onAnswer: (answer: AnswerOption) => void;
  onBack?: () => void;
  showBack: boolean;
  selectedAnswer?: AnswerOption;
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
  const optionLabels: Record<AnswerOption, string> = {
    yes: 'Yes',
    no: 'No',
    maybe: 'Not Sure'
  };

  return (
    <div className="max-w-2xl mx-auto">
      {showBack && (
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
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

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="mb-6">
          <span className="text-sm font-semibold text-primary">
            Question {questionNumber}
          </span>
        </div>

        <h2 className="text-xl md:text-2xl font-semibold text-base mb-8 leading-relaxed">
          {question}
        </h2>

        <div className="flex flex-wrap gap-4">
          {options.map((option) => (
            <Button
              key={option}
              onClick={() => onAnswer(option)}
              variant={selectedAnswer === option ? 'secondary' : 'primary'}
              size="lg"
              className="min-w-[140px] capitalize"
              disabled={isSubmitting}
            >
              {optionLabels[option]}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
