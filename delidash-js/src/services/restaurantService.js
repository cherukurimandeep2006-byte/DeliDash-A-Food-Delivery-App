import apiCall from './api';

const API_BASE = '/restaurants';

export const restaurantService = {
  // Get all restaurants
  getAll: async () => {
    return apiCall(API_BASE);
  },

  // Get restaurant by ID
  getById: async (id) => {
    return apiCall(`${API_BASE}/${id}`);
  },

  // Create restaurant (Admin only)
  create: async (restaurantData) => {
    return apiCall(API_BASE, {
      method: 'POST',
      body: JSON.stringify(restaurantData),
    });
  }
};

export default restaurantService;
