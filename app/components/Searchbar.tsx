import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
    placeholder: string;
    onPress: () => void
}
const Searchbar = ({ placeholder, onPress}: Props) => {
  return (
    <View className="flex-row rounded-full bg-dark-200 px-5 py-4">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#AB8BFF"}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#AB8BFF"}
        className="flex-1 ml-3 text-base"
        onPress={onPress}
        onChangeText={() => {}}
        value=""

        

        
      />
    </View>
  );
};

export default Searchbar;
