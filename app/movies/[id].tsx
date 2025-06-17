import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import { useSavedMovies } from "@/services/savedMovies";
import { useContext } from "react";

import useFetch from "../../services/useFetch";
import { AuthContext } from "../_layout";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}


function movieDetailsToMovie(details: MovieDetails): Movie {
  return {
    id: details.id,
    title: details.title ?? "",
    adult: details.adult ?? false,
    backdrop_path: details.backdrop_path ?? "",
    genre_ids: details.genres ? details.genres.map((g) => g.id) : [],
    original_language: details.original_language ?? "",
    original_title: details.original_title ?? "",
    overview: details.overview ?? "",
    popularity: details.popularity ?? 0,
    poster_path: details.poster_path ?? "",
    release_date: details.release_date ?? "",
    video: details.video ?? false,
    vote_average: details.vote_average ?? 0,
    vote_count: details.vote_count ?? 0,
  };
}
const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-white font-normal text-sm">{label}</Text>
    <Text className="text-white font-bold text-sm mt-2">
      {value !== undefined && value !== null && value !== "" ? value : "N/A"}
    </Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user } = useContext(AuthContext);
  const { addAndSaveMovie } = useSavedMovies();
  console.log("User:", user);

  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(Number(id))
  );

  if (loading)
    return (
      <SafeAreaView className="bg-primary flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>
          <View className="flex-row items-center gap-x-1 mt-2">
            <Text className="text-white text-sm">
              {movie?.release_date?.split("-")[0]} •
            </Text>
            <Text className="text-white text-sm">{movie?.runtime}m</Text>
          </View>

          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-white text-sm">
              ({movie?.vote_count} votes)
            </Text>
            {user && movie && (
              <TouchableOpacity
                className="ml-auto flex-row items-center px-4 py-2 rounded-full bg-accent border border-purple-300 shadow-lg shadow-purple-500"
                activeOpacity={0.85}
                onPress={() => addAndSaveMovie(user.uid, movieDetailsToMovie(movie))}
              >
                <Text className="text-white font-bold text-base mr-1">
                  Add to Saved
                </Text>
                <Text className="text-white font-bold text-xl">+</Text>
              </TouchableOpacity>
            )}
          </View>
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />
          <MovieInfo
            label="Budget"
            value={`$${(movie?.budget ?? 0) / 1_000_000} million`}
          />
          <MovieInfo
            label="Revenue"
            value={`$${Math.round((movie?.revenue ?? 0) / 1_000_000)} million`}
          />
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies?.map((c) => c.name).join(" • ") ||
              "N/A"
            }
          />
        </View>
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50 mb-4"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Details;
