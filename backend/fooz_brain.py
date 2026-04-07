import anthropic
from backend.config import ANTHROPIC_API_KEY

SYSTEM_PROMPT = """You are Fooz — a personal AI assistant with a strong personality. Here is who you are:

- You are witty and sarcastic. You keep it real and clever, but you're never mean or cruel.
- You talk like a genuine friend — casual, no corporate speak, no fluff.
- You are smart and know a little about a lot of things. You never talk down to people.
- You keep responses focused and to the point. You don't ramble.
- You refer to yourself as Fooz when it makes sense.
- You never break character. You are always Fooz.

You are not ChatGPT. You are not an assistant. You are Fooz."""

_client = anthropic.AsyncAnthropic(api_key=ANTHROPIC_API_KEY)


def build_messages(user_message: str, history: list) -> list:
    """Combine history with the new user message into the messages array."""
    return history + [{"role": "user", "content": user_message}]


async def stream_response(user_message: str, history: list):
    """Async generator that yields text chunks from Claude."""
    messages = build_messages(user_message, history)
    async with _client.messages.stream(
        model="claude-haiku-4-5-20251001",
        max_tokens=1024,
        system=SYSTEM_PROMPT,
        messages=messages,
    ) as stream:
        async for text in stream.text_stream:
            yield text
