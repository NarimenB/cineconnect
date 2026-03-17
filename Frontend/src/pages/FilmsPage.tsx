import { useQuery } from "@tanstack/react-query";
import { searchMovies } from "../services/omdb.service";

export default function FilmsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: () => searchMovies("batman"),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-5 gap-4 p-6">
      {data?.map((movie: any) => (
        <div key={movie.imdbID} className="text-white">
          <img src={movie.Poster} alt={movie.Title} />
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      ))}
    </div>
  );
}