import { Stack } from "expo-router";
import { hide } from "expo-splash-screen";

export default function RootLayout() {
  return <Stack screenOptions={{headerShown: false}} />;


}
