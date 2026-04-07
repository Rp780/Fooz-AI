import Header from './components/Header'
import ChatWindow from './components/ChatWindow'
import InputBar from './components/InputBar'
import VoiceButton from './components/VoiceButton'
import { useChat } from './hooks/useChat'

export default function App() {
  const { messages, isStreaming, sendMessage, clearMessages } = useChat()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      maxWidth: '800px',
      margin: '0 auto',
    }}>
      <Header onNewChat={clearMessages} />
      <ChatWindow messages={messages} isStreaming={isStreaming} />
      <InputBar
        onSend={sendMessage}
        isStreaming={isStreaming}
        voiceButton={
          <VoiceButton onTranscript={sendMessage} disabled={isStreaming} />
        }
      />
    </div>
  )
}
