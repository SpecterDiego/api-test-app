import { Text, View, Image } from "react-native";
import { mainStyles } from "../style/mainstyle";

export default function Index() {
  return (
    <View style={mainStyles.container}>
      <Text style={mainStyles.title}>App MultiUsos</Text>
      <Image
        source={require("@/assets/images/Herramientas.png")}
        style={{ height: 200, width: 200, alignSelf: "center" }}
      />
    </View>
  );
}
