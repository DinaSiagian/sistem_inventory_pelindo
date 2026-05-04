import axios from "axios";

const API_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // ⚠️ HAPUS withCredentials untuk development agar CORS tidak error
  // withCredentials: true,  // ← Komentar ini dulu!
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export const authAPI = {
  login: (data) => api.post("/login", data),
  register: (data) => api.post("/register", data),
  logout: () => api.post("/logout"),
  getMasterData: () => api.get("/master-data"),
  getMe: () => api.get("/me"),
};

export const masterDataAPI = {
  // Entities
  getEntities: () => api.get("/master-data/entities"),
  addEntity: (data) => api.post("/master-data/entities", data),
  updateEntity: (code, data) => api.put(`/master-data/entities/${code}`, data),
  deleteEntity: (code) => api.delete(`/master-data/entities/${code}`),
  
  // Branches
  getBranches: () => api.get("/master-data/branches"),
  addBranch: (data) => api.post("/master-data/branches", data),
  updateBranch: (code, data) => api.put(`/master-data/branches/${code}`, data),
  deleteBranch: (code) => api.delete(`/master-data/branches/${code}`),

  // Divisions
  getDivisions: () => api.get("/master-data/divisions"),
  addDivision: (data) => api.post("/master-data/divisions", data),
  updateDivision: (code, data) => api.put(`/master-data/divisions/${code}`, data),
  deleteDivision: (code) => api.delete(`/master-data/divisions/${code}`),

  // Roles
  getRoles: () => api.get("/master-data/roles"),
  addRole: (data) => api.post("/master-data/roles", data),
  updateRole: (code, data) => api.put(`/master-data/roles/${code}`, data),
  deleteRole: (code) => api.delete(`/master-data/roles/${code}`),
};

export const userAPI = {
  getAll:       ()         => api.get('/users'),
  getById:      (id)       => api.get(`/users/${id}`),
  create:       (data)     => api.post('/users', data),
  update:       (id, data) => api.put(`/users/${id}`, data),
  delete:       (id)       => api.delete(`/users/${id}`),
  toggleStatus: (id)       => api.patch(`/users/${id}/toggle-status`),
};

export const logAPI = {
  getAll: () => api.get('/logs'),
};

export const budgetAPI = {
  // ── OPEX ────────────────────────────────────────────────
  getOpex:    ()          => api.get('/budget/opex'),
  addOpex:    (data)      => api.post('/budget/opex', data),
  updateOpex: (id, data)  => api.put(`/budget/opex/${id}`, data),
  deleteOpex: (id)        => api.delete(`/budget/opex/${id}`),
  addOpexProject:   (id, data) => api.post(`/budget/opex/${id}/projects`, data),
  syncOpexAssets:   (id, data) => api.put(`/budget/opex/${id}/sync-assets`, data),

  // ── CAPEX ───────────────────────────────────────────────
  getCapex:    ()         => api.get('/budget/capex'),
  addCapex:    (data)     => api.post('/budget/capex', data),
  updateCapex: (kd, data) => api.put(`/budget/capex/${kd}`, data),
  deleteCapex: (kd)       => api.delete(`/budget/capex/${kd}`),
  addCapexProject:  (kd, data) => api.post(`/budget/capex/${kd}/projects`, data),
  syncCapexAssets:  (kd, data) => api.put(`/budget/capex/${kd}/sync-assets`, data),

  // ── PROJECTS (universal) ─────────────────────────────────
  updateProject: (id, data) => api.put(`/budget/projects/${id}`, data),
  deleteProject: (id)       => api.delete(`/budget/projects/${id}`),
};

export default api;
