'use client';

import React, { useState } from 'react';
import { Province } from '@/lib/types';
import { VietnamMap } from './vietnam-map';
import { QuizView } from './quiz-view';
import { QuizCompletionModal } from './quiz-completion-modal';
import { TravelJournal } from './travel-journal';
import { useGame } from '@/contexts/game-context';
import { Map } from 'lucide-react';

export function GameBoard() {
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    province: Province;
    success: boolean;
    score: number;
  } | null>(null);
  const { state, dispatch } = useGame();

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
      dispatch({
        type: 'CONQUER_PROVINCE',
        payload: {
          provinceId: province.id,
          neighbors: province.neighbors,
        },
      });

      // TODO: Add to journal (would require extending GameAction type)
      // For now, journal is managed separately in the context
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

  // Show map view by default
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Map className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Hành Trình Chữ S
                </h1>
                <p className="text-sm text-muted-foreground">
                  Khám phá 63 tỉnh thành Việt Nam
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TravelJournal />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="font-medium">{state.conquered.size}</span>
              <span className="text-muted-foreground">Đã chinh phục</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
              <span className="font-medium">{state.unlocked.size}</span>
              <span className="text-muted-foreground">Có thể chơi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <span className="font-medium">
                {63 - state.unlocked.size}
              </span>
              <span className="text-muted-foreground">Đã khóa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <VietnamMap onProvinceSelect={handleProvinceSelect} />
        </div>

        {/* Instructions */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Click vào các tỉnh màu xanh để bắt đầu quiz. Trả lời đúng ≥4/5 câu để
            chinh phục và mở khóa các tỉnh lân cận.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>
            Hành Trình Chữ S • Khám phá Việt Nam qua những câu quiz thú vị
          </p>
        </div>
      </footer>
    </div>
  );
}
