import { useQuery } from '@tanstack/react-query';
import { searchMovies, getMovieById } from '../services/omdb.service';
import { OmdbMovie, OmdbMovieDetail } from '../shared/types/omdb.types';

export const useSearchMovies = (query: string) => {
  return useQuery<OmdbMovie[]>({
    queryKey: ['movies', query],
    queryFn: () => searchMovies(query),
    enabled: !!query, // évite de fetch si query vide
  });
};

export const getMovieDetail = async (id: string): Promise<OmdbMovieDetail> => {
  return await getMovieById(id) as OmdbMovieDetail;
};

export const useMovieDetail = (id: string) => {
  return useQuery<OmdbMovieDetail>({
    queryKey: ['movieDetail', id],
    queryFn: () => getMovieDetail(id),
    enabled: !!id,
  });
};