import { StyleSheet, View, useWindowDimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrdersScreen from "../Screens/orders/OrdersScreen";
import Header from "../components/Header";

const OrdersStackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const { width, height } = useWindowDimensions();

  // Ejemplo simple de lógica responsive
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
        <Stack.Screen name="Carrito" component={OrdersScreen} />
      </Stack.Navigator>
    </View>
  );
};

export default OrdersStackNavigator;

const styles = StyleSheet.create({
  navigatorContainer: {
    flex: 1,
    alignSelf: "center",
  },
});
