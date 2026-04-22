import api from './api';

export const budgetAPI = {
  // OPEX Endpoints
  getOpex: () => api.get('/budget/opex'),
  createOpex: (data) => api.post('/budget/opex', data),
  updateOpex: (id, data) => api.put(`/budget/opex/${id}`, data),
  deleteOpex: (id) => api.delete(`/budget/opex/${id}`),

  // CAPEX Endpoints
  getCapex: () => api.get('/budget/capex'),
  createCapex: (data) => api.post('/budget/capex', data),
  updateCapex: (kd, data) => api.put(`/budget/capex/${kd}`, data),
  deleteCapex: (kd) => api.delete(`/budget/capex/${kd}`),
};
