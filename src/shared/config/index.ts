export * from './theme';

export const Config = {
    SCROLL_ITEMS_INITIAL: parseInt(process.env.NEXT_PUBLIC_SCROLL_ITEMS_INITIAL ?? '20'),
    SCROLL_ITEMS_PER_PAGE: parseInt(process.env.NEXT_PUBLIC_SCROLL_ITEMS_PER_PAGE ?? '10'),

    BOOK_SEED_DEFAULT: parseInt(process.env.NEXT_PUBLIC_BOOK_SEED_DEFAULT ?? '2134'),
    BOOK_LOCALE_DEFAULT: process.env.NEXT_PUBLIC_BOOK_LOCALE_DEFAULT ?? 'en',
    BOOK_LOCALE_TITLE_DEFAULT: process.env.NEXT_PUBLIC_BOOK_LOCALE_TITLE_DEFAULT ?? 'English',

    BOOK_LIKES_DEFAULT: parseFloat(process.env.NEXT_PUBLIC_BOOK_LIKES_DEFAULT ?? ''),
    BOOK_REVIEWS_DEFAULT: parseFloat(process.env.NEXT_PUBLIC_BOOK_REVIEWS_DEFAULT ?? ''),
    BOOK_SEED_MULTIPLIER: parseInt(process.env.NEXT_PUBLIC_BOOK_SEED_MULTIPLIER ?? '1000'),

    TABLE_HEADER_HEIGHT: parseInt(process.env.NEXT_PUBLIC_TABLE_HEADER_HEIGHT ?? '44'),
    TABLE_ROW_HEIGHT: parseInt(process.env.NEXT_PUBLIC_TABLE_ROW_HEIGHT ?? '33'),
    TABLE_CONTAINER_HEIGHT: parseInt(process.env.NEXT_PUBLIC_TABLE_CONTAINER_HEIGHT ?? '700'),

    BOOK_LIKES_MIN: parseInt(process.env.NEXT_PUBLIC_BOOK_LIKES_MIN ?? '0'),
    BOOK_LIKES_MAX: parseInt(process.env.NEXT_PUBLIC_BOOK_LIKES_MAX ?? '10'),
    BOOK_LIKES_STEP: parseFloat(process.env.NEXT_PUBLIC_BOOK_LIKES_STEP ?? '0.1'),

    BOOK_SEED_MIN: parseInt(process.env.NEXT_PUBLIC_BOOK_SEED_MIN ?? '-999999'),
    BOOK_SEED_MAX: parseInt(process.env.NEXT_PUBLIC_BOOK_SEED_MAX ?? '999999'),
    BOOK_SEED_STEP: parseFloat(process.env.NEXT_PUBLIC_BOOK_SEED_STEP ?? '1'),

    BOOK_REVIEWS_MIN: parseInt(process.env.NEXT_PUBLIC_BOOK_REVIEWS_MIN ?? '0'),
    BOOK_REVIEWS_MAX: parseInt(process.env.NEXT_PUBLIC_BOOK_REVIEWS_MAX ?? '10'),
    BOOK_REVIEWS_STEP: parseFloat(process.env.NEXT_PUBLIC_BOOK_REVIEWS_STEP ?? '0.1'),
};

export type Config = typeof Config;
