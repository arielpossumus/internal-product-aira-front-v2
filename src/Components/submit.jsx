import { Box, TextField, Button, Typography, Chip, useTheme, useMediaQuery, IconButton } from '@mui/material'
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { useQuery } from '@tanstack/react-query'
import questionsService from '../services/questionsService'
import { APP_API_ADMIN_CONFIG } from '../Config/constants';
import { useState, useEffect, useCallback } from 'react';

export default function Submit({ input, setInput, handleSubmit, onSendMessage, showWelcome, placeHolderQuestion, setPlaceHolderQuestion, initialMessage, sendText, configImages, disableSubmit }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);


  // Inicializar el reconocimiento de voz
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const newRecognition = new SpeechRecognition();
      
      newRecognition.continuous = true;
      newRecognition.interimResults = true;
      newRecognition.lang = 'es-ES';

      newRecognition.onstart = () => {
        console.log('Voice recognition started');
        setIsListening(true);
      };

      newRecognition.onerror = (event) => {
        console.error('Voice recognition error:', event.error);
        setIsListening(false);
      };

      newRecognition.onend = () => {
        console.log('Voice recognition ended');
        setIsListening(false);
      };

      newRecognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        setInput(transcript);
      };

      setRecognition(newRecognition);
    }
  }, [setInput]);

  const handleVoiceToggle = useCallback(() => {
    if (!recognition) {
      console.log('Speech recognition not supported');
      return;
    }

    try {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    } catch (error) {
      console.error('Error toggling voice recognition:', error);
      setIsListening(false);
    }
  }, [recognition, isListening]);

  const { data: randomQuestions = [] } = useQuery({
    queryKey: ['randomQuestions'],
    queryFn: questionsService.predefinedQuestions,
    onSuccess: (data) => {
      if (data.length > 0) {
        setPlaceHolderQuestion(data[0].question);
      }
    }
  });

  const handleQuestionClick = (question) => {
    setInput(question);
    onSendMessage(question);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 1,
      px: isMobile ? 1 : 2,
      pb: 2
    }}>
      {showWelcome && (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <img src={`${APP_API_ADMIN_CONFIG}${configImages.url}`} alt={configImages.alt} style={{ width: isMobile ? '150px' : '200px' }} />
          </Box>
          <Typography
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
              fontSize: isMobile ? '1rem' : '1.1rem',
              fontWeight: 'bold',
              mb: 2,
              px: isMobile ? 1 : 0
            }}
          >
            {initialMessage}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1, 
            justifyContent: 'center',
            mb: 2,
            px: isMobile ? 1 : 0
          }}>
            {randomQuestions.map((question, index) => (
              <Chip
                key={index}
                label={question.question}
                onClick={() => handleQuestionClick(question.question)}
                sx={{
                  cursor: 'pointer',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'white'
                  }
                }}
              />
            ))}
          </Box>
        </>
      )}
               <Box sx={{gap: 1, width: '100%', fontSize: '0.8rem', fontStyle: 'italic', '& .dot': {
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
                } }}>
            {isListening ? 
              <p>Escuchando <span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></p> : <p>Escriba su prégunta o hable por el microfono</p> 
            }
          </Box>
      <Box sx={{ 
        display: 'flex',
        gap: 1,
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'stretch'
      }}>
 
        <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={placeHolderQuestion}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
          <IconButton 
            onClick={handleVoiceToggle}
            color={isListening ? "error" : "primary"}
            sx={{
              borderRadius: 2,
              alignSelf: 'center'
            }}
            aria-label={isListening ? "Detener grabación de voz" : "Iniciar grabación de voz"}
          >
            {isListening ? <MicIcon /> : <MicOffIcon /> }
          </IconButton>
        </Box>
      
        <Button 
          type="submit"
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 3,
            textTransform: 'none',
            whiteSpace: 'nowrap',
            minHeight: isMobile ? '56px' : 'auto'
          }}
          disabled={disableSubmit}
        >
          {sendText}
        </Button>
      </Box>

    </Box>
  )
}
