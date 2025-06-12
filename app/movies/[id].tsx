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
import useFetch from "../../services/useFetch";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
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

            <TouchableOpacity
              className="ml-20 flex-row items-center px-4 py-2 rounded-full bg-accent border border-purple-300 shadow-lg shadow-purple-500"
              activeOpacity={0.85}
            >
              <Text className="text-white font-bold text-base mr-1">Add to Saved</Text>
              <Text className="text-white font-bold text-xl">+</Text>
            </TouchableOpacity>
          </View>

          <MovieInfo label="Overview" value={String(movie?.overview)} />
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
