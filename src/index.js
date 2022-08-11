import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import AuthContextProvider from "./store/auth-context";

// import "./styles/styles.scss";
// email: shakeeb.node@gmail.com
// password: Password}{2010
const user = localStorage.getItem("user");
const tokens = localStorage.getItem("tokens");

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider
      user={user ? JSON.parse(user) : {}}
      tokens={tokens ? JSON.parse(tokens) : {}}
    >
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
