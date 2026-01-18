import { useMemo } from 'react';
import { useGame } from '@/contexts/game-context';
import { GAME_STATE } from '@/lib/constants';

/**
 * Interface cho game statistics
 */
export interface GameStats {
    /** Tổng số tỉnh trong game */
    totalProvinces: number;

    /** Số tỉnh đã chinh phục */
    conqueredCount: number;

    /** Số tỉnh đã mở khóa (có thể chơi) */
    unlockedCount: number;

    /** Số tỉnh còn khóa */
    lockedCount: number;

    /** Phần trăm hoàn thành (0-100) */
    progressPercentage: number;

    /** Điểm trung bình của các quiz đã hoàn thành */
    averageScore: number;

    /** Tổng số điểm */
    totalScore: number;

    /** Điểm cao nhất trong một quiz */
    highestScore: number;

    /** Số quiz hoàn hảo (5/5) */
    perfectQuizCount: number;
}

/**
 * Custom hook để tính toán các thống kê game
 * Sử dụng useMemo để tránh tính toán lại không cần thiết
 * 
 * @returns GameStats object với tất cả thống kê
 */
export function useGameStats(): GameStats {
    const { state } = useGame();

    const stats = useMemo(() => {
        const totalProvinces = GAME_STATE.TOTAL_PROVINCES;
        const conqueredCount = state.conquered.size;
        const unlockedCount = state.unlocked.size;
        const lockedCount = totalProvinces - unlockedCount;
        const progressPercentage = (conqueredCount / totalProvinces) * 100;

        // Tính toán từ journal entries
        const scores = state.journal.map((entry) => entry.score);
        const totalScore = scores.reduce((sum, score) => sum + score, 0);
        const averageScore = scores.length > 0 ? totalScore / scores.length : 0;
        const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
        const perfectQuizCount = scores.filter((score) => score === 5).length;

        return {
            totalProvinces,
            conqueredCount,
            unlockedCount,
            lockedCount,
            progressPercentage,
            averageScore,
            totalScore,
            highestScore,
            perfectQuizCount,
        };
    }, [state.conquered.size, state.unlocked.size, state.journal]);

    return stats;
}

/**
 * Hook đơn giản chỉ trả về progress percentage
 * Hữu ích khi chỉ cần hiển thị % hoàn thành
 */
export function useGameProgress(): number {
    const { conqueredCount, totalProvinces } = useGameStats();
    return (conqueredCount / totalProvinces) * 100;
}

/**
 * Hook kiểm tra xem đã hoàn thành game chưa
 */
export function useIsGameCompleted(): boolean {
    const { conqueredCount, totalProvinces } = useGameStats();
    return conqueredCount === totalProvinces;
}
