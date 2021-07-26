import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Inputs = (props) => {
  return (
    <View style={styles.inputsContainer}>
      <Text style={styles.title}>{props.title}: </Text>
      <Text style={{ ...styles.info, ...props.style }}>{props.info}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    flexDirection: "row",
    padding: 3,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  info: {
    fontSize: 15,
  },
});

export default Inputs;
