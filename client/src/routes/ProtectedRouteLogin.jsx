import React from "react";
import { Navigate, Outlet, redirect } from "react-router";
import { useAuth } from "../provider/AuthProvider";

const ProtectedRouteLogin = () => {
  const { token } = useAuth();
  if (!token) {
    return (
      <div>
        {console.log(token, "token no hay")}
        <Outlet />
      </div>
    );
  }
  console.log(token, "token hay");
  return <Navigate to="/ventas" />;
};

export default ProtectedRouteLogin;
