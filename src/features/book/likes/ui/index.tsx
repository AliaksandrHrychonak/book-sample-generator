import { configLikes } from '@entities/book';
import { FormControl, FormItem, FormLabel, FormMessage, Slider } from '@shared/ui';

import type { BookSearchFormData } from '@entities/book';
import type { JSX } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

interface BookLikesControllerProps {
    field: ControllerRenderProps<BookSearchFormData, 'likes'>;
}

export const BookLikesFilter = ({ field }: BookLikesControllerProps): JSX.Element => {
    return (
        <FormItem className='flex flex-col min-w-[180px]'>
            <FormLabel>Likes</FormLabel>
            <FormControl>
                <Slider min={configLikes.min} max={configLikes.max} step={configLikes.step} {...field} />
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};
