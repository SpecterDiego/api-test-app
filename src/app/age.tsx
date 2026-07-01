import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import { mainStyles } from "../style/mainstyle";
import { useState } from "react";

const API_KEY = process.env.EXPO_PUBLIC_GENDERIZE_API_KEY;

interface AgeResponse {
  count: number;
  name: string;
  age: number;
}

export default function Age() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<AgeResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function getAge() {
    console.log(name);
    if (name.trim() === "") return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.agify.io/?name=${encodeURIComponent(name)}&apikey=${API_KEY}`,
      );

      const json: AgeResponse = await response.json();
      console.log(json);

      setResult(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function getAgeImageAndName(age: number | null) {
    if (age === null) {
      return { name: "Invalido", image: null };
    }
    if (age >= 0 && age <= 5) {
      return {
        name: "Bebé",
        image: require("@/assets/images/agePics/baby.webp"),
      };
    } else if (age >= 6 && age <= 17) {
      return {
        name: "Niño",
        image: require("@/assets/images/agePics/kid.jpg"),
      };
    } else if (age >= 18 && age <= 49) {
      return {
        name: "Adulto",
        image: require("@/assets/images/agePics/Adult.jpg"),
      };
    } else {
      return {
        name: "Viejo",
        image: require("@/assets/images/agePics/old-man.webp"),
      };
    }
  }

  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.title}>Buscador de Edad</Text>

      <TextInput
        placeholder="Escribe un nombre"
        value={name}
        onChangeText={setName}
        onSubmitEditing={getAge}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={getAge}>
        <Text style={styles.buttonText}>Determinar</Text>
      </Pressable>

      {loading && <Text>Cargando...</Text>}

      {result && (
        <View>
          <Text style={mainStyles.title}>Edad: {result.age}</Text>
          <Text style={mainStyles.title}>
            Edad: {getAgeImageAndName(result.age).name}
          </Text>
          <Image
            source={getAgeImageAndName(result.age).image}
            style={{ height: 200, width: 200, alignSelf: "center" }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
