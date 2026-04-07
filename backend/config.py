import os
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
ELEVENLABS_VOICE_ID = os.getenv("ELEVENLABS_VOICE_ID")
MONGODB_URI = os.getenv("MONGODB_URI")
