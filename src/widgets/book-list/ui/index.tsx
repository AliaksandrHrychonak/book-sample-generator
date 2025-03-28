'use client';

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useMemo, useRef } from 'react';

import { BookCard, BookRowTableSkeleton, BookTableSkeleton } from '@entities/book';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui';

import {
    useInfiniteBooks,
    createTableColumns,
    useExpandedRows,
    useInfiniteTableScroll,
    useRowHeightMeasurement,
    useTableVirtualization,
} from '../model';

import type { Book } from '@entities/book';
import type { Row } from '@tanstack/react-table';
import type { JSX } from 'react';

export const BookList = (): JSX.Element => {
    const cardRefs = useRef<Map<string, HTMLTableCellElement>>(new Map());
    const { expandedRows, handleRowClick } = useExpandedRows();
    const rowHeights = useRowHeightMeasurement(cardRefs, expandedRows);
    const { data, fetchNextPage, isFetching, isLoading } = useInfiniteBooks();
    const { fetchMoreOnBottomReached } = useInfiniteTableScroll(fetchNextPage, isFetching);

    const columns = useMemo(() => createTableColumns(), []);
    const flatData = useMemo(() => data?.pages?.flatMap((page) => page.data) ?? [], [data]);

    const table = useReactTable({
        data: flatData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
    });

    const { rows } = table.getRowModel();
    const { tableContainerRef, rowVirtualizer, getRowHeight } = useTableVirtualization(rows, expandedRows, rowHeights);

    if (isLoading) {
        return <BookTableSkeleton headerHeight={40} itemHeight={33} itemsCount={20} />;
    }

    return (
        <section
            ref={tableContainerRef}
            style={{
                overflow: 'auto',
                position: 'relative',
                height: '700px',
            }}
            className='w-full max-w-[1440px] mx-auto overflow-x-auto border rounded'
            onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
        >
            <Table className='w-full min-w-[800px] table-fixed'>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody
                    className='grid w-full'
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const row = rows[virtualRow.index] as Row<Book>;
                        return (
                            <TableRow
                                data-index={virtualRow.index}
                                ref={(node) => rowVirtualizer.measureElement(node)}
                                key={row.id}
                                className='absolute flex w-full overflow-hidden h-full'
                                onClick={() => handleRowClick(row)}
                                style={{
                                    transform: `translateY(${virtualRow.start}px)`,
                                    maxHeight: `${getRowHeight(row.id)}px`,
                                }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell
                                        key={cell.id}
                                        className='text-left flex-1'
                                        style={{
                                            width: cell.column.getSize(),
                                        }}
                                    >
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                                {expandedRows.has(row.id) && (
                                    <TableCell
                                        className='absolute inset-x-0 top-[33px] w-full border-0 p-0 rounded-0'
                                        ref={(node) => {
                                            if (node) cardRefs.current.set(row.id, node);
                                        }}
                                    >
                                        <BookCard book={row.original} />
                                    </TableCell>
                                )}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            {isFetching && (
                <>
                    <BookRowTableSkeleton height={33} />
                    <BookRowTableSkeleton height={33} />
                    <BookRowTableSkeleton height={33} />
                </>
            )}
        </section>
    );
};
