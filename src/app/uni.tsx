import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { mainStyles } from "../style/mainstyle";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface UniversityResponse {
  name: string;
  country: string;
  alpha_two_code: string;
  domains: string[];
  web_pages: string[];
  "state-province": string | null;
}

export default function Uni() {
  const [country, setCountry] = useState("");
  const [universities, setUniversities] = useState<UniversityResponse[]>([]);
  const [loading, setLoading] = useState(false);

  async function getUniversities() {
    console.log(country);
    if (country.trim() === "") return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://adamix.net/proxy.php?country=${encodeURIComponent(country)}`,
      );

      const json: UniversityResponse[] = await response.json();

      setUniversities(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={mainStyles.container}>
      <Text style={mainStyles.title}>Buscador de Universidades</Text>

      <TextInput
        placeholder="Escribe un país EN INGLES"
        value={country}
        onChangeText={setCountry}
        onSubmitEditing={getUniversities}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={getUniversities}>
        <Text style={styles.buttonText}>Buscar</Text>
      </Pressable>

      {loading && <Text>Cargando...</Text>}

      {universities && (
        <FlatList
          data={universities}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>

              <Text style={styles.title}>Dominios</Text>
              {item.domains.map((domain, index) => (
                <Text key={index}>• {domain}</Text>
              ))}

              <Text style={styles.title}>Paginas</Text>
              {item.web_pages.map((page, index) => (
                <Text key={index}>• {page}</Text>
              ))}
            </View>
          )}
        />
      )}
    </SafeAreaView>
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
  card: {
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
});
