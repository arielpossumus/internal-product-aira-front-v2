import axios from 'axios';
import { APP_API_URL, APP_API_AGENT_ASK } from '../Config/constants';

const getClientFromUrl = () => {
  const path = window.location.pathname;
  return path.split('/')[1];
};

const apiService = {
  /**
   * Sends a message to the chat API and returns the response
   * @param {string} message - The message to send
   * @param {string} session_id - The session identifier
   * @param {string} userId - The user ID (defaults to "123")
   * @returns {Promise<Object>} The API response
   */
  sendMessage: async ({ message, session_id, userId = "123" }) => {
    try {
      const client = getClientFromUrl();
      if (!client) {
        throw new Error('Cliente no especificado en la URL');
      }

      const response = await axios.post(
        `${APP_API_URL}/${client}/${APP_API_AGENT_ASK}`,
        {
          message,
          session_id,
          user_id: userId
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error en la consulta a la API: ${error.message}`);
    }
  }
};

export default apiService; 