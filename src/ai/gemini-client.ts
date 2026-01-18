// Google Gemini AI client
// Using Google's GenAI SDK

import { GoogleGenAI } from '@google/genai';

export interface GeneratedQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface GeneratedQuiz {
  questions: GeneratedQuizQuestion[];
}

// Initialize Google GenAI
const ai = new GoogleGenAI({});

/**
 * Helper function to parse and clean JSON from AI response
 * Removes markdown code blocks if present
 */
function parseAIResponse(text: string): GeneratedQuiz {
  let jsonText = text.trim();

  // Remove markdown code blocks if present
  if (jsonText.startsWith('```json')) {
    jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
  } else if (jsonText.startsWith('```')) {
    jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '');
  }

  return JSON.parse(jsonText) as GeneratedQuiz;
}

/**
 * Helper function to validate quiz questions
 * Ensures correct format and number of questions
 */
function validateQuizQuestions(
  quiz: GeneratedQuiz,
  expectedCount: number
): void {
  if (!quiz.questions || quiz.questions.length !== expectedCount) {
    throw new Error('Invalid number of questions generated');
  }

  for (const q of quiz.questions) {
    if (!q.question || !q.options || q.options.length !== 4 || !q.correctAnswer) {
      throw new Error('Invalid question format');
    }
    if (!q.options.includes(q.correctAnswer)) {
      throw new Error('Correct answer not in options');
    }
  }
}

/**
 * Generate quiz questions using Google Gemini 3 Flash Preview
 * Model: gemini-3-flash-preview (latest preview model)
 * Perfect for generating structured quiz content
 */
export async function generateQuizQuestions(
  provinceName: string,
  numberOfQuestions: number = 5
): Promise<GeneratedQuiz> {
  try {
    const prompt = `Bạn là hệ thống sinh câu hỏi trắc nghiệm về tỉnh ${provinceName}, Việt Nam.
Sinh đúng ${numberOfQuestions} câu hỏi, hoàn toàn bằng tiếng Việt, mỗi câu có 4 phương án và 1 đáp án đúng.
Phủ các chủ đề: địa lý, lịch sử, văn hóa, đặc sản, địa danh nổi tiếng.

YÊU CẦU BẮT BUỘC:
- Tất cả text phải bằng tiếng Việt có dấu
- Mỗi câu hỏi phải có đúng 4 đáp án
- correctAnswer phải khớp CHÍNH XÁC với một trong 4 options (giống y hệt, kể cả dấu cách)
- Nội dung an toàn, không vi phạm chuẩn mực
- Câu hỏi thú vị và mang tính giáo dục về ${provinceName}

Trả về ĐÚNG định dạng JSON sau (không thêm markdown, không thêm text khác):
{
  "questions": [
    {
      "question": "Câu hỏi về ${provinceName}?",
      "options": ["Đáp án A", "Đáp án B", "Đáp án C", "Đáp án D"],
      "correctAnswer": "Đáp án A"
    }
  ]
}`;

    // Use Gemini 3 Flash (latest preview model)
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    const text = response.text;

    if (!text) {
      throw new Error('Empty response from AI');
    }

    // Parse and validate the AI response
    const parsed = parseAIResponse(text);
    validateQuizQuestions(parsed, numberOfQuestions);

    return parsed;
  } catch (error: any) {
    console.error('Error generating quiz with Gemini:', error);

    // Fallback to mock data if AI fails
    if (error.status === 429) {
      console.log('⚠️  API quota exceeded. Falling back to mock data...');
      console.log('   To use AI: Wait for quota reset or upgrade to paid tier');
    } else {
      console.log('Falling back to mock data...');
    }
    const mockQuestions: GeneratedQuizQuestion[] = [
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

    return { questions: mockQuestions.slice(0, numberOfQuestions) };
  }
}

/**
 * Generate image for a quiz question
 * Note: Gemini doesn't have public image generation API
 * For MVP, we skip images. In production, use Imagen API or other services
 */
export async function generateQuizImage(
  question: string,
  provinceName: string
): Promise<string> {
  // Return empty string - no image generation for MVP
  // To add images in production, integrate with:
  // - Google Imagen API (when available)
  // - Stable Diffusion API
  // - DALL-E API
  return '';
}
