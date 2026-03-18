const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

const categorySeeds: Record<string, string[]> = {
  action: [
    "The Dark Knight",
    "Mad Max Fury Road",
    "Gladiator",
    "John Wick",
    "Mission Impossible",
  ],
  romance: [
    "27 Dresses",
    "How to Lose a Guy in 10 Days",
    "The Notebook",
    "Pride and Prejudice",
    "La La Land",
  ],
  comedy: [
    "The Hangover",
    "Superbad",
    "Mean Girls",
    "Bridesmaids",
    "Legally Blonde",
  ],
  drama: [
    "The Shawshank Redemption",
    "Forrest Gump",
    "Fight Club",
    "The Green Mile",
    "Whiplash",
  ],
  horror: [
    "The Conjuring",
    "Insidious",
    "Scream",
    "Hereditary",
    "The Ring",
  ],
};

export async function searchMovies(query: string, page = 1) {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`
  );

  const data = await res.json();

  if (data.Response === "False") {
    return { Search: [], totalResults: "0", Response: "False" };
  }

  return data;
}

export async function getMovieById(imdbID: string) {
  const res = await fetch(
    `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`
  );

  const data = await res.json();

  if (data.Response === "False") {
    throw new Error("Film introuvable");
  }

  return data;
}

export async function getMoviesByCategory(category: string) {
  const seeds = categorySeeds[category.toLowerCase()];

  if (!seeds) {
    return searchMovies(category);
  }

  const results = await Promise.all(seeds.map((seed) => searchMovies(seed)));

  const merged = results.flatMap((result) => result.Search ?? []);

  return {
    Search: merged,
    totalResults: String(merged.length),
    Response: merged.length ? "True" : "False",
  };
}
