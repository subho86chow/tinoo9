import asyncio
import os
from dotenv import load_dotenv
import json

from fastapi import Depends, FastAPI, WebSocket
from pydantic_ai.models.gemini import ToolReturnPart
from pydantic_ai import Agent

from api.config.dependencies import get_primary_agent
from api.config.schemas import ChatRequest
from api.config.events import lifespan
from api.utils.utils import assign_tool_call

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


# Modified WebSocket endpoint
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, agent: Agent = Depends(get_primary_agent)):
    await websocket.accept()
    messages = []
    
    try:
        while True:
            try:
                user_input = await asyncio.wait_for(
                    websocket.receive_text(), 
                    timeout=300  # 5 minute timeout
                )
                
                if user_input.lower() in ['exit', 'quit']:
                    await websocket.send_text("Goodbye!")
                    break
                
                async with agent.run_stream(
                    user_input, message_history=messages
                ) as result:
                    curr_message = ""
                    async for message in result.stream_text(delta=True):
                        curr_message += message
                        try:

                            tool_type = None

                            tool_type = assign_tool_call(result.all_messages()[-2]) if len(result.all_messages()) > 2 else None
    
                            await websocket.send_json({
                                "role": "system",
                                "content": curr_message,
                                "tool_type": tool_type
                            })

                        except ConnectionResetError:
                            break  # Handle client disconnects
                            
                    messages = result.all_messages()
                    
            except asyncio.TimeoutError:
                await websocket.send_text("Connection timeout, please refresh")
                break
                
    except Exception as e:
        await websocket.send_text(f"Error: {str(e)}")
    finally:
        await websocket.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)