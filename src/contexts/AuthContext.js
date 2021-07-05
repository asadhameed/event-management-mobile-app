import React from "react";

const AuthContext = React.createContext();
const Provider = (props) => {
  return (
    <AuthContext.Provider value={{ isLogin: false }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, Provider };
