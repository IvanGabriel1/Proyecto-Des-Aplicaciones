import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  useWindowDimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const FlatListComponent = ({ data }) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const contentWidth = width > 500 ? "85%" : "100%";

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.navigate("ItemDetail", { product: item })}
          style={({ pressed }) => [{ opacity: pressed ? 0.95 : 1 }]}
        >
          <View style={[styles.card, { width: contentWidth }]}>
            <Image
              source={{ uri: item.mainImage }}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.infoContainer}>
              <Text style={styles.title}>{item.title}</Text>
              {item.discount > 0 && (
                <View style={styles.discountContainer}>
                  <Text style={styles.discountText}>-{item.discount}%</Text>
                </View>
              )}
              <Text style={styles.price}>${item.price}</Text>
            </View>
          </View>
        </Pressable>
      )}
    />
  );
};

export default FlatListComponent;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    marginLeft: "auto",
    marginRight: "auto",
    elevation: 4, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    alignItems: "center",
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 8,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2a9d8f",
    marginTop: 6,
  },
  discountContainer: {
    backgroundColor: "#e63946",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  discountText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});
