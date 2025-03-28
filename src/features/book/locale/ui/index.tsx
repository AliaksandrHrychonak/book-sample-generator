import { Command } from 'cmdk';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { configLocales } from '@entities/book';
import { cn } from '@shared/lib';
import {
    Button,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@shared/ui';

import type { BookSearchFormData } from '@entities/book';
import type { JSX } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

interface BookLocaleControllerProps {
    field: ControllerRenderProps<BookSearchFormData, 'locale'>;
}

export const BookLocaleFilter = ({ field }: BookLocaleControllerProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);

    // TODO fix to hook
    useEffect(() => {
        const handleScrollAndResize = (): void => {
            if (isOpen) setIsOpen(false);
        };

        window.addEventListener('scroll', handleScrollAndResize);
        window.addEventListener('resize', handleScrollAndResize);

        return (): void => {
            window.removeEventListener('scroll', handleScrollAndResize);
            window.removeEventListener('resize', handleScrollAndResize);
        };
    }, [isOpen]);

    return (
        <FormItem className='flex flex-col min-w-[180px]'>
            <FormLabel>Locale and languages</FormLabel>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant='outline'
                            role='combobox'
                            className={cn('justify-between', !field.value && 'text-muted-foreground')}
                            ref={triggerRef}
                        >
                            {field.value
                                ? configLocales.find((locale) => locale.value === field.value.value)?.title
                                : 'Select locale'}
                            <ChevronsUpDown className='opacity-50' />
                        </Button>
                    </FormControl>
                </PopoverTrigger>
                <PopoverContent className='p-0' sideOffset={1} style={{ width: triggerRef.current?.offsetWidth }}>
                    <Command>
                        <CommandInput placeholder='Search locale...' className='h-9' />
                        <CommandList>
                            <CommandEmpty>No locale found.</CommandEmpty>
                            <CommandGroup>
                                {configLocales.map((locale) => (
                                    <CommandItem
                                        value={locale.title}
                                        key={locale.value}
                                        onSelect={() => {
                                            field.onChange(locale);
                                        }}
                                    >
                                        {locale.title}
                                        <Check
                                            className={cn(
                                                'ml-auto',
                                                locale.value === field.value.value ? 'opacity-100' : 'opacity-0'
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <FormMessage />
        </FormItem>
    );
};
