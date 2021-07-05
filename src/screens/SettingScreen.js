import React, { useContext } from "react";
import { Text, Button, StyleSheet } from "react-native";

import BackGroundImage from "../components/BackGroundImage";
import { AuthContext } from "../contexts/AuthContext";

const SettingScreen = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <BackGroundImage>
      <Text> Setting page</Text>
      <Button title="Log out" onPress={logOut} />
    </BackGroundImage>
  );
};

const styles = StyleSheet.create({});

export default SettingScreen;
