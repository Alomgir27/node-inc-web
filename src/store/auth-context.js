import React from "react";

//Creating context and give default value
export const AuthContext = React.createContext({
  tokens: {},
  user: {},
  setTokens: () => {},
  setUser: () => {},
});
//Provide context value
const AuthContextProvider = ({ children, tokens, user }) => {
  const [tokensState, setTokens] = React.useState(tokens);
  const [userState, setUser] = React.useState(user);

  return (
    <AuthContext.Provider
      value={{ tokens: tokensState, setTokens, user: userState, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;