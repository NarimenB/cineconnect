import MovieCard from './MovieCard';
import { OmdbMovie } from '../shared/types/omdb.types';

interface MovieGridProps {
  movies?: OmdbMovie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return <p className="text-white">Aucun film trouvé</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {movies.map((movie: OmdbMovie) => (
        <MovieCard
          key={movie.imdbID}
          title={movie.Title}
          year={movie.Year}
          poster={movie.Poster}
          imdbID={movie.imdbID}
        />
      ))}
    </div>
  );
}