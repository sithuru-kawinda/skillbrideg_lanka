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
      const response = await authService.login(email, password);
      
      let token, user;
      
      if (response.token) {
        token = response.token;
        user = {
          email: email,
          role: response.role || 'USER'
        };
      } else if (response.data) {
        token = response.data.token;
        user = response.data.user;
      }
      
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
      const response = await authService.register(userData);
      
      console.log('Registration response:', response);
      
      let token, user, authId;
      
      if (response.token) {
        token = response.token;
        user = {
          email: userData.email,
          role: userData.role
        };
      } else if (typeof response === 'number' || response.authId) {
        authId = typeof response === 'number' ? response : response.authId;
        token = 'temp-token-' + Date.now();
        user = {
          email: userData.email,
          role: userData.role,
          id: authId
        };
      }
      
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