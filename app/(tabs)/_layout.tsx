import { View, Text, ImageBackground, Image, ImageSourcePropType } from 'react-native'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

const TabBarIcon = ({icon, name, focused} : {icon: ImageSourcePropType, name: string, focused: boolean}) => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, [setUser]);

  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[76px] min-h-24 mt-4 justify-center items-center rounded-full overflow-hidden" 
      >
        <Image source={icon} tintColor="blue" className="size-5" />
        <Text className="font-semibold text-secondary text-base ml-2 mr-2">
          {name}
        </Text>
      </ImageBackground>
    );
  } else {
    return (
      <View className=' size-full justify-center items-center mt-4 rounded-full'>
        <Image source={icon} className="size-5" tintColor="gray" />
      </View>
    );
  }
}
const Layout = () => {
  const [user, setUser] = useState<User | null>(null);
  return (
  <AuthContext.Provider value={{ user, setUser }}>
    <Tabs
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarItemStyle: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      tabBarStyle: {
        backgroundColor:'#0f0D23',
        borderRadius: 50,
        marginHorizontal: 36,
        height: 52,
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#AB8BFF',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        marginBottom: 64
        
      },
    
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={icons.home} name="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={icons.search} name="Search" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={icons.save} name="Saved" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon icon={icons.person} name="Profile" focused={focused} />
          ),
        }}
      />
    </Tabs>
  </AuthContext.Provider>
  );
}

export default Layout