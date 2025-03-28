import { Config } from '@shared/config';

const {
    BOOK_LIKES_MIN,
    BOOK_SEED_MIN,
    BOOK_REVIEWS_MIN,
    BOOK_REVIEWS_MAX,
    BOOK_LIKES_MAX,
    BOOK_SEED_MAX,
    BOOK_REVIEWS_STEP,
    BOOK_SEED_STEP,
    BOOK_LIKES_STEP,
    BOOK_LOCALE_DEFAULT,
    BOOK_LOCALE_TITLE_DEFAULT,
} = Config;

export const configLocales = [
    { value: BOOK_LOCALE_DEFAULT, title: BOOK_LOCALE_TITLE_DEFAULT },
    { value: 'fr', title: 'French' },
    { value: 'de', title: 'German' },
];

export const configLikes = {
    min: BOOK_LIKES_MIN,
    max: BOOK_LIKES_MAX,
    step: BOOK_LIKES_STEP,
};

export const configSeed = {
    min: BOOK_SEED_MIN,
    max: BOOK_SEED_MAX,
    step: BOOK_SEED_STEP,
};

export const configReviews = {
    min: BOOK_REVIEWS_MIN,
    max: BOOK_REVIEWS_MAX,
    step: BOOK_REVIEWS_STEP,
};
