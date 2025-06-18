import { Box } from '@mui/material'
import Messages from '../Components/messages'
import Submit from '../Components/submit'
import { useState, useEffect } from 'react'
import apiService from '../services/apiService'
import { useAppConfig } from '../hooks/useAppConfig'
import { v4 as uuidv4 } from 'uuid';

export default function IframeAgent() {
    const { messages: configMessages, isLoading: configLoading, images: configImages } = useAppConfig();
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [showWelcome, setShowWelcome] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [placeHolderQuestion, setPlaceHolderQuestion] = useState(configMessages.placeHolderQuestion1)
    const [session_id, setSession_id] = useState('')
    const [isFirstMessage, setIsFirstMessage] = useState(true)


    useEffect(() => {
      setSession_id(uuidv4());
    }, []);

    useEffect(() => {
      if (!configLoading) {
        if (isFirstMessage) {
          setPlaceHolderQuestion(configMessages.placeHolderQuestion1);
        } else {
          setPlaceHolderQuestion(configMessages.placeHolderQuestion2);
        }
      }
    }, [configMessages, configLoading, isFirstMessage]);
  
    const handleSubmit = async (e) => {
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
      
      if (!input.trim()) return;
      
      setIsFirstMessage(false);
      setMessages(prevMessages => [...prevMessages, { text: input, isUser: true }]);
      setInput('');
      setShowWelcome(false);
      setIsLoading(true);
  
      try {
        const response = await apiService.sendMessage({ 
          message: input, 
          session_id, 
          userId: "123" 
        });
        const summary = response.reply.summary;
        setMessages(prevMessages => [...prevMessages, { 
          text: summary, 
          isUser: false 
        }]);
      } catch (error) {
        console.error('Error en la consulta a la API:', error);
        setMessages(prevMessages => [...prevMessages, { 
          text: configMessages.errorMessage, 
          isUser: false 
        }]);
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          ml: 0,
          mt: 8
        }}
      >
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 164px)',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <Messages 
            messages={messages} 
            showWelcome={showWelcome} 
            isLoading={isLoading} 
            preMessage={configMessages.preMessage}
            agentIcon={configImages.agentIcon}
          />
          <Submit 
            input={input} 
            setInput={setInput} 
            handleSubmit={handleSubmit}
            showWelcome={showWelcome} 
            placeHolderQuestion={placeHolderQuestion}
            setPlaceHolderQuestion={setPlaceHolderQuestion}
            sendText={configMessages.sendText}
            initialMessage={configMessages.initialMessage}
            configImages={configImages.greetingAgent}
          />
        </Box>
      </Box>
    )
}
