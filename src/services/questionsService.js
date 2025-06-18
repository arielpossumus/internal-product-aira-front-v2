import axios from 'axios';
import { APP_API_URL, APP_API_QUESTIONS_RANDOM } from '../Config/constants';

const getClientFromUrl = () => {
  const path = window.location.pathname;
  return path.split('/')[1];
};

const questionsService = {
  /**
   * Sends a message to the chat API and returns the response
   * @param {string} message - The message to send
   * @param {string} session_id - The session identifier
   * @param {string} userId - The user ID (defaults to "123")
   * @returns {Promise<Object>} The API response
   */
  predefinedQuestions: async () => {
    try {
      const client = getClientFromUrl();
      if (!client) {
        throw new Error('Cliente no especificado en la URL');
      }

      const response = await axios.get(
        `${APP_API_URL}/${client}/${APP_API_QUESTIONS_RANDOM}`
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error en la consulta a la API: ${error.message}`);
    }
  }
};

export default questionsService; 