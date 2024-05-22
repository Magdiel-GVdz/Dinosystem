import * as React from 'react';
import imagen from "./imagenes/PortadaDino.jpeg";
import imagen2 from "./imagenes/DinoLibros.jpg";
export default function SxProp() {
  return (
    <>
       <h2
        style={{
          color: "white",
          fontFamily: "Arial",
          position: "absolute",
          top: "20px",
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
          top: "15px",
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
          top: "45px",
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
          top: "145px",
          left: "70px",
        }}
      >
        Contraseña
      </h3>
    </>
  ) 
} 

export function SxProp2() {

  return (
    < >
    <div
        style={{
            width: "100%", height: "100vh", backgroundColor: "#0C130C"
        }}
      >
        <h1>
      <img
        src={imagen}
        alt="Nombre de Libreria"
        style={{ width: "100%", height: "200px" }}
      />
      <img
        src={imagen2}
        alt="Libreria"
        style={{
          width: "650px",
          height: "450px",
          position: "absolute" ,
          top: "250px",
          left: "780px",
          borderRadius: "2.5%",
        }}
      />
    </h1>
      </div>

    </>
  );
}



