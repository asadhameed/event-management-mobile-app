import React from "react";
import { Text, Button, StyleSheet } from "react-native";

import BackGroundImage from "../components/BackGroundImage";

const SettingScreen = () => {
  return (
    <BackGroundImage>
      <Text> Setting page</Text>
      <Button title="Log out" />
    </BackGroundImage>
  );
};

const styles = StyleSheet.create({});

export default SettingScreen;
