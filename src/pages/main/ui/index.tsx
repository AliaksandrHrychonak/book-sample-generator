import { SearchBookStoreProvider } from '@entities/book';
import { BookList } from '@widgets/book-list';
import { BookSearchBar } from '@widgets/book-search-bar';

import type { FC, JSX } from 'react';

export const MainPage: FC = (): JSX.Element => {
    return (
        <SearchBookStoreProvider>
            <main className='grid pt-20 pr-20 pl-20 max-[900px]:pr-5 max-[900px]:pl-5'>
                <BookSearchBar />
                <BookList />
            </main>
        </SearchBookStoreProvider>
    );
};

export default MainPage;
