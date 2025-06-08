import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/firebaseMovies";
import useFetch from "@/services/useFetch";
import MovieCard from "../components/MovieCard";
import Searchbar from "../components/Searchbar";
import TrendingCard from "../components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: loadingTrendingMovies,
    error: errorTrendingMovies,
  } = useFetch(getTrendingMovies, true);

  const {
    data: movies,
    loading: loadingMovies,
    error: errorMovies,
  } = useFetch(() => fetchMovies({ query: "" }), true);

  return (
    <View className="flex-1  bg-primary">
      <Image source={images.bg} className="w-full h absolute z-0" />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
      >
        <Image source={icons.logo} className="w-10 h-10 mt-20 mb-5 mx-auto" />

        {loadingMovies || loadingTrendingMovies ? (
          <ActivityIndicator
            size="large"
            color="#AB8BFF"
            className="mt-12 self-center"
          />
        ) : errorMovies || errorTrendingMovies ? (
          <Text className="text-white text-center mt-12 self-center">
            Something went wrong:{" "}
            {errorMovies?.message || errorTrendingMovies?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <Searchbar
              onPress={() => {
                router.push("/search");
              }}
              placeholder="Search for a movie"
            />

            {trendingMovies && trendingMovies.length > 0 && (
              <>
                <Text className="text-white text-2xl font-semibold mt-5 mb-3">
                  Watched by Users
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-3 gap-3" />}
                  className="mb-5 mt-4"
                  data={trendingMovies.filter(
                    (movie, index, self) =>
                      movie.movie_id &&
                      self.findIndex((m) => m.movie_id === movie.movie_id) ===
                        index
                  )}
                  keyExtractor={(item, index) =>
                    (item.movie_id ? item.movie_id.toString() : "") +
                    "-" +
                    (item.title ? item.title : "") +
                    "-" +
                    index
                  }
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  scrollEnabled={true}
                />
              </>
            )}

            <Text className="text-white text-2xl font-semibold mt-5 mb-3">
              Latest Movies
            </Text>

            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
