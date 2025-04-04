import { cookies } from "next/headers"
import { useSidebar } from "@/components/ui/sidebar"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import { useEffect } from "react"
import { cn } from "@/lib/utils"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
        {children}
    </SidebarProvider>
  )
}
