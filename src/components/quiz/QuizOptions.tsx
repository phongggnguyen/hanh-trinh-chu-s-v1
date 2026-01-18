import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizOptionsProps {
    /** Danh sách các lựa chọn */
    options: string[];

    /** Đáp án đúng */
    correctAnswer: string;

    /** Đáp án đã chọn (null nếu chưa chọn) */
    selectedAnswer: string | null;

    /** Các option bị ẩn (do 50/50) */
    hiddenOptions: Set<string>;

    /** Quiz đã được trả lời chưa */
    isAnswered: boolean;

    /** Callback khi chọn đáp án */
    onSelectAnswer: (answer: string) => void;
}

/**
 * Component hiển thị các lựa chọn trả lời
 * Xử lý hiển thị kết quả đúng/sai, ẩn options do 50/50
 */
export function QuizOptions({
    options,
    correctAnswer,
    selectedAnswer,
    hiddenOptions,
    isAnswered,
    onSelectAnswer,
}: QuizOptionsProps) {
    return (
        <div className="grid gap-3">
            {options.map((option, index) => {
                const isHidden = hiddenOptions.has(option);
                const isSelected = selectedAnswer === option;
                const isCorrect = option === correctAnswer;
                const showResult = isAnswered;

                return (
                    <Button
                        key={index}
                        variant="ghost"
                        className={cn(
                            'h-auto py-4 px-6 text-left justify-start whitespace-normal font-body text-base transition-all duration-300',
                            'bg-card border-2 border-primary/10 hover:border-primary/50 shadow-sm hover:shadow-md hover:-translate-y-1',
                            isHidden && 'opacity-20 pointer-events-none grayscale',
                            showResult && isCorrect && 'bg-success/10 border-success text-success shadow-[0_0_15px_rgba(46,204,113,0.3)]',
                            showResult && isSelected && !isCorrect && 'bg-destructive/10 border-destructive text-destructive shadow-[0_0_15px_rgba(192,57,43,0.3)]'
                        )}
                        onClick={() => onSelectAnswer(option)}
                        disabled={isAnswered || isHidden}
                    >
                        <span className="font-bold mr-3 text-primary">
                            {String.fromCharCode(65 + index)}.
                        </span>
                        <span>{option}</span>
                        {showResult && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 ml-auto text-success" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 ml-auto text-destructive" />
                        )}
                    </Button>
                );
            })}
        </div>
    );
}
