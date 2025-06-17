import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc,
  orderBy,
  limit,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const COLLECTION_NAME = "trendingMovies";

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("searchTerm", "==", searchTerm)
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      const data = snapshot.docs[0].data();

      await updateDoc(docRef, {
        count: (data.count ?? 0) + 1,
      });
    } else {
      await addDoc(collection(db, COLLECTION_NAME), {
        searchTerm,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("count", "desc"),
      limit(5)
    );

    const snapshot = await getDocs(q);

    const trendingMovies = snapshot.docs.map((doc) => ({
      ...(doc.data() as TrendingMovie),
      id: doc.id,
    }));

    return trendingMovies;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return undefined;
  }
};



export const addSavedMovie = async (
  uid: string,
  movie: Movie
): Promise<void> => {
  try {
    const movieRef = doc(db, "users", uid, "watchlist", movie.id.toString());
    await setDoc(movieRef, movie); 
  } catch (error) {
    console.error("Error adding saved movie:", error);
    throw error;
  }
};


export const removeSavedMovie = async (
  uid: string,
  movieId: number
): Promise<void> => {
  try {
    const movieRef = doc(db, "users", uid, "watchlist", movieId.toString());
    await deleteDoc(movieRef);
  } catch (error) {
    console.error("Error removing saved movie:", error);
    throw error;
  }
};


 export const fetchSavedMovies = async (uid: string): Promise<Movie[]> => {
  const snapshot = await getDocs(collection(db, "users", uid, "watchlist"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: Number(doc.id),
      title: data.title,
      adult: data.adult,
      backdrop_path: data.backdrop_path,
      genre_ids: data.genre_ids,
      original_language: data.original_language,
      original_title: data.original_title,
      overview: data.overview,
      popularity: data.popularity,
      poster_path: data.poster_path,
      release_date: data.release_date,
      video: data.video,
      vote_average: data.vote_average,
      vote_count: data.vote_count,
    } as Movie;
  });
}