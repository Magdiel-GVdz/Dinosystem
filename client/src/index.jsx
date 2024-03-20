import ReactDOM from "react-dom/client";
import { Greeting } from "./Greeting";
import { Button } from "./Button";
import { CuadroTexto } from "./CuadroTexto";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <body style={{ width: "100%", height: "100vh", backgroundColor: "#0C130C" }}>
    <Greeting />
    <h2
      style={{
        color: "white",
        fontFamily: "Arial",
        position: "absolute",
        top: "260px",
        left: "70px",
      }}
    >
      <b>Inicio de sesion</b>
    </h2>
    <h5
      style={{
        color: "grey",
        fontFamily: "Calibri",
        position: "absolute",
        top: "285px",
        left: "71px",
      }}
    >
      Introduce tu cuenta de{" "}
      <b style={{ color: "white", fontSize: "1.2em" }}>DinoLibros</b>
    </h5>
    <h3
      style={{
        color: "white",
        fontFamily: "Arial",
        position: "absolute",
        top: "360px",
        left: "70px",
      }}
    >
      Usuario
    </h3>

    <h3
      style={{
        color: "white",
        fontFamily: "Arial",
        position: "absolute",
        top: "460px",
        left: "70px",
      }}
    >
      Contraseña
    </h3>
    <CuadroTexto posicion={{ top: "415px", left: "65px" }} />
    <CuadroTexto posicion={{ top: "510px", left: "65px" }} />
    <Button text="Iniciar sesión" />
  </body>
);
