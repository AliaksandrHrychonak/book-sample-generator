import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useRef } from 'react';

import type { Book } from '@entities/book';
import type { Row } from '@tanstack/react-table';

// TODO add return type
export const useTableVirtualization = (
    rows: Row<Book>[],
    expandedRows: Set<string>,
    rowHeights: Record<string, number>
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
    const tableContainerRef = useRef<HTMLElement>(null);

    const getRowHeight = useCallback(
        (rowId: string) => (expandedRows.has(rowId) ? rowHeights[rowId] || 700 : 33),
        [expandedRows, rowHeights]
    );

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        estimateSize: (index) => {
            const row = rows[index];
            return row?.id ? getRowHeight(row.id) : 33;
        },
        getScrollElement: () => tableContainerRef.current,
        overscan: 5,
    });

    return { tableContainerRef, rowVirtualizer, getRowHeight };
};
