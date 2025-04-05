from pydantic import BaseModel
from typing import List


class ChatRequest(BaseModel):
    message: str 

class ChatMessagehistory(BaseModel):
    id: str
    role: str
    content: str
    tool_type: str | None

class ChatHeaderRequest(BaseModel):
    data: List[ChatMessagehistory]