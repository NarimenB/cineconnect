import { useQuery } from "@tanstack/react-query";
import { getMovieById } from "../services/omdb.service";
import { OmdbMovieDetail } from "../shared/types/omdb.types";

export function useMovieDetail(id: string) {
  return useQuery<OmdbMovieDetail>({
    queryKey: ["movie", id],
    queryFn: () => getMovieById(id),
    enabled: !!id,
  });
}