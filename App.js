import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { loadFonts } from "./src/global/fonts";
import { useEffect, useState, useContext } from "react";
import { CategoryProvider } from "./src/context/CategoryContext";
import MainContent from "./src/Components/MainContent";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadAllFonts = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAllFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Cargando fuentes...</Text>;
  }

  return (
    <CategoryProvider>
      <SafeAreaView style={styles.container}>
        {/* <Text style={styles.pruebaFonts}>Probando fonts</Text>
        <Image source={require(`./assets/images/th.jpg`)} style={styles.img} />
        <Search placeholder="Buscar productos..." /> */}
        <MainContent />
        <StatusBar style="auto" />
      </SafeAreaView>
    </CategoryProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "red",
  },
});
