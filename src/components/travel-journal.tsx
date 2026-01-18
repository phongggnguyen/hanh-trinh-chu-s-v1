'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ProgressRing } from '@/components/ui/progress-ring';
import { BadgeIcon } from '@/components/ui/badge-icon';
import { useGame } from '@/contexts/game-context';
import { provinces } from '@/lib/provinces';
import { BookOpen, MapPin, Trophy, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TravelJournal() {
  const { state } = useGame();
  const conqueredCount = state.conquered.size;
  const totalProvinces = provinces.length;
  const progress = Math.round((conqueredCount / totalProvinces) * 100);

  const conqueredProvinces = provinces
    .filter((p) => state.conquered.has(p.id))
    .sort((a, b) => a.name.localeCompare(b.name, 'vi'));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 glass-light border border-white/20 hover-lift font-heading"
        >
          <BookOpen className="w-4 h-4" />
          Nhật ký
          <span className="ml-1 px-2 py-0.5 bg-gradient-to-r from-primary to-secondary text-white text-xs rounded-full font-bold shadow-sm">
            {conqueredCount}/{totalProvinces}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col glass-card border-2 border-white/20">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl font-heading">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="gradient-text">Nhật ký hành trình</span>
          </DialogTitle>
          <DialogDescription className="font-body">
            Theo dõi tiến trình khám phá 63 tỉnh thành Việt Nam
          </DialogDescription>
        </DialogHeader>

        {/* Progress Summary */}
        <div className="glass-light rounded-2xl p-6 border border-white/20 animate-slide-in-up">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <ProgressRing
                value={conqueredCount}
                max={totalProvinces}
                size={100}
                strokeWidth={8}
                color="success"
              />
              <div>
                <div className="text-sm text-muted-foreground font-body mb-1">Tiến độ chinh phục</div>
                <div className="text-3xl font-bold font-heading gradient-text mb-1">
                  {progress}%
                </div>
                <div className="text-sm text-muted-foreground font-body">
                  {conqueredCount} / {totalProvinces} tỉnh thành
                </div>
              </div>
            </div>

            {conqueredCount >= totalProvinces && (
              <div className="animate-bounce-in">
                <Sparkles className="w-12 h-12 text-warning animate-pulse-glow" />
              </div>
            )}
          </div>
        </div>

        {/* Conquered Provinces List */}
        <div className="flex-1 overflow-y-auto mt-4 px-1">
          {conqueredCount === 0 ? (
            <div className="text-center py-16 text-muted-foreground animate-slide-in-up">
              <MapPin className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="font-heading text-lg mb-2">Chưa có tỉnh nào được chinh phục</p>
              <p className="text-sm font-body">
                Hãy bắt đầu từ Hà Nội hoặc TP. Hồ Chí Minh!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {conqueredProvinces.map((province, index) => {
                const journalEntry = state.journal.find(
                  (entry) => entry.provinceId === province.id
                );

                return (
                  <div
                    key={province.id}
                    className={cn(
                      'glass-light rounded-xl p-4 border border-white/20 hover-lift cursor-pointer',
                      'transition-all duration-300 animate-slide-in-up'
                    )}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <BadgeIcon variant="conquered" size={40} animated={false} showGlow />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm font-heading text-foreground mb-1">
                          {province.name}
                        </h4>
                        {journalEntry && (
                          <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                            <div className="flex items-center gap-1">
                              <Trophy className="w-3 h-3" />
                              <span>{journalEntry.score}/5</span>
                            </div>
                            <span>•</span>
                            <span>
                              {new Date(journalEntry.conqueredAt).toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Achievement Message */}
        {conqueredCount === totalProvinces && (
          <div className="mt-4 p-6 glass-card rounded-2xl text-center border-2 border-warning/30 animate-bounce-in">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-warning" />
              <p className="text-xl font-bold font-heading gradient-text">
                Chúc mừng hoàn thành!
              </p>
              <Sparkles className="w-6 h-6 text-warning" />
            </div>
            <p className="text-sm text-foreground/70 font-body">
              Bạn đã chinh phục tất cả 63 tỉnh thành Việt Nam! 🎉🇻🇳
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
