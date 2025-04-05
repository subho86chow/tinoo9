import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export interface Message {
  id: string
  role: string;
  content: string;
  tool_type?: string | null;
}


export interface ChatMessageRequest {
    id: string
    role: "user" | "system"
    content: string
    tool_type: string
}