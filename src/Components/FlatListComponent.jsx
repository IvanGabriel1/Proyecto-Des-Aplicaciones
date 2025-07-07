import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FlatListComponent = ({ data }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.navigate("ItemDetail", { product: item })}
        >
          <View style={styles.card}>
            <Text>{item.title}</Text>
            <Text>${item.price}</Text>
          </View>
        </Pressable>
      )}
    />
  );
};

export default FlatListComponent;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 4, // para Android
    shadowColor: "#000", // para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2a9d8f",
  },
});
