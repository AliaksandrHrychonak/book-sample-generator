// TODO store in user entities
export interface IUser {
    id: number;
    name: string;
    email: string;
    company: string;
}

export interface IUserReview extends IUser {
    description: string;
    created_at: string;
}

export interface Book {
    id: number;
    title: string;
    isbn: string;
    author: string;
    publisher: string;
    likes: IUser[];
    reviews: IUserReview[];
    cover: string;
    coverOverlay: string;
    pageCount: number;
    language: string;
    publicationDate: string;
    genres: string[];
    description: string;
    dimensions: {
        width: number;
        height: number;
        thickness: number;
        weight: number;
    };
    // TODO need ENUM, locale adapter?
    format: 'hardcover' | 'paperback' | 'ebook';
    edition: string;
    price: {
        amount: number;
        currency: string;
    };
    rating: {
        average: number;
        totalRatings: number;
    };
    availability: {
        inStock: boolean;
        quantity: number;
        expectedDate?: string | undefined;
    };
    metadata: {
        keywords: string[];
        categories: string[];
        ageRating?: string | undefined;
        series?:
            | {
                  name: string;
                  position: number;
              }
            | undefined;
    };
}
