import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { colors } from "../../Global/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector, useDispatch } from "react-redux";
import { removeItems } from "../../features/cart/cartSlice";

const CartScreen = () => {
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const total = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();

  const FooterComponent = () => (
    <View style={styles.footerContainer}>
      <Text style={styles.footerTotal}>Total: $ {total}</Text>
      <Pressable
        onPress={() => {
          alert("Gestionar orden");
        }}
      >
        <Text style={styles.textAddToCart}>Comprar</Text>
      </Pressable>
    </View>
  );

  const renderCartItem = ({ item }) => (
    <>
      <View style={styles.cartContainer}>
        <Image
          source={{ uri: item.mainImage }}
          style={styles.cartImage}
          resizeMode="cover"
        />
        <View style={styles.cartDescription}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.shortDescription}</Text>
          <Text style={styles.price}>Precio unitario: $ {item.price}</Text>
          <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
          <Text style={styles.total}>
            Total: $ {item.quantity * item.price}
          </Text>

          <Pressable onPress={() => dispatch(removeItems(item.id))}>
            <Icon
              name="delete"
              size={24}
              color="#FC7A5E"
              style={styles.trashIcon}
            />
          </Pressable>
        </View>
      </View>
    </>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
          ListHeaderComponent={
            <Text style={styles.cartScreenTitle}>Tu carrito:</Text>
          }
          ListFooterComponent={<FooterComponent />}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>
            Aún no hay productos en el carrito
          </Text>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartContainer: {
    flexDirection: "row",
    padding: 16,
    margin: 12,
    borderRadius: 12,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    gap: 12,
  },
  cartImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  cartDescription: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    marginBottom: 2,
  },
  quantity: {
    fontSize: 14,
    marginBottom: 2,
  },
  total: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 4,
  },
  trashIcon: {
    alignSelf: "flex-start",
    marginTop: 8,
  },
  footerContainer: {
    padding: 20,
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  footerTotal: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    backgroundColor: colors.purple,
    borderRadius: 20,
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
  cartScreenTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 16,
    color: colors.purple,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyCartText: {
    fontSize: 16,
    color: "#777",
  },
  textAddToCart: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    color: colors.white,
    fontSize: 24,
    textAlign: "center",
  },
});
