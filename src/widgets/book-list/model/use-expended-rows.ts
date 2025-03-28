import { useState } from 'react';

import type { Book } from '@entities/book';
import type { Row } from '@tanstack/react-table';

// TODO add return type
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useExpandedRows = () => {
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

    const handleRowClick = (row: Row<Book>): void => {
        const rowId = row.id;
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(rowId)) {
            newExpandedRows.delete(rowId);
        } else {
            newExpandedRows.add(rowId);
        }
        setExpandedRows(newExpandedRows);
    };

    return { expandedRows, handleRowClick };
};
