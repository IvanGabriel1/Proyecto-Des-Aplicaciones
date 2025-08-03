import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ItemListCategories from "../Screens/ItemListCategories";
import Home from "../Screens/Home";
import ItemDetail from "../Screens/ItemDetail";
import Header from "../components/Header";

const Navigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View style={[styles.navigatorContainer, { width: "100%" }]}>
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
