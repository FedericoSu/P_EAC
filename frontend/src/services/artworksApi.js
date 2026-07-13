import { apiRequest } from './api.js';

const buildQueryString = (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const query = params.toString();
  return query ? `?${query}` : '';
};

export const artworksApi = {
  getAll: (filters) => apiRequest(`/artworks${buildQueryString(filters)}`),
  getById: (id) => apiRequest(`/artworks/${id}`),
  create: (artwork) => apiRequest('/artworks', { method: 'POST', body: JSON.stringify(artwork) }),
  update: (id, artwork) => apiRequest(`/artworks/${id}`, { method: 'PUT', body: JSON.stringify(artwork) }),
  remove: (id) => apiRequest(`/artworks/${id}`, { method: 'DELETE' }),
};
