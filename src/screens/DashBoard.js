import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BackGroundImage from "../components/BackGroundImage";

const DashBoard = () => {
  return (
    <BackGroundImage>
      <Text style={styles.title}>DashBoard</Text>
    </BackGroundImage>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
  },
});
export default DashBoard;
