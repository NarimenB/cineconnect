import { useParams, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../services/omdb.service";
import { useState } from "react";

export default function FilmDetailPage() {
  const { id } = useParams({ from: "/film/$id" });

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
  });

  const [rating, setRating] = useState(0);

  if (isLoading) {
    return <p className="text-white p-6">Loading...</p>;
  }

  if (!movie) {
    return <p className="text-white p-6">Film introuvable</p>;
  }

  const genres = movie?.Genre ? movie.Genre.split(",") : [];

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">

      {/* Bouton retour */}
      <button
        onClick={() => window.history.back()}
        className="mb-6 text-blue-400 hover:underline"
      >
        ← Retour
      </button>

      <div className="flex gap-6 flex-col md:flex-row">

        {/* Affiche */}
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : ""}
          alt={movie.Title}
          className="w-64 rounded-lg"
        />

        <div>
          {/* Titre */}
          <h1 className="text-3xl font-bold">{movie.Title}</h1>

          {/* Genres */}
          <div className="mt-2 flex flex-wrap gap-2">
            {genres.map((genre: string) => (
              <Link
                key={genre}
                to="/films/$categorie"
                params={{ categorie: genre.trim().toLowerCase() }}
                className="bg-gray-800 px-3 py-1 rounded-full text-sm hover:bg-red-600 transition"
              >
                {genre}
              </Link>
            ))}
          </div>

          {/* Infos film */}
          <p className="mt-4">
            <strong>Director :</strong> {movie.Director || "Unknown"}
          </p>

          <p className="mt-2">
            <strong>Actors :</strong> {movie.Actors || "Unknown"}
          </p>

          <p className="mt-2">
            <strong>Release Date :</strong> {movie.Released || "Unknown"}
          </p>

          <p className="mt-2">
            <strong>Runtime :</strong> {movie.Runtime || "Unknown"}
          </p>

          <p className="mt-2">
            <strong>Language :</strong> {movie.Language || "Unknown"}
          </p>

          <p className="mt-4">
            <strong>IMDb Rating :</strong> ⭐ {movie.imdbRating || "N/A"}
          </p>

          {/* Notation utilisateur */}
          <div className="mt-6">
            <p className="mb-2 font-semibold">Notez ce film :</p>

            <div className="flex gap-2 text-3xl cursor-pointer">
              {[1,2,3,4,5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={star <= rating ? "text-yellow-400" : "text-white"}
                >
                  ★
                </span>
              ))}
            </div>

            <p className="text-sm text-gray-400 mt-2">
              Votre note : {rating}/5
            </p>
          </div>

          {/* Synopsis */}
          <p className="mt-6 text-gray-300">
            {movie.Plot || "No description available"}
          </p>
        </div>

      </div>
    </div>
  );
}