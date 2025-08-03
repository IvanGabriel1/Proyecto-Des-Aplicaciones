import { StyleSheet, View, useWindowDimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "../components/Header";
import CartScreen from "../Screens/cart/CartScreen";

const CartStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { width, height } = useWindowDimensions();

  const contentWidth = width > 500 ? "80%" : "100%";
  return (
    <View
      style={[
        styles.navigatorContainer,
        { width: contentWidth, height: height * 0.9 },
      ]}
    >
      <Stack.Navigator
        screenOptions={{
          header: () => <Header title="Equipment for home" />,
        }}
      >
        <Stack.Screen name="Carrito" component={CartScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default CartStackNavigator;

const styles = StyleSheet.create({
  navigatorContainer: {
    flex: 1,
    alignSelf: "center",
  },
});
