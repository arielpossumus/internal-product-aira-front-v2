import axios from 'axios';
import { APP_API_ADMIN_CONFIG } from '../Config/constants';
import { populate } from '../Config/configApp';

const getClientFromUrl = () => {
  const path = window.location.pathname;
  return path.split('/')[1]; // Obtiene el primer segmento después del /
};

const adminService = {
  getAdminConfig: async () => {
    try {
      const client = getClientFromUrl();
      if (!client) {
        throw new Error('Cliente no especificado en la URL');
      }
      
      const response = await axios.get(
        `${APP_API_ADMIN_CONFIG}/api/clients?filters[clientName][$eq]=${client}&${populate}`
      );

      // Verificar si hay datos y tomar el primer cliente encontrado
      if (!response.data?.data?.length) {
        throw new Error('No se encontró configuración para el cliente');
      }

      // Retornar el primer cliente encontrado manteniendo la estructura anterior
      return {
        data: response.data.data[0]
      };
    } catch (error) {
      throw new Error(`Error en la consulta a la API: ${error.message}`);
    }
  }
};

export default adminService; 