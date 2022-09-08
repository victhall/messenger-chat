import React, { useContext, useState, useEffect } from "react";
import { auth, methods } from '../Firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext)
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return methods.createUserWithEmailAndPassword(auth, email, password)
  }

  useEffect(() => {
    const unsubscribe = methods.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      console.log(user)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};