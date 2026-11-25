export type AuthorType = {
  id: string;
  name: string;
};

export interface BookProps {
  id: string;
  title: string;
  type: string;
  district?: string;
  publishedAt: string;
  stock: number;
  price: string;
  authors: { author: AuthorType }[];
  averageRating: number;
  ratings: number;
}

export interface shoppingCartItemProps extends BookProps {
  quantity: number;
}

export type BookDetailProps = Omit<
  BookProps,
  'authors' | 'averageRating' | 'ratings'
>;

export interface BookRatingsProps {
  bookId: string;
  userId: string;
  score: number;
  ratedAt: string;
  user: {
    id: string;
    nickname: string;
  };
}

export const starLabels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

export const PAGE_SIZE = 6;

export const OFFER_TYPE_VALUES = [
  'Hôtel',
  'Appartement',
  'Chambre d\'hôte',
  'Restaurant',
  'Excursion',
];

export const SORT_OPTIONS = [
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'rating_desc', label: 'Best rated first' },
  { value: 'reviews_desc', label: 'Most reviewed' },
  { value: 'newest', label: 'Newest first' },
] as const;

export const SORT_VALUE = SORT_OPTIONS.map((option) => option.value);
