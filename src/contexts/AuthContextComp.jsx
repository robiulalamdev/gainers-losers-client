import { createContext, useContext, useEffect, useState } from "react";
import { SESSION_KEY } from "../globals/constant";

export const AuthContext = createContext();

const AuthContextComp = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(SESSION_KEY);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setUserLoading(false);
  }, []);

  const userSignIn = (userData) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
    setUser(userData);
  };

  const userLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  const authInfo = {
    user,
    userLoading,
    userSignIn,
    userLogout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export default AuthContextComp;
