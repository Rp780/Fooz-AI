import { Link } from 'react-router-dom'

export default function Header({ onNewChat }) {
  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      borderBottom: '1px solid #222',
      background: '#0d0d0d',
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
          Fooz
        </h1>
      </Link>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Link
          to="/about"
          style={{
            background: 'none',
            border: '1px solid #333',
            color: '#aaa',
            padding: '6px 14px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.85rem',
          }}
        >
          About
        </Link>
        <button
          onClick={onNewChat}
          style={{
            background: 'none',
            border: '1px solid #333',
            color: '#aaa',
            padding: '6px 14px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '0.85rem',
          }}
        >
          New Chat
        </button>
      </div>
    </header>
  )
}
