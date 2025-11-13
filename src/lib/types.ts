// Core types for Hành Trình Chữ S

export type ProvinceId = string; // e.g., 'ha-noi', 'ho-chi-minh'

export interface Province {
  id: ProvinceId;
  name: string; // 'Hà Nội'
  path: string; // SVG path d attribute
  neighbors: ProvinceId[];
}

export interface QuizQuestion {
  question: string; // Vietnamese text
  options: string[]; // 4 answers
  correctAnswer: string;
  imageUrl?: string; // data URI or empty string when fallback
}

export interface GameState {
  unlocked: Set<ProvinceId>;
  conquered: Set<ProvinceId>;
}

export type GameAction =
  | { type: 'CONQUER_PROVINCE'; payload: { provinceId: ProvinceId; neighbors: ProvinceId[] } }
  | { type: 'LOAD_STATE'; payload: { unlocked: ProvinceId[]; conquered: ProvinceId[] } };

export interface PowerUp {
  fiftyFifty: boolean; // Used 50/50?
  timeExtension: boolean; // Used +15s?
}

export interface QuizResult {
  provinceId: ProvinceId;
  provinceName: string;
  correctAnswers: number;
  totalQuestions: number;
  success: boolean; // true if >= 4/5
  timestamp: number;
}

export interface JournalEntry {
  provinceId: ProvinceId;
  provinceName: string;
  conqueredAt: number; // timestamp
  score: number; // correct answers
}
