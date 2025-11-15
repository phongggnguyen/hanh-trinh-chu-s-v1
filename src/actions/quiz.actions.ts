'use server';

import { QuizQuestion } from '@/lib/types';
import { generateQuizQuestions, generateQuizImage } from '@/ai/openai-client';
import { z } from 'zod';

// In-memory cache for quiz data (TTL ~24h)
const quizCache = new Map<string, { data: QuizQuestion[]; timestamp: number }>();
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Rate limiting map (simple in-memory)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 10; // 10 requests per minute

// Input validation schema
const ProvinceNameSchema = z.string().min(1).max(100);

/**
 * Check rate limit for a given IP/identifier
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false; // Rate limit exceeded
  }

  record.count++;
  return true;
}

/**
 * Get cached quiz or return null
 */
function getCachedQuiz(provinceName: string): QuizQuestion[] | null {
  const cached = quizCache.get(provinceName);
  if (!cached) return null;

  const now = Date.now();
  if (now - cached.timestamp > CACHE_TTL) {
    // Cache expired
    quizCache.delete(provinceName);
    return null;
  }

  console.log(`[CACHE HIT] Quiz for ${provinceName}`);
  return cached.data;
}

/**
 * Set quiz in cache
 */
function setCachedQuiz(provinceName: string, data: QuizQuestion[]): void {
  quizCache.set(provinceName, {
    data,
    timestamp: Date.now(),
  });
  console.log(`[CACHE SET] Quiz for ${provinceName}`);
}

/**
 * Server Action: Get quiz for a province
 * @param provinceName - Name of the province
 * @returns Array of 5 quiz questions with optional images
 */
export async function getQuizForProvince(
  provinceName: string
): Promise<QuizQuestion[]> {
  try {
    // 1. Validate input
    const validatedProvinceName = ProvinceNameSchema.parse(provinceName);

    // 2. Rate limiting (using province name as identifier for simplicity)
    // In production, use IP address or user ID
    if (!checkRateLimit(validatedProvinceName)) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // 3. Check cache
    const cachedQuiz = getCachedQuiz(validatedProvinceName);
    if (cachedQuiz) {
      return cachedQuiz;
    }

    console.log(`[CACHE MISS] Generating quiz for ${validatedProvinceName}`);

    // 4. Generate quiz questions
    const questionsResult = await generateQuizQuestions(
      validatedProvinceName,
      5
    );

    // 5. Generate images for each question (with fallback)
    const questionsWithImages: QuizQuestion[] = await Promise.all(
      questionsResult.questions.map(async (q) => {
        try {
          const imageUrl = await generateQuizImage(
            q.question,
            validatedProvinceName
          );

          return {
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            imageUrl: imageUrl || '',
          };
        } catch (error) {
          console.error(
            `Error generating image for question: ${q.question}`,
            error
          );
          // Fallback: no image
          return {
            question: q.question,
            options: q.options,
            correctAnswer: q.correctAnswer,
            imageUrl: '',
          };
        }
      })
    );

    // 6. Validate output (ensure 5 questions, 4 options each, etc.)
    if (questionsWithImages.length !== 5) {
      throw new Error('Failed to generate exactly 5 questions');
    }

    for (const q of questionsWithImages) {
      if (q.options.length !== 4) {
        throw new Error('Each question must have exactly 4 options');
      }
      if (!q.options.includes(q.correctAnswer)) {
        throw new Error('Correct answer must be one of the options');
      }
    }

    // 7. Cache the result
    setCachedQuiz(validatedProvinceName, questionsWithImages);

    // 8. Return the quiz
    return questionsWithImages;
  } catch (error) {
    console.error(`[ERROR] getQuizForProvince(${provinceName}):`, error);

    // Log to Sentry in production
    // Sentry.captureException(error, { tags: { province: provinceName } });

    throw error;
  }
}
