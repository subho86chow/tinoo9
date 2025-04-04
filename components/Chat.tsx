"use client"


import React, { useEffect, useRef, useState } from 'react'
import { useScrollToBottom } from './hooks/scrollToBottom';
import { PreviewMessage, ThinkingMessage } from './Messages';
import { MultimodalInput } from './MultimodalInput';
import { ClassDictionary } from 'clsx';

interface Message {
    role: string;
    content: string;
    tool_type?: string;
  }

function Chat() {
    const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading,setLoading] = useState(false)
    const wsRef = useRef<WebSocket | null>(null);
    
    useEffect(() => {
      const ws = new WebSocket("ws://localhost:8000/ws");
      wsRef.current = ws;
    
      ws.onmessage = (event) => {
        setMessages((prev) => [...prev,JSON.parse(event.data)]);

        console.log("Received:", JSON.parse(event.data).content);

        setLoading(false)
        console.log(messages)
      };
    
      return () => {
        ws.close();
      };
    }, []);
    
    const sendMessage = (input: string) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(input);
        setLoading(true)
      }
    };
    
    const handleSubmit = () => {
      if (input.trim() === "") return;
      const obj = {
        role: "user",
        content: input,
        tool_type: ""
      };
      setMessages(prev => [...prev, obj]);
      sendMessage(input);
      setInput("");
    };

    return (
        <div className="flex flex-col min-w-0 h-[calc(100vh-11vh)] bg-background z-50">
        <div
            ref={messagesContainerRef}
            className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
        >
            {/* {messages.length === 0 && <Overview />} */}

            {messages.map((message:any, index:any) => (
            <PreviewMessage
                key={message.id}
                message={message}
                isLoading={loading && messages.length - 1 === index}
            />
            ))}

            {loading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === "user" && <ThinkingMessage />}


            <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
            />
        </div>

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-4xl">
            <MultimodalInput
            chatId={"0001"}
            input={input}
            setInput={setInput}
            isLoading={false}
            stop={stop}
            messages={messages}
            setMessages={setMessages}
            handleSubmit={handleSubmit}
            />
        </form>
        </div>
    )
}

export default Chat