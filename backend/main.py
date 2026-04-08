from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, Response
from pydantic import BaseModel
from backend import memory, fooz_brain, voice

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://fooz-ai.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


@app.get("/health")
async def health():
    return {"status": "fooz is alive"}


@app.post("/chat")
async def chat(request: ChatRequest):
    history = await memory.get_history()
    full_response = []

    async def generate():
        async for chunk in fooz_brain.stream_response(request.message, history):
            full_response.append(chunk)
            yield f"data: {chunk}\n\n"
        assistant_message = "".join(full_response)
        await memory.save_exchange(request.message, assistant_message)
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "X-Accel-Buffering": "no"},
    )


@app.get("/memory")
async def get_memory():
    messages = await memory.get_history()
    return {"messages": messages}


@app.delete("/memory")
async def delete_memory():
    await memory.clear_history()
    return {"status": "memory cleared"}


@app.post("/tts")
async def tts(request: ChatRequest):
    audio_bytes = voice.text_to_speech(request.message)
    return Response(content=audio_bytes, media_type="audio/mpeg")
