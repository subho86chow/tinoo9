import asyncio
from contextlib import asynccontextmanager, AsyncExitStack
from fastapi import Depends, FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, List, Optional

from pydantic_ai import Agent

import os
from dotenv import load_dotenv

from pydantic_ai.providers.google_gla import GoogleGLAProvider
from pydantic_ai.models.gemini import GeminiModel

from api.Config.dependencies import get_primary_agent
from api.Config.schemas import ChatRequest
from .Config.events import lifespan  # Import the event

load_dotenv()

# Add a global variable to track MCP server status
mcp_server_ready = asyncio.Event()


app = FastAPI(
    lifespan=lifespan,
    docs_url="/api/py/docs", 
    openapi_url="/api/py/openapi.json"
)

# Update both endpoint paths to be consistent
@app.post("/api/chat")  # Changed from /api/query to /api/chat
async def chat_endpoint(request: ChatRequest, agent: Agent = Depends(get_primary_agent)):
    try:
        result = await agent.run(request.message)
        return {"response": result.data}
    except Exception as e:
        return {"error": str(e)}


@app.get("/api/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)