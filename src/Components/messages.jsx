import { Box, Typography, useTheme, useMediaQuery, IconButton, Snackbar, Alert } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import userIcon from '../assets/userIcon.png'
import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { APP_API_ADMIN_CONFIG } from '../Config/constants';

export default function Messages({ messages, isLoading, preMessage, agentIcon, setDisableSubmit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [typingText, setTypingText] = useState('')
  const currentIndexRef = useRef(0)
  const lastMessageRef = useRef(null)
  const [feedback, setFeedback] = useState({})
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (messages.length > 0 && !messages[messages.length - 1].isUser) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.text && lastMessage !== lastMessageRef.current) {
        lastMessageRef.current = lastMessage
        setTypingText('')
        currentIndexRef.current = 0
        
        const interval = setInterval(() => {
          if (currentIndexRef.current < lastMessage.text.length) {
            setTypingText(lastMessage.text.substring(0, currentIndexRef.current + 1))
            currentIndexRef.current += 1
          } else {
            clearInterval(interval)
            setDisableSubmit(false)
          }
        }, 30)

        return () => clearInterval(interval)
      }
    }
   
   
  }, [messages.length])

  const handleFeedback = (messageIndex, type) => {
    setFeedback(prev => ({
      ...prev,
      [messageIndex]: type
    }))
  }

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <Box sx={{ 
      flexGrow: 1, 
      overflowY: 'auto', 
      overflowX: 'hidden',
      mb: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      width: '100%',
      maxWidth: '100%',
      px: isMobile ? 1 : 2,
      '& .dot': {
        display: 'inline-block',
        animation: 'bounce 1.4s infinite ease-in-out both',
        '&:nth-of-type(1)': {
          animationDelay: '-0.32s'
        },
        '&:nth-of-type(2)': {
          animationDelay: '-0.16s'
        }
      },
      '@keyframes bounce': {
        '0%, 80%, 100%': {
          transform: 'scale(0)'
        },
        '40%': {
          transform: 'scale(1)'
        }
      }
    }}>
      {messages.map((message, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: message.isUser ? 'flex-end' : 'flex-start',
            gap: 1
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1,
              alignSelf: message.isUser ? 'flex-end' : 'flex-start',
              maxWidth: isMobile ? '90%' : '80%'
            }}
          >
            {!message.isUser && (
              <Box
                component="img"
                src={`${APP_API_ADMIN_CONFIG}${agentIcon.url}`}
                alt={agentIcon.alt}
                sx={{
                  width: isMobile ? 24 : 32,
                  height: isMobile ? 24 : 32,
                  mt: 1
                }}
              />
            )}
            <Box
              sx={{
                p: isMobile ? 1.5 : 2,
                borderRadius: 1,
                bgcolor: message.isUser ? 'primary.main' : 'primary.light',
                color: 'white',
                border: 'none',
                borderLeft: message.isUser ? 'none' : '3px solid',
                borderRight: message.isUser ? '3px solid' : 'none',
                borderColor: message.isUser ? 'primary.light' : 'primary.main',
                width: 'fit-content',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                position: 'relative',
                wordBreak: 'break-word'
              }}
            >
              <Typography 
                component="div"
                sx={{ 
                  fontSize: isMobile ? '0.85rem' : '0.95rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                  '& p': {
                    margin: 0,
                    padding: 0
                  },
                  '& strong': {
                    fontWeight: 'bold'
                  },
                  '& em': {
                    fontStyle: 'italic'
                  }
                }}
              >
                {message.isUser ? (
                  message.text
                ) : (
                  index === messages.length - 1 ? (
                    <ReactMarkdown>{typingText}</ReactMarkdown>
                  ) : (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  )
                )}
              </Typography>
            </Box>
            {message.isUser && (
              <Box
                component="img"
                src={userIcon}
                alt="user"
                sx={{
                  width: isMobile ? 24 : 32,
                  height: isMobile ? 24 : 32,
                  mt: 1
                }}
              />
            )}
          </Box>
          {!message.isUser && (
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              ml: isMobile ? 4 : 5,
              '& .MuiIconButton-root': {
                color: 'grey.500',
                padding: '4px',
                '&.selected': {
                  color: 'primary.main'
                }
              }
            }}>
              <IconButton 
                size="small"
                className={feedback[index] === 'like' ? 'selected' : ''}
                onClick={() => handleFeedback(index, 'like')}
              >
                <ThumbUpIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small"
                className={feedback[index] === 'dislike' ? 'selected' : ''}
                onClick={() => handleFeedback(index, 'dislike')}
              >
                <ThumbDownIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small"
                onClick={() => handleCopyToClipboard(message.text)}
              >
                <ContentCopyIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      ))}
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1,
            alignSelf: 'flex-start',
            maxWidth: isMobile ? '90%' : '80%'
          }}
        >
          <Box
            component="img"
            src={`${APP_API_ADMIN_CONFIG}${agentIcon.url}`}
            alt={agentIcon.alt}
            sx={{
              width: isMobile ? 24 : 32,
              height: isMobile ? 24 : 32,
              mt: 1
            }}
          />
          <Box
            sx={{
              p: isMobile ? 1.5 : 2,
              borderRadius: 1,
              bgcolor: 'primary.light',
              color: 'white',
              border: 'none',
              borderLeft: '3px solid',
              borderColor: 'primary.main',
              width: 'fit-content',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
              position: 'relative',
              wordBreak: 'break-word'
            }}
          >
            <Typography sx={{ 
              fontSize: isMobile ? '0.85rem' : '0.95rem',
              lineHeight: 1.5,
              fontStyle: 'italic'
            }}>
              {preMessage}<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span>
            </Typography>
          </Box>
        </Box>
      )}
      <Snackbar 
        open={showToast} 
        autoHideDuration={3000} 
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ 
          position: 'fixed',
          zIndex: (theme) => theme.zIndex.modal + 1
        }}
      >
        <Alert onClose={handleCloseToast} severity="success" sx={{ width: '100%' }}>
          Respuesta copiada al portapapeles
        </Alert>
      </Snackbar>
    </Box>
  )
}
