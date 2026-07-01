import { Text, View, StyleSheet, TextInput, Image } from "react-native";
import { mainStyles } from "../style/mainstyle";
import { useEffect, useState } from "react";

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY;

interface WeatherResponse {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    humidity: number;
    wind_kph: number;
    condition: {
      text: string;
      icon: string;
    };
  };
}

/* url for weatherapi
`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Santo Domingo`
*/

export default function Climate() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);

  async function getWeather() {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Santo Domingo`,
      );

      const json: WeatherResponse = await response.json();

      console.log(json);

      setWeather(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={mainStyles.container}>
      {loading && <Text style={mainStyles.text}>Cargando...</Text>}

      {weather && (
        <>
          <Text style={mainStyles.title}>CLIMA DE {weather.location.name}</Text>

          <Text style={mainStyles.text}>
            Temperatura: {weather.current.temp_c} °C
          </Text>

          <Text style={mainStyles.text}>{weather.current.condition.text}</Text>

          <Text style={mainStyles.text}>
            Humedad: {weather.current.humidity}%
          </Text>

          <Text style={mainStyles.text}>
            Viento: {weather.current.wind_kph} km/h
          </Text>

          <Image
            source={{
              uri: "https:" + weather.current.condition.icon,
            }}
            style={{ width: 64, height: 64 }}
          />
        </>
      )}
    </View>
  );
}
