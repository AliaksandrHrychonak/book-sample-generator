import { Shuffle } from 'lucide-react';

import { configSeed } from '@entities/book';
import { Button, FormControl, FormItem, FormLabel, FormMessage, Input } from '@shared/ui';

import { generateRandomSeed } from '../lib';

import type { BookSearchFormData } from '@entities/book';
import type { JSX } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

interface BookSeedControllerProps {
    field: ControllerRenderProps<BookSearchFormData, 'seed'>;
}

export const BookSeedFilter = ({ field }: BookSeedControllerProps): JSX.Element => {
    return (
        <FormItem className='flex flex-col min-w-[180px]'>
            <FormLabel>Seed</FormLabel>
            <FormControl>
                <div className='relative'>
                    <Input
                        className='[&::-webkit-inner-spin-button]:opacity-0 [&::-webkit-outer-spin-button]:opacity-0 [&::-webkit-inner-spin-button]:pointer-events-none [&::-webkit-outer-spin-button]:pointer-events-none'
                        type='number'
                        min={configSeed.min}
                        max={configSeed.max}
                        step={configSeed.step}
                        {...field}
                    />
                    <Button
                        type='button'
                        variant='ghost'
                        size='icon'
                        className='h-[18px] w-[18px] p-0 rounded-xs absolute top-0 right-[12px] transform -translate-y-[-50%] cursor-pointer'
                        onClick={() =>
                            field.onChange(
                                generateRandomSeed({ min: configSeed.min, max: configSeed.max, step: configSeed.step })
                            )
                        }
                    >
                        <Shuffle />
                    </Button>
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    );
};
