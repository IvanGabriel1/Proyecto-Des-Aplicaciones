import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartStackNavigator from "./CartStackNavigator";
import OrdersStackNavigator from "./OrdersStackNavigator";
import Navigator from "./Navigator";
import { BlurView } from "expo-blur";
import Icon from "react-native-vector-icons/FontAwesome";
import { colors } from "../global/colors";

const Tab = createBottomTabNavigator();

//npx expo install expo-blur

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <BlurView
            tint="light"
            intensity={100}
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tab.Screen
        name="Shop"
        component={Navigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={24}
              color={focused ? colors.darkGray : colors.lightGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="shopping-cart"
              size={24}
              color={focused ? colors.darkGray : colors.lightGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              name="file-text-o"
              size={20}
              color={focused ? colors.darkGray : colors.lightGray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
