import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import BackGroundImage from "../components/BackGroundImage";
import { AuthContext } from "../contexts/AuthContext";
import globalSheet from "../constant/stylesSheet";

const SettingScreen = () => {
  const { logOut } = useContext(AuthContext);
  return (
    <BackGroundImage>
      <View>
        <TouchableOpacity onPress={logOut}>
          <Text style={globalSheet.buttonStyle}>Log out</Text>
        </TouchableOpacity>
      </View>
    </BackGroundImage>
  );
};

const styles = StyleSheet.create({});

export default SettingScreen;
