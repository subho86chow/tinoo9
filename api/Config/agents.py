from contextlib import AsyncExitStack
from anyio import create_task_group, sleep
from pydantic_ai.providers.google_gla import GoogleGLAProvider
from pydantic_ai.models.gemini import GeminiModel
from pydantic_ai import Agent
from pydantic_ai.mcp import MCPServerStdio
from .config import settings

def get_model():
    return GeminiModel(
        settings.MODEL_NAME, 
        provider=GoogleGLAProvider(api_key=settings.GEMINI_API_KEY)
    )

# Initialize MCP servers
run_python = MCPServerStdio('npx', ['-y', '@pydantic/mcp-run-python', 'stdio'])
airbnb = MCPServerStdio('npx', ['-y', '@openbnb/mcp-server-airbnb', '--ignore-robots-txt'])

# Create agents
run_python_agent = Agent(
    get_model(),
    system_prompt="You are a python coding expert. Help users write and run python code.",
    mcp_servers=[run_python]
)

airbnb_agent = Agent(
    get_model(),
    system_prompt="You are an airbnb specialist. Help users find and book airbnb.",
    mcp_servers=[airbnb]
)

primary_agent = Agent(
    get_model(),
    system_prompt="Primary orchestration agent that delegates to subagents."
)


# Tool definitions
@primary_agent.tool_plain
async def use_run_python_agent(query: str) -> dict[str, str]:
    result = await run_python_agent.run(query)
    return {"result": result.data}


@primary_agent.tool_plain
async def use_airbnb_agent(query: str) -> dict[str, str]:
    result = await airbnb_agent.run(query)
    return {"result": result.data}


async def start_mcp_servers():
    async with AsyncExitStack() as stack:
        # Start servers with connection pooling
        await stack.enter_async_context(
            run_python_agent.run_mcp_servers(max_connections=10)
        )
        await stack.enter_async_context(
            airbnb_agent.run_mcp_servers(max_connections=10)
        )
        
        # Keep alive mechanism
        async with create_task_group() as tg:
            tg.start_soon(keep_alive_loop)
            yield


async def keep_alive_loop():
    """Maintain active connections"""
    while True:
        await sleep(300)  # Send keep-alive every 5 minutes
        # Add any keep-alive logic for your MCP servers here