'use client';

import { ErrorDisplay } from '@/components/ui/error-display';
import { useEffect } from 'react';

/**
 * Global Error Page cho Next.js App Router
 * Bắt lỗi xảy ra trong Root Layout
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log error to reporting service
        console.error('Global error:', error);
    }, [error]);

    return (
        <html>
            <body>
                <ErrorDisplay
                    title="Đã xảy ra lỗi nghiêm trọng"
                    message="Hệ thống gặp sự cố không thể phục hồi. Vui lòng thử lại."
                    fullScreen={true}
                    onRetry={reset}
                />
            </body>
        </html>
    );
}
