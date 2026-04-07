import { useState, useCallback, useRef } from 'react'

export function useVoice(onTranscript) {
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)

  const startListening = useCallback(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Voice input is not supported in this browser. Try Chrome.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onTranscript(transcript)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }, [onTranscript])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
  }, [])

  return { isListening, startListening, stopListening }
}
