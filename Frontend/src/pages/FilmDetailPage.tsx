import { useParams, Link, useRouter } from "@tanstack/react-router";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { useState } from "react";


export default function FilmDetailPage() {
  const { id } = useParams({ from: "/film/$id" });
  const { data: movie, isLoading } = useMovieDetail(id);
  const router = useRouter();

  const [rating, setRating] = useState(0);

  if (isLoading) return <div className="p-8 text-white">Chargement...</div>;

  if (!movie) return <div className="p-8 text-white">Film introuvable</div>;

  const genres = movie.Genre ? movie.Genre.split(", ") : [];

  return (
    <div className="text-white p-8 max-w-5xl mx-auto">

      {/* Bouton retour */}
      <button
        onClick={() => router.history.back()}
        className="mb-6 bg-gray-800 px-4 py-2 rounded"
      >
        ← Retour
      </button>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Affiche */}
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-64 rounded shadow"
        />

        <div>

          {/* Titre */}
          <h1 className="text-4xl font-bold mb-2">
            {movie.Title}
          </h1>

          <p className="text-gray-400 mb-4">
            {movie.Year} • {movie.Director}
          </p>

          {/* Genres */}
          <div className="flex gap-2 mb-4">
            {genres.map((genre: string) => (
              <Link
                key={genre}
                to="/films/$categorie"
                params={{ categorie: genre }}
                className="bg-red-600 px-3 py-1 rounded text-sm"
              >
                {genre}
              </Link>
            ))}
          </div>

          {/* Synopsis */}
          <p className="mb-4">{movie.Plot}</p>

          {/* Note IMDb */}
          <p className="mb-6">
            ⭐ IMDb : {movie.imdbRating}
          </p>

          {/* Section notation */}
          <div>
            <p className="mb-2">Notez ce film :</p>

            <div className="flex gap-2 text-2xl">
              {[1,2,3,4,5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={`cursor-pointer ${
                    star <= rating ? "text-yellow-400" : "text-gray-600"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>

            {rating > 0 && (
              <p className="mt-2 text-sm text-gray-400">
                Votre note : {rating}/5
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}