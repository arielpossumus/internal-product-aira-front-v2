import axiosInstance from './axiosConfig';
import axios from 'axios';
import { APP_API_ADMIN_CONFIG } from '../Config/constants';
const API_URL = `/api/auth/local`;

const clearBrowserData = async () => {
  // Limpiar localStorage y sessionStorage
  localStorage.clear();
  sessionStorage.clear();
  
  // Limpiar todas las cookies
  const cookies = document.cookie.split(";");
  cookies.forEach(cookie => {
    const name = cookie.split("=")[0].trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname}`;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  });

  // Limpiar caché de service workers
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
  }

  // Limpiar caché de aplicación
  if ('caches' in window) {
    const cacheKeys = await caches.keys();
    await Promise.all(cacheKeys.map(key => caches.delete(key)));
  }

  // Limpiar caché de recursos
  if (window.performance && window.performance.getEntriesByType) {
    window.performance.clearResourceTimings();
    window.performance.clearMarks();
    window.performance.clearMeasures();
  }

  // Resetear axios
  axios.defaults.headers.common['Authorization'] = '';
  axiosInstance.defaults.headers.common['Authorization'] = '';
  
  // Limpiar todas las instancias de axios
  delete axios.defaults.headers.common['Authorization'];
  delete axiosInstance.defaults.headers.common['Authorization'];
  axios.interceptors.request.clear();
  axios.interceptors.response.clear();
};

export const authService = {
  login: async (identifier, password) => {
    try {
      const response = await axiosInstance.post(API_URL, {
        identifier,
        password
      });

      if (response.data.jwt) {
        localStorage.setItem('jwt', response.data.jwt);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw error.response?.data?.error || error.message;
    }
  },

  logout: async (queryClient) => {
    try {
      // Limpiar todos los datos del navegador
      await clearBrowserData();

      // Invalidar y eliminar todas las queries de React Query
      if (queryClient) {
        await queryClient.invalidateQueries();
        await queryClient.resetQueries();
        queryClient.removeQueries();
        queryClient.clear();
      }

      // Forzar recarga de la aplicación
      if (window.location.pathname !== '/') {
        window.location.href = '/';
      } else {
        window.location.reload(true);
      }

    } catch (error) {
      console.error('Error durante la limpieza:', error);
      // Intentar forzar recarga aunque haya error
      window.location.reload(true);
    }
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('jwt');
  }
}; 