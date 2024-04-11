import ReactDOM from "react-dom/client";
import { Greeting } from "./Greeting";
import { Button } from "./Button";
import { CuadroTexto } from "./CuadroTexto";
import { App } from "./Peticiones";


const root = ReactDOM.createRoot(document.getElementById("root"));

const login = (Email,Contraseña)  =>{
  if (Email === '' && Contraseña === '')
  alert('Llena los campos');
};


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
    <form
    

      onSubmit={(e) => {
        e.preventDefault();
        console.log(e);

        const email = e.target.email.value;
        const password = e.target.password.value;
        
        console.log('Email:', email);
        console.log('Password:', password);
        login( email,password);
      
      }}

      

    >
      <CuadroTexto
        posicion={{ top: "415px", left: "65px" }}
        type="text"
        name="Email"
        value="Email" onChange={(e) => App.setEmail(e.target.value)}
        placeholder="Introduce el E-mail"
      />
      
      <CuadroTexto
        posicion={{ top: "510px", left: "65px" }}
        type="password"
        name= "password"
        value="Contraseña" onChange={(e) => App.setContraseña(e.target.value)}
        placeholder="Introduce la Contraseña"
      />
      <Button text="Iniciar sesión" 
      />
    </form>
    
  </body>
);
