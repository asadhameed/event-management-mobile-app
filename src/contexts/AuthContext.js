import React, { useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { STORE_USER_KEY } from "../StringOfApp";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOG_IN_OUT":
      const data = action.payload;
      return { ...state, ...data };
    // case "ERROR":
    //   return {...state, error:action.payload}
    default:
      return state;
  }
};

const AuthContext = React.createContext();
const Provider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    user: null,
    token: null,
  });

  const tryLocalLogin = async () => {
    try {
      let userData = await AsyncStorage.getItem(STORE_USER_KEY);
      if (userData) {
        const { user, token } = JSON.parse(userData);
        return dispatch({
          type: "LOG_IN_OUT",
          payload: { isLogin: true, user, token },
        });
      }
    } catch (error) {
      console.log(
        "file: AuthContext.js ~ line 49 ~ tryLocalLogin ~ error",
        error
      );
    }
  };
  const logIn = async (user, token) => {
    try {
      await AsyncStorage.setItem(
        STORE_USER_KEY,
        JSON.stringify({ user, token })
      );
      return dispatch({
        type: "LOG_IN_OUT",
        payload: { isLogin: true, user, token },
      });
    } catch (error) {
      console.log("file: AuthContext.js ~ line 82 ~ logOut ~ error", error);
    }
  };

  const logOut = async () => {
    try {
      await AsyncStorage.removeItem(STORE_USER_KEY);
      return dispatch({
        type: "LOG_IN_OUT",
        payload: { isLogin: false, user: null, token: null },
      });
    } catch (error) {
      console.log("file: AuthContext.js ~ line 82 ~ logOut ~ error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, logIn, logOut, tryLocalLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, Provider };
