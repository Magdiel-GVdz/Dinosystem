import imagen from "./imagenes/PortadaDino.jpeg";
import imagen2 from "./imagenes/DinoLibros.jpg";
export function Greeting() {
  return (
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
          position: "absolute",
          top: "250px",
          left: "780px",
          borderRadius: "2.5%",
        }}
      />
    </h1>
  );
}
