/*import axios from "axios";

export async function ValidarUsuario(email,password) {
  //const {email} = Email;
  //onst {password} = Contraseña;
  console.log({email, password});

  try {
    const respuesta = await axios.post('http://localhost:8000/api/v1/users/token/', { email, password });
    const usuarioValido = respuesta.data.valido;

    if (usuarioValido) {
      console.log('El E-mail es válido.');
    } else {
      console.log('El E-mail no es válido.');
    }
  } catch (error) {
    console.error('Error al validar el Correo:', error);
  }
}*/
import { useState } from 'react';
import axios from 'axios';

export function App() {
  const [Email, setEmail] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const [resultadoValidación, setResultadoValidación] = useState('');

  const handleValidarUsuario = async () => {
    try {
      const respuesta = await axios.post('http://localhost:8000/api/v1/users/token/', { Email, Contraseña });
      setResultadoValidación(respuesta.data.valido ? 'Usuario válido' : 'Usuario inválido');
    } catch (error) {
      console.error('Error al validar el usuario:', error);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={Contraseña} onChange={(e) => setContraseña(e.target.value)} />
      <button onClick={handleValidarUsuario}>Validar Usuario</button>
      <p>{resultadoValidación}</p>
    </div>
  );
}








