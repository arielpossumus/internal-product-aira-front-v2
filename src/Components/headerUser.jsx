import { Box, IconButton, Avatar, Menu, MenuItem, Typography, Divider } from '@mui/material'
import { useState, useEffect } from 'react'
import userIcon from '../assets/userIcon.png'
import { useAuth } from '../providers/AuthProvider'
import { authService } from '../services/authService'
import { useQueryClient } from '@tanstack/react-query'
import { LogoutOutlined, InfoOutlined, CodeOutlined } from '@mui/icons-material'
import About from './about'
import ConfigureIframe from './configureIframe'

export default function HeaderUser({ about, headerIframe, buttonText }) {
    const { user, updateUser } = useAuth();
    const queryClient = useQueryClient();
    const username = user?.username || 'Usuario';
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [openAbout, setOpenAbout] = useState(false);
    const [openIframe, setOpenIframe] = useState(false);
    const [slug, setSlug] = useState('');

    useEffect(() => {
        const path = window.location.pathname;
        const slugFromUrl = path.split('/').filter(Boolean).pop();
        setSlug(slugFromUrl || '');
    }, []);

    const handleClickOpenAbout = () => {
        setOpenAbout(true);
        handleClose();
    };

    const handleClickOpenIframe = () => {
        setOpenIframe(true);
        handleClose();
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            handleClose();
            updateUser(null);
            await authService.logout(queryClient);
        } catch (error) {
            console.error('Error durante el logout:', error);
            window.location.reload(true);
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
                onClick={handleClick}
                aria-controls={open ? 'header-user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ p: 0.5 }}
            >
                <Avatar 
                    sx={{ 
                        width: 32, 
                        height: 32,
                        border: '2px solid',
                        borderColor: 'primary.main'
                    }}
                >
                    <Box
                        component="img"
                        src={userIcon}
                        alt="user"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </Avatar>
            </IconButton>
           
            <Menu
                id="header-user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'header-user-button',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                PaperProps={{
                    elevation: 2,
                    sx: {
                        minWidth: 200,
                        mt: 1,
                        '& .MuiMenuItem-root': {
                            py: 1.5,
                        },
                        bgcolor: '#fff',
                    }
                }}
            >
                <MenuItem 
                    onClick={handleClickOpenIframe}
                >
                    <CodeOutlined sx={{ mr: 2, fontSize: 20 }} />
                    <Typography variant="body2">
                        {buttonText}
                    </Typography>                
                </MenuItem>
                <MenuItem 
                    onClick={handleClickOpenAbout}
                >
                    <InfoOutlined sx={{ mr: 2, fontSize: 20 }} />
                    <Typography variant="body2">
                        Acerca de
                    </Typography>                
                </MenuItem>
                <Divider sx={{ my: 1 }} />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 2,
                        py: 1.5
                    }}
                >
                    <Avatar 
                        sx={{ 
                            width: 16, 
                            height: 16,
                            mr: 1,
                            bgcolor: 'primary.main',
                            padding: '2px',
                            fontSize: '10px'
                        }}
                    >
                        {username.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="body2">
                        {username}
                    </Typography>
                </Box>
                <MenuItem 
                    onClick={handleLogout}
                    sx={{
                        bgcolor: '#fff',
                        color: 'error.main',
                        '&:hover': {
                            bgcolor: 'error.lighter',
                        },
                    }}
                >
                    <LogoutOutlined sx={{ mr: 2, fontSize: 20 }} />
                    <Typography variant="body2">
                        Cerrar Sesión
                    </Typography>
                </MenuItem>
                
            </Menu>
            <About open={openAbout} setOpen={setOpenAbout} about={about} headerIframe={headerIframe} />
            <ConfigureIframe open={openIframe} setOpen={setOpenIframe} headerIframe={headerIframe} slug={slug} />
        </Box>
    )
} 