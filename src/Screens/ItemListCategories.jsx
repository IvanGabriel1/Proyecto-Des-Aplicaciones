import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext } from "react";
import products from "../../Data/products.json";
import { CategoryContext } from "../context/CategoryContext"; // ✅ esta línea es clave

const ItemListCategories = () => {
  const { selectedCategory } = useContext(CategoryContext);

  const filteredProducts =
    selectedCategory && selectedCategory !== "Ver Todo"
      ? products.filter((item) => item.category === selectedCategory)
      : products;

  return (
    <View>
      <Text style={styles.title}>
        Productos {selectedCategory && `- ${selectedCategory}`}
      </Text>
      <FlatList
        data={filteredProducts}
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

export default ItemListCategories;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  card: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#eee",
    borderRadius: 8,
  },
});
