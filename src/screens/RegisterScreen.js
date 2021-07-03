import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Input,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LOGIN_SCREEN } from "../StringOfApp";
const mgBackground = require("../../assets/background.jpg");

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState();
  const onRegisterHandler = () => {
    try {
      console.log(
        "🚀 ~ file: RegisterScreen.js ~ line 23 ~ onRegisterHandler ~ firstName",
        firstName
      );

      console.log(
        "🚀 ~ file: RegisterScreen.js ~ line 26 ~ onRegisterHandler ~ lastName",
        lastName
      );

      console.log(
        "🚀 ~ file: RegisterScreen.js ~ line 27 ~ onRegisterHandler ~ password",
        password
      );

      console.log(
        "🚀 ~ file: RegisterScreen.js ~ line 33 ~ onRegisterHandler ~ email",
        email
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: RegisterScreen.js ~ line 26 ~ onRegisterHandler ~ error",
        error
      );
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBackground} source={mgBackground}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Event's App</Text>
          <View style={styles.form}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              placeholderTextColor="rgba(256,256,256,0.4)"
              autoCorrect={false}
              autoCapitalize="none"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              placeholderTextColor="rgba(256,256,256,0.4)"
              autoCorrect={false}
              autoCapitalize="none"
              value={lastName}
              onChangeText={setLastName}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="rgba(256,256,256,0.4)"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              autoCapitalize="none"
              placeholder="Password"
              placeholderTextColor="rgba(256,256,256,0.4)"
              autoCorrect={false}
              value={password}
              onChangeText={setPassword}
            />
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Confirm Password"
              placeholderTextColor="rgba(256,256,256,0.4)"
              autoCorrect={false}
              autoCapitalize="none"
              value={confPassword}
              onChangeText={setConfPassword}
            />
            <TouchableOpacity onPress={onRegisterHandler}>
              <Text style={styles.button}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate(LOGIN_SCREEN)}>
              <Text
                style={[
                  styles.button,
                  { backgroundColor: "#337ab7", width: "40%" },
                ]}
              >
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
  },
  form: {
    alignContent: "stretch",
    paddingHorizontal: 35,
    marginTop: 15,
  },
  label: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "400",
    padding: 5,
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ffffff",
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: "400",
    height: 40,
    borderRadius: 4,
    marginBottom: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  button: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    borderWidth: 2,
    borderRadius: 20,
    alignSelf: "center",
    textAlign: "center",
    padding: 5,
    width: "60%",
    backgroundColor: "#af70a6",
    color: "#fff",
  },
});
export default RegisterScreen;
