import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../provider/AuthProvider";
import SideBar from "../components/SideBar";



const ProtectedRoute = () => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ marginLeft: '250px' }}>
      <SideBar />
      <Outlet />
    </div>
  );
};


export default ProtectedRoute;
