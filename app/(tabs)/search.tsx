import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import MovieCard from "../components/MovieCard";
import Searchbar from "../components/Searchbar";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: movies,
    loading: loadingMovies,
    error: errorMovies,
    refetch: refetchMovies,
    reset: resetMovies,
  } = useFetch(() => fetchMovies({ query: "searchQuery" }), true);

useEffect(() => {
  const handleTimedSearch =  setTimeout(async () => {
    if (searchQuery.trim()) {
      await refetchMovies();
    } else {
      resetMovies();
    }
  }, 500);

  return () => {
    clearTimeout(handleTimedSearch);
  };

}
, [searchQuery, refetchMovies, resetMovies]);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className=" flex-1 w-full absolute z-0"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 20,
          marginVertical: 20,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className=" w-full mt-20 flex-row justify-center items-center">
              <Image
                source={icons.logo}
                className="w-12 h-10 mb-5"
                resizeMode="contain"
              />
            </View>
            <View className="my-5">
              <Searchbar placeholder="Search" value={searchQuery}  onChangeText={(text : string) => setSearchQuery(text)} />
            </View>

            {loadingMovies && (
              <ActivityIndicator
                size="large"
                color="#AB8BFF"
                className="mt-12 self-center"
              />
            )}

            {errorMovies && (
              <Text className="text-red-500 text-center mt-12 self-center">
                Error : {errorMovies.message || "Something went wrong"}
              </Text>
            )}

            {!loadingMovies &&
              !errorMovies &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text className="text-white text-xl font-semibold mt-5 mb-3">
                  Search Results for{" "}
                  <Text className="text-darkAccent">{searchQuery}</Text>
                </Text>
              )}
          </>
        }

        ListEmptyComponent={
          !loadingMovies && !errorMovies && searchQuery.trim() ? (
            <Text className="text-white text-center mt-12 self-center">
             {searchQuery.trim() ? `No results found for "${searchQuery}"` : "Search for a movie"}
            </Text>
          ) : null
        }
      ></FlatList>
    </View>
  );
};

export default Search;
