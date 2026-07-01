import { View, Pressable, Text, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";

const ROUTES = [
  "/",
  "/gender",
  "/age",
  "/uni",
  "/climate",
  "/pokemon",
  "/nasa",
  "/acerca_de",
] as const;

export function FloatingNavButtons() {
  const router = useRouter();
  const pathname = usePathname();

  const currentIndex = ROUTES.indexOf(pathname as any);

  const goNext = () => {
    if (currentIndex < ROUTES.length - 1) {
      router.push(ROUTES[currentIndex + 1]);
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      router.push(ROUTES[currentIndex - 1]);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={goBack}>
        <Text style={styles.icon}>{"<"}</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={goNext}>
        <Text style={styles.icon}>{">"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    bottom: 40,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "white",
    width: 70,
    height: 70,
    padding: 12,
    borderRadius: 30,
    elevation: 5,
  },
  icon: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
});
