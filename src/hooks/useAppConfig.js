import { useThemeConfig } from './useThemeConfig';

/** @type {import('./useThemeConfig').MessagesConfig} */
const DEFAULT_MESSAGES = {
  preMessage: "Pensando",
  initialMessage: "Soy tu asistente virtual. ¿Con qué puedo ayudarte hoy?",
  newChat: "Nueva conversación",
  sendText: "Preguntar",
  placeHolderQuestion1: "O haceme tu consulta acá...",
  placeHolderQuestion2: "¿Como puedo seguir ayudandote?",
  errorMessage: "Hubo un error, por favor intentelo nuevamente en unos minutos.",
  useWeb: "Quiero usar en mi web"
};

/** @type {import('./useThemeConfig').ImagesConfig} */
const DEFAULT_IMAGES = {
  appLogoClient: { url: '', alt: 'Logo Cliente' },
  appLogo: { url: '', alt: 'Logo App' },
  agentIcon: { url: '', alt: 'Agente' },
  greetingAgent: { url: '', alt: 'Saludo' },
  headerIframe: { url: '', alt: 'Header' }
};

/** @type {import('./useThemeConfig').AppConfig} */
const DEFAULT_APP = {
  drawerWidth: 280,
  description: 'Asistente virtual',
  about: "Acerca de"
};

/**
 * Hook para obtener la configuración de la aplicación
 * @returns {{
 *   app: import('./useThemeConfig').AppConfig,
 *   messages: import('./useThemeConfig').MessagesConfig,
 *   images: import('./useThemeConfig').ImagesConfig,
 *   isLoading: boolean,
 *   error: string|null
 * }}
 */
export const useAppConfig = () => {
  const { themeConfig, loading, error } = useThemeConfig();


  // Process image URLs if they exist
  const processedImages = themeConfig?.images ? {
    appLogoClient: {
      url: themeConfig.images.appLogoClient?.url || DEFAULT_IMAGES.appLogoClient.url,
      alt: themeConfig.images.appLogoClient?.alt || DEFAULT_IMAGES.appLogoClient.alt
    },
    appLogo: {
      url: themeConfig.images.appLogo?.url || DEFAULT_IMAGES.appLogo.url,
      alt: themeConfig.images.appLogo?.alt || DEFAULT_IMAGES.appLogo.alt
    },
    agentIcon: {
      url: themeConfig.images.agentIcon?.url || DEFAULT_IMAGES.agentIcon.url,
      alt: themeConfig.images.agentIcon?.alt || DEFAULT_IMAGES.agentIcon.alt
    },
    greetingAgent: {
      url: themeConfig.images.greetingAgent?.url || DEFAULT_IMAGES.greetingAgent.url,
      alt: themeConfig.images.greetingAgent?.alt || DEFAULT_IMAGES.greetingAgent.alt
    },
    headerIframe: {
      url: themeConfig.images.headerIframe?.url || DEFAULT_IMAGES.headerIframe.url,
      alt: themeConfig.images.headerIframe?.alt || DEFAULT_IMAGES.headerIframe.alt
    }
  } : DEFAULT_IMAGES;

  return {
    app: {
      ...DEFAULT_APP,
      ...(themeConfig?.app || {})
    },
    messages: {
      ...DEFAULT_MESSAGES,
      ...(themeConfig?.messages || {})
    },
    images: processedImages,
    isLoading: loading,
    error
  };
}; 