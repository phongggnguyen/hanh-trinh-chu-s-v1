'use client';

import React, { useState } from 'react';
import { ProgressRing } from '@/components/ui/progress-ring';
import { GAME_STATE } from '@/lib/constants';
import { ChevronDown, ChevronUp, Trophy, MapPin, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameStatsProps {
    conqueredCount: number;
    unlockedCount: number;
}

/**
 * Component hiển thị thống kê game - Simple version
 */
export function GameStats({ conqueredCount, unlockedCount }: GameStatsProps) {
    const totalProvinces = GAME_STATE.TOTAL_PROVINCES;
    const lockedCount = totalProvinces - conqueredCount - unlockedCount;
    const [isCollapsed, setIsCollapsed] = useState(false);
    const progressPercent = Math.round((conqueredCount / totalProvinces) * 100);

    return (
        <div className="fixed top-24 left-4 right-4 z-30">
            <div className="max-w-7xl mx-auto bg-card rounded-xl border border-border shadow-md">
                {/* Toggle Button */}
                <div className="px-4 md:px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="font-heading font-bold text-base text-primary">{progressPercent}%</span>
                        </div>
                        <div>
                            <div className="text-sm font-heading font-semibold text-foreground">
                                {conqueredCount}/{totalProvinces} tỉnh thành
                            </div>
                            <div className="text-xs text-muted-foreground font-body">
                                Tiến độ chinh phục
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hover:bg-muted rounded-lg"
                    >
                        {isCollapsed ? (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        ) : (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                        )}
                    </Button>
                </div>

                {/* Stats Content */}
                {!isCollapsed && (
                    <div className="px-4 md:px-5 py-4 border-t border-border">
                        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                            {/* Overall Progress */}
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                                <ProgressRing
                                    value={conqueredCount}
                                    max={totalProvinces}
                                    size={48}
                                    strokeWidth={5}
                                    color="success"
                                    showLabel={false}
                                />
                                <div>
                                    <div className="text-base font-bold font-heading">
                                        {conqueredCount}/{totalProvinces}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-body">
                                        Tổng tiến độ
                                    </div>
                                </div>
                            </div>

                            {/* Conquered */}
                            <div className="flex items-center gap-2 p-2 rounded-lg">
                                <div className="w-9 h-9 rounded-lg bg-conquered flex items-center justify-center">
                                    <Trophy className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <div className="text-base font-bold font-heading text-conquered">
                                        {conqueredCount}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-body">
                                        Đã chinh phục
                                    </div>
                                </div>
                            </div>

                            {/* Unlocked */}
                            <div className="flex items-center gap-2 p-2 rounded-lg">
                                <div className="w-9 h-9 rounded-lg bg-unlocked flex items-center justify-center">
                                    <MapPin className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <div className="text-base font-bold font-heading text-unlocked">
                                        {unlockedCount}
                                    </div>
                                    <div className="text-xs text-muted-foreground font-body">
                                        Có thể chơi
                                    </div>
                                </div>
                            </div>

                            {/* Locked */}
                            <div className="flex items-center gap-2 p-2 rounded-lg">
                                <div className="w-9 h-9 rounded-lg bg-locked/20 flex items-center justify-center">
                                    <Lock className="w-4 h-4 text-locked" />
                                </div>
                                <div>
                                    <div className="text-base font-bold font-heading text-muted-foreground">
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
