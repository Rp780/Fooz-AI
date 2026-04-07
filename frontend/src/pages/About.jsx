import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '80px auto',
      padding: '0 24px',
      color: '#e8e8e8',
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '16px' }}>Fooz</h1>
      <p style={{ color: '#aaa', lineHeight: '1.7', marginBottom: '12px' }}>
        Fooz is a personal AI with a real personality — witty, sarcastic, chill, and actually useful.
        Built as a solo project using React, FastAPI, and the Claude API.
      </p>
      <p style={{ color: '#aaa', lineHeight: '1.7', marginBottom: '32px' }}>
        Talk to it. It remembers you.
      </p>
      <Link
        to="/"
        style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
      >
        ← back to fooz
      </Link>
    </div>
  )
}
