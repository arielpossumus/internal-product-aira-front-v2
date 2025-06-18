import axios from 'axios';
import { APP_API_ADMIN_CONFIG } from '../Config/constants';

// Crear una instancia de axios con la configuración base
const axiosInstance = axios.create({
    baseURL: APP_API_ADMIN_CONFIG
});

// Interceptor para agregar el token a todas las peticiones
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar errores de respuesta
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403 || error.response?.status === 401) {
            // Si hay error de autenticación, limpiar el storage y recargar
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 