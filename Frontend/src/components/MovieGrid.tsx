import MovieCard from "./MovieCard";
import type { TmdbMovie } from "../shared/types/tmdb.types";

interface MovieGridProps {
  movies?: TmdbMovie[];
}

export default function MovieGrid({ movies = [] }: MovieGridProps) {
  if (movies.length === 0) {
    return <p className="text-white">Aucun film trouvé</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          title={movie.title}
          year={movie.release_date?.split("-")[0] ?? "N/A"}
          posterPath={movie.poster_path}
          movieId={movie.id}
        />
      ))}
    </div>
  );
}
