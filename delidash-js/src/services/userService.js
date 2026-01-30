import apiCall from './api';

const API_BASE = '/users';

export const userService = {
  // Get user profile
  getProfile: async () => {
    return apiCall(`${API_BASE}/me`);
  },

  // Update user profile
  updateProfile: async (userData) => {
    return apiCall(`${API_BASE}/me`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Add address
  addAddress: async (label, details) => {
    return apiCall(`${API_BASE}/addresses`, {
      method: 'POST',
      body: JSON.stringify({ label, details }),
    });
  },

  // Edit address
  editAddress: async (id, label, details) => {
    return apiCall(`${API_BASE}/addresses/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ label, details }),
    });
  },

  // Delete address
  deleteAddress: async (id) => {
    return apiCall(`${API_BASE}/addresses/${id}`, {
      method: 'DELETE',
    });
  },

  // Upload avatar (multipart/form-data)
  uploadAvatar: async (file) => {
    const form = new FormData();
    form.append('avatar', file);
    const token = localStorage.getItem('token');

    const response = await fetch(`${(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api')}${API_BASE}/avatar`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Avatar upload failed');
    }

    return response.json();
  }
};

export default userService;
