const API_URL = "https://www.omdbapi.com";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function searchMovies(query: string, page = 1) {
  try {
    const response = await fetch(
      `${API_URL}/?s=${encodeURIComponent(query)}&page=${page}&apikey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Erreur réseau");
    }

    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error);
    }

    return data.Search;
  } catch (error) {
    console.error("Erreur searchMovies:", error);
    return [];
  }
}

export async function getMovieById(imdbID: string) {
  const response = await fetch(
    `${API_URL}/?i=${imdbID}&plot=full&apikey=${API_KEY}`
  );

  const data = await response.json();

  return data;
}