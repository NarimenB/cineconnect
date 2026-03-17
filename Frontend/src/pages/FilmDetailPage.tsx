import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../services/tmdb.service";
import { useState } from "react";

export default function FilmDetailPage() {
  const { id } = useParams({ from: "/film/$id" });
  const movieId = Number(id);

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId),
    enabled: !Number.isNaN(movieId),
  });

  const [rating, setRating] = useState(0);

  if (Number.isNaN(movieId)) return <p>Film invalide</p>;
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Erreur lors du chargement du film</p>;
  if (!movie) return <p>Film introuvable</p>;

  return (
    <div className="mx-auto max-w-4xl p-6 text-white">
      <button
        onClick={() => window.history.back()}
        className="mb-6 text-blue-400"
      >
        ← Retour
      </button>

      <div className="flex gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-64 rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="mt-2">⭐ {movie.vote_average}</p>
          <p className="mt-2">Date : {movie.release_date}</p>
          <p className="mt-4 text-gray-300">{movie.overview}</p>

          <p className="mt-4">
            <strong>Acteurs :</strong>
          </p>

          <ul className="text-sm text-gray-400">
            {movie.credits?.cast?.slice(0, 5).map((actor: any) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>

          <div className="mt-6 flex gap-2 text-2xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={star <= rating ? "text-yellow-400" : "text-gray-500"}
              >
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
