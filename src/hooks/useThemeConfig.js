import { useState, useEffect } from 'react';
import adminService from '../services/adminService';

/**
 * @typedef {Object} ImageConfig
 * @property {string} url - URL de la imagen
 * @property {string} alt - Texto alternativo de la imagen
 */

/**
 * @typedef {Object} ImagesConfig
 * @property {ImageConfig} appLogoClient - Logo del cliente
 * @property {ImageConfig} appLogo - Logo de la aplicación
 * @property {ImageConfig} agentIcon - Icono del agente
 * @property {ImageConfig} greetingAgent - Imagen de saludo del agente
 * @property {ImageConfig} headerIframe - Imagen del header del iframe
 */

/**
 * @typedef {Object} MessagesConfig
 * @property {string} preMessage - Mensaje de "pensando"
 * @property {string} initialMessage - Mensaje inicial
 * @property {string} newChat - Texto para nueva conversación
 * @property {string} sendText - Texto del botón enviar
 * @property {string} placeHolderQuestion1 - Placeholder inicial
 * @property {string} placeHolderQuestion2 - Placeholder secundario
 * @property {string} errorMessage - Mensaje de error
 * @property {string} useWeb - Texto para usar en web
 */

/**
 * @typedef {Object} AppConfig
 * @property {number} drawerWidth - Ancho del drawer
 * @property {string} description - Descripción de la app
 */

/**
 * @typedef {Object} ThemeConfig
 * @property {AppConfig} app - Configuración de la app
 * @property {MessagesConfig} messages - Configuración de mensajes
 * @property {ImagesConfig} images - Configuración de imágenes
 * @property {Object} [paletteConfig] - Configuración de la paleta de colores
 * @property {Object} [inputColorsConfig] - Configuración de colores de inputs
 * @property {Object} [linkColorsConfig] - Configuración de colores de links
 * @property {Object} [textColorsConfig] - Configuración de colores de texto
 * @property {Object} [fontsConfig] - Configuración de fuentes
 */

/**
 * Hook para obtener la configuración del tema
 * @returns {{themeConfig: ThemeConfig|null, loading: boolean, error: string|null}}
 */
export const useThemeConfig = () => {
  const [themeConfig, setThemeConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThemeConfig = async () => {
      try {
        setLoading(true);
        const response = await adminService.getAdminConfig();
        
        if (response?.data) {
          const config = response.data;
          const themeData = {
            app: {
              drawerWidth: parseInt(config.appConfig?.drawerWidth || '280', 10),
              description: config.appConfig?.description || 'Asistente virtual',
              about: config.appConfig?.about || 'Acerca de'
            },
            messages: {
              preMessage: config.messagesConfig?.preMessage,
              initialMessage: config.messagesConfig?.initialMessage,
              newChat: config.messagesConfig?.newChat,
              sendText: config.messagesConfig?.sendText,
              placeHolderQuestion1: config.messagesConfig?.placeHolderQuestion1,
              placeHolderQuestion2: config.messagesConfig?.placeHolderQuestion2,
              errorMessage: config.messagesConfig?.errorMessage,
              useWeb: config.messagesConfig?.useWeb
            },
            images: {
              appLogoClient: {
                url: config.imagesConfig?.appLogoClient?.url || '',
                alt: config.imagesConfig?.appLogoClient?.alt || 'Logo Cliente'
              },
              appLogo: {
                url: config.imagesConfig?.appLogo?.url || '',
                alt: config.imagesConfig?.appLogo?.alt || 'Logo App'
              },
              agentIcon: {
                url: config.imagesConfig?.agentIcon?.url || '',
                alt: config.imagesConfig?.agentIcon?.alt || 'Agente'
              },
              greetingAgent: {
                url: config.imagesConfig?.greetingAgent?.url || '',
                alt: config.imagesConfig?.greetingAgent?.alt || 'Saludo'
              },
              headerIframe: {
                url: config.imagesConfig?.headerIframe?.url || '',
                alt: config.imagesConfig?.headerIframe?.alt || 'Header'
              }
            },
            predefinedQuestions: config.predefined_questions || [],
            paletteConfig: config.paletteConfig,
            inputColorsConfig: config.inputColorsConfig,
            linkColorsConfig: config.linkColorsConfig,
            textColorsConfig: config.textColorsConfig,
            fontsConfig: config.fontsConfig
          };
          setThemeConfig(themeData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchThemeConfig();
  }, []);

  return { themeConfig, loading, error };
}; 