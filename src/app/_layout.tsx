import { FloatingNavButtons } from "@/components/FloatingButton";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="gender" />
        <Stack.Screen name="age" />
        <Stack.Screen name="uni" />
        <Stack.Screen name="climate" />
        <Stack.Screen name="pokemon" />
        <Stack.Screen name="nasa" />
        <Stack.Screen name="acerca_de" />
      </Stack>
      <FloatingNavButtons />
    </>
  );
}
