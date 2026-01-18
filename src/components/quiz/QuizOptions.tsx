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
 * Component hiển thị các lựa chọn trả lời với simple hover effects
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
                            'h-auto py-4 px-5 text-left justify-start whitespace-normal font-body text-base transition-colors duration-200',
                            'bg-card border-2 border-border rounded-xl shadow-sm',
                            // Hover states - simple, không animation phức tạp
                            !isHidden && !isAnswered && 'hover:border-primary/50 hover:bg-primary/5 cursor-pointer',
                            isHidden && 'opacity-30 pointer-events-none',
                            // Result states
                            showResult && isCorrect && 'bg-success/10 border-success text-foreground',
                            showResult && isSelected && !isCorrect && 'bg-destructive/10 border-destructive text-foreground'
                        )}
                        onClick={() => onSelectAnswer(option)}
                        disabled={isAnswered || isHidden}
                    >
                        {/* Answer label */}
                        <span className={cn(
                            "font-bold mr-3 text-base w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                            !showResult && "bg-primary text-white",
                            showResult && isCorrect && "bg-success text-white",
                            showResult && isSelected && !isCorrect && "bg-destructive text-white"
                        )}>
                            {String.fromCharCode(65 + index)}
                        </span>

                        {/* Answer text - đảm bảo luôn đọc được */}
                        <span className={cn(
                            "flex-1 text-foreground",
                            showResult && isCorrect && "font-semibold text-success",
                            showResult && isSelected && !isCorrect && "text-destructive"
                        )}>
                            {option}
                        </span>

                        {/* Result icons */}
                        {showResult && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 ml-3 text-success flex-shrink-0" />
                        )}
                        {showResult && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 ml-3 text-destructive flex-shrink-0" />
                        )}
                    </Button>
                );
            })}
        </div>
    );
}
