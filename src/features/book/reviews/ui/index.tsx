import { configReviews } from '@entities/book';
import { FormControl, FormItem, FormLabel, FormMessage, Input } from '@shared/ui';

import type { BookSearchFormData } from '@entities/book';
import type { JSX } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

interface BookReviewsControllerProps {
    field: ControllerRenderProps<BookSearchFormData, 'reviews'>;
}

export const BookReviewsFilter = ({ field }: BookReviewsControllerProps): JSX.Element => {
    return (
        <FormItem className='flex flex-col min-w-[180px]'>
            <FormLabel>Reviews</FormLabel>
            <FormControl>
                <Input
                    type='number'
                    step={configReviews.step}
                    min={configReviews.min}
                    max={configReviews.max}
                    {...field}
                />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};
