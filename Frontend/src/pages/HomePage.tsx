import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/tmdb.service";
import Hero from "../components/Hero";
import ContentRow from "../components/ContentRow";

const genres = [
  { id: 28, name: "Action" },
  { id: 10749, name: "Romance" },
  { id: 35, name: "Comédie" },
  { id: 18, name: "Drame" },
  { id: 27, name: "Horreur" },
];

export default function HomePage() {
  const [search, setSearch] = useState("batman");

  const { data, isLoading } = useQuery({
    queryKey: ["movies", search],
    queryFn: () => searchMovies(search),
  });

  const movies = data?.results ?? [];
  const featuredMovie = movies[0];

  return (
    <div className="min-h-screen bg-black text-white">
      {featuredMovie ? (
        <Hero movie={featuredMovie} />
      ) : (
        <section className="mx-auto max-w-7xl px-6 pb-10 pt-28">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-black tracking-tight md:text-7xl">
              Bienvenue sur CineConnect
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-zinc-400 md:text-xl">
              Découvrez des milliers de films, explorez les genres et partagez vos avis.
            </p>
            <Link
              to="/browse"
              className="mt-8 inline-flex rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Explorer les films
            </Link>
          </div>
        </section>
      )}

      <section className="-mt-6 relative z-10 mx-auto max-w-6xl px-6">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/85 p-3 shadow-2xl backdrop-blur-md">
          <input
            type="text"
            placeholder="Rechercher un film..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-slate-800/90 px-5 py-4 text-white outline-none transition placeholder:text-zinc-400 focus:ring-2 focus:ring-red-600"
          />
        </div>
      </section>

      <div className="space-y-16 pb-20 pt-14">
        {isLoading ? (
          <p className="px-6 text-white">Chargement...</p>
        ) : (
          <ContentRow title="Films à découvrir" movies={movies} />
        )}

        <section className="mx-auto max-w-7xl px-6">
          <h2 className="mb-6 text-3xl font-bold text-white">Explorer par genre</h2>

          <div className="flex flex-wrap gap-4">
            {genres.map((genre) => (
              <Link
                key={genre.id}
                to="/films/$categorie"
                params={{ categorie: String(genre.id) }}
                className="rounded-xl border border-white/10 bg-zinc-900 px-6 py-3 text-base font-medium text-white transition hover:border-red-500 hover:bg-red-600"
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
