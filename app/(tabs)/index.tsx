import { View, Image, ScrollView } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import Searchbar from '../components/Searchbar'
import { useRouter } from 'expo-router'

const router = useRouter();

const index = () => {
    
  return (
    <View className='flex-1  bg-primary'> 
    <Image source={images.bg} className="w-full h absolute z-0" />
      <ScrollView className='flex-1 px-5' showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 10, minHeight: '100%'}}>
        <Image source={icons.logo} className="w-10 h-10 mt-20 mb-5 mx-auto"  />

<View className='flex-1 mt-5'> 
    <Searchbar onPress={() => router.push('/search')} placeholder="Search"/>

</View>
      </ScrollView>
    </View>
  )
}

export default index