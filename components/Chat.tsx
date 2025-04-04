"use client"


import React, { useState } from 'react'
import { useScrollToBottom } from './hooks/scrollToBottom';
import { ThinkingMessage } from './Messages';
import { MultimodalInput } from './MultimodalInput';

function Chat() {

    const [input,setInput] = useState("")
    const [messages,setMessages] = useState<Array<string>>([])
    const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();



    const handleSubmit = () => {return null};

    return (
        <div className="flex flex-col min-w-0 h-[calc(100vh-11vh)] bg-background z-50">
        <div
            ref={messagesContainerRef}
            className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4"
        >
            {/* {messages.length === 0 && <Overview />}

            {messages.map((message:any, index:any) => (
            <PreviewMessage
                key={message.id}
                chatId={chatId}
                message={message}
                isLoading={isLoading && messages.length - 1 === index}
            />
            ))}

            {isLoading &&
            messages.length > 0 &&
            messages[messages.length - 1].role === "user" && <ThinkingMessage />} */}
            <ThinkingMessage />
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
            />
        </form>
        </div>
    )
}

export default Chat