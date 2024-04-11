import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Greeting } from "./Greeting";
import { Button } from "./Button";
import { CuadroTexto } from "./CuadroTexto";
import axios from "axios";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLogin = async () => {
    console.log('Iniciando sesion')
    try {
      const response = await axios.post("http://localhost:8000/api/v1/users/token/", {
        email: usuario,
        password: contraseña,
      });
      // Manejar la respuesta según corresponda, por ejemplo, redirigir a otra página
      console.log("Inicio de sesión exitoso", response.data);
    } catch (error) {
      // Manejar errores de inicio de sesión, por ejemplo, mostrar un mensaje de error
      console.error("Error al iniciar sesión", error);
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#0C130C" }}>
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
      <CuadroTexto
        posicion={{ top: "415px", left: "65px" }}
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <CuadroTexto
        posicion={{ top: "510px", left: "65px" }}
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
      />
      <Button text="Iniciar sesión" onClick={handleLogin} />
    </div>
  );
};

export default Login;