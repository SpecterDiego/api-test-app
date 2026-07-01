import { Text, View, StyleSheet, Image } from "react-native";

export default function AcercaDe() {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.text}>ACERCA DE</Text>
      <Text style={styles.text}>Diego Mieses</Text>
      <Image
        source={require("@/assets/images/Foto.png")}
        style={{ height: 200, width: 200, alignSelf: "center" }}
      />
      <Text style={styles.textSmall}>Numero de telefono: 809-607-4555</Text>
      <Text style={styles.textSmall}>
        Email: diegoalejandromieses@gmail.com
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: "#000000b4",
    margin: 25,
    padding: 20,
    borderRadius: 25,
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
  },
  text: {
    color: "#ffffff",
    fontSize: 40,
    lineHeight: 50,
    fontWeight: "bold",
    textAlign: "center",
  },
  textSmall: {
    color: "#ffffff",
    fontSize: 18,
    lineHeight: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
