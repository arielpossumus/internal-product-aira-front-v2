import { createTheme } from '@mui/material/styles';
import { loadGoogleFont } from './utils/googleFonts';

// Tema por defecto con valores base
const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#fcff42',
    },
    background: {
      default: '#f5f5f5',
      paper: '#e3e3e3',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
      disabled: '#9e9e9e',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: '#ffffff',
            '&:hover': {
              backgroundColor: '#fafafa',
            },
            '&.Mui-focused': {
              backgroundColor: '#f5f5f5',
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 102, 204, 0.08)',
          },
          width: '100%',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
      styleOverrides: {
        root: {
          color: '#af3a00',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            color: '#f0ff6e',
            textDecoration: 'underline',
          },
          '&:visited': {
            color: '#7c4dff',
          },
          '&.MuiLink-underlineNone': {
            textDecoration: 'none',
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          link: 'a',
        },
      },
      styleOverrides: {
        root: {
          '& a': {
            color: '#af3a00',
            textDecoration: 'none',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              color: '#f0ff6e',
              textDecoration: 'underline',
            },
            '&:visited': {
              color: '#7c4dff',
            },
          },
        },
      },
    },
  },
});

export const createAppTheme = (config) => {
  if (!config) {
    return defaultTheme;
  }

  // Extraer los colores de la configuración de la API
  const paletteConfig = config?.paletteConfig || {};
  const inputConfig = config?.inputColorsConfig || {};
  const linkConfig = config?.linkColorsConfig || {};
  const textConfig = config?.textColorsConfig || {};
  const fontConfig = config?.fontsConfig || {};

  // Cargar la fuente de Google si está especificada
  let fontFamily = defaultTheme.typography.fontFamily;
  if (fontConfig.fontFamily) {
    try {
      fontFamily = loadGoogleFont(fontConfig.fontFamily);
    } catch (error) {
      console.error('Error loading Google Font:', error);
    }
  }

  return createTheme({
    palette: {
      primary: {
        main: paletteConfig.colorPrimary || defaultTheme.palette.primary.main,
      },
      secondary: {
        main: paletteConfig.colorSecondary || defaultTheme.palette.secondary.main,
      },
      background: {
        default: paletteConfig.colorBackground || defaultTheme.palette.background.default,
        paper: paletteConfig.colorPaper || defaultTheme.palette.background.paper,
      },
      text: {
        primary: textConfig.colorTextPrimary || defaultTheme.palette.text.primary,
        secondary: textConfig.colorTextSecondary || defaultTheme.palette.text.secondary,
        disabled: textConfig.colorTextDisabled || defaultTheme.palette.text.disabled,
      },
    },
    typography: {
      fontFamily: `"${fontFamily}", ${defaultTheme.typography.fontFamily}`,
    },
    components: {
      ...defaultTheme.components,
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              backgroundColor: inputConfig.colorInputBackground || '#ffffff',
              '&:hover': {
                backgroundColor: inputConfig.colorInputHover || '#fafafa',
              },
              '&.Mui-focused': {
                backgroundColor: inputConfig.colorInputFocused || '#f5f5f5',
              },
            },
          },
        },
      },
      MuiLink: {
        ...defaultTheme.components.MuiLink,
        styleOverrides: {
          root: {
            color: linkConfig.colorLink || '#af3a00',
            '&:hover': {
              color: linkConfig.colorLinkHover || '#f0ff6e',
            },
            '&:visited': {
              color: linkConfig.colorLinkVisited || '#7c4dff',
            },
          },
        },
      },
      MuiTypography: {
        ...defaultTheme.components.MuiTypography,
        styleOverrides: {
          root: {
            '& a': {
              color: linkConfig.colorLink || '#af3a00',
              '&:hover': {
                color: linkConfig.colorLinkHover || '#f0ff6e',
              },
              '&:visited': {
                color: linkConfig.colorLinkVisited || '#7c4dff',
              },
            },
          },
        },
      },
    },
  });
};

export default defaultTheme; 