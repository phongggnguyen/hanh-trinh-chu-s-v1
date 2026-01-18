import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorDisplayProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
    onHome?: () => void;
    fullScreen?: boolean;
}

/**
 * Component hiển thị thông báo lỗi thân thiện với người dùng
 */
export function ErrorDisplay({
    title = 'Đã xảy ra lỗi',
    message = 'Rất tiếc, đã có lỗi không mong muốn xảy ra. Vui lòng thử lại.',
    onRetry,
    onHome,
    fullScreen = false,
}: ErrorDisplayProps) {
    const containerClasses = fullScreen
        ? 'min-h-screen flex items-center justify-center p-4 bg-background'
        : 'w-full p-6 bg-destructive/5 rounded-xl border border-destructive/20 text-center';

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center max-w-md mx-auto animate-slide-in-up">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>

                <h2 className="text-xl font-bold font-heading mb-2 text-foreground">
                    {title}
                </h2>

                <p className="text-muted-foreground mb-6 font-body">
                    {message}
                </p>

                <div className="flex gap-3">
                    {onHome && (
                        <Button
                            variant="outline"
                            onClick={onHome}
                            className="gap-2"
                        >
                            <Home className="w-4 h-4" />
                            Trang chủ
                        </Button>
                    )}

                    {onRetry && (
                        <Button
                            onClick={onRetry}
                            className="gap-2"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Thử lại
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
