import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LOGIN_SCREEN } from "../StringOfApp";
import { useHttpClient } from "../services/BackEndAPI";
import BackGroundImage from "../components/BackGroundImage";

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const { sendRequest } = useHttpClient();
  const onRegisterHandler = async () => {
    try {
      const body = JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      const headers = { "Content-Type": "Application/json" };
      const response = await sendRequest(
        "user/registration",
        "POST",
        headers,
        body
      );
      console.log(
        "🚀 ~ file: RegisterScreen.js ~ line 42 ~ onRegisterHandler ~ response",
        response
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: RegisterScreen.js ~ line 42 ~ onRegisterHandler ~ error",
        error
      );
    }
  };

  return (
    <BackGroundImage>
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
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={onRegisterHandler}>
            <Text style={styles.button}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate(LOGIN_SCREEN)}>
            <Text
              style={[
                styles.button,
                { backgroundColor: "#337ab7", width: "60%" },
              ]}
            >
              Log In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </BackGroundImage>
  );
};
const styles = StyleSheet.create({
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
    width: "70%",
    backgroundColor: "#af70a6",
    color: "#fff",
  },
});
export default RegisterScreen;
