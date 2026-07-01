import { Text, View, StyleSheet, TextInput, Pressable } from "react-native";
import { mainStyles } from "../style/mainstyle";
import { useState } from "react";

const API_KEY = process.env.EXPO_PUBLIC_GENDERIZE_API_KEY;

interface GenderResponse {
  count: number;
  name: string;
  gender: string | null;
  probability: number;
}

export default function Gender() {
  const [name, setName] = useState("");
  const [result, setResult] = useState<GenderResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function getGender() {
    console.log(name);
    if (name.trim() === "") return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.genderize.io/?name=${encodeURIComponent(name)}&apikey=${API_KEY}`,
      );

      const json: GenderResponse = await response.json();
      console.log(json);

      setResult(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function getGenderColorAndSymbol(gender: string | null) {
    if (gender === "female") {
      return { color: "#FFB6C1", symbol: "♀" };
    }
    if (gender === "male") {
      return { color: "#47acff", symbol: "♂" };
    }
    return { color: "#8f8f8f", symbol: "?" };
  }

  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.title}>Buscador de Genero</Text>
      <TextInput
        placeholder="Escribe un nombre"
        value={name}
        onChangeText={setName}
        onSubmitEditing={getGender}
        style={mainStyles.input}
      />

      <Pressable style={mainStyles.button} onPress={getGender}>
        <Text style={mainStyles.buttonText}>Determinar</Text>
      </Pressable>

      {loading && <Text style={mainStyles.text}>Cargando...</Text>}

      {result && (
        <View
          style={
            (mainStyles.container,
            {
              backgroundColor: getGenderColorAndSymbol(result.gender).color,
              margin: 20,
              borderRadius: 30,
            })
          }>
          <Text style={{ padding: 30, fontSize: 70 }}>
            {getGenderColorAndSymbol(result.gender).symbol}
          </Text>
        </View>
      )}
    </View>
  );
}
