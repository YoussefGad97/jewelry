import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    loggedIn: false,
    initials: "",
    name: "",
    email:"",
  });
  const login = (userData) => {
    if(!userData.initials || !userData.name || !userData.email){
        console.error("Login failed: Incomplete user data provided.");
        return;
    }
    setUser({ ...userData, loggedIn: true });
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser({ loggedIn: false, initials: "", name: "", email:"" });
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if(storedUser){
        setUser({...storedUser, loggedIn: true})
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};