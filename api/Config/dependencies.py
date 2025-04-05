from fastapi import Depends
from .agents import primary_agent, header_update_model

async def get_primary_agent():
    return primary_agent

async def get_header_generation_model():
    return header_update_model