import React from 'react';
import { Button } from '@/components/ui/button';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Zap, Split, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { POWER_UPS, UI_CONFIG } from '@/lib/constants';

interface QuizPowerUpsProps {
    /** Thời gian còn lại (giây) */
    timeLeft: number;

    /** Thời gian tối đa (giây) */
    maxTime: number;

    /** Đã dùng 50/50 chưa */
    fiftyFiftyUsed: boolean;

    /** Đã dùng time extension chưa */
    timeExtensionUsed: boolean;

    /** Quiz đã được trả lời chưa (disable power-ups) */
    isAnswered: boolean;

    /** Callback khi dùng 50/50 */
    onFiftyFifty: () => void;

    /** Callback khi dùng time extension */
    onTimeExtension: () => void;
}

/**
 * Component hiển thị timer và power-ups với premium effects
 */
export function QuizPowerUps({
    timeLeft,
    maxTime,
    fiftyFiftyUsed,
    timeExtensionUsed,
    isAnswered,
    onFiftyFifty,
    onTimeExtension,
}: QuizPowerUpsProps) {
    const isWarning = timeLeft <= UI_CONFIG.TIME_WARNING_THRESHOLD;
    const isCritical = timeLeft <= 5;

    return (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 animate-slide-in-down">
            {/* Timer - Premium design */}
            <div className={cn(
                "glass-premium rounded-2xl px-4 md:px-6 py-4 flex items-center gap-4 border transition-all duration-300",
                !isWarning && "border-white/30",
                isWarning && !isCritical && "border-warning/50 shadow-warning-glow",
                isCritical && "border-destructive/50 shadow-glow-md animate-pulse"
            )}>
                <div className="relative">
                    <ProgressRing
                        value={timeLeft}
                        max={maxTime}
                        size={64}
                        strokeWidth={6}
                        color={isCritical ? 'destructive' : isWarning ? 'warning' : 'primary'}
                        showLabel={false}
                    />
                    <Clock className={cn(
                        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5",
                        isCritical && "text-destructive animate-wiggle",
                        !isCritical && "text-muted-foreground"
                    )} />
                </div>
                <div>
                    <div className={cn(
                        'text-2xl md:text-3xl font-bold font-heading transition-colors',
                        isCritical && 'text-destructive',
                        isWarning && !isCritical && 'text-warning',
                        !isWarning && 'text-foreground'
                    )}>
                        {timeLeft}s
                    </div>
                    <div className="text-xs text-muted-foreground font-body">
                        Thời gian còn lại
                    </div>
                </div>
            </div>

            {/* Power-ups */}
            <div className="flex items-center gap-3">
                {/* 50/50 Power-up */}
                <Button
                    variant="outline"
                    onClick={onFiftyFifty}
                    disabled={fiftyFiftyUsed || isAnswered}
                    className={cn(
                        "glass-premium border transition-all duration-300 rounded-xl px-4 md:px-6 py-3 font-heading",
                        fiftyFiftyUsed || isAnswered
                            ? "border-white/20 opacity-50 cursor-not-allowed"
                            : "border-white/30 hover-lift shadow-md hover:shadow-warning-glow hover:border-warning/50"
                    )}
                    aria-label="Dùng quyền 50/50"
                >
                    <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center mr-2",
                        fiftyFiftyUsed || isAnswered
                            ? "bg-muted/30"
                            : "bg-gradient-to-br from-warning to-warning/80 shadow-sm"
                    )}>
                        <Split className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold">50/50</span>
                </Button>

                {/* Time Extension Power-up */}
                <Button
                    variant="outline"
                    onClick={onTimeExtension}
                    disabled={timeExtensionUsed || isAnswered}
                    className={cn(
                        "glass-premium border transition-all duration-300 rounded-xl px-4 md:px-6 py-3 font-heading",
                        timeExtensionUsed || isAnswered
                            ? "border-white/20 opacity-50 cursor-not-allowed"
                            : "border-white/30 hover-lift shadow-md hover:shadow-glow-sm hover:border-primary/50"
                    )}
                    aria-label={`Cộng ${POWER_UPS.TIME_EXTENSION_SECONDS} giây`}
                >
                    <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center mr-2",
                        timeExtensionUsed || isAnswered
                            ? "bg-muted/30"
                            : "bg-gradient-to-br from-primary to-secondary shadow-sm"
                    )}>
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold">+{POWER_UPS.TIME_EXTENSION_SECONDS}s</span>
                </Button>
            </div>
        </div>
    );
}
