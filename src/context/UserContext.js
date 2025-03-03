import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    initials: "",
    name: "",
    phone: "",
    email: "",
    loggedIn: false,
  });

  const login = (userData) => {
    setUser({ ...userData, loggedIn: true });
  };

  const logout = () => {
    setUser({ initials: "", name: "", phone: "", email: "", loggedIn: false });
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
