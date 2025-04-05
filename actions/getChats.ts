"use server"

import { getTimeLabel } from "@/lib/helpers/getTimeText";
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// Updated getChats function
export async function getChats() {
    const { userId } = await auth()
  
    if (!userId) {
      throw new Error("Unauthenticated")
    }
  
    const chats = await prisma.chat.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
  
    const groupedChats: { time: string; chats: any[]; latestDate: Date }[] = []
  
    // Group chats with their latest date
    for (const chat of chats) {
      const timeLabel = getTimeLabel(chat.createdAt)
      const existingGroup = groupedChats.find(group => group.time === timeLabel)
  
      const chatItem = {
        id: chat.id,
        userId: chat.userId,
        heading: chat.heading
      }
  
      if (existingGroup) {
        existingGroup.chats.push(chatItem)
        if (chat.createdAt > existingGroup.latestDate) {
          existingGroup.latestDate = chat.createdAt
        }
      } else {
        groupedChats.push({
          time: timeLabel,
          chats: [chatItem],
          latestDate: chat.createdAt // Track newest chat date in group
        })
      }
    }
  
    // Sort groups by latestDate descending
    groupedChats.sort((a, b) => (a.latestDate.getTime() - b.latestDate.getTime()))
  
    // Remove temporary latestDate property before returning
    const allChats = groupedChats.map(({ time, chats }) => ({ time, chats }))

    return allChats
}