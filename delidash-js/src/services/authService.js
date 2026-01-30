import apiCall from './api';

const API_BASE = '/auth';

export const authService = {
  // Register a new user
  register: async (name, email, password) => {
    const data = await apiCall(`${API_BASE}/register`, {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Login user
  login: async (email, password) => {
    const data = await apiCall(`${API_BASE}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Get current user
  getMe: async () => {
    return apiCall(`${API_BASE}/me`);
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  // Get stored user
  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService;
