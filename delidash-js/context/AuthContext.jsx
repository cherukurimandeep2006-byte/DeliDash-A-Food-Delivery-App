import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import authService from '../src/services/authService';
import userService from '../src/services/userService';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = authService.getUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    const userObj = response.user || response.data;
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
    return response;
  };

  const register = async (name, email, password) => {
    const response = await authService.register(name, email, password);
    const userObj = response.user || response.data;
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
    return response;
  };

  const updateProfile = async (userData) => {
    const response = await userService.updateProfile(userData);
    const updated = response.data || response.user;
    setUser(updated);
    localStorage.setItem('user', JSON.stringify(updated));
    return response;
  };

  const refreshUser = async () => {
    try {
      const res = await userService.getProfile();
      const data = res.data || res.user;
      if (data) {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      }
      return data;
    } catch (err) {
      return null;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        updateProfile,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};
