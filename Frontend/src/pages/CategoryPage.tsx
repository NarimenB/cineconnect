import { useParams, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMoviesByCategory } from "../services/omdb.service";
import { useState, useEffect } from "react";

const CategoryPage = () => {
  const { categorie } = useParams({ from: "/films/$categorie" });

  const { data: movies, isLoading } = useQuery({
    queryKey: ["category", categorie],
    queryFn: () => getMoviesByCategory(categorie),
  });

  const [selectedMovie, setSelectedMovie] = useState<any>(null);

  // 🎬 Initialiser avec le premier film
  useEffect(() => {
    if (movies && movies.length > 0) {
      setSelectedMovie(movies[0]);
    }
  }, [movies]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-6">
        Catégorie : {categorie}
      </h1>

      {/* 🎬 HERO (grande affiche style Netflix) */}
      {selectedMovie && (
        <div className="relative w-full h-[500px] mb-8">
          <img
            src={selectedMovie.Poster}
            alt={selectedMovie.Title}
            className="w-full h-full object-cover rounded-xl"
          />

          {/* Gradient sombre */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-xl"></div>

          {/* Infos film */}
          <div className="absolute bottom-6 left-6">
            <h2 className="text-4xl font-bold">
              {selectedMovie.Title}
            </h2>

            <Link
              to="/film/$id"
              params={{ id: selectedMovie.imdbID }}
              className="inline-block mt-4 px-6 py-2 bg-white text-black rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Voir détails
            </Link>
          </div>
        </div>
      )}

      {/* 🎞️ LISTE DES FILMS */}
      <div className="flex gap-4 overflow-x-auto">
        {movies?.map((movie: any) => (
          <Link
            key={movie.imdbID}
            to="/film/$id"
            params={{ id: movie.imdbID }}
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              onMouseEnter={() => setSelectedMovie(movie)} // 🔥 effet Netflix
              className="w-[150px] rounded-lg cursor-pointer hover:scale-110 transition duration-300"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;