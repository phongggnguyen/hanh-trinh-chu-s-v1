import React from 'react';
import { Province } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X } from 'lucide-react';

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
 * Header component cho Quiz view
 * Hiển thị: tên tỉnh, tiến độ câu hỏi, số câu đúng, nút thoát
 */
export function QuizHeader({
    province,
    currentQuestion,
    totalQuestions,
    correctAnswers,
    onExit,
}: QuizHeaderProps) {
    const progress = (currentQuestion / totalQuestions) * 100;

    return (
        <header className="fixed top-4 left-4 right-4 z-40">
            <div className="max-w-4xl mx-auto glass-card rounded-2xl shadow-glass border border-white/20">
                <div className="px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold font-heading gradient-text">
                            {province.name}
                        </h1>
                        <p className="text-sm text-muted-foreground font-body">
                            Câu {currentQuestion}/{totalQuestions} • Đúng: {correctAnswers}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={onExit}
                        size="icon"
                        className="hover-lift"
                        aria-label="Thoát quiz"
                    >
                        <X className="w-5 h-5" />
                    </Button>
                </div>
                <div className="px-2 pb-2">
                    <Progress value={progress} className="h-2" />
                </div>
            </div>
        </header>
    );
}
