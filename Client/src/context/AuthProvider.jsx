import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
export const AuthContext = createContext();

// hum apne AuthProvider ko main.jsx me pass kar rahe hai.
export const AuthProvider = ({ children }) => {
  const initialUserState =
    Cookies.get("jwt") || localStorage.getItem("ChatApp");

  const [authUser, setAuthUser] = useState(
    initialUserState ? JSON.parse(initialUserState) : undefined
  );

  console.log("authUser " + authUser);

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

// auth context ke andar hum authUser and set authUser state ko pass kar rahe hai. by help of useContext hook.
