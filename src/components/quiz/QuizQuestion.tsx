import React from 'react';
import { QuizQuestion as QuizQuestionType } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizQuestionProps {
    /** Câu hỏi hiện tại */
    question: QuizQuestionType;

    /** Delay animation (ms) */
    animationDelay?: number;
}

/**
 * Component hiển thị câu hỏi và hình ảnh minh họa
 */
export function QuizQuestion({
    question,
    animationDelay = 100
}: QuizQuestionProps) {
    return (
        <Card
            className="bg-card/95 backdrop-blur-sm border-2 border-primary/10 shadow-lg animate-slide-in-up"
            style={{ animationDelay: `${animationDelay}ms` }}
        >
            <CardHeader>
                <CardTitle className="text-2xl font-bold font-heading text-primary leading-tight">
                    {question.question}
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {question.imageUrl && (
                    <img
                        src={question.imageUrl}
                        alt="Hình minh họa câu hỏi"
                        className="w-full h-56 object-cover rounded-xl hover:scale-105 transition-transform duration-300 shadow-md"
                    />
                )}
            </CardContent>
        </Card>
    );
}
