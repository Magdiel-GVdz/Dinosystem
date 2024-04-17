import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(null));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
    localStorage.setItem("token", token);
  }, [token]);


  const isAuthenticated = useMemo(() => !!token, [token]);
  
  const getTokenPayload = () => {
    if (token === null) {
      console.error("Token is null");
      return null;
    }

    if (typeof token !== "string") {
      console.error(`Token is not a string: ${typeof token}`);
      return null;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error(`Token is malformed: ${token}`);
      return null;
    }

    const base64Url = parts[1];
    if (base64Url === null) {
      console.error("Token base64Url is null");
      return null;
    }

    const base64 = base64Url.replace("-", "+").replace("_", "/");
    if (base64 === null) {
      console.error("Token base64 is null");
      return null;
    }

    try {
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error(`Error parsing token payload: ${error}`);
      return null;
    }
  }


  const userDataPayload = () => {
    if (!token) {
      return null;
    }
    const paylod = getTokenPayload();
    if (!paylod) {
      console.error("Token payload is null", token);
      return null;
    }
    if (!paylod.user_id) {
      console.error("Token payload missing user_id", paylod);
      return null;
    }
    if (!paylod.email) {
      console.error("Token payload missing email", paylod);
      return null;
    }
    if (!paylod.name) {
      console.error("Token payload missing name", paylod);
      return null;
    }
    if (!paylod.last_name) {
      console.error("Token payload missing last_name", paylod);
      return null;
    }
    if (typeof paylod.is_admin === "undefined") {
      console.error("Token payload missing is_admin", paylod);
      return null;
    }
    return {
      id: paylod.user_id,
      email: paylod.email,
      name: paylod.name,
      last_name: paylod.last_name,
      is_admin: paylod.is_admin
    };
  }


  const authenticate = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/users/token/",
        { email, password }
      );
      setError(null);
      setLoading(false);
      setToken(data.access);
      return data;
    } catch (err) {
      setError(err);
      setLoading(false);
      return err.response.data;
    }
  };
  const logout = () => {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, authenticate, logout, error, loading, isAuthenticated, userDataPayload }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider