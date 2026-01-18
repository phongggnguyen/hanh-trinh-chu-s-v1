import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizFeedbackProps {
    /** Đã trả lời đúng không */
    isCorrect: boolean;

    /** Đáp án đúng (hiển thị khi sai) */
    correctAnswer?: string;
}

/**
 * Component hiển thị feedback sau khi trả lời câu hỏi
 * Màu xanh cho đúng, đỏ cho sai, kèm đáp án đúng nếu sai
 */
export function QuizFeedback({ isCorrect, correctAnswer }: QuizFeedbackProps) {
    return (
        <div
            className={cn(
                'p-6 rounded-2xl text-center font-heading font-semibold text-lg animate-bounce-in',
                'glass-card border-2',
                isCorrect
                    ? 'bg-success/10 border-success text-success'
                    : 'bg-destructive/10 border-destructive text-destructive'
            )}
            role="alert"
            aria-live="polite"
        >
            {isCorrect ? (
                <div className="flex items-center justify-center gap-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <span>Chính xác!</span>
                </div>
            ) : (
                <div>
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <XCircle className="w-6 h-6" />
                        <span>Sai rồi!</span>
                    </div>
                    {correctAnswer && (
                        <p className="text-sm font-body text-foreground/70">
                            Đáp án đúng:{' '}
                            <span className="font-bold text-success">{correctAnswer}</span>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
