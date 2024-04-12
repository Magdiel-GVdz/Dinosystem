import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SideBar from "./components/SideBar";
import ComprasPage from "./pages/compras/ComprasPage";
import VentasPage from "./pages/ventas/VentasPage";
import DevolucionesPage from "./pages/devoluciones/DevolucionesPage";
import DonacionesPage from "./pages/donaciones/DonacionesPage";
import LibrosPage from "./pages/libros/LibrosPage";
import LoginPage from "./pages/login/LoginPage";
import MermasPage from "./pages/mermas/MermasPage";
import PromocionesPage from "./pages/promociones/PromocionesPage";
import ReportesPage from "./pages/reportes/ReportesPage";
import UsuariosPage from "./pages/usuarios/UsuariosPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        {window.location.pathname !== "/" && <SideBar />}
        <main style={{ padding: 10 }}>
          <Routes>
            <Route
              element={<ProtectedRoute canActivate={true} redirectPath="/" />}
            >
              <Route path="/compras" element={<ComprasPage />} />
              <Route path="/devoluciones" element={<DevolucionesPage />} />
              <Route path="/donaciones" element={<DonacionesPage />} />
              <Route path="/libros" element={<LibrosPage />} />
              <Route path="/mermas" element={<MermasPage />} />
              <Route path="/promociones" element={<PromocionesPage />} />
              <Route path="/reportes" element={<ReportesPage />} />
              <Route path="/usuarios" element={<UsuariosPage />} />
              <Route path="/ventas" element={<VentasPage />} />
            </Route>
            <Route
              element={
                <ProtectedRoute canActivate={true} redirectPath="/ventas" />
              }
            >
              <Route path="/" element={<LoginPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
