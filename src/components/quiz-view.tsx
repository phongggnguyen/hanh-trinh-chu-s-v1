'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Province, QuizQuestion } from '@/lib/types';
import { getQuizForProvince } from '@/actions/quiz.actions';
import { QUIZ_CONFIG, TIMING, MESSAGES } from '@/lib/constants';
import { QuizHeader, QuizPowerUps, QuizQuestion as QuizQuestionCard, QuizOptions } from '@/components/quiz';
import { QuizFeedback } from './quiz/QuizFeedback';
import { ErrorDisplay } from '@/components/ui/error-display';

interface QuizViewProps {
  province: Province;
  onComplete: (province: Province, success: boolean, score: number) => void;
  onExit: () => void;
}

export function QuizView({ province, onComplete, onExit }: QuizViewProps) {
  // State
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(QUIZ_CONFIG.TIME_PER_QUESTION);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Power-ups state
  const [powerUpsUsed, setPowerUpsUsed] = useState({
    fiftyFifty: false,
    timeExtension: false,
  });
  const [hiddenOptions, setHiddenOptions] = useState<Set<string>>(new Set());

  // Load questions
  useEffect(() => {
    async function loadQuiz() {
      try {
        console.log('🔄 Loading quiz for province:', province.name);
        setLoading(true);
        setError(null);

        const quiz = await getQuizForProvince(province.name);

        console.log('✅ Quiz loaded successfully:', quiz);
        setQuestions(quiz);
        setLoading(false);
      } catch (err) {
        console.error('❌ Failed to load quiz:', err);
        setError(MESSAGES.ERRORS.QUIZ_GENERATION_FAILED);
        setLoading(false);
      }
    }
    loadQuiz();
  }, [province.name]);

  // Move handleAnswer outside useEffect and use useCallback
  const handleAnswer = useCallback((answer: string | null) => {
    if (isAnswered) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return;

    setIsAnswered(true);
    setSelectedAnswer(answer);

    if (answer === currentQuestion.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        // Next question
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimeLeft(QUIZ_CONFIG.TIME_PER_QUESTION);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setHiddenOptions(new Set());
      } else {
        // Quiz completed
        const finalScore = answer === currentQuestion.correctAnswer ? correctAnswers + 1 : correctAnswers;
        const success = finalScore >= QUIZ_CONFIG.PASSING_SCORE;
        onComplete(province, success, finalScore);
      }
    }, TIMING.ANSWER_FEEDBACK_DURATION);
  }, [isAnswered, questions, currentQuestionIndex, correctAnswers, province, onComplete]);

  // Timer countdown
  useEffect(() => {
    if (loading || isAnswered || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(null);
          return QUIZ_CONFIG.TIME_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, isAnswered, currentQuestionIndex, questions.length, handleAnswer]);

  const handleFiftyFifty = () => {
    if (powerUpsUsed.fiftyFifty || isAnswered) return;

    setPowerUpsUsed((prev) => ({ ...prev, fiftyFifty: true }));

    const currentQuestion = questions[currentQuestionIndex];
    const wrongOptions = currentQuestion.options.filter(
      (opt) => opt !== currentQuestion.correctAnswer
    );
    const toHide = wrongOptions.slice(0, 2);
    setHiddenOptions(new Set(toHide));
  };

  const handleTimeExtension = () => {
    if (powerUpsUsed.timeExtension || isAnswered) return;

    setPowerUpsUsed((prev) => ({ ...prev, timeExtension: true }));
    setTimeLeft((prev) => prev + 15);
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-6 text-lg font-heading text-muted-foreground">
            {MESSAGES.INFO.LOADING_QUIZ}
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ErrorDisplay
          title="Không thể tải câu hỏi"
          message={error}
          onRetry={() => window.location.reload()}
          onHome={onExit}
        />
      </div>
    );
  }

  if (!currentQuestion) return null;

  // Main quiz view
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Header */}
      <QuizHeader
        province={province}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        correctAnswers={correctAnswers}
        onExit={onExit}
      />

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Timer & Power-ups */}
          <QuizPowerUps
            timeLeft={timeLeft}
            maxTime={QUIZ_CONFIG.TIME_PER_QUESTION}
            fiftyFiftyUsed={powerUpsUsed.fiftyFifty}
            timeExtensionUsed={powerUpsUsed.timeExtension}
            isAnswered={isAnswered}
            onFiftyFifty={handleFiftyFifty}
            onTimeExtension={handleTimeExtension}
          />

          {/* Question Card */}
          <QuizQuestionCard question={currentQuestion} animationDelay={100} />

          {/* Options */}
          <div className="space-y-4">
            <QuizOptions
              options={currentQuestion.options}
              correctAnswer={currentQuestion.correctAnswer}
              selectedAnswer={selectedAnswer}
              hiddenOptions={hiddenOptions}
              isAnswered={isAnswered}
              onSelectAnswer={handleAnswer}
            />
          </div>

          {/* Feedback */}
          {isAnswered && (
            <QuizFeedback
              isCorrect={selectedAnswer === currentQuestion.correctAnswer}
              correctAnswer={selectedAnswer !== currentQuestion.correctAnswer ? currentQuestion.correctAnswer : undefined}
            />
          )}
        </div>
      </main>
    </div>
  );
}
