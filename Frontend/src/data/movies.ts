export type Movie = {
  id: string;
  title: string;
  overview?: string;
  description?: string;
  backdropUrl?: string;
  genre: string[];
  isFeatured?: boolean;
};

export type Category = {
  id: string;
  name: string;
  movieIds: string[];
};

export const movies: Movie[] = [
  {
    id: '1',
    title: 'The First Movie',
    overview: 'This is the first movie in the catalogue.',
    description: 'An epic adventure that starts it all.',
    backdropUrl: '',
    genre: ['Action', 'Adventure'],
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Second Movie',
    overview: 'Another story to watch.',
    description: 'A thrilling sequel with twists.',
    backdropUrl: '',
    genre: ['Drama', 'Thriller'],
  },
  {
    id: '3',
    title: 'Third Movie',
    overview: 'A thrilling continuation.',
    description: 'The final chapter in the saga.',
    backdropUrl: '',
    genre: ['Action', 'Drama'],
  },
];

export const categories: Category[] = [
  { id: 'action', name: 'Action', movieIds: ['1', '2'] },
  { id: 'drama', name: 'Drama', movieIds: ['2', '3'] },
];
