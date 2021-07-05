import React from "react";
import NavigationScreen from "./NavigationScreen";
import { Provider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <Provider>
      <NavigationScreen />
    </Provider>
  );
}
