import { StyleSheet, Text, View, FlatList } from "react-native";
import products from "../../../Data/products.json";

const ListaItem = () => {
  return (
    <View style={styles.flatListContainer}>
      <FlatList
        style={styles.flatList}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
      />
    </View>
  );
};

export default ListaItem;

const styles = StyleSheet.create({
  flatListContainer: {},
  flatList: {},
});
