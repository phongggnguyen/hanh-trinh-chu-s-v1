// Google Gemini AI client
// Using Google's Generative AI SDK

import { GoogleGenerativeAI } from '@google/generative-ai';

export interface GeneratedQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface GeneratedQuiz {
  questions: GeneratedQuizQuestion[];
}

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY || '');

/**
 * Generate quiz questions using Google Gemini 2.0 Flash
 * Model: gemini-2.0-flash-exp (faster, cheaper than Pro)
 * Perfect for generating structured quiz content
 */
export async function generateQuizQuestions(
  provinceName: string,
  numberOfQuestions: number = 5
): Promise<GeneratedQuiz> {
  try {
    // Use Gemini 2.5 Flash (latest stable model)
    // Free tier quota: 15 RPM, 1M TPM, 1.5K RPD
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 1.0,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

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

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse JSON response
    // Remove markdown code blocks if present
    let jsonText = text.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    const parsed = JSON.parse(jsonText) as GeneratedQuiz;

    // Validate the response
    if (!parsed.questions || parsed.questions.length !== numberOfQuestions) {
      throw new Error('Invalid number of questions generated');
    }

    for (const q of parsed.questions) {
      if (!q.question || !q.options || q.options.length !== 4 || !q.correctAnswer) {
        throw new Error('Invalid question format');
      }
      if (!q.options.includes(q.correctAnswer)) {
        throw new Error('Correct answer not in options');
      }
    }

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
