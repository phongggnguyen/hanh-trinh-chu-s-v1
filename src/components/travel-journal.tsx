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
import { useGame } from '@/contexts/game-context';
import { provinces } from '@/lib/provinces';
import { BookOpen, MapPin, Trophy } from 'lucide-react';
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
        <Button variant="outline" className="gap-2">
          <BookOpen className="w-4 h-4" />
          Nhật ký hành trình
          <span className="ml-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">
            {conqueredCount}/{totalProvinces}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Nhật ký hành trình
          </DialogTitle>
          <DialogDescription>
            Theo dõi tiến trình khám phá 63 tỉnh thành Việt Nam
          </DialogDescription>
        </DialogHeader>

        {/* Progress Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-2xl font-bold text-primary">
                {conqueredCount} / {totalProvinces}
              </h3>
              <p className="text-sm text-muted-foreground">tỉnh đã chinh phục</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">{progress}%</div>
              <p className="text-sm text-muted-foreground">hoàn thành</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Conquered Provinces List */}
        <div className="flex-1 overflow-y-auto mt-4">
          {conqueredCount === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Chưa có tỉnh nào được chinh phục</p>
              <p className="text-sm mt-2">
                Hãy bắt đầu từ Hà Nội hoặc TP. Hồ Chí Minh!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {conqueredProvinces.map((province, index) => {
                const journalEntry = state.journal.find(
                  (entry) => entry.provinceId === province.id
                );

                return (
                  <div
                    key={province.id}
                    className={cn(
                      'flex items-center gap-4 p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors',
                      'animate-in fade-in slide-in-from-bottom-2'
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm">{province.name}</h4>
                      {journalEntry && (
                        <p className="text-xs text-muted-foreground">
                          Điểm số: {journalEntry.score}/5 •{' '}
                          {new Date(journalEntry.conqueredAt).toLocaleDateString('vi-VN')}
                        </p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Achievement Message */}
        {conqueredCount === totalProvinces && (
          <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg text-center">
            <p className="text-lg font-bold text-yellow-800 mb-1">
              🎉 Chúc mừng! 🎉
            </p>
            <p className="text-sm text-yellow-700">
              Bạn đã chinh phục tất cả 63 tỉnh thành Việt Nam!
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
