import { Link } from "@tanstack/react-router";
import type { TmdbMovie } from "../shared/types/tmdb.types";

interface HeroProps {
  movie: TmdbMovie;
}

export default function Hero({ movie }: HeroProps) {
  const backgroundImage = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
      ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
      : "";

  return (
    <section
      className="relative min-h-[70vh] overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[70vh] max-w-7xl items-end px-6 pb-16 pt-28">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-red-500">
            Film mis en avant
          </p>

          <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">
            {movie.title}
          </h1>

          <p className="mt-5 line-clamp-4 text-base text-zinc-300 md:text-lg">
            {movie.overview || "Découvrez ce film sur CineConnect."}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/film/$id"
              params={{ id: String(movie.id) }}
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Voir le film
            </Link>

            <Link
              to="/browse"
              className="rounded-xl border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              Explorer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
