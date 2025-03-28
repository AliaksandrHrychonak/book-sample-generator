import { useContext } from 'react';
import { useStore as useZustandStore } from 'zustand';

import { SearchBookStoreContext } from './search-book-store-context';

import type { ISearchBookStore } from './search-book-store-provider';

export function useSearchBookStore<T>(selector: (store: ISearchBookStore) => T): T {
    const context = useContext(SearchBookStoreContext);
    if (!context) throw new Error('useSearchBookStore must be used within SearchBookStoreProvider');
    return useZustandStore(context.store, selector);
}
