import React, { useState, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { REGISTER_SCREEN, DASHBOARD_SCREEN } from "../StringOfApp";
import BackGroundImage from "../components/BackGroundImage";
import { AuthContext } from "../contexts/AuthContext";
import { useHttpClient } from "../services/BackEndAPI";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [logInError, setLogInError] = useState();
  const [isActiveIndicator, setIsActiveIndicator] = useState(false);
  const authContext = useContext(AuthContext);
  const { sendRequest } = useHttpClient();

  const onLogInHandler = async () => {
    setIsActiveIndicator(true);
    const isValidEmail = onBlurCheckingEmailHandler();
    const isEmptyPassword = onBlurCheckingPasswordHandler();
    setLogInError();
    setPasswordError();
    setEmailError();
    if (isValidEmail && isEmptyPassword) {
      try {
        const response = await sendRequest(
          "user/login",
          "POST",
          { "Content-Type": "Application/json" },
          JSON.stringify({ email, password })
        );

        if (response.status === 200) {
          const token = response.headers.get("x-auth-token");
          const { user } = await response.json();
          console.log("file: AuthContext.js ~ line 30 ~ logIn ~ user", user);
          authContext.logIn(user, token);
        } else throw Error(response.status);
      } catch (error) {
        console.log("file: AuthContext.js ~ line 37 ~ logIn ~ error", error);
        setLogInError("Please enter a valid Email or Password");
      }
    }
    setIsActiveIndicator(false);
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
  const logInView = () => {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.title}>Log In</Text>
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
          <TouchableOpacity
            onPress={() => navigation.navigate(REGISTER_SCREEN)}
          >
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
      </>
    );
  };
  return (
    <BackGroundImage>
      <View style={styles.indicator}>
        <ActivityIndicator
          size="large"
          animating={isActiveIndicator}
          color="#bc2b78"
        />
      </View>

      {!isActiveIndicator && logInView()}
    </BackGroundImage>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 2,
    justifyContent: "center",
  },
  indicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 8,
    alignContent: "stretch",
    paddingHorizontal: 35,
    marginTop: 30,
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
