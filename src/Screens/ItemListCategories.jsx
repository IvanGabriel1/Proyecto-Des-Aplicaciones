import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import products from "../data/products.json";
import FlatListComponent from "../components/FlatListComponent";
import { useSelector } from "react-redux";
import { useGetProductsByCategoryQuery } from "../services/shop/shopApi";

const ItemListCategories = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const categoriaSelected = useSelector(
    (state) => state.shopReducer.categorySelected
  );

  // const todosLosProductos = useSelector((state) => state.shopReducer.products);

  // const filteredProducts =
  //   categoriaSelected && categoriaSelected !== "Ver Todo"
  //     ? todosLosProductos.filter((item) => item.category === categoriaSelected)
  //     : todosLosProductos;

  // const filteredProducts = useSelector(
  //   (state) => state.shopReducer.productsFilterByCategory
  // );

  const {
    data: filteredProducts,
    isLoading,
    error,
  } = useGetProductsByCategoryQuery(categoriaSelected);

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
        Productos {categoriaSelected && `- ${categoriaSelected}`} :
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
