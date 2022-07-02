import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const UserSeller = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to="/" />;
  }
  if (user?.rol === "mechanic") {
    return <Navigate to="/mechanic" />;
  }

  return children;
};

export default UserSeller;
