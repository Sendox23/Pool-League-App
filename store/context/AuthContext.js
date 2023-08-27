import React, { useState, useEffect, createContext } from "react";
import { auth } from "../../util/firebase/firebase";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAuth, setLoadingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
      setIsAuthenticated(!!authUser && authUser.emailVerified);
      setLoadingAuth(false); // Auth state determined
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  const value = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoadingAuth,
    setLoadingAuth,
    isLoading,
    setIsLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
