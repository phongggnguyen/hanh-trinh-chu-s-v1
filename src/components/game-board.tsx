'use client';

import React, { useState } from 'react';
import { Province } from '@/lib/types';
import { VietnamMap } from './vietnam-map';
import { QuizView } from './quiz-view';
import { QuizCompletionModal } from './quiz-completion-modal';
import { TravelJournal } from './travel-journal';
import { ProgressRing } from './ui/progress-ring';
import { BadgeIcon } from './ui/badge-icon';
import { useGame } from '@/contexts/game-context';
import { Map, Trophy, Unlock, Lock } from 'lucide-react';

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
            totalQuestions={5}
            success={quizResult.success}
            onContinue={handleContinue}
          />
        )}
      </>
    );
  }

  const conqueredCount = state.conquered.size;
  const unlockedCount = state.unlocked.size;
  const totalProvinces = 63;
  const progress = (conqueredCount / totalProvinces) * 100;

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

      {/* Floating Glassmorphism Header */}
      <header className="fixed top-4 left-4 right-4 z-40">
        <div className="max-w-7xl mx-auto glass-card rounded-2xl shadow-glass">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:scale-110 cursor-pointer">
                  <Map className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold font-heading gradient-text">
                    Hành Trình Chữ S
                  </h1>
                  <p className="text-sm text-muted-foreground font-body">
                    Khám phá 63 tỉnh thành Việt Nam
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TravelJournal />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="fixed top-24 left-4 right-4 z-30">
        <div className="max-w-7xl mx-auto glass-light rounded-xl shadow-glass border border-white/20">
          <div className="px-6 py-4">
            <div className="flex items-center justify-center gap-8">
              {/* Overall Progress */}
              <div className="flex items-center gap-4">
                <ProgressRing
                  value={conqueredCount}
                  max={totalProvinces}
                  size={60}
                  strokeWidth={6}
                  color="success"
                  showLabel={false}
                />
                <div>
                  <div className="text-lg font-bold font-heading">
                    {conqueredCount}/{totalProvinces}
                  </div>
                  <div className="text-xs text-muted-foreground font-body">
                    Tỉnh đã chinh phục
                  </div>
                </div>
              </div>

              <div className="h-12 w-px bg-border" />

              {/* Conquered */}
              <div className="flex items-center gap-3 hover-lift cursor-pointer">
                <BadgeIcon variant="conquered" size={48} animated={false} />
                <div>
                  <div className="text-lg font-bold font-heading text-success">
                    {conqueredCount}
                  </div>
                  <div className="text-xs text-muted-foreground font-body">
                    Đã chinh phục
                  </div>
                </div>
              </div>

              {/* Unlocked */}
              <div className="flex items-center gap-3 hover-lift cursor-pointer">
                <BadgeIcon variant="unlocked" size={48} animated showGlow />
                <div>
                  <div className="text-lg font-bold font-heading text-unlocked">
                    {unlockedCount}
                  </div>
                  <div className="text-xs text-muted-foreground font-body">
                    Có thể chơi
                  </div>
                </div>
              </div>

              {/* Locked */}
              <div className="flex items-center gap-3 hover-lift cursor-pointer">
                <BadgeIcon variant="locked" size={48} animated={false} />
                <div>
                  <div className="text-lg font-bold font-heading text-muted-foreground">
                    {totalProvinces - unlockedCount}
                  </div>
                  <div className="text-xs text-muted-foreground font-body">
                    Đã khóa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-48 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Map Card */}
          <div className="glass-card rounded-3xl shadow-glass p-8 hover:shadow-glow-sm transition-all duration-300 border border-white/20 animate-slide-in-up">
            <VietnamMap onProvinceSelect={handleProvinceSelect} />
          </div>

          {/* Instructions */}
          <div className="mt-8 text-center animate-slide-in-up" style={{ animationDelay: '200ms' }}>
            <div className="glass-light rounded-2xl p-6 inline-block border border-white/20">
              <p className="text-sm text-foreground/80 font-body max-w-2xl">
                <span className="font-semibold text-primary">🎯 Hướng dẫn:</span> Click vào các tỉnh màu xanh để bắt đầu quiz.
                Trả lời đúng <span className="font-bold text-success">≥4/5 câu</span> để chinh phục và mở khóa các tỉnh lân cận.
              </p>
            </div>
          </div>
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

