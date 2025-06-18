import { Box, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Create, Chat as ChatIcon } from '@mui/icons-material'
import { APP_API_ADMIN_CONFIG } from '../Config/constants';

export default function NewChat({ chatHistory, currentChatId, startNewChat, selectChat, logoApp }) {
    return (
        <Box sx={{ overflow: 'auto', p: 2 }}>
            <Box sx={{ 
                alignItems: 'center',
                mb: 2,
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderColor: 'divider',
                py: 2,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Box
                    component="img"
                    src={`${APP_API_ADMIN_CONFIG}${logoApp.url}`}
                    alt={logoApp.alt}
                    sx={{ 
                        maxWidth: '80%',
                        height: 'auto'
                    }}
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<Create />}
                    onClick={startNewChat}
                    sx={{ 
                        minWidth: 'auto', 
                        width: '100%',
                    }}
                > 
                    Nuevo Chat
                </Button>
            </Box>
            <List>
                {chatHistory.map((chat) => (
                    <ListItem key={chat.id} disablePadding>
                        <ListItemButton
                            selected={currentChatId === chat.id}
                            onClick={() => selectChat(chat.id)}
                            sx={{
                                '&.Mui-selected': {
                                    margin: '5px 0'
                                }
                            }}
                        >
                            <ListItemIcon>
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary={chat.title}
                                primaryTypographyProps={{
                                    noWrap: true,
                                    style: { overflow: 'hidden', textOverflow: 'ellipsis' }
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}
