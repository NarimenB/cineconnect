import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { searchMovies } from "../services/tmdb.service";

export default function FilmsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies"],
    queryFn: () => searchMovies("batman"),
  });

  const movies = data?.results ?? [];

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Erreur lors du chargement des films.</p>;

  return (
    <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-5">
      {movies.map((movie: any) => (
        <Link
          key={movie.id}
          to="/film/$id"
          params={{ id: String(movie.id) }}
          className="text-white"
        >
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Image"
            }
            alt={movie.title}
            className="rounded-lg"
          />
          <h3 className="mt-2 font-semibold">{movie.title}</h3>
          <p className="text-sm text-gray-400">
            {movie.release_date?.split("-")[0] ?? "N/A"}
          </p>
        </Link>
      ))}
    </div>
  );
}
