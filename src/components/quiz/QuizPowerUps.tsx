import React from 'react';
import { Button } from '@/components/ui/button';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Zap, Split } from 'lucide-react';
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
 * Component hiển thị timer và power-ups
 * Bao gồm: đồng hồ đếm ngược, nút 50/50, nút +thời gian
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

    return (
        <div className="flex items-center justify-between gap-4 animate-slide-in-up">
            {/* Timer */}
            <div className="glass-card rounded-2xl px-6 py-4 flex items-center gap-4 border border-white/20">
                <ProgressRing
                    value={timeLeft}
                    max={maxTime}
                    size={60}
                    strokeWidth={6}
                    color={isWarning ? 'warning' : 'primary'}
                    showLabel={false}
                />
                <div>
                    <div className={cn(
                        'text-2xl font-bold font-heading',
                        isWarning && 'text-warning animate-pulse'
                    )}>
                        {timeLeft}s
                    </div>
                    <div className="text-xs text-muted-foreground font-body">
                        Thời gian
                    </div>
                </div>
            </div>

            {/* Power-ups */}
            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    onClick={onFiftyFifty}
                    disabled={fiftyFiftyUsed || isAnswered}
                    className={cn(
                        "glass-light border border-white/20 hover-lift",
                        !fiftyFiftyUsed && !isAnswered && "shadow-glow-sm"
                    )}
                    aria-label="Dùng quyền 50/50"
                >
                    <Split className="w-4 h-4 mr-2" />
                    50/50
                </Button>

                <Button
                    variant="outline"
                    onClick={onTimeExtension}
                    disabled={timeExtensionUsed || isAnswered}
                    className={cn(
                        "glass-light border border-white/20 hover-lift",
                        !timeExtensionUsed && !isAnswered && "shadow-glow-sm"
                    )}
                    aria-label={`Cộng ${POWER_UPS.TIME_EXTENSION_SECONDS} giây`}
                >
                    <Zap className="w-4 h-4 mr-2" />
                    +{POWER_UPS.TIME_EXTENSION_SECONDS}s
                </Button>
            </div>
        </div>
    );
}
