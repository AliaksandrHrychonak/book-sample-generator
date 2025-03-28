import { Config } from '@shared/config';

import { createBook } from '../lib';

import type { Book } from '@entities/book';

const {
    BOOK_SEED_DEFAULT,
    BOOK_LOCALE_DEFAULT,
    BOOK_LIKES_DEFAULT,
    BOOK_REVIEWS_DEFAULT,
    SCROLL_ITEMS_PER_PAGE,
    SCROLL_ITEMS_INITIAL,
} = Config;

export async function GET(request: Request): Promise<Response> {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '0');
    const seed = parseInt(searchParams.get('seed') || BOOK_SEED_DEFAULT.toString());
    const locale = searchParams.get('locale') || BOOK_LOCALE_DEFAULT.toString();
    const avgLikes = parseFloat(searchParams.get('likes') || BOOK_LIKES_DEFAULT.toString());
    const avgReviews = parseFloat(searchParams.get('reviews') || BOOK_REVIEWS_DEFAULT.toString());

    const pageSize = page === 0 ? SCROLL_ITEMS_INITIAL : SCROLL_ITEMS_PER_PAGE;

    const books = (): Book[] =>
        Array.from({ length: pageSize }, (_, index) => {
            return createBook({
                id: index,
                page,
                currentLocale: locale,
                currentSeed: seed,
                likes: avgLikes,
                reviews: avgReviews,
            });
        });

    return Response.json({
        data: books(),
        nextPage: page + 1,
        hasMore: true,
    });
}
