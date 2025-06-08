import { icons } from "@/constants/icons";
import { auth } from "@/lib/firebase";
import { emailSignIn, emailSignUp, useGoogleSignIn } from "@/services/signin";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const [user, setUser] = useState<import("firebase/auth").User | null>(null);
  const { promptAsync, request } = useGoogleSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleEmailSignIn = async () => {
    setLoading(true);
    try {
      await emailSignIn(email, password);
    } catch (err: any) {
      Alert.alert("Sign In Error", err.message);
    }
    setLoading(false);
  };

  const handleEmailSignUp = async () => {
    setLoading(true);
    try {
      await emailSignUp(email, password);
    } catch (err: any) {
      Alert.alert("Sign Up Error", err.message);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (!user) {
    return (
      <View className="bg-primary flex-1 px-10 justify-center items-center">
        <Image
          source={icons.person}
          className="size-16 mb-4"
          tintColor="#fff"
        />
        <Text className="text-gray-200 text-xl font-bold mb-6">Profile</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="bg-white/90 rounded px-3 py-2 w-full mb-2"
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="bg-white/90 rounded px-3 py-2 w-full mb-2"
          secureTextEntry
          placeholderTextColor="#888"
        />
        <TouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded w-full mt-2"
          onPress={handleEmailSignIn}
          disabled={loading}
        >
          <Text className="text-white font-bold text-center">Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-green-500 px-4 py-2 rounded w-full mt-2"
          onPress={handleEmailSignUp}
          disabled={loading}
        >
          <Text className="text-white font-bold text-center">Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-yellow-500 px-4 py-2 rounded w-full mt-2"
          onPress={() => promptAsync()}
          disabled={!request || loading}
        >
          <Text className="text-white font-bold text-center">
            Sign In with Google
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1 px-10 justify-center items-center">
      <Image source={icons.person} className="size-16 mb-4" tintColor="#fff" />
      <Text className="text-gray-200 text-xl font-bold mb-2">Welcome</Text>
      <Text className="text-white text-lg mb-1">
        {user.displayName || user.email}
      </Text>
      <TouchableOpacity
        className="bg-red-500 px-4 py-2 rounded w-full mt-6"
        onPress={handleSignOut}
      >
        <Text className="text-white font-bold text-center">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
