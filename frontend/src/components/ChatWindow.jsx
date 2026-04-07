import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'

export default function ChatWindow({ messages, isStreaming }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '24px 0',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {messages.length === 0 && (
        <div style={{
          textAlign: 'center',
          color: '#555',
          marginTop: '80px',
          fontSize: '1rem',
        }}>
          say something.
        </div>
      )}
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}
      {isStreaming && (
        <div style={{ padding: '0 16px', color: '#555', fontSize: '0.85rem' }}>
          Fooz is typing...
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
