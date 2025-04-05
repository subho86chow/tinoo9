"use client"


import React, { useEffect, useRef, useState } from 'react'
import { useScrollToBottom } from './hooks/scrollToBottom';
import { PreviewMessage, ThinkingMessage } from './Messages';
import { MultimodalInput } from './MultimodalInput';
import { useMutation } from '@tanstack/react-query';
import SaveMessageToDB from "@/actions/saveMessage"
import { ChatMessageRequest } from '@/lib/utils';
import { toast } from 'sonner';

interface Message {
    id: string;
    role: string;
    content: string;
    tool_type?: string | null;
  }

function Chat({chat}:{chat?:Message[]}) {
    const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();

    const [input, setInput] = useState("");
    const [chatId,serChatId] = useState("00112233")
    const [messages, setMessages] = useState<Message[]>(chat? chat : []);
    const [loading,setLoading] = useState(false)
    const wsRef = useRef<WebSocket | null>(null);

    const sendMessageMutation = useMutation({
      mutationFn: SaveMessageToDB,
      onSuccess: ()=>{},
      onError: ()=>{},
    })

    
    useEffect(() => {
      const ws = new WebSocket("ws://localhost:8000/ws");
      wsRef.current = ws;
    
      ws.onmessage = (event) => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          try {
            const data = JSON.parse(event.data);
            serChatId(data.id)
            setMessages((prev) => {
              // If the last message is also from the system and we’re still streaming, update it
              if (
                prev.length > 0 &&
                prev[prev.length - 1].role === "system" &&
                data.role === "system"
              ) {
                const updatedMessages = [...prev];
                updatedMessages[updatedMessages.length - 1] = {
                  ...data,
                };
                return updatedMessages;
              } else {
                // First chunk of the system message or it's not a system message
                return [...prev, data];
              }
            });
            sendMessageMutation.mutate(data)
            console.log("Received:", data);
            setLoading(false);
          } catch (err) {
            console.warn("Non-JSON message:", event.data);
          }
        }
      };
    
      return () => {
        ws.close();
      };
    }, []);
    
    const sendMessage = (input: Message) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(input.content);
        console.log("@@LAST_MESSAGE",input)
        sendMessageMutation.mutate(input as ChatMessageRequest)
        setLoading(true)
      }
    };
    
    const handleSubmit = () => {
      if (input.trim() === "") return;
      const obj = {
        id: chatId,
        role: "user",
        content: input,
        tool_type: null
      };
      setMessages(prev => [...prev, obj]);
      console.log(messages)
      sendMessage(obj);
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
                key={message.id + index}
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
            chatId={chatId}
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