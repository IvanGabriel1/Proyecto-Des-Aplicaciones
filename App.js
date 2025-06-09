import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "./src/Global/colors";
import { marginsHeader } from "./src/Global/constants";
import Home from "./src/Screens/Home";

export default function App() {
  return (
    <View style={styles.container}>
      <Home></Home>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
