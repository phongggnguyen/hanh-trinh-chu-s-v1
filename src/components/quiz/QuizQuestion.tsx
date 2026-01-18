import React from 'react';
import { QuizQuestion as QuizQuestionType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

interface QuizQuestionProps {
    /** Câu hỏi hiện tại */
    question: QuizQuestionType;

    /** Delay animation (ms) */
    animationDelay?: number;
}

/**
 * Component hiển thị câu hỏi và hình ảnh với premium styling
 */
export function QuizQuestion({
    question,
    animationDelay = 100
}: QuizQuestionProps) {
    return (
        <Card
            className="glass-premium border border-white/30 shadow-glass-lg animate-slide-in-up overflow-hidden"
            style={{ animationDelay: `${animationDelay}ms` }}
        >
            <CardHeader className="space-y-3">
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-glow-sm">
                        <HelpCircle className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-xl md:text-2xl font-bold font-heading text-foreground leading-tight flex-1">
                        {question.question}
                    </CardTitle>
                </div>
            </CardHeader>
            {question.imageUrl && (
                <CardContent className="pt-0">
                    <div className="relative overflow-hidden rounded-2xl group">
                        <img
                            src={question.imageUrl}
                            alt="Hình minh họa câu hỏi"
                            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </CardContent>
            )}
        </Card>
    );
}
