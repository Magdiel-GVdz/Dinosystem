import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
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
    <AuthContext.Provider value={{ token, authenticate, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider