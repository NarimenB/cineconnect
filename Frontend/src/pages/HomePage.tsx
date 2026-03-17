import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { searchMovies } from "../services/tmdb.service";

const genres = [
  { id: 28, name: "Action" },
  { id: 10749, name: "Romance" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
];

export default function HomePage() {
  const [search, setSearch] = useState("batman");

  const { data, isLoading } = useQuery({
    queryKey: ["movies", search],
    queryFn: () => searchMovies(search),
  });

  const movies = data?.results ?? [];

  return (
    <div className="text-white">
      <div className="relative flex h-[400px] items-center">
        <img
          src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3Njk5OV5BMl5BanBnXkFtZTgwNzI2MzYwMzE@._V1_.jpg"
          className="absolute h-full w-full object-cover opacity-40"
          alt="Hero"
        />

        <div className="relative z-10 px-10">
          <h1 className="text-5xl font-bold">Bienvenue sur CineConnect</h1>

          <p className="mt-4 max-w-xl text-gray-300">
            Découvrez des milliers de films, explorez les genres et partagez vos avis.
          </p>

          <Link
            to="/films"
            className="mt-6 inline-block rounded bg-red-600 px-6 py-3 hover:bg-red-700"
          >
            Explorer les films
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6">
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded border border-gray-700 bg-gray-800 p-3"
        />
      </div>

      <div className="mx-auto mt-10 max-w-6xl px-6">
        <h2 className="mb-6 text-2xl font-bold">Films</h2>

        {isLoading && <p>Loading...</p>}

        <div className="grid grid-cols-2 gap-6 md:grid-cols-6">
          {movies.map((movie: any) => (
            <Link
              key={movie.id}
              to="/film/$id"
              params={{ id: String(movie.id) }}
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                className="rounded-lg transition duration-300 hover:scale-105"
              />
              <p className="mt-2 text-sm">{movie.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-6xl px-6">
        <h2 className="mb-6 text-2xl font-bold">Explorer par genre</h2>

        <div className="flex flex-wrap gap-4">
          {genres.map((genre) => (
            <Link
              key={genre.id}
              to="/films/$categorie"
              params={{ categorie: String(genre.id) }}
              className="rounded bg-gray-800 px-4 py-2 transition hover:bg-red-600"
            >
              {genre.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
