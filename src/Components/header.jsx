import { AppBar, Toolbar, Box, IconButton } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import MenuContextual from './menuContextual'
import { APP_API_ADMIN_CONFIG } from '../Config/constants';

const Header = ({ logoClient, drawerWidth, buttonText, headerIframe, mobileOpen, setMobileOpen, about }) => {
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
    <AppBar 
      position="fixed" 
      sx={{ 
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        bgcolor: 'white',
        color: 'primary.main',
        boxShadow: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Toolbar>
        <Box
          component="img"
          src={`${APP_API_ADMIN_CONFIG}${logoClient.url}`}
          alt={logoClient.alt}
          sx={{ 
            height: 40,
            mr: 2
          }}
        />
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MenuContextual about={about} headerIframe={headerIframe} buttonText={buttonText}/>
          <IconButton
            color="inherit"
            aria-label="nueva conversación"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ ml: 1, display: { md: 'none' } }}
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    </>
  );
};

export default Header;


