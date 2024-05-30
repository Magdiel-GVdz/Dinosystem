import React from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { SelectElement } from "react-hook-form-mui";

const SideBar = () => {
  const { logout } = useAuth();
  return (
    <div style={{ position: "fixed", top: "64px", left: 0, zIndex: 99 }}>
      <div style={{ width: "250px", backgroundColor: "#0A5F12" }}>
        <Sidebar
          style={{
            background: "#0A5F12",
            fontFamily: "ArialBlack",
            color: "white",
          }}
        >
          <Menu style={{ background: "#0A5F12" }}>
            <MenuItem
              component={<Link to="/ventas" />}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3F9D3F")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0A5F12")
              }
            >
              DinoVentas
            </MenuItem>
            <MenuItem
              component={<Link to="/compras" />}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3F9D3F")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0A5F12")
              }
            >
              DinoCompras
            </MenuItem>
            <SubMenu
              label="DinoLibros"
              style={{ background: "#0A5F12" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3F9D3F")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0A5F12")
              }
            >
              <MenuItem
                component={
                  <Link to="/libros" style={{ background: "#25B733" }} />
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3F9D3F")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#25B733")
                }
              >
                DinoLibros
              </MenuItem>
              <MenuItem
                component={
                  <Link to="/autores" style={{ background: "#25B733" }} />
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3F9D3F")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#25B733")
                }
              >
                DinoAutores
              </MenuItem>
              <MenuItem
                component={
                  <Link to="/editoriales" style={{ background: "#25B733" }} />
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3F9D3F")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#25B733")
                }
              >
                DinoEditoriales
              </MenuItem>
              <MenuItem
                component={
                  <Link to="/generos" style={{ background: "#25B733" }} />
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3F9D3F")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#25B733")
                }
              >
                DinoGeneros
              </MenuItem>
            </SubMenu>

            <MenuItem
              component={<Link to="/promociones" />}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3F9D3F")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0A5F12")
              }
            >
              DinoPromociones
            </MenuItem>
            <MenuItem
              component={<Link to="/mermas" />}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3F9D3F")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0A5F12")
              }
            >
              DinoMermas
            </MenuItem>
            <SubMenu
              label="DinoReportes"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3F9D3F")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0A5F12")
              }
            >
              <MenuItem
                style={{ background: "#25B733" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3F9D3F")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#25B733")
                }
                component={<Link to="/reportesVentas" />}
              >
                DinoVentas
              </MenuItem>
              <MenuItem
                style={{ background: "#25B733" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#3F9D3F")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#25B733")
                }
                component={<Link to="/reportesInventario" />}
              >
                DinoInventario
              </MenuItem>
            </SubMenu>
            <MenuItem
              component={<Link to="/donaciones" />}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3F9D3F")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0A5F12")
              }
            >
              DinoDonaciones
            </MenuItem>
            <MenuItem
              component={<Link to="/devoluciones" />}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3F9D3F")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0A5F12")
              }
            >
              DinoDevoluciones
            </MenuItem>
            <MenuItem
              component={<Link to="/usuarios" />}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3F9D3F")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0A5F12")
              }
            >
              DinoUsuarios
            </MenuItem>

            <MenuItem
              onClick={logout}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#3F9D3F")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#0A5F12")
              }
            >
              Cerrar sesion{" "}
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>
    </div>
  );
};

export default SideBar;
