import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '../theme';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingScreen = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
    sx={{ bgcolor: '#ffffff' }}
  >
    <CircularProgress />
  </Box>
);

export const ThemeProvider = ({ children, config }) => {
  // Crear el tema con la configuración recibida
  const theme = createAppTheme(config);

  return (
    <MuiThemeProvider theme={theme}>
      {children}
    </MuiThemeProvider>
  );
}; 