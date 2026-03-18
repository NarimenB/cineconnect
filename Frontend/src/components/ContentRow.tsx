import MovieCard from "./MovieCard";
import type { OmdbMovie } from "../shared/types/omdb.types";
import { cleanMovies } from "../shared/movieFilters";

interface ContentRowProps {
  title: string;
  movies: OmdbMovie[];
}

export default function ContentRow({ title, movies }: ContentRowProps) {
  const visibleMovies = cleanMovies(movies);

  if (!visibleMovies.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-6">
      <h2 className="mb-6 text-3xl font-bold text-white">{title}</h2>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {visibleMovies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            year={movie.Year}
            poster={movie.Poster}
            imdbID={movie.imdbID}
          />
        ))}
      </div>
    </section>
  );
}

