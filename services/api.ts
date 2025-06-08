import Constants from "expo-constants";

const API_KEY = Constants.expoConfig?.extra?.EXPO_PUBLIC_MOVIE_API_KEY;
console.log(API_KEY);

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await response.json();
  return data.results;
};

export const fetchMovieDetails = async (movieId: number) => {
  try {

    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}&language=en-US`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    )
    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    return data as MovieDetails;
    
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
    
  }
}
