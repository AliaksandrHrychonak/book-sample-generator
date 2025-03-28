import { useEffect, useState } from 'react';

import type { RefObject } from 'react';

export const useRowHeightMeasurement = (
    cardRefs: RefObject<Map<string, HTMLTableCellElement>>,
    expandedRows: Set<string>
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
) => {
    const [rowHeights, setRowHeights] = useState<Record<string, number>>({});

    useEffect(() => {
        const newHeights: Record<string, number> = {};
        cardRefs.current.forEach((node: HTMLTableCellElement, rowId: string) => {
            if (node) {
                newHeights[rowId] = node.getBoundingClientRect().height + 33;
            }
        });
        setRowHeights(newHeights);
    }, [cardRefs, expandedRows]);

    return rowHeights;
};
