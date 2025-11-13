// Simplified Gemini AI client for MVP
// Using Google's Generative AI SDK directly

export interface GeneratedQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface GeneratedQuiz {
  questions: GeneratedQuizQuestion[];
}

/**
 * Generate quiz questions using AI (mock for MVP)
 * In production, this would call Google Gemini API
 */
export async function generateQuizQuestions(
  provinceName: string,
  numberOfQuestions: number = 5
): Promise<GeneratedQuiz> {
  // Mock data for MVP - replace with actual AI call
  const questions: GeneratedQuizQuestion[] = [
    {
      question: `Đặc sản nổi tiếng của ${provinceName} là gì?`,
      options: ['Phở', 'Cơm tấm', 'Bánh xèo', 'Bánh mì'],
      correctAnswer: 'Phở',
    },
    {
      question: `${provinceName} nằm ở vùng nào của Việt Nam?`,
      options: ['Miền Bắc', 'Miền Trung', 'Miền Nam', 'Tây Nguyên'],
      correctAnswer: 'Miền Bắc',
    },
    {
      question: `Địa danh nổi tiếng của ${provinceName}?`,
      options: ['Hồ Gươm', 'Vịnh Hạ Long', 'Phố Cổ Hội An', 'Bà Nà Hills'],
      correctAnswer: 'Hồ Gươm',
    },
    {
      question: `Lễ hội truyền thống của ${provinceName}?`,
      options: ['Lễ hội Hoa Ban', 'Lễ hội Đền Hùng', 'Lễ hội Hương', 'Festival Huế'],
      correctAnswer: 'Lễ hội Đền Hùng',
    },
    {
      question: `Dân số của ${provinceName} vào khoảng?`,
      options: ['1-2 triệu', '3-5 triệu', '8-10 triệu', 'Trên 10 triệu'],
      correctAnswer: '8-10 triệu',
    },
  ];

  return { questions: questions.slice(0, numberOfQuestions) };
}

/**
 * Generate image for a quiz question (mock for MVP)
 * In production, this would call Google Imagen API
 */
export async function generateQuizImage(
  question: string,
  provinceName: string
): Promise<string> {
  // Return empty string for MVP - no images
  // In production, this would generate an actual image
  return '';
}
