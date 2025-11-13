'use client';

import React, { useState, useEffect } from 'react';
import { Province, QuizQuestion, PowerUp } from '@/lib/types';
import { getQuizForProvince } from '@/actions/quiz.actions';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Zap, Split } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizViewProps {
  province: Province;
  onComplete: (province: Province, success: boolean, score: number) => void;
  onExit: () => void;
}

export function QuizView({ province, onComplete, onExit }: QuizViewProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [powerUps, setPowerUps] = useState<PowerUp>({
    fiftyFifty: false,
    timeExtension: false,
  });
  const [hiddenOptions, setHiddenOptions] = useState<Set<string>>(new Set());

  // Load questions
  useEffect(() => {
    async function loadQuiz() {
      try {
        setLoading(true);
        const quiz = await getQuizForProvince(province.name);
        setQuestions(quiz);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load quiz:', err);
        setError('Không thể tải câu hỏi. Vui lòng thử lại.');
        setLoading(false);
      }
    }
    loadQuiz();
  }, [province.name]);

  // Timer countdown
  useEffect(() => {
    if (loading || isAnswered || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up - auto-submit with no answer
          handleAnswer(null);
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, isAnswered, currentQuestionIndex, questions.length]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (answer: string | null) => {
    if (isAnswered) return;

    setIsAnswered(true);
    setSelectedAnswer(answer);

    // Check if correct
    if (answer === currentQuestion.correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }

    // Move to next question after 2 seconds
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
        setTimeLeft(30);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setHiddenOptions(new Set());
      } else {
        // Quiz complete
        const finalScore = answer === currentQuestion.correctAnswer ? correctAnswers + 1 : correctAnswers;
        const success = finalScore >= 4;
        onComplete(province, success, finalScore);
      }
    }, 2000);
  };

  const handleFiftyFifty = () => {
    if (powerUps.fiftyFifty || isAnswered) return;

    setPowerUps({ ...powerUps, fiftyFifty: true });

    // Hide 2 wrong answers
    const wrongOptions = currentQuestion.options.filter(
      (opt) => opt !== currentQuestion.correctAnswer
    );
    const toHide = wrongOptions.slice(0, 2);
    setHiddenOptions(new Set(toHide));
  };

  const handleTimeExtension = () => {
    if (powerUps.timeExtension || isAnswered) return;

    setPowerUps({ ...powerUps, timeExtension: true });
    setTimeLeft((prev) => prev + 15);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Đang tải câu hỏi...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Lỗi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{error}</p>
            <Button onClick={onExit}>Quay lại</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) return null;

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{province.name}</h1>
          <Button variant="outline" onClick={onExit}>
            Thoát
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>
              Câu hỏi {currentQuestionIndex + 1}/{questions.length}
            </span>
            <span>Đúng: {correctAnswers}</span>
          </div>
          <Progress value={progress} />
        </div>

        {/* Timer & Power-ups */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className={cn('text-xl font-bold', timeLeft <= 10 && 'text-destructive')}>
              {timeLeft}s
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleFiftyFifty}
            disabled={powerUps.fiftyFifty || isAnswered}
          >
            <Split className="w-4 h-4 mr-2" />
            50/50
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleTimeExtension}
            disabled={powerUps.timeExtension || isAnswered}
          >
            <Zap className="w-4 h-4 mr-2" />
            +15s
          </Button>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            {currentQuestion.imageUrl && (
              <img
                src={currentQuestion.imageUrl}
                alt="Question illustration"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}

            <div className="grid gap-3">
              {currentQuestion.options.map((option, index) => {
                const isHidden = hiddenOptions.has(option);
                const isSelected = selectedAnswer === option;
                const isCorrect = option === currentQuestion.correctAnswer;
                const showResult = isAnswered;

                return (
                  <Button
                    key={index}
                    variant="outline"
                    className={cn(
                      'h-auto py-4 px-6 text-left justify-start whitespace-normal',
                      isHidden && 'opacity-30 pointer-events-none',
                      showResult && isCorrect && 'bg-green-100 border-green-500',
                      showResult && isSelected && !isCorrect && 'bg-red-100 border-red-500'
                    )}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered || isHidden}
                  >
                    <span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        {isAnswered && (
          <div
            className={cn(
              'p-4 rounded-lg text-center font-semibold',
              selectedAnswer === currentQuestion.correctAnswer
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            )}
            role="alert"
            aria-live="polite"
          >
            {selectedAnswer === currentQuestion.correctAnswer
              ? '✓ Chính xác!'
              : `✗ Sai rồi! Đáp án đúng là: ${currentQuestion.correctAnswer}`}
          </div>
        )}
      </div>
    </div>
  );
}
