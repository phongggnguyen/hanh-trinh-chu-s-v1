import React from 'react';
import { Province } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X, MapPin, Trophy, Target } from 'lucide-react';

interface QuizHeaderProps {
    /** Tỉnh đang quiz */
    province: Province;

    /** Câu hỏi hiện tại (1-indexed) */
    currentQuestion: number;

    /** Tổng số câu hỏi */
    totalQuestions: number;

    /** Số câu đã trả lời đúng */
    correctAnswers: number;

    /** Callback khi click nút thoát */
    onExit: () => void;
}

/**
 * Header component cho Quiz view với premium styling
 */
export function QuizHeader({
    province,
    currentQuestion,
    totalQuestions,
    correctAnswers,
    onExit,
}: QuizHeaderProps) {
    const progress = (currentQuestion / totalQuestions) * 100;
    const accuracy = currentQuestion > 1 ? Math.round((correctAnswers / (currentQuestion - 1)) * 100) : 0;

    return (
        <header className="fixed top-4 left-4 right-4 z-40">
            <div className="max-w-4xl mx-auto glass-premium rounded-2xl shadow-glass-lg border border-white/30">
                <div className="px-4 md:px-6 py-4 flex items-center justify-between gap-4">
                    {/* Province info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-glow-sm">
                            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                            <h1 className="text-lg md:text-2xl font-bold font-heading gradient-text-animated truncate">
                                {province.name}
                            </h1>
                            <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm text-muted-foreground font-body flex-wrap">
                                <div className="flex items-center gap-1.5">
                                    <Target className="w-3 h-3 md:w-4 md:h-4" />
                                    <span>Câu {currentQuestion}/{totalQuestions}</span>
                                </div>
                                <span className="hidden md:inline">•</span>
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-success/10">
                                    <Trophy className="w-3 h-3 md:w-4 md:h-4 text-success" />
                                    <span className="text-success font-semibold">{correctAnswers} đúng</span>
                                </div>
                                {currentQuestion > 1 && (
                                    <>
                                        <span className="hidden md:inline">•</span>
                                        <span className="text-foreground/60">{accuracy}% chính xác</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Exit button */}
                    <Button
                        variant="outline"
                        onClick={onExit}
                        size="icon"
                        className="glass-light border border-white/30 hover-lift rounded-xl flex-shrink-0 hover:shadow-glow-sm"
                        aria-label="Thoát quiz"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Progress bar */}
                <div className="px-4 md:px-6 pb-3">
                    <Progress value={progress} className="h-2.5 shadow-inner" />
                </div>
            </div>
        </header>
    );
}
