import axios from 'axios';

// Determine API base URL based on environment
const getBaseURL = () => {
  // In development, use relative path (Vite proxy)
  if (import.meta.env.DEV) {
    return '/api';
  }
  
  // In production, use environment variable or construct from current origin
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    return apiUrl;
  }
  
  // Fallback: use backend domain
  return 'https://backend-mg40.onrender.com/api';
};

export const api = axios.create({
  baseURL: getBaseURL(),
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

