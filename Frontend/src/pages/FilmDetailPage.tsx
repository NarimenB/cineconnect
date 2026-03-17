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

  if (isLoading) return <p>Loading...</p>;
  if (!movie) return <p>Film introuvable</p>;

  const genres = movie?.Genre ? movie.Genre.split(",") : [];

  const [rating, setRating] = useState(0);

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">

      <button
        onClick={() => window.history.back()}
        className="mb-6 text-blue-400 hover:underline"
      >
        ← Retour
      </button>

      <div className="flex gap-6">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-64 rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">{movie.Title}</h1>

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

          <p className="mt-4">
            <strong>Director :</strong> {movie.Director}
          </p>

          <p className="mt-4">
            <strong>IMDb Rating :</strong> ⭐ {movie.imdbRating}
          </p>


          <div className="mt-6">
  <p className="mb-2 font-semibold">Notez ce film :</p>

  <div className="flex gap-1 text-2xl cursor-pointer">
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

          <p className="mt-6 text-gray-300">{movie.Plot}</p>
        </div>
      </div>

    </div>
  );
}