import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useAuth } from "../provider/AuthProvider";
import SideBar from "./SideBar";

const NavBar = () => {
  const { userDataPayload, isAuthenticated } = useAuth();
  const data = userDataPayload() ?? {};

  let name = "";
  let last_name = "";
  let is_admin = false;

  try {
    name = data.name ?? "";
    last_name = data.last_name ?? "";
    is_admin = data.is_admin ?? false;
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {isAuthenticated && (
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6">DinoSystem</Typography>
            <Typography variant="h6" sx={{ flexGrow: 1 }}></Typography>
            <Typography variant="h6">
              {is_admin ? "Gerente" : "Empleado"} - {name} {last_name}
            </Typography>
          </Toolbar>
        </AppBar>
      )}
    </Box>
  );
};

export default NavBar;
