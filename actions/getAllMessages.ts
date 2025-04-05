"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


export default async function GetAllUserMessages(){

    const {userId} = await auth()
    if (!userId){
        throw new Error("Unauthenticated")
    }

    const messages = await prisma.chat.findMany({
        where: {userId},
        include: {
            messages: true
        }
    })

    if(!messages){
        throw new Error("No messages found!")
    }

    if(messages.length === 0){
        throw new Error("No previous messages for this user.")
    }

    return messages
}