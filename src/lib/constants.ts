/**
 * Game Configuration Constants
 * Tập trung tất cả các tham số cấu hình của game để dễ quản lý và thay đổi
 */

// ===== CẤU HÌNH QUIZ =====
export const QUIZ_CONFIG = {
  /** Số câu hỏi trong mỗi lượt quiz */
  QUESTIONS_PER_QUIZ: 5,
  
  /** Thời gian cho mỗi câu hỏi (giây) */
  TIME_PER_QUESTION: 30,
  
  /** Số câu trả lời đúng tối thiểu để chinh phục tỉnh */
  PASSING_SCORE: 4,
  
  /** Số lựa chọn cho mỗi câu hỏi */
  OPTIONS_PER_QUESTION: 4,
} as const;

// ===== CẤU HÌNH QUYỀN TRỢ GIÚP (POWER-UPS) =====
export const POWER_UPS = {
  /** Tên các loại quyền trợ giúp */
  TYPES: {
    FIFTY_FIFTY: 'fifty-fifty',
    TIME_EXTENSION: 'time-extension',
  } as const,
  
  /** Thời gian cộng thêm khi dùng quyền +Thời gian (giây) */
  TIME_EXTENSION_SECONDS: 15,
  
  /** Số đáp án sẽ bị ẩn khi dùng quyền 50/50 */
  FIFTY_FIFTY_REMOVE_COUNT: 2,
} as const;

// ===== CẤU HÌNH CACHE & STORAGE =====
export const CACHE_CONFIG = {
  /** Thời gian lưu cache (24 giờ = 86,400,000 milliseconds) */
  TTL: 24 * 60 * 60 * 1000,
  
  /** Key cho localStorage */
  STORAGE_KEY: 'hanh-trinh-chu-s-game-state',
} as const;

// ===== CẤU HÌNH RATE LIMITING =====
export const RATE_LIMIT = {
  /** Khoảng thời gian tính giới hạn (1 phút = 60,000 milliseconds) */
  WINDOW_MS: 60 * 1000,
  
  /** Số lượng request tối đa trong 1 window */
  MAX_REQUESTS: 10,
} as const;

// ===== CẤU HÌNH GAME STATE =====
export const GAME_STATE = {
  /** Danh sách các tỉnh mở khóa mặc định khi bắt đầu */
  DEFAULT_UNLOCKED_PROVINCES: ['ha-noi', 'ho-chi-minh'] as const,
  
  /** Tổng số tỉnh thành trong game */
  TOTAL_PROVINCES: 63,
} as const;

// ===== CẤU HÌNH THỜI GIAN & ANIMATION =====
export const TIMING = {
  /** Thời gian hiển thị kết quả sau khi trả lời (milliseconds) */
  ANSWER_FEEDBACK_DURATION: 1500,
  
  /** Delay trước khi chuyển sang câu hỏi tiếp theo (milliseconds) */
  NEXT_QUESTION_DELAY: 500,
  
  /** Thời gian hiển thị modal hoàn thành (milliseconds) */
  COMPLETION_MODAL_DELAY: 1000,
} as const;

// ===== CẤU HÌNH UI/UX =====
export const UI_CONFIG = {
  /** Ngưỡng thời gian để hiển thị cảnh báo (giây) */
  TIME_WARNING_THRESHOLD: 10,
  
  /** Số lượng confetti particles */
  CONFETTI_PARTICLE_COUNT: 50,
} as const;

// ===== MESSAGES & TEXT =====
export const MESSAGES = {
  ERRORS: {
    RATE_LIMIT_EXCEEDED: 'Bạn đã thử quá nhiều lần. Vui lòng thử lại sau.',
    QUIZ_GENERATION_FAILED: 'Không thể tạo câu hỏi. Vui lòng thử lại.',
    INVALID_PROVINCE: 'Tỉnh thành không hợp lệ.',
    NETWORK_ERROR: 'Lỗi kết nối mạng. Vui lòng kiểm tra internet.',
  },
  SUCCESS: {
    PROVINCE_CONQUERED: 'Chúc mừng! Bạn đã chinh phục tỉnh này!',
    QUIZ_PASSED: 'Xuất sắc! Bạn đã vượt qua thử thách!',
  },
  INFO: {
    QUIZ_FAILED: 'Tiếc quá! Hãy thử lại lần nữa nhé.',
    LOADING_QUIZ: 'Đang tải câu hỏi...',
    SAVING_PROGRESS: 'Đang lưu tiến trình...',
  },
} as const;

// ===== API CONFIGURATION =====
export const API_CONFIG = {
  /** Số lần thử lại khi API call thất bại */
  MAX_RETRIES: 3,
  
  /** Thời gian chờ giữa các lần retry (milliseconds) */
  RETRY_DELAY_MS: 1000,
  
  /** Request timeout (milliseconds) */
  REQUEST_TIMEOUT_MS: 30000,
} as const;

// ===== TYPE EXPORTS (để TypeScript inference) =====
export type PowerUpType = typeof POWER_UPS.TYPES[keyof typeof POWER_UPS.TYPES];
export type DefaultUnlockedProvince = typeof GAME_STATE.DEFAULT_UNLOCKED_PROVINCES[number];
