import { useState, useEffect, useCallback, useRef } from 'react';
import { QUIZ_CONFIG } from '@/lib/constants';

/**
 * Interface cho quiz timer state
 */
export interface QuizTimerState {
    /** Thời gian còn lại (giây) */
    timeLeft: number;

    /** Timer đang chạy không */
    isRunning: boolean;

    /** Timer đã hết giờ chưa */
    isExpired: boolean;

    /** Phần trăm thời gian còn lại (0-100) */
    percentageLeft: number;
}

/**
 * Interface cho quiz timer actions
 */
export interface QuizTimerActions {
    /** Bắt đầu/tiếp tục timer */
    start: () => void;

    /** Tạm dừng timer */
    pause: () => void;

    /** Reset timer về giá trị ban đầu */
    reset: () => void;

    /** Cộng thêm thời gian (power-up) */
    addTime: (seconds: number) => void;

    /** Set thời gian cụ thể */
    setTime: (seconds: number) => void;
}

/**
 * Custom hook để quản lý quiz timer với các tính năng:
 * - Đếm ngược tự động
 * - Pause/Resume
 * - Reset
 * - Add time (power-up)
 * - Auto-trigger khi hết giờ
 * 
 * @param initialTime - Thời gian khởi tạo (giây), mặc định từ config
 * @param onExpire - Callback khi hết giờ
 * @param autoStart - Tự động bắt đầu khi mount, mặc định true
 * @returns [state, actions] - Trạng thái timer và các hàm điều khiển
 */
export function useQuizTimer(
    initialTime: number = QUIZ_CONFIG.TIME_PER_QUESTION,
    onExpire?: () => void,
    autoStart: boolean = true
): [QuizTimerState, QuizTimerActions] {
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);
    const [isRunning, setIsRunning] = useState<boolean>(autoStart);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const onExpireRef = useRef(onExpire);

    // Update onExpire ref khi thay đổi
    useEffect(() => {
        onExpireRef.current = onExpire;
    }, [onExpire]);

    // Dọn dẹp interval khi unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    // Timer logic
    useEffect(() => {
        if (!isRunning) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
            return;
        }

        intervalRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    // Hết giờ
                    setIsRunning(false);
                    if (onExpireRef.current) {
                        onExpireRef.current();
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    const start = useCallback(() => {
        setIsRunning(true);
    }, []);

    const pause = useCallback(() => {
        setIsRunning(false);
    }, []);

    const reset = useCallback(() => {
        setIsRunning(false);
        setTimeLeft(initialTime);
    }, [initialTime]);

    const addTime = useCallback((seconds: number) => {
        setTimeLeft((prev) => prev + seconds);
    }, []);

    const setTime = useCallback((seconds: number) => {
        setTimeLeft(seconds);
    }, []);

    const state: QuizTimerState = {
        timeLeft,
        isRunning,
        isExpired: timeLeft === 0,
        percentageLeft: (timeLeft / initialTime) * 100,
    };

    const actions: QuizTimerActions = {
        start,
        pause,
        reset,
        addTime,
        setTime,
    };

    return [state, actions];
}

/**
 * Hook đơn giản hơn chỉ để đếm ngược
 * Không có pause/resume, tự động reset khi component mount lại
 * 
 * @param initialTime - Thời gian khởi tạo (giây)
 * @param onExpire - Callback khi hết giờ
 * @returns timeLeft - Thời gian còn lại
 */
export function useCountdown(
    initialTime: number,
    onExpire?: () => void
): number {
    const [state] = useQuizTimer(initialTime, onExpire, true);
    return state.timeLeft;
}
