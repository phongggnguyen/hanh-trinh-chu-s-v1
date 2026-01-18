import React from 'react';

/**
 * Component hiển thị hướng dẫn chơi game
 */
export function GameInstructions() {
    return (
        <div className="mt-8 text-center animate-slide-in-up" style={{ animationDelay: '200ms' }}>
            <div className="glass-light rounded-2xl p-6 inline-block border border-white/20">
                <p className="text-sm text-foreground/80 font-body max-w-2xl">
                    <span className="font-semibold text-primary">🎯 Hướng dẫn:</span> Click vào các tỉnh màu xanh để bắt đầu quiz.
                    Trả lời đúng <span className="font-bold text-success">≥4/5 câu</span> để chinh phục và mở khóa các tỉnh lân cận.
                </p>
            </div>
        </div>
    );
}
