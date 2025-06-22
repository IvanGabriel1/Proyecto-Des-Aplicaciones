import React, { useContext } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import ItemListCategories from "../Screens/ItemListCategories";
import { CategoryContext } from "../context/CategoryContext";
import Home from "../Screens/Home";

const MainContent = () => {
  const { selectedCategory } = useContext(CategoryContext);
  const { width, height } = useWindowDimensions();

  // Ejemplo simple de lógica responsive
  const contentWidth = width > 500 ? "80%" : "100%";

  return (
    <View
      style={[
        styles.mainContentContainer,
        { width: contentWidth, height: height * 0.9 },
      ]}
    >
      {!selectedCategory || selectedCategory === "Ver Todo" ? (
        <Home />
      ) : (
        <ItemListCategories />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContentContainer: {
    alignSelf: "center", // para centrar el contenedor si el ancho no es 100%
  },
});

export default MainContent;
