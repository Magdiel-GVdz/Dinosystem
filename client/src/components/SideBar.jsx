import React from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { SelectElement } from "react-hook-form-mui";

const SideBar = () => {
  const { logout} = useAuth();
  return (
    <div style={{ position: 'fixed', top: '64px', left: 0, zIndex: 99 }}>
      <div style={{ width: '250px', backgroundColor: "#0A5F12" }}>

      <Sidebar
          style={{background:"#0A5F12",
          
          color:"white",

          }}
        >
        <Menu style={{background:"#0A5F12",
          
        }}>
          <MenuItem component={<Link to="/ventas" />}>DinoVentas</MenuItem>
          <MenuItem component={<Link to="/compras" />}>DinoCompras</MenuItem>
          <SubMenu label="DinoLibros" style={{background:"#0A5F12",
            
        }} >
            <MenuItem component={<Link to="/libros" style={{background:"#25B733",
            
          }}  />}>DinoLibros</MenuItem>
            <MenuItem component={<Link to="/autores" style={{background:"#25B733",
            
          }} />}>DinoAutores</MenuItem>
            <MenuItem component={<Link to="/editoriales" style={{background:"#25B733",
            
          }} />}>
              DinoEditoriales
            </MenuItem>
            <MenuItem component={<Link to="/generos" style={{background:"#25B733",
            
          }} />}>DinoGeneros</MenuItem>
          </SubMenu>

          <MenuItem component={<Link to="/promociones" />}>
            DinoPromociones
          </MenuItem>
          <MenuItem component={<Link to="/mermas" />}>DinoMermas</MenuItem>
          <MenuItem component={<Link to="/reportes" />}>DinoReporte</MenuItem>
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
