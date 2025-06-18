import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import { useThemeConfig } from '../hooks/useThemeConfig';
import { ThemeProvider } from '../providers/ThemeProvider';
import { Box, CircularProgress } from '@mui/material';

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

export const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();
    const { themeConfig, loading } = useThemeConfig();

    if (!user) {
        // Guardar la ruta a la que intentaba acceder
        return <Navigate to="/" state={{ from: location.pathname }} replace />;
    }

    // Si el usuario está autenticado pero intenta acceder a una ruta que no corresponde con su permiso
    if (location.pathname.slice(1) !== user.permission) {
        return <Navigate to={`/${user.permission}`} replace />;
    }

    // Mostrar pantalla de carga mientras se obtiene la configuración del tema
    if (loading) {
        return <LoadingScreen />;
    }

    // Si hay error en la carga del tema, aún podemos mostrar la ruta con el tema por defecto
    return (
        <ThemeProvider config={themeConfig}>
            {children}
        </ThemeProvider>
    );
}; 