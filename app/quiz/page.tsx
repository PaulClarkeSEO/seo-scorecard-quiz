'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/ui/ProgressBar';
import QuestionCard from '@/components/ui/QuestionCard';
import { sortedQuestions } from '@/lib/questions';
import { getCategoryName } from '@/lib/scoring';

export default function QuizPage() {
  const router = useRouter();
  const [leadId, setLeadId] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    // Get lead ID from session storage
    const storedLeadId = sessionStorage.getItem('leadId');
    if (!storedLeadId) {
      // Redirect to home if no lead ID
      router.push('/');
      return;
    }
    setLeadId(storedLeadId);
  }, [router]);

  const currentQuestion = sortedQuestions[currentIndex];
  const totalQuestions = sortedQuestions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleAnswer = async (answerValue: string) => {
    if (!leadId || isSubmitting) return;

    setIsSubmitting(true);

    const question = sortedQuestions[currentIndex];
    // Find the points for the selected answer
    const selectedOption = question.options.find(o => o.value === answerValue);
    const points = selectedOption?.points ?? 0;

    // Save answer to state
    setAnswers(prev => ({ ...prev, [question.id]: answerValue }));

    try {
      // Submit answer to API
      const response = await fetch('/api/submit-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId,
          questionId: question.id,
          answer: answerValue,
          points,
          category: question.category
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save answer');
      }

      if (isLastQuestion) {
        // Calculate final score
        setIsCalculating(true);
        const scoreResponse = await fetch('/api/calculate-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ leadId })
        });

        if (!scoreResponse.ok) {
          throw new Error('Failed to calculate score');
        }

        const scoreData = await scoreResponse.json();

        // Store score data and redirect to results
        sessionStorage.setItem('scoreData', JSON.stringify(scoreData.score));
        // Keep the calculating screen (and the submit lock) up until the results page
        // loads, so the last question can't be answered a second time and re-scored.
        router.push(`/results/${leadId}`);
        return;
      }

      // Move to next question
      setCurrentIndex(prev => prev + 1);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Something went wrong. Please try again.');
      setIsSubmitting(false);
      setIsCalculating(false);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0 && !isSubmitting) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (!leadId) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (isCalculating) {
    return (
      <div className="min-h-screen bg-base flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-white mb-2">Calculating Your Results</h2>
          <p className="text-gray-300">Please wait while we analyse your responses...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-base py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">SEO Scorecard Quiz</h1>
            <p className="text-gray-300">Answer honestly for the most accurate results</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <ProgressBar current={currentIndex + 1} total={totalQuestions} />
          </div>

          {/* Question Card */}
          <QuestionCard
            questionNumber={currentIndex + 1}
            question={currentQuestion.text}
            options={currentQuestion.options}
            onAnswer={handleAnswer}
            onBack={handleBack}
            showBack={currentIndex > 0}
            selectedAnswer={answers[currentQuestion.id]}
            isSubmitting={isSubmitting}
          />

          {/* Category indicator */}
          <div className="mt-8 text-center">
            <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20">
              Category: {currentQuestion.categoryLabel ?? getCategoryName(currentQuestion.category)}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
