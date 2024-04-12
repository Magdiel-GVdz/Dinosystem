import React, { createContext, useState } from "react";
import axios from "axios";

// Creamos el contexto
const UserContext = createContext();

// Creamos el provider
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Función para autenticar al usuario
  const authenticate = async (email, password) => {
    setLoading(true);
    console.log(email, password);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/token/",
        { email, password }
      );
      setUser(response.data.user);
      console.log(response.data);
      setError(null);
      setLoading(false);
      return response.data;
    } catch (err) {
      console.log("no se pudo logear")
      setError(err);
      console.error(error.response.data.message);
      setUser(null);
      setLoading(false);
      return error.response.data;
    }
  };

  // Objeto de valores que pasaremos al contexto
  const values = {
    user,
    error,
    loading,
    authenticate,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export { UserProvider, UserContext };
