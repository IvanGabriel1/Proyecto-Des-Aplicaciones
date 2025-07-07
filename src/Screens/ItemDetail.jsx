import { StyleSheet, Text, View } from "react-native";

const ItemDetail = ({ route }) => {
  const { product } = route.params;
  return (
    <View>
      <Text>{product.title}</Text>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({});
