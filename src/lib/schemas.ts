/**
 * Zod Validation Schemas
 * Centralize tất cả validation schemas để tái sử dụng
 */

import { z } from 'zod';

// ===== PROVINCE SCHEMAS =====

/** Schema cho Province ID */
export const ProvinceIdSchema = z.string().min(1).max(50);

/** Schema cho Province Name */
export const ProvinceNameSchema = z.string().min(1).max(100);

/** Schema cho Province object */
export const ProvinceSchema = z.object({
    id: ProvinceIdSchema,
    name: ProvinceNameSchema,
    path: z.string().min(1), // SVG path
    neighbors: z.array(ProvinceIdSchema),
});

// ===== QUIZ SCHEMAS =====

/** Schema cho Quiz Question */
export const QuizQuestionSchema = z.object({
    question: z.string().min(1),
    options: z.array(z.string()).length(4),
    correctAnswer: z.string(),
    imageUrl: z.string().optional(),
});

/** Schema cho Quiz array (5 questions) */
export const QuizQuestionsSchema = z.array(QuizQuestionSchema).length(5);

// ===== GAME STATE SCHEMAS =====

/** Schema cho Journal Entry */
export const JournalEntrySchema = z.object({
    provinceId: ProvinceIdSchema,
    provinceName: ProvinceNameSchema,
    conqueredAt: z.number().int().positive(),
    score: z.number().int().min(0).max(5),
});

/** Schema cho Game State (to save/load) */
export const GameStateSchema = z.object({
    unlocked: z.array(ProvinceIdSchema),
    conquered: z.array(ProvinceIdSchema),
    journal: z.array(JournalEntrySchema),
});

// ===== API SCHEMAS =====

/** Schema cho Quiz API response */
export const QuizApiResponseSchema = z.object({
    questions: z.array(QuizQuestionSchema),
});

/** Schema cho Error Response */
export const ErrorResponseSchema = z.object({
    error: z.string(),
    message: z.string().optional(),
    statusCode: z.number().optional(),
});

// ===== TYPE EXPORTS =====

/** Inferred types từ schemas để sử dụng trong code */
export type ProvinceSchemaType = z.infer<typeof ProvinceSchema>;
export type QuizQuestionSchemaType = z.infer<typeof QuizQuestionSchema>;
export type JournalEntrySchemaType = z.infer<typeof JournalEntrySchema>;
export type GameStateSchemaType = z.infer<typeof GameStateSchema>;

// ===== VALIDATION HELPERS =====

/**
 * Validate và parse data với schema
 * Throw error nếu validation fail
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
    return schema.parse(data);
}

/**
 * Safe validation - trả về result object thay vì throw
 */
export function safeValidateData<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): { success: true; data: T } | { success: false; error: z.ZodError } {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return { success: false, error: result.error };
}
