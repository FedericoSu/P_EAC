import { apiRequest } from './api.js';

export const ordersApi = {
  create: (order) => apiRequest('/orders', { method: 'POST', body: JSON.stringify(order) }),
  getAll: () => apiRequest('/orders'),
};
