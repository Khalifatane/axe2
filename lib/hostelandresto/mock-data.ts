import type { BookProps, BookRatingsProps } from "./const";

// Small local catalog used by `npm run dev` when no database is configured.
export const mockBooks: BookProps[] = [
  { id: "1", title: "Sheraton New York", type: "Hôtel", publishedAt: "2025-01-15T00:00:00.000Z", stock: 12, price: "349.00", authors: [{ author: { id: "1", name: "New York" } }], averageRating: 4.5, ratings: 24 },
  { id: "2", title: "Appartement Montmartre", type: "Appartement", publishedAt: "2025-02-10T00:00:00.000Z", stock: 8, price: "210.00", authors: [{ author: { id: "2", name: "Paris" } }], averageRating: 4.7, ratings: 38 },
  { id: "3", title: "Maison des Oliviers", type: "Chambre d'hôte", publishedAt: "2025-03-17T00:00:00.000Z", stock: 6, price: "145.00", authors: [{ author: { id: "3", name: "Provence" } }], averageRating: 4.3, ratings: 16 },
  { id: "4", title: "Le Petit Bistrot", type: "Restaurant", publishedAt: "2025-05-04T00:00:00.000Z", stock: 9, price: "79.00", authors: [{ author: { id: "4", name: "Lyon" } }], averageRating: 4.8, ratings: 41 },
  { id: "5", title: "Croisière Côte d'Azur", type: "Excursion", publishedAt: "2025-04-01T00:00:00.000Z", stock: 4, price: "162.50", authors: [{ author: { id: "5", name: "Nice" } }], averageRating: 4.2, ratings: 19 },
  { id: "6", title: "The House in the Cerulean Sea", type: "Hôtel", publishedAt: "2025-03-17T00:00:00.000Z", stock: 11, price: "175.00", authors: [{ author: { id: "6", name: "Maldives" } }], averageRating: 4.6, ratings: 27 },
  { id: "7", title: "Loft Canal Saint-Martin", type: "Appartement", publishedAt: "2025-01-01T00:00:00.000Z", stock: 5, price: "220.00", authors: [{ author: { id: "7", name: "Paris" } }], averageRating: 4.4, ratings: 32 },
  { id: "8", title: "Domaine des Pins", type: "Chambre d'hôte", publishedAt: "2025-10-02T00:00:00.000Z", stock: 7, price: "159.00", authors: [{ author: { id: "8", name: "Arcachon" } }], averageRating: 4.1, ratings: 8 },
  { id: "9", title: "Table du Marché", type: "Restaurant", publishedAt: "2025-08-30T00:00:00.000Z", stock: 14, price: "129.00", authors: [{ author: { id: "9", name: "Marseille" } }], averageRating: 4.8, ratings: 21 },
  { id: "10", title: "Randonnée dans les Calanques", type: "Excursion", publishedAt: "2025-04-05T00:00:00.000Z", stock: 10, price: "135.00", authors: [{ author: { id: "10", name: "Cassis" } }], averageRating: 4.7, ratings: 17 },
  { id: "11", title: "Appartement Vieux-Port", type: "Appartement", publishedAt: "2025-05-05T00:00:00.000Z", stock: 3, price: "180.00", authors: [{ author: { id: "11", name: "Marseille" } }], averageRating: 4.2, ratings: 12 },
  { id: "12", title: "Royal Palm Hôtel", type: "Hôtel", publishedAt: "2025-04-06T00:00:00.000Z", stock: 16, price: "109.00", authors: [{ author: { id: "12", name: "Maurice" } }], averageRating: 4.9, ratings: 53 },
];

export const mockBookTypes = [...new Set(mockBooks.map((book) => book.type))];

export const mockRatings: BookRatingsProps[] = mockBooks.flatMap((book) => [
  { bookId: book.id, userId: '1', score: Math.max(1, Math.round(book.averageRating)), ratedAt: '2025-01-12T00:00:00.000Z', user: { id: '1', nickname: 'Alex Morgan' } },
  { bookId: book.id, userId: '2', score: Math.min(5, Math.round(book.averageRating)), ratedAt: '2025-02-20T00:00:00.000Z', user: { id: '2', nickname: 'Sam Rivera' } },
]);
