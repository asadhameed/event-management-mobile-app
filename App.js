import React, { useEffect } from "react";
import NavigationScreen from "./NavigationScreen";
import { Provider } from "./src/contexts/AuthContext";
import { LogBox } from "react-native";

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    LogBox.ignoreAllLogs();
  }, []);
  return (
    <Provider>
      <NavigationScreen />
    </Provider>
  );
}
