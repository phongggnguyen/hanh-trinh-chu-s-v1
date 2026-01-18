import { useState, useCallback } from 'react';
import { PowerUp } from '@/lib/types';
import { POWER_UPS } from '@/lib/constants';

/**
 * Interface cho power-up actions
 */
export interface PowerUpActions {
    /** Sử dụng quyền 50/50 - ẩn 2 đáp án sai */
    useFiftyFifty: () => void;

    /** Sử dụng quyền cộng thời gian */
    useTimeExtension: () => void;

    /** Reset tất cả power-ups về trạng thái ban đầu */
    reset: () => void;

    /** Kiểm tra xem có thể dùng 50/50 không */
    canUseFiftyFifty: boolean;

    /** Kiểm tra xem có thể dùng time extension không */
    canUseTimeExtension: boolean;
}

/**
 * Custom hook để quản lý power-ups trong quiz
 * 
 * @param onFiftyFifty - Callback khi dùng 50/50, nhận vào số đáp án cần ẩn
 * @param onTimeExtension - Callback khi dùng time extension, nhận vào số giây cộng thêm
 * @param isAnswered - Quiz đã được trả lời chưa (disable power-ups khi đã trả lời)
 * @returns Trạng thái power-ups và các hàm để sử dụng
 */
export function usePowerUps(
    onFiftyFifty?: (removeCount: number) => void,
    onTimeExtension?: (additionalSeconds: number) => void,
    isAnswered: boolean = false
): [PowerUp, PowerUpActions] {
    const [powerUps, setPowerUps] = useState<PowerUp>({
        fiftyFifty: false,
        timeExtension: false,
    });

    const useFiftyFifty = useCallback(() => {
        if (powerUps.fiftyFifty || isAnswered) return;

        setPowerUps((prev) => ({ ...prev, fiftyFifty: true }));

        if (onFiftyFifty) {
            onFiftyFifty(POWER_UPS.FIFTY_FIFTY_REMOVE_COUNT);
        }
    }, [powerUps.fiftyFifty, isAnswered, onFiftyFifty]);

    const useTimeExtension = useCallback(() => {
        if (powerUps.timeExtension || isAnswered) return;

        setPowerUps((prev) => ({ ...prev, timeExtension: true }));

        if (onTimeExtension) {
            onTimeExtension(POWER_UPS.TIME_EXTENSION_SECONDS);
        }
    }, [powerUps.timeExtension, isAnswered, onTimeExtension]);

    const reset = useCallback(() => {
        setPowerUps({
            fiftyFifty: false,
            timeExtension: false,
        });
    }, []);

    const actions: PowerUpActions = {
        useFiftyFifty,
        useTimeExtension,
        reset,
        canUseFiftyFifty: !powerUps.fiftyFifty && !isAnswered,
        canUseTimeExtension: !powerUps.timeExtension && !isAnswered,
    };

    return [powerUps, actions];
}
