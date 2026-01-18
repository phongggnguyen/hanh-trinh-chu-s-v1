import React from 'react';
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizFeedbackProps {
    /** Đã trả lời đúng không */
    isCorrect: boolean;

    /** Đáp án đúng (hiển thị khi sai) */
    correctAnswer?: string;
}

/**
 * Component hiển thị feedback sau khi trả lời với animations
 */
export function QuizFeedback({ isCorrect, correctAnswer }: QuizFeedbackProps) {
    return (
        <div
            className={cn(
                'p-6 rounded-2xl text-center font-heading animate-bounce-in',
                'glass-premium border-2 shadow-glass-lg',
                isCorrect
                    ? 'bg-gradient-to-r from-success/20 to-success/10 border-success shadow-success-glow'
                    : 'bg-gradient-to-r from-destructive/20 to-destructive/10 border-destructive shadow-glow-sm'
            )}
            role="alert"
            aria-live="polite"
        >
            {isCorrect ? (
                <div className="space-y-2">
                    <div className="flex items-center justify-center gap-3">
                        <CheckCircle2 className="w-8 h-8 text-success animate-bounce-in" />
                        <span className="text-2xl font-bold text-success">Chính xác!</span>
                        <Sparkles className="w-6 h-6 text-warning animate-sparkle" />
                    </div>
                    <p className="text-sm font-body text-foreground/70">
                        Tuyệt vời! Bạn đã trả lời đúng 🎉
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3">
                        <XCircle className="w-8 h-8 text-destructive animate-wiggle" />
                        <span className="text-2xl font-bold text-destructive">Sai rồi!</span>
                    </div>
                    {correctAnswer && (
                        <div className="p-4 rounded-xl bg-success/10 border border-success/30">
                            <p className="text-sm font-body text-foreground/70 mb-1">
                                Đáp án đúng là:
                            </p>
                            <p className="text-base font-semibold text-success flex items-center justify-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                {correctAnswer}
                            </p>
                        </div>
                    )}
                    <p className="text-xs font-body text-foreground/60">
                        Đừng lo! Hãy tiếp tục cố gắng 💪
                    </p>
                </div>
            )}
        </div>
    );
}
