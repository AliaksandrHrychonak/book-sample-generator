import { CalendarIcon, BookOpen, Star, ShoppingCart, ThumbsUp, MessageSquare } from 'lucide-react';
import Image from 'next/image';

import { Badge, Button, Card, CardContent, CardHeader } from '@shared/ui';

import type { Book } from '../../model';
import type { FC } from 'react';

interface BookCardProps {
    book: Book;
}

export const BookCard: FC<BookCardProps> = ({ book }) => {
    return (
        <Card className='w-full overflow-hidden h-full transition-shadow z-10 bg-transparent border-0 outline-0 shadow-none'>
            <div className='flex flex-col lg:flex-row p-4 lg:p-6'>
                <div className='relative overflow-hidden rounded-md p-4 lg:p-6 h-[200px] lg:h-[300px] w-full lg:w-[280px] mb-4 lg:mb-0'>
                    <div
                        className='absolute inset-0'
                        style={{
                            background: book.coverOverlay,
                        }}
                    />
                    <Image
                        src={book.cover}
                        alt={book.title}
                        width={280}
                        height={300}
                        loading='lazy'
                        className='object-cover transition-transform hover:scale-105 w-full h-full relative z-10'
                        onError={(e) => {
                            const target = e.target as HTMLElement;
                            target.style.display = 'none';
                        }}
                    />
                    <Badge className='absolute top-5 left-5 bg-primary/80 truncate max-w-[180px] lg:max-w-[210px] z-20'>
                        {book.title}
                    </Badge>
                    {book.metadata.series && (
                        <Badge className='absolute top-12 left-5 bg-primary/80 truncate max-w-[180px] lg:max-w-[210px] z-20'>
                            Series: {book.metadata.series.name} #{book.metadata.series.position}
                        </Badge>
                    )}
                    <Badge className='absolute bottom-5 right-5 bg-primary/80 truncate max-w-[180px] lg:max-w-[210px] z-20'>
                        {book.author}
                    </Badge>
                </div>

                <div className='flex flex-col flex-1 p-2 lg:p-6 gap-2'>
                    <CardHeader className='space-y-2 p-0'>
                        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-2'>
                            <h3 className='font-semibold text-base lg:text-lg line-clamp-2'>{book.title}</h3>
                            <div className='flex flex-wrap gap-2'>
                                <Badge
                                    className='h-6'
                                    variant={book.availability.inStock ? 'secondary' : 'destructive'}
                                >
                                    {book.availability.inStock
                                        ? `In Stock (${book.availability.quantity})`
                                        : 'Out of Stock'}
                                </Badge>
                                <Button size='sm' className='flex items-center gap-2 h-6'>
                                    <ShoppingCart className='w-4 h-4' />
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                        <p className='line-clamp-2 text-sm lg:text-base text-wrap'>{book.description}</p>
                        <p className='text-muted-foreground text-sm'>{book.author}</p>
                    </CardHeader>

                    <div className='flex flex-wrap items-center gap-3 lg:gap-4 text-sm'>
                        <div className='flex items-center gap-1 lg:gap-2'>
                            <Star className='w-3 h-3 lg:w-4 lg:h-4 text-yellow-500' />
                            <span>{book.rating.average}</span>
                        </div>
                        <div className='flex items-center gap-1 lg:gap-2'>
                            <ThumbsUp className='w-3 h-3 lg:w-4 lg:h-4' />
                            <span>{book.likes.length}</span>
                        </div>
                        <div className='flex items-center gap-1 lg:gap-2'>
                            <MessageSquare className='w-3 h-3 lg:w-4 lg:h-4' />
                            <span>{book.reviews.length}</span>
                        </div>
                    </div>

                    <div className='flex flex-wrap items-center gap-2 text-xs lg:text-sm text-muted-foreground'>
                        <BookOpen className='w-3 h-3 lg:w-4 lg:h-4' />
                        <span>
                            {book.pageCount} pages ({book.format})
                        </span>
                        <CalendarIcon className='w-3 h-3 lg:w-4 lg:h-4 ml-1' />
                        <span>{new Date(book.publicationDate).getFullYear()}</span>
                    </div>

                    <div className='text-xs lg:text-sm'>
                        <p className='font-semibold'>Dimensions:</p>
                        <p className='text-muted-foreground'>
                            {book.dimensions.width}x{book.dimensions.height}x{book.dimensions.thickness}cm,
                            {book.dimensions.weight}kg
                        </p>
                    </div>

                    <div className='flex flex-wrap gap-1 lg:gap-2'>
                        {book.genres.map((genre, idx) => (
                            <Badge key={idx} variant='outline' className='text-xs'>
                                {genre}
                            </Badge>
                        ))}
                        {book.metadata.ageRating && (
                            <Badge variant='secondary' className='text-xs'>
                                Age Rating: {book.metadata.ageRating}
                            </Badge>
                        )}
                    </div>
                </div>
            </div>

            {!!book.reviews.length && (
                <CardContent className='space-y-3 lg:space-y-4'>
                    <p className='font-semibold text-sm lg:text-base'>Reviews:</p>
                    <ul className='space-y-2 lg:space-y-3'>
                        {book.reviews.map((review, idx) => (
                            <li key={idx} className='text-xs lg:text-sm border-l-2 pl-2'>
                                <p className='font-medium'>{review.name}</p>
                                <p className='text-muted-foreground'>{review.description}</p>
                                <p className='text-xs text-muted-foreground'>
                                    {new Date(review.created_at).toLocaleDateString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            )}
        </Card>
    );
};
