import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../provider/AuthProvider";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";

const ProtectedRoute = () => {
  const { token } = useAuth();
  console.log(token);
  if (!token) {
    console.log("token no hay");
    return <Navigate to="/" />;
  }

  return (
    <div>
      {console.log(token)}
      <NavBar />
      <div style={{ marginTop: "64px" }}>
        {" "}
        <div style={{ marginLeft: "250px" }}>
          {" "}
          <SideBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
