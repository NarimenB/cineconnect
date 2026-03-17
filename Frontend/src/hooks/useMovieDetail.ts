import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../services/tmdb.service";
import type { TmdbMovieDetail } from "../shared/types/tmdb.types";

export function useMovieDetail(id: string) {
  const movieId = Number(id);

  return useQuery<TmdbMovieDetail>({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieById(movieId),
    enabled: !Number.isNaN(movieId),
  });
}
