import { en, Faker, de, fr } from '@faker-js/faker';

import type { LocaleDefinition } from '@faker-js/faker';

const getDefinitionFaker = (locale: string): LocaleDefinition => {
    switch (locale) {
        case 'de':
            return de;
        case 'fr':
            return fr;
        default:
            return en;
    }
};

export const createFaker = (locale: string, seed: number): Faker => {
    const faker = new Faker({
        locale: [getDefinitionFaker(locale), en],
    });

    faker.seed(seed);

    return faker;
};
