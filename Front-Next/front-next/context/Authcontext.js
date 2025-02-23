"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export  const AuthProvider = ({ children }) => {
  const [role, setRole] = useState("guest");

  useEffect(() => {
    const storedRole = Cookies.get("role");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const updateRole = (newRole) => {
    setRole(newRole);
    Cookies.set("role", newRole, {
      expires: 7,
      secure: true,
      sameSite: "Strict",
    });
  };

  return (
    <AuthContext.Provider value={{ role, updateRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
