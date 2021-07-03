import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import mgBackground from "../../assets/background.jpg";

const BackGroundImage = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBackground} source={mgBackground}>
        {props.children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "stretch",
  },
});

export default BackGroundImage;
