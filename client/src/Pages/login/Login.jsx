import "./login-styles.css";
import "./CTexto.css";
import "./Boton.css";
import imagen from "./imagenes/PortadaDino.jpeg";
import imagen2 from "./imagenes/DinoLibros.jpg";

function Login() {
  return (
    <div style={{ background: "#0C130C", width: "100%", height: "100vh" }}>
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

      <h2
        style={{
          color: "white",
          font: "Arial",
          position: "absolute",
          top: "260px",
          left: "70px",
        }}
      >
        <b>Inicio de sesion</b>
      </h2>
      <h5
        className="h5"
        style={{
          color: "gray",
          font: "Arial",
          position: "absolute",
          top: "285px",
          left: "71px",
        }}
      >
        Introduce tu cuenta de{" "}
        <b style={{ color: "white", fontSize: "1.2em" }}>DinoLibros</b>
      </h5>
      <h3
        d="usuario"
        style={{
          color: "white",
          font: "Arial",
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
          font: "Arial",
          position: "absolute",
          top: "460px",
          left: "70px",
        }}
        id="contraseña"
      >
        Contraseña
      </h3>
      <form>
        <input
          style={{ position: "absolute", top: "415px", left: "65px" }}
          name="Email"
          placeholder="Introduce el E-mail"
          type="Text"
          className="Text"
        />

        <input
          style={{ position: "absolute", top: "510px", left: "65px" }}
          placeholder="Introduce la Contraseña"
          type="password"
          name="Password"
          className="Text"
        />

        <button
          className="boton"
          type="sunmit"
          style={{ position: "absolute", top: "600px", left: "70px" }}
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
export default Login;
