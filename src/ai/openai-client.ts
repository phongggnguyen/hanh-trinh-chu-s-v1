// OpenAI client with MegaLLM provider
// Using OpenAI SDK with custom baseURL

import OpenAI from 'openai';

export interface GeneratedQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface GeneratedQuiz {
  questions: GeneratedQuizQuestion[];
}

// Initialize OpenAI client with MegaLLM provider
const client = new OpenAI({
  baseURL: 'https://ai.megallm.io/v1',
  apiKey: process.env.MEGALLM_API_KEY || '',
});

/**
 * Generate quiz questions using MegaLLM (GPT-4o-mini)
 * Model: gpt-4o-mini (fast and efficient for structured content generation)
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

    const response = await client.chat.completions.create({
      model: 'qwen3-coder-480b-a35b-instruct',
      messages: [{ role: 'user', content: prompt }],
      temperature: 1.0,
      max_tokens: 2048,
    });

    const text = response.choices[0]?.message?.content || '';

    if (!text) {
      throw new Error('Empty response from AI');
    }

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
    console.error('Error generating quiz with MegaLLM:', error);

    // Fallback to mock data if AI fails
    if (error.status === 429) {
      console.log('⚠️  API quota exceeded. Falling back to mock data...');
      console.log('   To use AI: Wait for quota reset or upgrade to paid tier');
    } else if (error.status === 401) {
      console.log('⚠️  API key invalid or missing. Falling back to mock data...');
      console.log('   Check your MEGALLM_API_KEY in .env.local');
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
 * Note: Image generation requires additional API integration
 * For MVP, we skip images. In production, use DALL-E or other services
 */
export async function generateQuizImage(
  question: string,
  provinceName: string
): Promise<string> {
  // Return empty string - no image generation for MVP
  // To add images in production, integrate with:
  // - DALL-E API (OpenAI)
  // - Stable Diffusion API
  // - Midjourney API
  return '';
}
