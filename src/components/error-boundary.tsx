'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorDisplay } from '@/components/ui/error-display';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

/**
 * Global Error Boundary để bắt lỗi crash ứng dụng
 * Ngăn chặn toàn bộ ứng dụng bị trắng trang khi có lỗi React
 */
export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        // TODO: Gửi lỗi lên Sentry service nếu có
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <ErrorDisplay
                    title="Đã xảy ra lỗi hệ thống"
                    message="Chúng tôi xin lỗi vì sự bất tiện này. Vui lòng tải lại trang."
                    fullScreen={true}
                    onRetry={() => {
                        this.setState({ hasError: false, error: null });
                        window.location.reload();
                    }}
                    onHome={() => {
                        window.location.href = '/';
                    }}
                />
            );
        }

        return this.props.children;
    }
}
