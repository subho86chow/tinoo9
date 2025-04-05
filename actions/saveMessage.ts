"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {ChatMessageRequest} from "@/lib/utils"

export default async function SaveMessageToDB(data:ChatMessageRequest){
    const {userId} = await auth()

    if (!userId){
        throw new Error("Unauthenticated")
    }

    await prisma.message.create({
    data: {
        role: data.role,
        content: data.content,
        tool_name: String(data.tool_type),
        userId,
        chat: {
        connectOrCreate: {
            where: { id: data.id, userId},
            create: {
            id: data.id,
            userId,
            },
        },
        },
    },
    });

    return true
}