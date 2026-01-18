import { useState, useEffect } from 'react';

/**
 * Custom hook để làm việc với localStorage
 * Tự động sync giữa state và localStorage
 * 
 * @param key - Key trong localStorage
 * @param initialValue - Giá trị khởi tạo nếu chưa có trong localStorage
 * @returns [storedValue, setValue] - Giống useState nhưng persist vào localStorage
 */
export function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
    // State để lưu giá trị hiện tại
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Hàm set value mới
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Cho phép value là function như setState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            // Lưu vào state
            setStoredValue(valueToStore);

            // Lưu vào localStorage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
}

/**
 * Hook tương tự useLocalStorage nhưng với debounce để tránh lưu quá nhiều lần
 * Hữu ích cho các giá trị thay đổi liên tục (text input, scroll position, etc.)
 * 
 * @param key - Key trong localStorage
 * @param initialValue - Giá trị khởi tạo
 * @param delay - Thời gian debounce (ms), mặc định 500ms
 */
export function useDebouncedLocalStorage<T>(
    key: string,
    initialValue: T,
    delay: number = 500
): [T, (value: T | ((val: T) => T)) => void] {
    const [storedValue, setStoredValue] = useLocalStorage<T>(key, initialValue);
    const [value, setValue] = useState<T>(storedValue);

    useEffect(() => {
        const handler = setTimeout(() => {
            setStoredValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay, setStoredValue]);

    return [value, setValue];
}
