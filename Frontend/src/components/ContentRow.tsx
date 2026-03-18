import { Link } from "@tanstack/react-router";
import type { TmdbMovie } from "../shared/types/tmdb.types";

interface ContentRowProps {
  title: string;
  movies: TmdbMovie[];
}

export default function ContentRow({ title, movies }: ContentRowProps) {
  if (!movies.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-6">
      <h2 className="mb-6 text-3xl font-bold text-white">{title}</h2>

      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            to="/film/$id"
            params={{ id: String(movie.id) }}
            className="group"
          >
            <div className="overflow-hidden rounded-2xl bg-zinc-900 shadow-lg transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="h-[320px] w-full object-cover"
              />

              <div className="p-4">
                <h3 className="line-clamp-2 text-base font-bold text-white">
                  {movie.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-400">
                  {movie.release_date?.split("-")[0] ?? "N/A"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
