# Fooz AI — Design Spec
**Date:** 2026-04-07
**Status:** Approved

---

## Overview

Fooz is a personal AI web app built for personal use and portfolio showcase. It features a witty, sarcastic, chill, and knowledgeable personality powered by the Claude API. Fooz supports real-time streaming conversation, voice input/output, and persistent memory across sessions.

---

## Goals

- Build a working personal AI assistant with a unique identity
- Support text and voice interaction
- Remember past conversations across sessions
- Be deployable publicly (resume/portfolio piece)
- Keep the stack simple and learnable

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Python + FastAPI |
| Database | MongoDB (Atlas for prod, local for dev) |
| AI Brain | Anthropic Claude API |
| Voice Input | Browser Web Speech API (free, built-in) |
| Voice Output | ElevenLabs API (free tier) |
| Frontend Deploy | Vercel |
| Backend Deploy | Render |

---

## Personality

Fooz's identity is defined entirely through a system prompt sent to Claude on every request. Key traits:

- **Witty and sarcastic** — clever responses, light edge, keeps it real
- **Chill and casual** — talks like a friend, no corporate tone
- **Smart but approachable** — knowledgeable across many topics, never condescending

The system prompt is the single source of truth for Fooz's identity. It lives in `backend/fooz_brain.py`.

---

## Features (v1)

1. **Conversation** — real-time streaming chat with Fooz
2. **Voice input** — user speaks, browser converts to text via Web Speech API
3. **Voice output** — Fooz's responses are read aloud via ElevenLabs TTS (with a stop button)
4. **Memory** — last 20 message pairs stored in MongoDB, loaded on each request so Fooz remembers context

### Out of scope for v1 (future)
- User login / authentication
- Image generation
- Multi-user support

---

## Architecture

```
User (Browser)
     |
     | HTTP / SSE (streaming)
     v
FastAPI Backend (Python)
     |         |          |
     |         |          |
  Claude    MongoDB    ElevenLabs
   API      (memory)    (TTS)
```

### Request Flow
1. User sends message (text or voice-converted-to-text)
2. Backend fetches conversation history from MongoDB
3. Backend builds Claude request: system prompt + history + new message
4. Claude streams response back → backend streams to frontend via SSE
5. Backend saves new exchange to MongoDB (trims to last 20 pairs)
6. Frontend plays audio via ElevenLabs TTS

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/chat` | Send message, receive streaming response |
| `GET` | `/memory` | Retrieve conversation history |
| `DELETE` | `/memory` | Clear all memory (fresh start) |
| `POST` | `/tts` | Convert text to speech audio via ElevenLabs |

---

## Data Model (MongoDB)

Single collection: `conversations`

One document total (personal use, no multi-user):

```json
{
  "messages": [
    { "role": "user", "content": "hey fooz", "timestamp": "2026-04-07T12:00:00Z" },
    { "role": "assistant", "content": "what's good", "timestamp": "2026-04-07T12:00:01Z" }
  ],
  "updated_at": "2026-04-07T12:00:01Z"
}
```

- Max 20 message pairs stored at any time
- Older messages are trimmed on each save

---

## Frontend UI

**Single page app with two routes:**
- `/` — main chat interface
- `/about` — brief description of Fooz

**Main chat UI components:**
- `ChatWindow` — scrollable message thread
- `MessageBubble` — styled differently for user vs Fooz
- `InputBar` — text input + send button + mic button
- `VoiceButton` — pulsing animation while listening, releases to send
- `Header` — Fooz name/branding + "New Chat" button

**Design direction:** Dark theme, clean and minimal, personality shows through the copy and interactions — not flashy UI.

---

## Project Structure

```
fooz/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── MessageBubble.jsx
│   │   │   ├── InputBar.jsx
│   │   │   ├── VoiceButton.jsx
│   │   │   └── Header.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
│
├── backend/
│   ├── main.py           # FastAPI app + routes
│   ├── fooz_brain.py     # System prompt + Claude API integration
│   ├── memory.py         # MongoDB read/write/trim logic
│   ├── voice.py          # ElevenLabs TTS integration
│   └── requirements.txt
│
└── .env                  # API keys (never commit this)
```

---

## Environment Variables

```
ANTHROPIC_API_KEY=
ELEVENLABS_API_KEY=
ELEVENLABS_VOICE_ID=
MONGODB_URI=
```

---

## Running Locally

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
# runs on http://localhost:8000

# Frontend
cd frontend
npm install
npm run dev
# runs on http://localhost:5173
```

---

## Deployment (when ready)

| Service | Platform | Cost |
|---|---|---|
| Frontend | Vercel | Free |
| Backend | Render | Free tier |
| MongoDB | MongoDB Atlas | Free tier |

---

## Success Criteria

- Fooz can hold a multi-turn conversation and feel like a distinct personality
- Voice input and output work in the browser
- Fooz remembers what was said earlier in the session and across sessions
- The app is deployed publicly and shareable via URL
