import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { REGISTER_SCREEN, DASHBOARD_SCREEN } from "../StringOfApp";
import BackGroundImage from "../components/BackGroundImage";
import { useHttpClient } from "../services/BackEndAPI";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [logInError, setLogInError] = useState();
  const { sendRequest } = useHttpClient();
  const onLogInHandler = async () => {
    let isInputValid = true;
    isInputValid = onBlurCheckingEmailHandler();
    isInputValid = onBlurCheckingPasswordHandler();
    setLogInError();
    if (isInputValid) {
      try {
        const response = await sendRequest(
          "user/login",
          "POST",
          { "Content-Type": "Application/json" },
          JSON.stringify({ email, password })
        );
        const token = response.headers.get("x-auth-token");
        const user = await response.json();
        console.log(
          "🚀 ~ file: LoginScreen.js ~ line 35 ~ onLogInHandler ~ user",
          user
        );
        navigation.navigate(DASHBOARD_SCREEN);
      } catch (error) {
        console.log(
          "🚀 ~ file: LoginScreen.js ~ line 27 ~ onLogInHandler ~ error",
          error
        );
        setLogInError("Please enter an valid Email or Password");
      }
    }
  };
  const onBlurCheckingEmailHandler = () => {
    if (!email) {
      setEmailError("Please enter an email");
      return false;
    }
    return true;
  };
  const onBlurCheckingPasswordHandler = () => {
    if (!password) {
      setPasswordError("Please Enter a password");
      return false;
    }
    return true;
  };
  return (
    <BackGroundImage>
      <View style={styles.header}>
        <Text style={styles.title}>Event's App</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="rgba(256, 256,256, 0.4)"
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          onBlur={onBlurCheckingEmailHandler}
          onFocus={() => setEmailError()}
        />
        <View style={styles.error}>
          {emailError && <Text style={{ color: "red" }}>{emailError}</Text>}
        </View>

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="rgba(256,256,256,0.4)"
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          onBlur={onBlurCheckingPasswordHandler}
          onFocus={() => setPasswordError()}
        />
        <View style={styles.error}>
          {passwordError && (
            <Text style={{ color: "red" }}>{passwordError}</Text>
          )}
        </View>
        <View style={styles.error}>
          {logInError && <Text style={{ color: "red" }}>{logInError}</Text>}
        </View>
        <TouchableOpacity onPress={onLogInHandler}>
          <Text style={styles.button}>Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate(REGISTER_SCREEN)}>
          <Text
            style={[
              styles.button,
              { backgroundColor: "#337ab7", width: "60%" },
            ]}
          >
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </BackGroundImage>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 2,
    justifyContent: "center",
  },
  form: {
    flex: 8,
    alignContent: "stretch",
    justifyContent: "center",
    paddingHorizontal: 35,
    marginTop: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 10,
    alignSelf: "center",
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
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  error: {
    marginBottom: 20,
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
    marginBottom: 20,
  },
});

export default LoginScreen;
