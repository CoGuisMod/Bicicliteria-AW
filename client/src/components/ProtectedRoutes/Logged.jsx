import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Logged = ({ children }) => {
  const { user } = UserAuth();

  if (user?.rol === "seller") {
    return <Navigate to="/seller" />;
  }
  if (user?.rol === "mechanic") {
    return <Navigate to="/mechanic" />;
  }
  if (user?.rol === "admin") {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default Logged;
