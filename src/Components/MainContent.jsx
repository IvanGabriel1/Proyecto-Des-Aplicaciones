import React, { useContext } from "react";
import { View } from "react-native";
import Header from "../Components/Header";
import ItemListCategories from "../Screens/ItemListCategories";
import { CategoryContext } from "../context/CategoryContext";
import Home from "../Screens/Home";

const MainContent = () => {
  const { selectedCategory } = useContext(CategoryContext);

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Header title="Nombre de la aplicación" />
      {!selectedCategory || selectedCategory === "Ver Todo" ? (
        <Home />
      ) : (
        <ItemListCategories />
      )}
    </View>
  );
};

export default MainContent;
