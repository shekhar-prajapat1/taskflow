import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.get('/api/auth/me') // ✅ FIXED
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          setToken(null);
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password }); // ✅ FIXED
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data);
    }
    return res.data;
  };

  const signup = async (username, email, password) => {
    const res = await api.post('/api/auth/register', { username, email, password }); // ✅ FIXED
    if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      setToken(res.data.token);
      setUser(res.data);
    }
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
