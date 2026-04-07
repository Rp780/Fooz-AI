import { useVoice } from '../hooks/useVoice'

export default function VoiceButton({ onTranscript, disabled }) {
  const { isListening, startListening, stopListening } = useVoice(onTranscript)

  return (
    <button
      type="button"
      onMouseDown={startListening}
      onMouseUp={stopListening}
      onTouchStart={startListening}
      onTouchEnd={stopListening}
      disabled={disabled}
      title="Hold to speak"
      style={{
        background: isListening ? '#dc2626' : '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '12px',
        color: '#e8e8e8',
        padding: '10px 14px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '1rem',
        transition: 'background 0.15s',
        animation: isListening ? 'pulse 1s infinite' : 'none',
      }}
    >
      🎤
    </button>
  )
}
