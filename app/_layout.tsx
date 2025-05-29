import './globals.css'
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
  <Stack.Screen name="(tabs)" options={{ headerShown: false }} key="root" />
  <Stack.Screen name="movies/[id]" options={{ headerShown: false }} key="root" />
  </Stack>)
}
