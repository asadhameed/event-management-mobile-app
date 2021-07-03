import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DashBoard from "./src/screens/DashBoard";

import {
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  DASHBOARD_SCREEN,
} from "./src/StringOfApp";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={LOGIN_SCREEN}>
        <Stack.Screen name={DASHBOARD_SCREEN} component={DashBoard} />
        <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
        <Stack.Screen name={REGISTER_SCREEN} component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
