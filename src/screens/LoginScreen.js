import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { REGISTER_SCREEN } from "../StringOfApp";
const mgBackground = require("../../assets/background.jpg");

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBackground} source={mgBackground}>
        <TouchableOpacity onPress={() => navigation.navigate(REGISTER_SCREEN)}>
          <Text style={styles.textStyle}>Log in Screen</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 30,
    fontWeight: "bold",
  },
});

export default LoginScreen;
