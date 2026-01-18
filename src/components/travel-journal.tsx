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
import { BookOpen, MapPin, Trophy, Sparkles, Calendar, Award } from 'lucide-react';
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
          className="gap-2 glass-light border border-white/30 hover-lift font-heading shadow-md hover:shadow-glow-sm transition-all rounded-xl"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden md:inline">Nhật ký</span>
          <span className="ml-1 px-2.5 py-0.5 bg-gradient-to-r from-primary to-secondary text-white text-xs rounded-full font-bold shadow-sm">
            {conqueredCount}/{totalProvinces}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-hidden flex flex-col glass-premium border border-white/30 shadow-glass-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl font-heading">
            <div className="w-12 h-12 bg-gradient-to-br from-primary via-destructive to-secondary rounded-2xl flex items-center justify-center shadow-glow-sm">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="gradient-text-animated">Nhật ký hành trình</span>
          </DialogTitle>
          <DialogDescription className="font-body text-foreground/70">
            Theo dõi tiến trình khám phá 63 tỉnh thành Việt Nam 🇻🇳
          </DialogDescription>
        </DialogHeader>

        {/* Progress Summary - Premium card */}
        <div className="glass-light rounded-2xl p-6 border border-white/20 shadow-inner-glow animate-slide-in-up">
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
                <div className="text-sm text-muted-foreground font-body mb-1 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Tiến độ chinh phục
                </div>
                <div className="text-4xl font-bold font-heading gradient-text mb-2">
                  {progress}%
                </div>
                <div className="text-sm text-muted-foreground font-body">
                  {conqueredCount} / {totalProvinces} tỉnh thành
                </div>
              </div>
            </div>

            {conqueredCount >= totalProvinces && (
              <div className="animate-bounce-in">
                <div className="relative">
                  <Sparkles className="w-16 h-16 text-warning" />
                  <Sparkles className="w-16 h-16 text-warning absolute top-0 left-0 animate-sparkle-rotate" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Conquered Provinces List */}
        <div className="flex-1 overflow-y-auto mt-4 px-1 custom-scrollbar">
          {conqueredCount === 0 ? (
            <div className="text-center py-20 text-muted-foreground animate-fade-scale-in">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-muted/20 to-muted/10 flex items-center justify-center">
                <MapPin className="w-12 h-12 opacity-30" />
              </div>
              <p className="font-heading text-xl mb-3 text-foreground">Chưa có tỉnh nào được chinh phục</p>
              <p className="text-sm font-body max-w-sm mx-auto">
                Hãy bắt đầu hành trình từ <span className="font-semibold text-primary">Hà Nội</span> hoặc <span className="font-semibold text-primary">TP. Hồ Chí Minh</span>!
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
                      'glass-light rounded-2xl p-4 border border-white/20 hover-lift cursor-default group',
                      'transition-all duration-300 animate-slide-in-up hover:shadow-success-glow'
                    )}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 transition-transform group-hover:scale-110 duration-300">
                        <BadgeIcon variant="conquered" size={44} animated={false} showGlow />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-base font-heading text-foreground mb-2 flex items-center gap-2">
                          {province.name}
                          <Trophy className="w-4 h-4 text-warning opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h4>
                        {journalEntry && (
                          <div className="flex items-center gap-3 text-xs text-muted-foreground font-body">
                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-success/10 text-success">
                              <Trophy className="w-3 h-3" />
                              <span className="font-semibold">{journalEntry.score}/5</span>
                            </div>
                            <span className="opacity-50">•</span>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3 h-3" />
                              <span>
                                {new Date(journalEntry.conqueredAt).toLocaleDateString('vi-VN', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: '2-digit',
                                })}
                              </span>
                            </div>
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
          <div className="mt-4 p-6 glass-premium rounded-2xl text-center border border-warning/30 shadow-warning-glow animate-bounce-in">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Sparkles className="w-6 h-6 text-warning animate-sparkle" />
              <p className="text-2xl font-bold font-heading gradient-text-animated">
                Chúc mừng hoàn thành!
              </p>
              <Sparkles className="w-6 h-6 text-warning animate-sparkle" style={{ animationDelay: '0.5s' }} />
            </div>
            <p className="text-sm text-foreground/80 font-body">
              Bạn đã chinh phục tất cả <span className="font-bold text-success">63 tỉnh thành</span> Việt Nam! 🎉🇻🇳
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
