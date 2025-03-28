import { useInfiniteQuery } from '@tanstack/react-query';

import { useSearchBookStore } from './use-search-book-store';

// TODO fix return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useInfiniteBooks = () => {
    const { locale, seed, likes, reviews } = useSearchBookStore((state) => state);

    return useInfiniteQuery({
        queryKey: ['infinite-books', locale.value, seed, likes, reviews],
        queryFn: async ({ pageParam = 0 }) => {
            const params = new URLSearchParams({
                page: pageParam.toString(),
                seed: seed.toString(),
                locale: locale.value,
                likes: likes.toString(),
                reviews: reviews.toString(),
            });

            const response = await fetch(`/api/book?${params}`);
            return response.json();
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};
