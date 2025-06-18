import { useState } from 'react';
import { version } from '../Config/configApp';
import {  Box,  TextField,  Button,  Typography, Alert,  Snackbar, } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/authService';
import { useAuth } from '../providers/AuthProvider';
import logoAira from "../assets/logoAiraNew.png"

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData.email, formData.password);
      const { user } = response;
      
      // Actualizar el estado global con la información del usuario
      updateUser(user);
      
      // Redirigir al usuario a la página que intentaba acceder o a su página por defecto
      const from = location.state?.from || `/${user.permission}`;
      navigate(from, { replace: true });
    } catch (error) {
      setError(typeof error === 'string' ? error : 'Error al iniciar sesión. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: '#f5f5f5'
      }}
    >
      {/* Columna izquierda - Logo */}
      <Box
        sx={{
          width: '60%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          backgroundColor: '#3fa9f5',
        }}
      >
        <Box
          sx={{
            width: '80%',
            maxWidth: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box
            component="img"
            src={logoAira}
            alt="logoAira"
            sx={{ 
              width: '100%',
              height: 'auto'
            }}
          />
         
        </Box>
      </Box>

      {/* Columna derecha - Formulario */}
      <Box
        sx={{
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '60%' }}>
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 4, 
              textAlign: 'center',
              color: '#333',
              fontWeight: 600
            }}
          >
            ¡Bienvenido!
          </Typography>
          <Typography 
            sx={{ 
              mb: 3, 
              textAlign: 'center',
              color: '#666'
            }}
          >
            Ingresá tu usuario y tu contraseña para poder continuar.
          </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Usuario"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleInputChange}
              disabled={loading}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '&:hover fieldset': {
                    borderColor: '#3fa9f5',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3fa9f5',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={loading}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '&:hover fieldset': {
                    borderColor: '#3fa9f5',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3fa9f5',
                  },
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ 
                py: 1.5,
                backgroundColor: "#3fa9f5",
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: "#006fbf",
                  transform: 'scale(1.02)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
            <Typography
            sx={{
              fontSize: '0.8rem',
              fontStyle: 'italic',
              fontWeight: 'bold',
              mt: 2,
              width: '100%',
              textAlign: 'center'
            }}
          >
            vrs {version}
          </Typography>
          </Box>
      
      </Box>
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setError('')} 
          severity="error" 
          sx={{ 
            width: '100%',
            backgroundColor: '#fff3f3',
            color: '#d32f2f'
          }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login; 