// src/api/movies.api.ts
export const getMoviesByCategory = async (category: string) => {
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // ou process.env selon setup
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(category)}&type=movie`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Erreur API OMDb');

  const data = await response.json();

  if (data.Response === 'False') {
    return [];
  }

  return data.Search; // tableau de films
};