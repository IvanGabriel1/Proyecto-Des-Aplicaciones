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
import Header from "./src/Components/Header";
import { NavigationContainer } from "@react-navigation/native";
//import Navigator from "./src/navigation/Navigator";
import TabNavigator from "./src/navigation/TabNavigator";

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
    return <Text style={styles.TextLoadFonts}>Cargando fuentes...</Text>;
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
        <NavigationContainer>
          {/* Aca estaba navigator y no tabnavigator */}
          <TabNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  TextLoadFonts: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    fontSize: 32,
  },
  statusBarBg: {
    backgroundColor: colors.primary,
    paddingTop: marginsHeader.paddingTop,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
