import type { Book } from '@entities/book';
import type { ColumnDef } from '@tanstack/react-table';

export const createTableColumns = (): ColumnDef<Book>[] => [
    {
        accessorKey: 'id',
        header: '#',
    },
    {
        accessorKey: 'isbn',
        header: 'Isbn',
    },
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'author',
        header: 'Author(s)',
    },
    {
        accessorKey: 'publisher',
        header: 'Publisher',
    },
];
