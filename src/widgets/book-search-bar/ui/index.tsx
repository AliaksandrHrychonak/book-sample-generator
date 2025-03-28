'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { debounce, type DebouncedFunc } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { BookSearchFormSchema, useSearchBookStore } from '@entities/book';
import { BookLikesFilter, BookLocaleFilter, BookReviewsFilter, BookSeedFilter } from '@features/book';
import { FormFieldProvider } from '@shared/lib';
import { Form } from '@shared/ui';

import type { BookSearchFormData } from '@entities/book';
import type { JSX } from 'react';

export const BookSearchBar = (): JSX.Element => {
    // TODO fix naming set,get
    const { set, get } = useSearchBookStore((state) => state);

    const form = useForm<BookSearchFormData>({
        resolver: zodResolver(BookSearchFormSchema),
        defaultValues: get(),
        mode: 'onChange',
    });

    const { trigger, watch, getValues, control } = form;

    const debouncedSubmit = useMemo(
        () =>
            debounce(async (data: BookSearchFormData) => {
                try {
                    const isValid = await trigger();
                    if (isValid) {
                        set(data);
                    }
                } catch (error) {
                    toast.error(JSON.stringify(error));
                }
            }, 200) as DebouncedFunc<(data: BookSearchFormData) => void>,
        [set, trigger]
    );

    useEffect(() => {
        const subscription = watch(() => {
            const data = getValues();
            debouncedSubmit(data);
        });

        return (): void => {
            subscription.unsubscribe();
            debouncedSubmit.cancel();
        };
    }, [debouncedSubmit, getValues, watch]);

    return (
        <section className='flex justify-center'>
            <Form {...form}>
                <form
                    noValidate
                    className='w-full max-w-[1440px] grid items-center gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 '
                >
                    <FormFieldProvider
                        control={control}
                        name='locale'
                        render={(props) => <BookLocaleFilter {...props} />}
                    />
                    <FormFieldProvider
                        control={control}
                        name='seed'
                        render={(props) => <BookSeedFilter {...props} />}
                    />
                    <FormFieldProvider
                        control={control}
                        name='likes'
                        render={(props) => <BookLikesFilter {...props} />}
                    />
                    <FormFieldProvider
                        control={control}
                        name='reviews'
                        render={(props) => <BookReviewsFilter {...props} />}
                    />
                </form>
            </Form>
        </section>
    );
};
