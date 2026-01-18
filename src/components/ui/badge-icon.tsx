'use client';

import React from 'react';
import { Trophy, Lock, MapPin, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'conquered' | 'unlocked' | 'locked' | 'achievement';

interface BadgeIconProps {
    variant: BadgeVariant;
    size?: number;
    animated?: boolean;
    className?: string;
    showGlow?: boolean;
}

export function BadgeIcon({
    variant,
    size = 40,
    animated = true,
    className,
    showGlow = false,
}: BadgeIconProps) {
    const icons = {
        conquered: Trophy,
        unlocked: MapPin,
        locked: Lock,
        achievement: Star,
    };

    const Icon = icons[variant];

    const colorClasses = {
        conquered: 'bg-success/10 text-success border-success/20',
        unlocked: 'bg-unlocked/10 text-unlocked border-unlocked/20',
        locked: 'bg-muted text-muted-foreground border-border',
        achievement: 'bg-warning/10 text-warning border-warning/20',
    };

    const glowClasses = {
        conquered: 'shadow-success-glow',
        unlocked: 'shadow-glow-md',
        locked: '',
        achievement: 'shadow-[0_0_20px_rgba(245,158,11,0.5)]',
    };

    const animationClasses = {
        conquered: animated ? 'animate-bounce-in' : '',
        unlocked: animated ? 'animate-pulse-glow' : '',
        locked: '',
        achievement: animated ? 'animate-rotate-scale' : '',
    };

    return (
        <div
            className={cn(
                'rounded-full border-2 flex items-center justify-center transition-all duration-300',
                colorClasses[variant],
                showGlow && glowClasses[variant],
                animationClasses[variant],
                className
            )}
            style={{
                width: `${size}px`,
                height: `${size}px`,
            }}
        >
            <Icon size={size * 0.5} strokeWidth={2.5} />
        </div>
    );
}
