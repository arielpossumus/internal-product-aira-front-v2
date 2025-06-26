import axios from 'axios';
import { APP_API_URL, APP_API_AGENT_ASK } from '../Config/constants';

const getClientFromUrl = () => {
  const path = window.location.pathname;
  return path.split('/')[1]; // Obtiene el primer segmento después del /
};

const apiService = {
  /**
   * Sends a message to the chat API and returns the response
   * @param {string} query - The message/query to send
   * @param {string} session_id - The session identifier
   * @param {string} user_id - The user ID (defaults to "123")
   * @param {string} strategy - The strategy to use (defaults to "standard")
   * @param {string} agent_type - The agent type (defaults to "general")
   * @param {number} max_tokens - Maximum tokens for the response (defaults to 100)
   * @param {number} temperature - Temperature for response generation (defaults to 2)
   * @param {string} client - The client identifier (extracted from URL if not provided)
   * @returns {Promise<Object>} The API response
   */
  sendMessage: async ({ query, session_id, user_id = "123", strategy = "standard", agent_type = "general", max_tokens = 100, temperature = 2, client }) => {
    try {
      const clientId = client || getClientFromUrl();
      if (!clientId) {
        throw new Error('Cliente no especificado en la URL');
      }

      const response = await axios.post(
        `${APP_API_URL}/${APP_API_AGENT_ASK}`,
        {
          query,
          session_id,
          user_id,
          strategy,
          agent_type,
          max_tokens,
          temperature,
          client: clientId
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error en la consulta a la API: ${error.message}`);
    }
  }
};

export default apiService; 