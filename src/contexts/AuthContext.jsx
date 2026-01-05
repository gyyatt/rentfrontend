import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/login/`, {
        username,
        password
      });

      const data = response.data;
      setToken(data.token);
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const getHeaders = () => ({
    'Authorization': `Bearer ${token}`,  // ✅ Bearer (not Token)
    'Content-Type': 'application/json'
  });

  // ✅ FIXED: Async profile fetch in useEffect
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/profile/`, {
          headers: getHeaders()
        });
        
        setUser(response.data);
        console.log('✅ Profile loaded:', response.data.email);
      } catch (error) {
        console.error('❌ Profile fetch failed:', error.response?.data);
        
        // Token invalid → Auto logout
        if (error.response?.status === 401) {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [token]);

  // Loading state while checking auth
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{
      token,
      user,
      login,
      logout,
      getHeaders,
      loading,
      isAuthenticated: !!token && !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
