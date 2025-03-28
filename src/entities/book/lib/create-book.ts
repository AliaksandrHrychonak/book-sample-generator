import { createISBN } from '@entities/book/lib/create-isbn';
import { Config } from '@shared/config';
import { createFaker } from '@shared/lib';

import type { Book } from '@entities/book';
import type { Faker } from '@faker-js/faker';

const calculateAdjustedAverage = (faker: Faker, avg: number): number => {
    if (avg === 0) return 0;
    if (Number.isInteger(avg)) return avg;

    return faker.number.float() < avg % 1 ? Math.ceil(avg) : Math.floor(avg);
};

export const createBook = ({
    currentLocale,
    currentSeed,
    id,
    page,
    likes,
    reviews,
}: {
    currentLocale: string;
    currentSeed: number;
    id: number;
    page: number;
    likes: number;
    reviews: number;
}): Book => {
    const isbn = createISBN(currentLocale);
    const index = (page === 0 ? 0 : Config.SCROLL_ITEMS_INITIAL + (page - 1) * Config.SCROLL_ITEMS_PER_PAGE) + id;
    const faker = createFaker(currentLocale, currentSeed * 1000 + index);

    return {
        id: index + 1,
        title: [faker.word.adjective(), faker.word.noun(), Math.random() > 0.5 ? faker.word.noun() : '']
            .filter(Boolean)
            .join(' '),
        author: faker.person.fullName(),
        isbn: isbn,
        publisher: faker.company.name(),
        cover: faker.image.urlPicsumPhotos({ width: 280, height: 300, blur: 0 }),
        coverOverlay: `linear-gradient(135deg, ${faker.color.rgb()}, ${faker.color.rgb()})`,
        pageCount: faker.number.int({ min: 50, max: 1000 }),
        likes: Array.from({ length: calculateAdjustedAverage(faker, likes) }, (_, i) => ({
            id: i + 1,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            company: faker.company.name(),
        })),
        reviews: Array.from({ length: calculateAdjustedAverage(faker, reviews) }, (_, i) => ({
            id: i + 1,
            name: faker.person.fullName(),
            email: faker.internet.email(),
            company: faker.company.name(),
            description: faker.lorem.paragraph(),
            created_at: faker.date.past().toISOString(),
        })),
        language: currentLocale,
        publicationDate: faker.date.past().toISOString(),
        genres: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => faker.book.genre()),
        description: faker.lorem.paragraphs(),
        dimensions: {
            width: faker.number.float({ min: 10, max: 30, fractionDigits: 1 }),
            height: faker.number.float({ min: 15, max: 40, fractionDigits: 1 }),
            thickness: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
            weight: faker.number.float({ min: 0.2, max: 2, fractionDigits: 1 }),
        },
        format: faker.helpers.arrayElement(['hardcover', 'paperback', 'ebook']),
        edition: `${faker.number.int({ min: 1, max: 10 })}th`,
        price: {
            amount: faker.number.float({ min: 5, max: 100, fractionDigits: 1 }),
            currency: faker.finance.currencyCode(),
        },
        rating: {
            average: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
            totalRatings: faker.number.int({ min: 0, max: 1000 }),
        },
        availability: {
            inStock: faker.datatype.boolean(),
            quantity: faker.number.int({ min: 0, max: 100 }),
            expectedDate: faker.datatype.boolean() ? faker.date.future().toISOString() : undefined,
        },
        metadata: {
            keywords: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () => faker.word.sample()),
            categories: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () => faker.commerce.department()),
            ageRating: faker.helpers.arrayElement(['G', 'PG', 'PG-13', 'R', undefined]),
            series: faker.datatype.boolean()
                ? {
                      name: faker.commerce.productName(),
                      position: faker.number.int({ min: 1, max: 10 }),
                  }
                : undefined,
        },
    };
};
