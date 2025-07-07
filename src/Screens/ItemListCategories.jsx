import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import products from "../../Data/products.json";
import FlatListComponent from "../../src/Components/FlatListComponent";

const ItemListCategories = ({ navigation, route }) => {
  const { width, height } = useWindowDimensions();

  const { category } = route.params;

  const isLandscape = width > height;

  const filteredProducts =
    category && category !== "Ver Todo"
      ? products.filter((item) => item.category === category)
      : products;

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          {
            fontSize: isLandscape ? 14 : 18,
            marginVertical: isLandscape ? 2 : 10,
          },
        ]}
      >
        {/* Productos {selectedCategory && `- ${selectedCategory}`} : */}
        Productos {category && `- ${category}`} :
      </Text>
      <FlatListComponent data={filteredProducts} />
    </View>
  );
};

export default ItemListCategories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 18,
    marginVertical: 10,
    fontFamily: "Michroma-Regular",
  },
});
