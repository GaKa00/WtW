import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  addDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../lib/firebase";

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

