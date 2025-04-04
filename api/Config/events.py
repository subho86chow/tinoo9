from contextlib import asynccontextmanager, AsyncExitStack
import asyncio
from .agents import run_python_agent, airbnb_agent

@asynccontextmanager
async def lifespan(app: None = None):
    async with AsyncExitStack() as stack:
        # Start servers with retry logic
        await stack.enter_async_context(
            retry_connection(run_python_agent.run_mcp_servers)
        )
        await stack.enter_async_context(
            retry_connection(airbnb_agent.run_mcp_servers)
        )
        yield

@asynccontextmanager
async def retry_connection(context_func, retries=3, delay=2):
    for attempt in range(retries):
        try:
            # Create fresh context manager for each attempt
            async with context_func() as ctx:
                yield ctx
                break  # Exit loop on success
        except (ConnectionError, RuntimeError) as e:
            if attempt == retries - 1:
                raise
            await asyncio.sleep(delay)