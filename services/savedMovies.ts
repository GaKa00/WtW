import { useReducer } from "react";
import {
  addSavedMovie,
  fetchSavedMovies,
  removeSavedMovie,
} from "./firebaseMovies";


type SavedMoviesAction =
  | { type: "SET"; movies: Movie[] }
  | { type: "ADD"; movie: Movie }
  | { type: "REMOVE"; movieId: number };

function savedMoviesReducer(
  state: Movie[],
  action: SavedMoviesAction
): Movie[] {
  switch (action.type) {
    case "SET":
      return action.movies;
    case "ADD":
      return [...state, action.movie];
    case "REMOVE":
      return state.filter((movie) => movie.id !== action.movieId);
    default:
      return state;
  }
}

export { savedMoviesReducer };

export function useSavedMovies() {
  const [savedMovies, dispatch] = useReducer(savedMoviesReducer, []);

 
  const fetchAndSetSavedMovies = async (uid: string) => {
    const movies = await fetchSavedMovies(uid);
    dispatch({ type: "SET", movies });
  };


  const addAndSaveMovie = async (uid: string, movie: Movie) => {
    await addSavedMovie(uid, movie);
    dispatch({ type: "ADD", movie });
  };

  const removeAndDeleteMovie = async (uid: string, movieId: number) => {
    await removeSavedMovie(uid, movieId);
    dispatch({ type: "REMOVE", movieId });
  };

  return {
    savedMovies,
    fetchAndSetSavedMovies,
    addAndSaveMovie,
    removeAndDeleteMovie,
  };
}
