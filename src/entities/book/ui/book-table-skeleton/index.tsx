import React from 'react';

import { Skeleton } from '@shared/ui';

import type { JSX } from 'react';

interface TableSkeletonProps {
    headerHeight: number;
    itemHeight: number;
    itemsCount: number;
}

interface SkeletonProps {
    height: number;
    className?: string;
}

const BookRowTableSkeleton = ({ height, className }: SkeletonProps): JSX.Element => {
    return <Skeleton className={`h-[${height}px] bg-gray-100 animate-pulse rounded-none border-b ${className}`} />;
};

const BookTableSkeleton = ({ headerHeight, itemHeight, itemsCount }: TableSkeletonProps): JSX.Element => {
    return (
        <Skeleton className='w-full animate-pulse'>
            <Skeleton className={`h-[${headerHeight}px] bg-gray-200 rounded-md mb-4`} />
            {Array.from({ length: itemsCount }).map((_, i) => (
                <BookRowTableSkeleton key={i} height={itemHeight} />
            ))}
        </Skeleton>
    );
};

export { BookRowTableSkeleton, BookTableSkeleton };
