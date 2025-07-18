import { View, StyleSheet } from "react-native";
//import products from "../data/products.json";
import FlatListComponent from "../components/FlatListComponent";
import Search from "../components/Search";
import { useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const products = useSelector((state) => state.shopReducer.products);

  const filteredProducts =
    searchText.length >= 1
      ? products.filter((product) =>
          product.title.toLowerCase().includes(searchText.toLowerCase())
        )
      : products;

  return (
    <View style={styles.container}>
      <Search searchText={searchText} setSearchText={setSearchText} />
      <FlatListComponent data={filteredProducts} />
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
