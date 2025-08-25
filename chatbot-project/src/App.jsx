import { useState, useEffect } from 'react'
import ChatInput from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'
import { chatbot } from 'supersimpledev'

const CHAT_MESSAGES_KEY = 'chatMessages';

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem(CHAT_MESSAGES_KEY)) || []);

  useEffect(() => {
    localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(chatMessages));
  }, [chatMessages])

  useEffect(() => {
    chatbot.addResponses({
      hi: 'oh, huh. Hi',
      punch: '*KAPOW* *SCHBANG*',
      think: 'okay, i thunked!',
      whosthebestrapper: 'Kendrick Lamar, Duh'
    })
  }, [])

  return (
    <div className='js-container'>
      <ChatMessages
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
      />
    </div>
  )
}

export default App
