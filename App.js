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
import { marginsHeader } from "./src/global/constants";
import { colors } from "./src/global/colors";

import TabNavigator from "./src/navigation/TabNavigator";
import { Provider } from "react-redux";
import store from "./src/store";
import MainNavigator from "./src/navigation/MainNavigator";

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
      <Provider store={store}>
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


          <MainNavigator />
        </SafeAreaView>
      </Provider>
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
