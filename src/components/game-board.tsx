'use client';

import React, { useState } from 'react';
import { Province } from '@/lib/types';
import { VietnamMap } from './vietnam-map';
import { QuizView } from './quiz-view';
import { QuizCompletionModal } from './quiz-completion-modal';
import { useGame } from '@/contexts/game-context';
import { GameHeader, GameStats, GameInstructions } from '@/components/game';
import { QUIZ_CONFIG } from '@/lib/constants';

export function GameBoard() {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    province: Province;
    success: boolean;
    score: number;
  } | null>(null);
  const { state, conquerProvince } = useGame();

  const handleProvinceSelect = (province: Province) => {
    setSelectedProvince(province);
  };

  const handleQuizComplete = (
    province: Province,
    success: boolean,
    score: number
  ) => {
    setQuizResult({ province, success, score });

    // If successful, conquer the province and unlock neighbors
    if (success) {
      conquerProvince(province.id, province.name, province.neighbors, score);
    }

    // Show completion modal
    setShowCompletionModal(true);
  };

  const handleQuizExit = () => {
    setSelectedProvince(null);
  };

  const handleContinue = () => {
    setShowCompletionModal(false);
    setSelectedProvince(null);
    setQuizResult(null);
  };

  // Show quiz view if a province is selected
  if (selectedProvince) {
    return (
      <>
        <QuizView
          province={selectedProvince}
          onComplete={handleQuizComplete}
          onExit={handleQuizExit}
        />
        {quizResult && (
          <QuizCompletionModal
            open={showCompletionModal}
            province={quizResult.province}
            score={quizResult.score}
            totalQuestions={QUIZ_CONFIG.QUESTIONS_PER_QUIZ}
            success={quizResult.success}
            onContinue={handleContinue}
          />
        )}
      </>
    );
  }

  const conqueredCount = state.conquered.size;
  const unlockedCount = state.unlocked.size;

  // Show map view by default
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50 animate-gradient-shift" />

      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-success/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header */}
      <GameHeader />

      {/* Stats Bar */}
      <GameStats conqueredCount={conqueredCount} unlockedCount={unlockedCount} />

      {/* Main Content */}
      <main className="relative z-10 pt-48 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Map Card */}
          <div className="glass-card rounded-3xl shadow-glass p-8 hover:shadow-glow-sm transition-all duration-300 border border-white/20 animate-slide-in-up">
            <VietnamMap onProvinceSelect={handleProvinceSelect} />
          </div>

          {/* Instructions */}
          <GameInstructions />
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-20 py-4 bg-gradient-to-t from-white/80 to-transparent backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground font-body">
            Hành Trình Chữ S •
            <span className="mx-2">🇻🇳</span>
            Khám phá Việt Nam qua những câu quiz thú vị
          </p>
        </div>
      </footer>
    </div>
  );
}
