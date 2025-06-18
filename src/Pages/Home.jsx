import { Box, Drawer } from '@mui/material'
import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import apiService from '../services/apiService'
import '../App.css'
import Header from '../Components/header'
import { useAppConfig } from '../hooks/useAppConfig'
import NewChat from '../Components/newChat'
import PoweredBy from '../Components/poweredBy'
import Messages from '../Components/messages'
import Submit from '../Components/submit'
import { v4 as uuidv4 } from 'uuid';

function Home() {
  const { app, messages: configMessages, isLoading: configLoading, images: configImages } = useAppConfig();
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [currentChatId, setCurrentChatId] = useState(1)
  const [showWelcome, setShowWelcome] = useState(true)
  const [placeHolderQuestion, setPlaceHolderQuestion] = useState(configMessages.placeHolderQuestion1)
  const [session_id, setSession_id] = useState('')
  const [isFirstMessage, setIsFirstMessage] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [disableSubmit, setDisableSubmit] = useState(false)

  useEffect(() => {
    setSession_id(uuidv4());
  }, []);
  console.log(disableSubmit)
  useEffect(() => {
    if (!configLoading) {
      if (isFirstMessage) {
        setPlaceHolderQuestion(configMessages.placeHolderQuestion1);
      } else {
        setPlaceHolderQuestion(configMessages.placeHolderQuestion2);
      }
    }
  }, [configMessages, configLoading, isFirstMessage]);

  const { mutate: sendMessage, isPending: isLoading } = useMutation({
    mutationFn: apiService.sendMessage,
    onSuccess: (response) => {
      const summary = response.reply.summary;
      setMessages(prevMessages => [...prevMessages, { 
        text: summary, 
        isUser: false 
      }]);
    },
    onError: (error) => {
      console.error('Error en la consulta a la API:', error);
      setMessages(prevMessages => [...prevMessages, { 
        text: configMessages.errorMessage, 
        isUser: false 
      }]);
    }
  });

  const handleSubmit = async (e) => {
    setDisableSubmit(true)
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    
    if (!input.trim()) return;
    
    setIsFirstMessage(false);
    setMessages(prevMessages => [...prevMessages, { text: input, isUser: true }]);
    setInput('');
    setShowWelcome(false);

    sendMessage({ 
      message: input, 
      session_id, 
      userId: "123" 
    });
  };

  const startNewChat = () => { 
    const currentChatText = messages.length > 0 ? messages[0].text : configMessages.newChat;
    setMessages([])
    setInput('')
    setShowWelcome(true)
    setIsFirstMessage(true)
    const newChatId = Math.max(...chatHistory.map(chat => chat.id)) + 1
    setChatHistory([{ id: newChatId, title: currentChatText }, ...chatHistory])
    setCurrentChatId(newChatId)
    setSession_id(uuidv4());
  }

  const selectChat = (chatId) => {
    setCurrentChatId(chatId)
    setMessages([])
    setIsFirstMessage(true)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Header 
        logoClient={configImages.appLogoClient}
        drawerWidth={app.drawerWidth}
        buttonText={configMessages.useWeb}
        headerIframe={configImages.headerIframe}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        about={app?.about}
      />
      <Box
        component="nav"
        sx={{ width: { md: app.drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: app.drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider'
            },
          }}
        >
          <NewChat 
            chatHistory={chatHistory} 
            currentChatId={currentChatId} 
            startNewChat={startNewChat} 
            selectChat={selectChat}
            logoApp={configImages.appLogo}
          />
          <PoweredBy />
        </Drawer>
        {/* Desktop drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: app.drawerWidth,
              borderRight: '1px solid',
              borderColor: 'divider'
            },
          }}
          open
        >
          <NewChat 
            chatHistory={chatHistory} 
            currentChatId={currentChatId} 
            startNewChat={startNewChat} 
            selectChat={selectChat}
            logoApp={configImages.appLogo}
          />
          <PoweredBy />
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: '100%',
          ml: { md: 0 },
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
            setDisableSubmit={setDisableSubmit}
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
            disableSubmit={disableSubmit}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Home
