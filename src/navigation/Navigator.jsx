import { StyleSheet, View, useWindowDimensions } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ItemListCategories from "../Screens/ItemListCategories";
import Home from "../Screens/Home";
import ItemDetail from "../Screens/ItemDetail";
import Header from "../Components/Header";

const Navigator = () => {
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
        initialRouteName="Home"
        screenOptions={{
          // headerShown: true,
          header: () => <Header title="Equipment for home" />,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="ItemListCategories"
          component={ItemListCategories}
        />
        <Stack.Screen name="ItemDetail" component={ItemDetail} />
      </Stack.Navigator>
    </View>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  navigatorContainer: {
    flex: 1,
    alignSelf: "center",
  },
});
