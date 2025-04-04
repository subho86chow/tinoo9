from pydantic_ai.models.gemini import ToolReturnPart

def assign_tool_call(last_message):
    tool_name = None
    tool_type = None
    
    for part in last_message.parts:
        print(part)
        if isinstance(part, ToolReturnPart):
            tool_name = part.tool_name
            break
    
    if tool_name == None:
        tool_type = "STRING_OUTPUT"

    return tool_type