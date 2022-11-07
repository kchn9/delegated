import { useState, createContext } from "react";
import jwt_decode from "jwt-decode";
import { setAuthToken } from "../axios/axiosHelper";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      setAuthToken();
      return {
        id: "",
        username: "",
      };
    }
    const parsed = JSON.parse(token);
    setAuthToken(parsed);
    const decoded = jwt_decode(token);
    return {
      id: decoded.id,
      username: decoded.username,
    };
  });

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {props.children}
    </AuthContext.Provider>
  );
};
