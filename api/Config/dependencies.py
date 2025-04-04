from fastapi import Depends
from .agents import primary_agent

async def get_primary_agent():
    return primary_agent