import React from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div style={{ display: "flex", height: "100%", minHeight: "400px" }}>
      <Sidebar>
        <Menu>
          <MenuItem component={<Link to="/ventas" />}>DinoVentas</MenuItem>
          <MenuItem component={<Link to="/compras" />}>DinoCompras</MenuItem>
          <SubMenu label="DinoLibros">
            <MenuItem component={<Link to="/libros" />}>DinoLibros</MenuItem>
            <MenuItem component={<Link to="/autores" />}>DinoAutores</MenuItem>
            <MenuItem component={<Link to="/editoriales" />}>
              DinoEditoriales
            </MenuItem>
            <MenuItem component={<Link to="/generos" />}>DinoGeneros</MenuItem>
          </SubMenu>

          <MenuItem component={<Link to="/promociones" />}>
            DinoPromociones
          </MenuItem>
          <MenuItem component={<Link to="/mermas" />}>DinoMermas</MenuItem>
          <MenuItem component={<Link to="/reporte" />}>DinoReporte</MenuItem>
          <MenuItem component={<Link to="/donaciones" />}>
            DinoDonaciones
          </MenuItem>
          <MenuItem component={<Link to="/devoluciones" />}>
            DinoDevoluciones
          </MenuItem>
          <MenuItem component={<Link to="/usuarios" />}>DinoUsuarios</MenuItem>

          <MenuItem>Cerrar sesion </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideBar;
