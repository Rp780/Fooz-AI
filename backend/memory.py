from datetime import datetime, timezone
from motor.motor_asyncio import AsyncIOMotorClient
from backend.config import MONGODB_URI

_client = AsyncIOMotorClient(MONGODB_URI)
_db = _client.fooz
_collection = _db.conversations


def trim_messages(messages: list) -> list:
    """Keep only the last 40 messages (20 user/assistant pairs)."""
    if len(messages) > 40:
        return messages[-40:]
    return messages


async def get_history() -> list:
    """Return the stored message history, or empty list if none."""
    doc = await _collection.find_one({})
    if not doc:
        return []
    return doc.get("messages", [])


async def save_exchange(user_message: str, assistant_message: str) -> None:
    """Append a user/assistant exchange and trim to last 40 messages."""
    doc = await _collection.find_one({})
    messages = doc.get("messages", []) if doc else []
    messages.append({"role": "user", "content": user_message})
    messages.append({"role": "assistant", "content": assistant_message})
    messages = trim_messages(messages)
    await _collection.update_one(
        {},
        {"$set": {"messages": messages, "updated_at": datetime.now(timezone.utc)}},
        upsert=True,
    )


async def clear_history() -> None:
    """Delete all stored messages."""
    await _collection.delete_many({})
