import { useState, useCallback } from 'react'

const API = import.meta.env.VITE_API_URL || ''

async function playTTS(text) {
  try {
    const response = await fetch(`${API}/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text }),
    })
    const audioBlob = await response.blob()
    const audioUrl = URL.createObjectURL(audioBlob)
    const audio = new Audio(audioUrl)
    audio.play()
    audio.onended = () => URL.revokeObjectURL(audioUrl)
  } catch (err) {
    console.error('TTS error:', err)
  }
}

export function useChat() {
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)

  const sendMessage = useCallback(async (text) => {
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setIsStreaming(true)
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

    let fullResponse = ''

    try {
      const response = await fetch(`${API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6)
          if (data === '[DONE]') break

          fullResponse += data
          setMessages((prev) => {
            const updated = [...prev]
            const last = updated[updated.length - 1]
            updated[updated.length - 1] = { ...last, content: last.content + data }
            return updated
          })
        }
      }

      if (fullResponse) playTTS(fullResponse)
    } catch (err) {
      console.error('Chat error:', err)
      setMessages((prev) => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'something went wrong. try again.',
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }, [])

  const clearMessages = useCallback(async () => {
    await fetch(`${API}/memory`, { method: 'DELETE' })
    setMessages([])
  }, [])

  return { messages, isStreaming, sendMessage, clearMessages }
}
