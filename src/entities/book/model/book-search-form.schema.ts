import { z } from 'zod';

import { Config } from '@shared/config';

const { BOOK_LIKES_MIN, BOOK_SEED_MIN, BOOK_REVIEWS_MAX, BOOK_LIKES_MAX, BOOK_SEED_MAX } = Config;

export const localeSchema = z.object({
    locale: z.object({
        value: z.string({
            required_error: 'Locale value is required',
            invalid_type_error: 'Locale value must be a string',
        }),
        title: z.string({
            required_error: 'Locale title is required',
            invalid_type_error: 'Locale title must be a string',
        }),
    }),
});

export const likesSchema = z.object({
    likes: z
        .number({
            required_error: 'Number of likes is required',
            invalid_type_error: 'Number of likes must be a number',
        })
        .min(BOOK_LIKES_MIN, 'Number of likes cannot be negative')
        .max(BOOK_LIKES_MAX, 'Number of likes cannot exceed ' + BOOK_LIKES_MAX),
});

export const reviewsSchema = z.object({
    reviews: z
        .union([z.string(), z.number()])
        .transform((val) => {
            const num = typeof val === 'number' ? val : Number(val);
            if (isNaN(num)) {
                throw new Error('Reviews must be a valid number');
            }
            return num;
        })
        .pipe(
            z
                .number()
                .nonnegative('Number of reviews must be zero or positive')
                .max(BOOK_REVIEWS_MAX, 'Number of reviews cannot exceed ' + BOOK_REVIEWS_MAX)
        ),
});

export const seedSchema = z.object({
    seed: z
        .union([z.string(), z.number()])
        .transform((val) => {
            const num = typeof val === 'number' ? val : Number(val);
            if (isNaN(num)) {
                throw new Error('Seed must be a valid number');
            }
            return num;
        })
        .pipe(
            z
                .number()
                .int('Seed must be an integer')
                .min(BOOK_SEED_MIN, 'Seed cannot be less than ' + BOOK_SEED_MIN)
                .max(BOOK_SEED_MAX, 'Seed cannot exceed ' + BOOK_SEED_MAX)
        ),
});

export const BookSearchFormSchema = z.object({
    ...likesSchema.shape,
    ...localeSchema.shape,
    ...seedSchema.shape,
    ...reviewsSchema.shape,
});

export type BookSearchFormData = z.infer<typeof BookSearchFormSchema>;
