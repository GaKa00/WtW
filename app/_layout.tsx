import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./globals.css";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { createUserDocumentIfNotExists } from "@/services/user";


type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};
export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export default function RootLayout() {

  const [user, setUser] = useState<User | null>(null);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await createUserDocumentIfNotExists(currentUser);
        console.log("User exists in Firestore:", currentUser.uid);
        setUser(currentUser);
        console.log("User set in context:", currentUser);
      }
    });
    return unsubscribe;
  }, [setUser]);
  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>

      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
          key="root"
        />
        <Stack.Screen
          name="movies/[id]"
          options={{ headerShown: false }}
          key="root"
        />
      </Stack>
      </AuthContext.Provider>
    </>
  );
}
