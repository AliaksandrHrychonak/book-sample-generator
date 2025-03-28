'use client';

import { createContext } from 'react';

import type { ISearchBookStore } from './search-book-store-provider';
import type { StoreApi } from 'zustand/index';

interface ISearchBookStoreContext {
    store: StoreApi<ISearchBookStore>;
}

export const SearchBookStoreContext = createContext<ISearchBookStoreContext | null>(null);
