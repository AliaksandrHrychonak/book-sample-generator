'use client';

import { type JSX, type ReactNode, useEffect, useRef, useState } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { Config } from '@shared/config';

import { SearchBookStoreContext } from './search-book-store-context';

import type { StoreApi } from 'zustand';

const { BOOK_LIKES_DEFAULT, BOOK_REVIEWS_DEFAULT, BOOK_SEED_DEFAULT, BOOK_LOCALE_TITLE_DEFAULT, BOOK_LOCALE_DEFAULT } =
    Config;

export interface IBookStoreState {
    likes: number;
    reviews: number;
    seed: number;
    locale: { value: string; title: string };
}

const initialState: IBookStoreState = {
    likes: BOOK_LIKES_DEFAULT,
    reviews: BOOK_REVIEWS_DEFAULT,
    seed: BOOK_SEED_DEFAULT,
    locale: { value: BOOK_LOCALE_DEFAULT, title: BOOK_LOCALE_TITLE_DEFAULT },
};

export interface ISearchBookStore extends IBookStoreState {
    setLikes: (likes: number) => void;
    setReviews: (reviews: number) => void;
    setSeed: (seed: number) => void;
    setLocale: (locale: { value: string; title: string }) => void;
    reset: () => void;
    get: () => {
        likes: number;
        reviews: number;
        seed: number;
        locale: { value: string; title: string };
    };
    set: (values: { likes: number; reviews: number; seed: number; locale: { value: string; title: string } }) => void;
}

export const SearchBookStoreProvider = ({ children }: { children: ReactNode }): JSX.Element | null => {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const storeRef = useRef<StoreApi<ISearchBookStore>>(null);
    if (!storeRef.current) {
        storeRef.current = create<ISearchBookStore>()(
            persist(
                (set, get) => ({
                    ...initialState,
                    setLikes: (likes): void => set({ likes }),
                    setReviews: (reviews): void => set({ reviews }),
                    setSeed: (seed): void => set({ seed }),
                    setLocale: (locale): void => set({ locale }),
                    reset: (): void => set(initialState),
                    get: (): {
                        likes: number;
                        reviews: number;
                        seed: number;
                        locale: { value: string; title: string };
                    } => ({
                        likes: get().likes,
                        reviews: get().reviews,
                        seed: get().seed,
                        locale: get().locale,
                    }),
                    set: (values): void =>
                        set({
                            likes: values.likes,
                            reviews: values.reviews,
                            seed: values.seed,
                            locale: values.locale,
                        }),
                }),
                {
                    // TODO fix cast
                    name: 'book-search-store',
                    storage: createJSONStorage(() => sessionStorage),
                }
            )
        );
    }

    if (!isHydrated) {
        return null;
    }

    return (
        <SearchBookStoreContext.Provider value={{ store: storeRef.current }}>
            {children}
        </SearchBookStoreContext.Provider>
    );
};
