export async function searchMovies(query: string, page: number = 1) {
  const url = `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=42eeb430`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erreur API");
  }

  const data = await response.json();

  if (data.Response === "False") {
    return [];
  }

  return data.Search;
}

export async function getMovieById(id: string) {
  const url = `https://www.omdbapi.com/?i=${id}&plot=full&apikey=42eeb430`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erreur API");
  }

  const data = await response.json();
  return data;
}