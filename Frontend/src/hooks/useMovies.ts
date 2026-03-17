import { useQuery } from "@tanstack/react-query";
import { searchMovies, getMovieById } from "../services/tmdb.service";
import type {
  TmdbMovieDetail,
  TmdbMoviesResponse,
} from "../shared/types/tmdb.types";

export const useSearchMovies = (query: string) => {
  return useQuery<TmdbMoviesResponse>({
    queryKey: ["movies", query],
    queryFn: () => searchMovies(query),
    enabled: !!query,
  });
};

export const getMovieDetail = async (id: string): Promise<TmdbMovieDetail> => {
  const movieId = Number(id);

  if (Number.isNaN(movieId)) {
    throw new Error("ID de film invalide");
  }

  return getMovieById(movieId);
};

export const useMovieDetail = (id: string) => {
  const movieId = Number(id);

  return useQuery<TmdbMovieDetail>({
    queryKey: ["movieDetail", movieId],
    queryFn: () => getMovieById(movieId),
    enabled: !Number.isNaN(movieId),
  });
};
