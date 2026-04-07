export default function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '12px',
      padding: '0 16px',
    }}>
      <div style={{
        maxWidth: '70%',
        padding: '10px 16px',
        borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
        background: isUser ? '#2563eb' : '#1e1e1e',
        color: '#e8e8e8',
        fontSize: '0.95rem',
        lineHeight: '1.5',
        whiteSpace: 'pre-wrap',
      }}>
        {message.content}
      </div>
    </div>
  )
}
