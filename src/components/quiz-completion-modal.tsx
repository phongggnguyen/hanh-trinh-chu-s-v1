'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Confetti } from '@/components/ui/confetti';
import { Province } from '@/lib/types';
import { Trophy, XCircle, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizCompletionModalProps {
  open: boolean;
  province: Province;
  score: number;
  totalQuestions: number;
  success: boolean;
  onContinue: () => void;
}

export function QuizCompletionModal({
  open,
  province,
  score,
  totalQuestions,
  success,
  onContinue,
}: QuizCompletionModalProps) {
  return (
    <>
      <Confetti active={open && success} duration={4000} particleCount={60} />

      <Dialog open={open}>
        <DialogContent className="sm:max-w-md glass-card border-2">
          <DialogHeader>
            <div className="flex items-center justify-center mb-6 animate-bounce-in">
              {success ? (
                <div className=" relative">
                  <div className="absolute inset-0 bg-warning/30 rounded-full blur-xl animate-pulse-glow" />
                  <Trophy className="relative w-20 h-20 text-warning drop-shadow-lg animate-float" />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-muted/20 flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-muted-foreground" />
                </div>
              )}
            </div>
            <DialogTitle className="text-center text-3xl font-heading animate-slide-in-up">
              {success ? (
                <span className="gradient-text">Chúc mừng!</span>
              ) : (
                <span className="text-foreground/80">Chưa đạt</span>
              )}
            </DialogTitle>
            <DialogDescription className="text-center text-lg font-body mt-2 animate-slide-in-up" style={{ animationDelay: '100ms' }}>
              {success
                ? `Bạn đã chinh phục ${province.name}!`
                : `Bạn chưa chinh phục được ${province.name}`}
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
            <div className="text-center">
              <div className={cn(
                "text-6xl font-bold font-heading mb-3",
                success ? "gradient-text" : "text-muted-foreground"
              )}>
                {score}/{totalQuestions}
              </div>
              <p className="text-muted-foreground font-body">
                {success
                  ? 'Điểm số xuất sắc! Các tỉnh lân cận đã được mở khóa.'
                  : 'Cần đạt ít nhất 4/5 để chinh phục tỉnh này.'}
              </p>
            </div>

            {success && (
              <div className="mt-6 p-4 glass-light rounded-xl text-center border border-success/20 animate-bounce-in" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-success" />
                  <p className="font-semibold font-heading text-success">Mở khóa thành công!</p>
                </div>
                <p className="text-sm text-foreground/70 font-body">
                  Các tỉnh lân cận của {province.name} đã được mở khóa. Tiếp tục hành trình khám phá Việt Nam!
                </p>
              </div>
            )}

            {!success && (
              <div className="mt-6 p-4 glass-light rounded-xl text-center border border-primary/20 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
                <p className="text-sm text-foreground/70 font-body">
                  💪 Đừng bỏ cuộc! Hãy thử lại và khám phá thêm về {province.name}.
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="sm:justify-center animate-slide-in-up" style={{ animationDelay: '400ms' }}>
            <Button
              onClick={onContinue}
              className={cn(
                "w-full sm:w-auto px-8 py-6 text-base font-heading",
                "bg-gradient-to-r from-primary to-secondary hover:shadow-glow-md transition-all duration-300",
                "hover:scale-105"
              )}
            >
              {success ? (
                <>
                  Tiếp tục hành trình
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                'Quay lại bản đồ'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
