import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { loadFonts } from "./src/global/fonts";
import { useEffect, useState } from "react";
import { CategoryProvider } from "./src/context/CategoryContext";
import { marginsHeader } from "./src/global/constants";
import { colors } from "./src/global/colors";
import MainContent from "./src/Components/MainContent";
import Header from "./src/Components/Header";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { width, height } = useWindowDimensions();

  const isLandscape = width > height;

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
    <>
      <SafeAreaView style={styles.container}>
        <View
          style={[
            styles.statusBarBg,
            {
              paddingTop: isLandscape
                ? marginsHeader.paddingLongTop
                : marginsHeader.paddingTop,
            },
          ]}
        />
        <StatusBar style="light" />
        <CategoryProvider>
          <Header title="Equipment for home" />
          <MainContent />
        </CategoryProvider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  statusBarBg: {
    backgroundColor: colors.primary,
    paddingTop: marginsHeader.paddingTop,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
