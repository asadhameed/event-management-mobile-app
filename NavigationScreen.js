import React, { useContext } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, MaterialIcons } from "@expo/vector-icons/";

import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DashBoard from "./src/screens/DashBoard";
import EventScreen from "./src/screens/EventScreen";
import SettingScreen from "./src/screens/SettingScreen";
import { AuthContext } from "./src/contexts/AuthContext";

import {
  LOGIN_SCREEN,
  REGISTER_SCREEN,
  DASHBOARD_SCREEN,
  EVENT_SCREEN,
} from "./src/StringOfApp";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const APP_HEADER = {
  title: "Event's Sport",
  headerTitleAlign: "center",
};
const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={LOGIN_SCREEN}>
      <Stack.Screen
        name={LOGIN_SCREEN}
        component={LoginScreen}
        options={APP_HEADER}
      />
      <Stack.Screen
        name={REGISTER_SCREEN}
        component={RegisterScreen}
        options={{
          title: APP_HEADER.title,
          headerTitleAlign: APP_HEADER.headerTitleAlign,
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

const DashBoardNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={DASHBOARD_SCREEN}>
      <Stack.Screen
        name={DASHBOARD_SCREEN}
        component={DashBoard}
        options={APP_HEADER}
      />
      <Stack.Screen
        name={EVENT_SCREEN}
        component={EventScreen}
        options={APP_HEADER}
      />
    </Stack.Navigator>
  );
};
const MainNavigationScreen = () => {
  const { isLogin } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  console.log(
    "file: NavigationScreen.js ~ line 67 ~ MainNavigationScreen ~ authContext",
    authContext
  );

  return (
    <NavigationContainer>
      <BottomTab.Navigator initialRouteName={"dash_navigation"}>
        <BottomTab.Screen
          name={"dash_navigation"}
          component={DashBoardNavigation}
          options={{
            title: "Dash Board",
            tabBarIcon: () => (
              <MaterialIcons name="dashboard" size={24} color="#af70a6" />
            ),
          }}
        />
        {isLogin && (
          <BottomTab.Screen
            name="Setting"
            component={SettingScreen}
            options={{
              tabBarIcon: () => (
                <MaterialIcons name="settings" size={24} color="#af70a6" />
              ),
            }}
          />
        )}
        {!isLogin && (
          <BottomTab.Screen
            name="Log_In"
            component={AuthNavigation}
            options={{
              title: "Log In",
              tabBarIcon: () => (
                <AntDesign name="login" size={24} color="#af70a6" />
              ),
            }}
          />
        )}
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigationScreen;
