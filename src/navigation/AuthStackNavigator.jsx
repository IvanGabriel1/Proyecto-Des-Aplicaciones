import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/auth/LoginScreen";
import SignupScreen from "../Screens/auth/SignUpScreen";

const Stack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
