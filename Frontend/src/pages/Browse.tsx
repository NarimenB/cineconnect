// src/pages/browse.tsx
import { useState } from "react";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSearchMovies } from "../hooks/useMovies";
import { OmdbMovie } from "../shared/types/omdb.types";

export function Browse() {
  // Search par défaut
  const [searchQuery, setSearchQuery] = useState<string>("movie");

  const { data: movies, isLoading, error } = useSearchMovies(searchQuery);

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="pt-24 px-4 md:px-12 pb-20">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <h1 className="text-white text-3xl md:text-4xl">
            Explorer les films
          </h1>

          {/* Search Input */}
          <div className="max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un film..."
              className="w-full px-4 py-2 bg-zinc-800 text-white rounded border border-zinc-700 focus:border-white focus:outline-none"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-400 text-xl">
              {(error as Error).message || "Erreur lors du chargement des films"}
            </p>
          </div>
        )}

        {/* Movies Grid */}
        {(movies ?? []).length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {(movies ?? []).map((movie: OmdbMovie) => (
              <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                year={movie.Year}
                poster={movie.Poster}
                imdbID={movie.imdbID}
              />
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className="text-center py-20">
              <p className="text-white/60 text-xl">
                Aucun film trouvé pour "{searchQuery}"
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Browse;