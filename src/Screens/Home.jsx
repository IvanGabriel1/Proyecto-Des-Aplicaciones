import React, { useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import products from "../../Data/products.json";
import { CategoryContext } from "../context/CategoryContext";

const Home = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
});
