import React, { useContext, useState, useEffect } from "react";
import { auth, methods } from '../Firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  function signup(email, password) {
    return methods.createUserWithEmailAndPassword(auth, email, password)
  };

  function login(email, password) {
    return methods.signInWithEmailAndPassword(auth, email, password)
  };

  useEffect(() => {
    const unsubscribe = methods.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setIsLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};