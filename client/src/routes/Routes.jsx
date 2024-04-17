import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedRouteLogin from "./ProtectedRouteLogin";

import SideBar from "../components/SideBar";
import ComprasPage from "../pages/compras/ComprasPage";
import VentasPage from "../pages/ventas/VentasPage";
import DevolucionesPage from "../pages/devoluciones/DevolucionesPage";
import DonacionesPage from "../pages/donaciones/DonacionesPage";
import LibrosPage from "../pages/libros/LibrosPage";
import LoginPage from "../pages/login/LoginPage";
import MermasPage from "../pages/mermas/MermasPage";
import PromocionesPage from "../pages/promociones/PromocionesPage";
import ReportesPage from "../pages/reportes/ReportesPage";
import UsuariosPage from "../pages/usuarios/UsuariosPage";
import NotFoundPage from "../pages/NotFoundPage";
import AutoresPage from "../pages/autores/AutoresPage";
import EditorialesPage from "../pages/editoriales/EditorialesPage";
import GenerosPage from "../pages/generos/GenerosPage";

const Routes = () => {
  const { token } = useAuth();
  const routesForPublic = [
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ];
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRouteLogin />,
      children: [
        {
          path: "/",
          element: <LoginPage />,
        },
      ],
    },
  ];
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/compras",
          element: <ComprasPage />,
        },
        {
          path: "/devoluciones",
          element: <DevolucionesPage />,
        },
        {
          path: "/donaciones",
          element: <DonacionesPage />,
        },
        {
          path: "/libros",
          element: <LibrosPage />,
        },
        {
          path: "/autores",
          element: <AutoresPage />,
        },
        {
          path: "/editoriales",
          element: <EditorialesPage />,
        },
        {
          path: "/generos",
          element: <GenerosPage />,
        },
        {
          path: "/mermas",
          element: <MermasPage />,
        },
        {
          path: "/promociones",
          element: <PromocionesPage />,
        },
        {
          path: "/reportes",
          element: <ReportesPage />,
        },
        {
          path: "/usuarios",
          element: <UsuariosPage />,
        },
        {
          path: "/ventas",
          element: <VentasPage />,
        },
      ],
    },
  ];
  const router = createBrowserRouter([
    ...routesForPublic,
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
