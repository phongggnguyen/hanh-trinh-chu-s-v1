'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressRingProps {
    value: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
    className?: string;
    showLabel?: boolean;
    color?: 'primary' | 'success' | 'warning' | 'secondary';
    children?: React.ReactNode;
}

export function ProgressRing({
    value,
    max = 100,
    size = 120,
    strokeWidth = 8,
    className,
    showLabel = true,
    color = 'primary',
    children,
}: ProgressRingProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    const colorClasses = {
        primary: 'stroke-primary',
        success: 'stroke-success',
        warning: 'stroke-warning',
        secondary: 'stroke-secondary',
    };

    const textColorClasses = {
        primary: 'text-primary',
        success: 'text-success',
        warning: 'text-warning',
        secondary: 'text-secondary',
    };

    return (
        <div className={cn('relative inline-flex items-center justify-center', className)}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-muted opacity-20"
                />

                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={cn(
                        'transition-all duration-500 ease-out',
                        colorClasses[color]
                    )}
                />
            </svg>

            {/* Label */}
            {showLabel && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {children || (
                        <>
                            <span className={cn('text-2xl font-bold font-heading', textColorClasses[color])}>
                                {Math.round(percentage)}%
                            </span>
                            <span className="text-xs text-muted-foreground mt-1">
                                {value}/{max}
                            </span>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
