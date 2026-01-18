import React, { useState } from 'react';
import { ProgressRing } from '@/components/ui/progress-ring';
import { BadgeIcon } from '@/components/ui/badge-icon';
import { GAME_STATE } from '@/lib/constants';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameStatsProps {
    /** Số tỉnh đã chinh phục */
    conqueredCount: number;

    /** Số tỉnh đã mở khóa (có thể chơi) */
    unlockedCount: number;
}

/**
 * Component hiển thị thống kê game
 * Bao gồm: overall progress, số tỉnh đã chinh phục, đã mở khóa, bị khóa
 * Có thể thu gọn/mở rộng
 */
export function GameStats({ conqueredCount, unlockedCount }: GameStatsProps) {
    const totalProvinces = GAME_STATE.TOTAL_PROVINCES;
    const lockedCount = totalProvinces - unlockedCount;
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="fixed top-24 left-4 right-4 z-30">
            <div className="max-w-7xl mx-auto bg-card/90 backdrop-blur-md rounded-xl border-4 border-double border-primary/20 shadow-lg overflow-hidden transition-all duration-300">
                {/* Toggle Button */}
                <div className="px-6 py-3 flex items-center justify-between border-b border-primary/10">
                    <div className="flex items-center gap-3">
                        <div className="text-lg font-bold font-heading text-primary">
                            {conqueredCount}/{totalProvinces}
                        </div>
                        <div className="text-sm text-muted-foreground font-body">
                            Tiến độ
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hover:bg-primary/10 transition-colors"
                    >
                        {isCollapsed ? (
                            <ChevronDown className="w-5 h-5 text-primary" />
                        ) : (
                            <ChevronUp className="w-5 h-5 text-primary" />
                        )}
                    </Button>
                </div>

                {/* Stats Content - Collapsible */}
                {!isCollapsed && (
                    <div className="px-6 py-4 animate-slide-in-up">
                        <div className="flex items-center justify-center gap-8">
                            {/* Overall Progress */}
                            <div className="flex items-center gap-4">
                                <ProgressRing
                                    value={conqueredCount}
                                    max={totalProvinces}
                                    size={60}
                                    strokeWidth={6}
                                    color="success"
                                    showLabel={false}
                                />
                                <div>
                                    <div className="text-lg font-bold font-heading">
                                        {conqueredCount}/{totalProvinces}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-body">
                                        Tỉnh đã chinh phục
                                    </div>
                                </div>
                            </div>

                            <div className="h-12 w-px bg-border" />

                            {/* Conquered */}
                            <div className="flex items-center gap-3 hover-lift cursor-pointer">
                                <BadgeIcon variant="conquered" size={48} animated={false} />
                                <div>
                                    <div className="text-lg font-bold font-heading text-success">
                                        {conqueredCount}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-body">
                                        Đã chinh phục
                                    </div>
                                </div>
                            </div>

                            {/* Unlocked */}
                            <div className="flex items-center gap-3 hover-lift cursor-pointer">
                                <BadgeIcon variant="unlocked" size={48} animated showGlow />
                                <div>
                                    <div className="text-lg font-bold font-heading text-unlocked">
                                        {unlockedCount}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-body">
                                        Có thể chơi
                                    </div>
                                </div>
                            </div>

                            {/* Locked */}
                            <div className="flex items-center gap-3 hover-lift cursor-pointer">
                                <BadgeIcon variant="locked" size={48} animated={false} />
                                <div>
                                    <div className="text-lg font-bold font-heading text-muted-foreground">
                                        {lockedCount}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-body">
                                        Đã khóa
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
