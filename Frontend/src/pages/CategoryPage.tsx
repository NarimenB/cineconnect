import { Link, useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getMoviesByGenre } from "../services/tmdb.service";

type Movie = {
  id: number;
  title: string;
  poster_path: string | null;
  overview?: string;
  release_date?: string;
  backdrop_path?: string | null;
};

type MoviesResponse = {
  results: Movie[];
};

const CategoryPage = () => {
  const { categorie } = useParams({ from: "/films/$categorie" });
  const genreId = Number(categorie);

  const { data, isLoading, isError } = useQuery<MoviesResponse>({
    queryKey: ["genre", genreId],
    queryFn: () => getMoviesByGenre(genreId),
    enabled: !Number.isNaN(genreId),
  });

  const movies = data?.results ?? [];
  const filteredMovies = movies.filter((movie) => movie.poster_path);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (filteredMovies.length > 0) {
      setSelectedMovie(filteredMovies[0]);
    }
  }, [filteredMovies]);

  if (Number.isNaN(genreId)) {
    return <p>Genre invalide.</p>;
  }

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  if (isError) {
    return <p>Erreur lors du chargement des films.</p>;
  }

  if (!filteredMovies.length) {
    return <p>Aucun film trouvé pour cette catégorie.</p>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-2xl font-bold">Catégorie : {categorie}</h1>

      {selectedMovie && (
        <div className="group relative mb-10 h-[500px] w-full overflow-hidden rounded-xl">
          <img
            src={`https://image.tmdb.org/t/p/original${
              selectedMovie.backdrop_path || selectedMovie.poster_path
            }`}
            alt={selectedMovie.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          <div className="absolute bottom-10 left-10 max-w-xl">
            <h2 className="mb-4 text-5xl font-bold">{selectedMovie.title}</h2>

            {selectedMovie.overview && (
              <p className="mb-4 line-clamp-3 text-gray-300">
                {selectedMovie.overview}
              </p>
            )}

            <div className="flex gap-4">
              <Link
                to="/film/$id"
                params={{ id: String(selectedMovie.id) }}
                className="rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-300"
              >
                Lecture
              </Link>

              <Link
                to="/film/$id"
                params={{ id: String(selectedMovie.id) }}
                className="rounded-lg bg-gray-700/70 px-6 py-3 text-white transition hover:bg-gray-600"
              >
                Plus d'infos
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth">
        {filteredMovies.map((movie) => (
          <Link key={movie.id} to="/film/$id" params={{ id: String(movie.id) }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              onMouseEnter={() => setSelectedMovie(movie)}
              className="w-[150px] cursor-pointer rounded-lg transition duration-300 hover:scale-110"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;


