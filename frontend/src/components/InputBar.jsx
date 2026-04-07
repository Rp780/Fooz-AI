import { useState } from 'react'

export default function InputBar({ onSend, isStreaming, voiceButton }) {
  const [input, setInput] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || isStreaming) return
    onSend(text)
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        gap: '8px',
        padding: '16px',
        borderTop: '1px solid #222',
        background: '#0d0d0d',
        alignItems: 'center',
      }}
    >
      {voiceButton}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="talk to fooz..."
        rows={1}
        style={{
          flex: 1,
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '12px',
          color: '#e8e8e8',
          padding: '10px 14px',
          fontSize: '0.95rem',
          resize: 'none',
          outline: 'none',
          lineHeight: '1.5',
        }}
      />
      <button
        type="submit"
        disabled={isStreaming || !input.trim()}
        style={{
          background: '#2563eb',
          border: 'none',
          borderRadius: '12px',
          color: '#fff',
          padding: '10px 18px',
          cursor: isStreaming ? 'not-allowed' : 'pointer',
          fontSize: '0.9rem',
          opacity: isStreaming || !input.trim() ? 0.5 : 1,
        }}
      >
        Send
      </button>
    </form>
  )
}
