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
import { Province } from '@/lib/types';
import { Trophy, XCircle } from 'lucide-react';

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
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            {success ? (
              <Trophy className="w-16 h-16 text-yellow-500" />
            ) : (
              <XCircle className="w-16 h-16 text-gray-400" />
            )}
          </div>
          <DialogTitle className="text-center text-2xl">
            {success ? 'Chúc mừng!' : 'Chưa đạt'}
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            {success
              ? `Bạn đã chinh phục ${province.name}!`
              : `Bạn chưa chinh phục được ${province.name}`}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">
              {score}/{totalQuestions}
            </div>
            <p className="text-muted-foreground">
              {success
                ? 'Điểm số xuất sắc! Các tỉnh lân cận đã được mở khóa.'
                : 'Cần đạt ít nhất 4/5 để chinh phục tỉnh này.'}
            </p>
          </div>

          {success && (
            <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
              <p className="text-sm text-green-800">
                🎉 Các tỉnh lân cận của {province.name} đã được mở khóa! Tiếp tục
                hành trình khám phá Việt Nam của bạn.
              </p>
            </div>
          )}

          {!success && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg text-center">
              <p className="text-sm text-blue-800">
                💪 Đừng bỏ cuộc! Hãy thử lại và khám phá thêm về {province.name}.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-center">
          <Button onClick={onContinue} className="w-full sm:w-auto">
            {success ? 'Tiếp tục hành trình' : 'Quay lại bản đồ'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
