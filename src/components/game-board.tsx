'use client';

import React, { useState } from 'react';
import { Province } from '@/lib/types';
import { VietnamMap } from './vietnam-map';
import { QuizView } from './quiz-view';
import { QuizCompletionModal } from './quiz-completion-modal';
import { useGame } from '@/contexts/game-context';
import { GameHeader, GameStats, GameInstructions } from '@/components/game';
import { QUIZ_CONFIG } from '@/lib/constants';
import { MapPin } from 'lucide-react';

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
      {/* Header */}
      <GameHeader />

      {/* Stats Bar */}
      <GameStats conqueredCount={conqueredCount} unlockedCount={unlockedCount} />

      {/* Main Content */}
      <main className="relative z-10 pt-48 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Banner - Simple version */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border text-sm font-body text-primary shadow-sm">
              <MapPin className="w-4 h-4" />
              <span>Khám phá dải đất hình chữ S</span>
            </div>
          </div>

          {/* Map Card - Simpler styling */}
          <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8 border border-border">
            <VietnamMap onProvinceSelect={handleProvinceSelect} />
          </div>

          {/* Instructions */}
          <GameInstructions />
        </div>
      </main>

      {/* Footer - Simpler */}
      <footer className="fixed bottom-0 left-0 right-0 z-20">
        <div className="bg-gradient-to-t from-background via-background/95 to-transparent pt-6 pb-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-card rounded-xl px-5 py-3 flex items-center justify-between border border-border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-base">S</span>
                </div>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">Hành Trình Chữ S</p>
                  <p className="text-xs text-muted-foreground font-body">Khám phá Việt Nam qua quiz</p>
                </div>
              </div>
              <span className="text-xl">🇻🇳</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
