import React, { createContext, useState, useContext, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const verifyToken = async () => {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error('Token verification failed:', error);
          logout();
        } finally {
          setLoading(false);
        }
      };
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', { email });
      const { token, user } = await authService.login(email, password);

      if (!token) {
        throw new Error('No token received from server');
      }

      console.log('Login successful, token:', token);

      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.message || 'Login failed'
      };
    }
  };

  const register = async (userData) => {
    try {
      console.log('Registering user:', userData);
      await authService.register(userData);

      // Authentication-Service /register only returns the new authId, not a
      // JWT, so log in immediately to obtain a real token for this session.
      const { token, user } = await authService.login(userData.email, userData.password);

      if (!token) {
        throw new Error('No token received from server');
      }

      console.log('Registration successful, setting token');
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(user);
      
      return { success: true, user };
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        message: error.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    console.log('Logging out user');
    localStorage.removeItem('token');
    localStorage.removeItem('demoUser');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};