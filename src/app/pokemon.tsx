import {
  Text,
  View,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import { mainStyles } from "../style/mainstyle";
import { useEffect, useState } from "react";
import { useAudioPlayer } from "expo-audio";

interface Pokemon {
  name: string;
  base_experience: number;
  sprites: {
    front_default: string;
  };
  cries: {
    latest: string;
  };
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export default function Pokemon() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);

  async function getPokemon() {
    if (!pokemonName.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`,
      );

      if (!response.ok) {
        throw new Error("Pokemon not found");
      }

      const json: Pokemon = await response.json();

      setPokemon(json);
    } catch (error) {
      console.error(error);
      alert("Pokemon not found.");
    } finally {
      setLoading(false);
    }
  }

  const player = useAudioPlayer(pokemon?.cries.latest ?? "");

  return (
    <View style={mainStyles.container}>
      <TextInput
        style={mainStyles.input}
        placeholder="Escribe un Pokémon"
        value={pokemonName}
        onChangeText={setPokemonName}
      />

      <Pressable style={mainStyles.button} onPress={getPokemon}>
        <Text style={mainStyles.buttonText}>Buscar</Text>
      </Pressable>

      {loading && <Text style={mainStyles.text}>Cargando...</Text>}

      {pokemon && (
        <>
          <Text style={mainStyles.title}>{pokemon.name.toUpperCase()}</Text>

          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={{ width: 150, height: 150 }}
          />

          <Text style={mainStyles.text}>
            XP Base: {pokemon.base_experience}
          </Text>

          <Text style={mainStyles.title}>Abilidades</Text>

          {pokemon.abilities.map((ability) => (
            <Text style={mainStyles.text} key={ability.ability.name}>
              • {ability.ability.name}
            </Text>
          ))}

          <Pressable style={mainStyles.button} onPress={() => player.play()}>
            <Text style={mainStyles.buttonText}>Sonido</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}