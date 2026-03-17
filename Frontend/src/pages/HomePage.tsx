import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { searchMovies } from "../services/omdb.service";

export default function HomePage() {
  const [search, setSearch] = useState("batman");

  const { data: movies, isLoading } = useQuery({
    queryKey: ["movies", search],
    queryFn: () => searchMovies(search),
  });

  return (
    <div className="text-white">

      {/* HERO SECTION */}
      <div className="relative h-[400px] flex items-center">
        <img
          src="https://m.media-amazon.com/images/M/MV5BMjAxMzY3Njk5OV5BMl5BanBnXkFtZTgwNzI2MzYwMzE@._V1_.jpg"
          className="absolute w-full h-full object-cover opacity-40"
        />

        <div className="relative z-10 px-10">
          <h1 className="text-5xl font-bold">Bienvenue sur CineConnect</h1>

          <p className="mt-4 max-w-xl text-gray-300">
            Découvrez des milliers de films, explorez les genres et partagez vos avis.
          </p>

          <Link
            to="/films"
            className="inline-block mt-6 bg-red-600 px-6 py-3 rounded hover:bg-red-700"
          >
            Explorer les films
          </Link>
        </div>
      </div>

      {/* SEARCH */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 border border-gray-700"
        />
      </div>

      {/* FILMS */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <h2 className="text-2xl font-bold mb-6">Films</h2>

        {isLoading && <p>Loading...</p>}

        <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
          {movies?.map((movie: any) => (
            <Link
              key={movie.imdbID}
              to="/film/$id"
              params={{ id: movie.imdbID }}
            >
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="rounded-lg hover:scale-105 transition duration-300"
              />

              <p className="mt-2 text-sm">{movie.Title}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="max-w-6xl mx-auto px-6 mt-16">
        <h2 className="text-2xl font-bold mb-6">Explorer par genre</h2>

        <div className="flex flex-wrap gap-4">
          {["action", "romance", "comedy", "drama", "horror"].map((genre) => (
            <Link
              key={genre}
              to="/films/$categorie"
              params={{ categorie: genre }}
              className="bg-gray-800 px-4 py-2 rounded hover:bg-red-600 transition"
            >
              {genre}
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}