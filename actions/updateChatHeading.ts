"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export async function updateChatHeading(id:string){
    const {userId} = await auth();

    if (!userId){
        throw new Error("Unauthenticated")
    }
    
    const chat = await prisma.chat.findUnique({
        where: {id,userId},
        select:{
            messages: true,
            heading: true
        }
    })
    
    if (!chat){
        throw new Error("No chat found with this chatID")
    }
    
    if (!chat.heading || chat.heading === "" || chat.heading === " "){

        const cleanedMessages = chat.messages.map(msg => ({
            id: msg.chatId,
            role: msg.role,
            content: msg.content,
            tool_type: msg.tool_name
          }))
        
        const response = await axios.post(`${process.env.NEXT_DBU}/api/getChatHeader`, {
            data: cleanedMessages
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        
        const heading = response.data
        
        await prisma.chat.update({
            data: {
                heading: heading.data
            },
            where: {
                id,
                userId
            }
        })
    }

}