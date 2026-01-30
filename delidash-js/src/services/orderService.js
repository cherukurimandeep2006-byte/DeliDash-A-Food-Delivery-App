import apiCall from './api';

const API_BASE = '/orders';

export const orderService = {
  // Get user orders
  getMyOrders: async () => {
    return apiCall(API_BASE);
  },

  // Get order by ID
  getById: async (id) => {
    return apiCall(`${API_BASE}/${id}`);
  },

  // Create order
  create: async (orderData) => {
    return apiCall(API_BASE, {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  },

  // Update order status
  updateStatus: async (id, status) => {
    return apiCall(`${API_BASE}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }
};

export default orderService;
