'use client';

import { ErrorDisplay } from '@/components/ui/error-display';

/**
 * Custom 404 Not Found Page
 */
export default function NotFound() {
    return (
        <ErrorDisplay
            title="404 - Không tìm thấy trang"
            message="Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển."
            fullScreen={true}
            onHome={() => {
                window.location.href = '/';
            }}
        />
    );
}
