import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import FlatListComponent from "../Components/FlatListComponent";
import { useSelector } from "react-redux";
import { useGetProductsByCategoryQuery } from "../services/shop/shopApi";

const ItemListCategories = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const categoriaSelected = useSelector(
    (state) => state.shopReducer.categorySelected
  );

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
