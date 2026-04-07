import requests
from backend.config import ELEVENLABS_API_KEY, ELEVENLABS_VOICE_ID


def text_to_speech(text: str) -> bytes:
    """Send text to ElevenLabs and return MP3 audio bytes."""
    response = requests.post(
        f"https://api.elevenlabs.io/v1/text-to-speech/{ELEVENLABS_VOICE_ID}",
        headers={
            "Accept": "audio/mpeg",
            "xi-api-key": ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
        },
        json={
            "text": text,
            "model_id": "eleven_monolingual_v1",
            "voice_settings": {
                "stability": 0.5,
                "similarity_boost": 0.75,
            },
        },
        timeout=30,
    )
    response.raise_for_status()
    return response.content
