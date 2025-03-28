import { useCallback } from 'react';

// TODO add return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useInfiniteTableScroll = (fetchNextPage: () => void, isFetching: boolean) => {
    const fetchMoreOnBottomReached = useCallback(
        (containerRefElement?: HTMLElement | null) => {
            if (containerRefElement) {
                const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
                if (scrollHeight - scrollTop - clientHeight < 230 && !isFetching) {
                    fetchNextPage();
                }
            }
        },
        [fetchNextPage, isFetching]
    );

    return { fetchMoreOnBottomReached };
};
