import React from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";

const SideBar = () => {
  const { logout} = useAuth();
  return (
    <div style={{ position: 'fixed', top: '64px', left: 0, zIndex: 99 }}>
      <div style={{ width: '250px', backgroundColor: '#f0f0f0' }}>

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
          <SubMenu label="DinoReportes">
            <MenuItem component={<Link to="/reportesVentas" />}>DinoVentas</MenuItem>
            <MenuItem component={<Link to="/reportesInventario" />}>DinoInventario</MenuItem>
      
          </SubMenu>
          <MenuItem component={<Link to="/donaciones" />}>
            DinoDonaciones
          </MenuItem>
          <MenuItem component={<Link to="/devoluciones" />}>
            DinoDevoluciones
          </MenuItem>
          <MenuItem component={<Link to="/usuarios" />}>DinoUsuarios</MenuItem>

          
          <MenuItem onClick={logout}>Cerrar sesion </MenuItem>
        </Menu>
      </Sidebar>
      </div>
    </div>
  );
};

export default SideBar;
