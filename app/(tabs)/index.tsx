import { View, Image, ScrollView, ActivityIndicator, Text, FlatList } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import Searchbar from '../components/Searchbar'
import { useRouter } from 'expo-router'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import MovieCard from '../components/MovieCard'


export default function Index () {
    const router = useRouter();

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

        {loadingMovies ? (
          <ActivityIndicator
            size="large"
            color="#AB8BFF"
            className="mt-12 self-center"
          />
        ) : errorMovies ? (
          <Text className="text-white text-center mt-12 self-center">
            Something went wrong
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <Searchbar
              onPress={() => router.push("/search")}
              placeholder="Search"
            />
            <Text className="text-white text-2xl font-semibold mt-5 mb-3">
              Trending Movies
            </Text>

            <FlatList
              data={movies}
              renderItem={({item}) => ( 
                <MovieCard {...item} />
            )}
            keyExtractor={(item) => item.id}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap:20,
              paddingRight:5,
              marginBottom:10
            }}
            className='mt-2 pb-32'
            scrollEnabled={false}
              />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

