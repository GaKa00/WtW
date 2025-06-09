import { icons } from "@/constants/icons";

import { db } from "@/lib/firebase";
import useFetch from "@/services/useFetch";
import { collection, getDocs } from "firebase/firestore";
import { useContext } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../components/MovieCard";
import { AuthContext } from "./_layout";

const fetchSavedMovies = async (uid: string): Promise<Movie[]> => {
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
};

const Save = () => {
  const { user } = useContext(AuthContext);

  const {
    data: savedMovies = [],
    loading,
    error,
    refetch,
  } = useFetch<Movie[]>(
    () => (user ? fetchSavedMovies(user.uid) : Promise.resolve([])),
    !!user
  );

  return (
    <SafeAreaView className="bg-primary flex-1 px-10 justify-center items-center">
      {!user ? (
        <View className="items-center">
          <Image
            source={icons.person}
            className="size-16 mb-4"
            tintColor="#fff"
          />
          <Text className="text-gray-200 text-xl font-bold mb-6">Profile</Text>
          <Text className="text-gray-400 text-base">
            Please sign in to view your saved items.
          </Text>
        </View>
      ) : loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <View className="items-center w-full">
          <Text className="text-gray-200 text-xl font-bold mb-6">
            Saved Items
          </Text>
          {(savedMovies?.length ?? 0) > 0 ? (
            (savedMovies ?? []).map((movie, index) => (
              <MovieCard key={movie.id || index} {...movie} />
            ))
          ) : (
            <Text className="text-gray-400 text-base">
              No saved items found.
            </Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default Save;
