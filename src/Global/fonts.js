import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    "Caveat-Regular": require("../../assets/fonts/Caveat-Regular.ttf"),
    "Caveat-Medium": require("../../assets/fonts/Caveat-Medium.ttf"),
    "Michroma-Regular": require("../../assets/fonts/Michroma-Regular.ttf"), //Esta fuente no tiene bold, italic. Solo regular
  });
};
