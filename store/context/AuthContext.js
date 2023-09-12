import React, { useState, useEffect, createContext } from "react";
import { auth } from "../../util/firebase/firebase";
import { fetchUserDetailsFromDatabase } from "../../util/firebase/firebaseDb";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAuth, setLoadingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(async (authUser) => {
      setUser(authUser);
      setIsAuthenticated(!!authUser && authUser.emailVerified);
      if (authUser) {
        // Assuming you're storing user details in a 'users' collection in Firebase Realtime Database or Firestore
        const userDetails = await fetchUserDetailsFromDatabase(authUser.uid);
        if (userDetails) {
          setFirstName(userDetails.firstName);
          setLastName(userDetails.lastName);
          setEmail(userDetails.email);
          setPhoneNumber(userDetails.phoneNumber)
        }
      }
      setLoadingAuth(false)
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
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
