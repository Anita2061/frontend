import axios from 'axios';

const getBaseURL = () => {
  if (import.meta.env.DEV) {
    return '/api';
  }
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    return apiUrl;
  }
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