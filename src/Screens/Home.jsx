import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import products from "../../Data/products.json";
import { CategoryContext } from "../context/CategoryContext";
import FlatListComponent from "../../src/Components/FlatListComponent";

const Home = () => {
  return (
    <View style={styles.container}>
      <FlatListComponent data={products} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
});
