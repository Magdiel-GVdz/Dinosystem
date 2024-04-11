import React from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";

const SideBar = () => {
  return (
    <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
      <Sidebar>
        <Menu>
          <MenuItem>DinoVentas </MenuItem>
          <MenuItem>DinoCompras </MenuItem>
          <MenuItem>DinoLibros </MenuItem>
          <MenuItem>DinoPromociones </MenuItem>
          <MenuItem>DinoMermas </MenuItem>
          <MenuItem>DinoReporte </MenuItem>
          <MenuItem>DinoDonaciones </MenuItem>
          <MenuItem>DinoDevoluciones </MenuItem>
          <MenuItem>DinoUsuarios </MenuItem>
          <MenuItem>Cerrar sesion </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
