"use client"

import * as React from "react"
import {
  AudioWaveform,
  BadgeCheck,
  Bell,
  BookOpen,
  Bot,
  ChevronRight,
  ChevronsUpDown,
  CirclePlus,
  CircleUserRound,
  Command,
  CreditCard,
  Folder,
  Forward,
  Frame,
  GalleryVerticalEnd,
  LogOut,
  Map,
  MoreHorizontal,
  Pencil,
  PieChart,
  Plus,
  Settings2,
  Sparkles,
  SquareTerminal,
  Trash2,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import AvatarIcon from "@/public/shadcn.jpg"
import { useClerk, useUser } from "@clerk/nextjs"
import { useMutation, useQuery } from "@tanstack/react-query"
import GetAllUserMessages from "@/actions/getAllMessages"
import { getChats } from "@/actions/getChats"
import { updateChatHeading } from "@/actions/updateChatHeading"
import { Button } from "./ui/button"

export const iframeHeight = "800px"
export const description = "A sidebar that collapses to icons."

// This is sample data.
// const data = {
//   user: {
//     name: "shadcn",
//     email: "m@example.com",
//     avatar: AvatarIcon,
//   },
//   teams: [
//     {
//       name: "Acme Inc",
//       logo: GalleryVerticalEnd,
//       plan: "Enterprise",
//     },
//     {
//       name: "Acme Corp.",
//       logo: AudioWaveform,
//       plan: "Startup",
//     },
//     {
//       name: "Evil Corp.",
//       logo: Command,
//       plan: "Free",
//     },
//   ],
//   navMain: [
//     {
//       title: "Playground",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "#",
//         },
//         {
//           title: "Starred",
//           url: "#",
//         },
//         {
//           title: "Settings",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],
//   projects: [
//     {
//       name: "Design Engineering",
//       url: "#",
//       icon: Frame,
//     },
//     {
//       name: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Travel",
//       url: "#",
//       icon: Map,
//     },
//   ],
// }

export default function AppSidebar() {
  const { openUserProfile, signOut } = useClerk();
  const { user } = useUser();

  const {data: allChats, isLoading, error} = useQuery({
    queryKey: ["getAllChats"],
    queryFn: ()=> getChats()
  })
  
  const updateHeader = useMutation({
    mutationFn: updateChatHeading,
    onSuccess: ()=> {},
    onError: ()=> {}
  })

  React.useEffect(()=>{
      allChats?.map((chat)=>{
        chat.chats.map((cht)=>{
          if (!cht.heading){
            updateHeader.mutate(cht.id)
          }
        })
      })
  },[allChats,updateHeader])

  return (
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="flex items-start justify-center px-6 p-3">
        <div className="flex items-center gap-3">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <GalleryVerticalEnd className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">
          Ackme Inc
        </span>
        </div>
        </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup className="group-data-[collapsible=icon]:hidden pt-3">
            <SidebarMenu>
            <SidebarMenuItem key={"new-chat"}>
              <div className="flex items-center justify-start">
                <Button variant="outline" className="border-dashed">
                  <div className="flex items-center justify-between gap-2">
                    <CirclePlus size={16}/>
                    <span>New Chat</span>
                  </div>
                </Button>
              </div>
            </SidebarMenuItem>
            </SidebarMenu>
            </SidebarGroup>
            {allChats?.map((data,index)=>(              
            <SidebarGroup className="group-data-[collapsible=icon]:hidden" key={index}>
            <SidebarGroupLabel className="capitalize">{data.time}</SidebarGroupLabel>
            <SidebarMenu>
              {data.chats.map((item,index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a href={`/chat/${item.id}`}>
                      <span>{item.heading}</span>
                    </a>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-48 rounded-lg"
                      side="bottom"
                      align="end"
                    >
                      <DropdownMenuItem>
                        <Pencil className="text-muted-foreground" />
                        <span>Rename Chat</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Trash2 className="text-muted-foreground" />
                        <span>Delete Chat</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
            ))}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user?.imageUrl}
                        alt={(user?.firstName?.charAt(0) ?? "Avatar") + (user?.lastName?.charAt(0) ?? "Image")}
                      />
                      <AvatarFallback className="rounded-lg">{(user?.firstName?.charAt(0) ?? "") + (user?.lastName?.charAt(0) ?? "")}</AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                      {user?.firstName}{" "}{user?.lastName}
                      </span>
                      <span className="truncate text-xs">
                      {user?.primaryEmailAddress?.emailAddress}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={user?.imageUrl}
                          alt={(user?.firstName?.charAt(0) ?? "Avatar") + (user?.lastName?.charAt(0) ?? "Image")}
                        />
                        <AvatarFallback className="rounded-lg">
                        {(user?.firstName?.charAt(0) ?? "") + (user?.lastName?.charAt(0) ?? "")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          {user?.firstName}{" "}{user?.lastName}
                        </span>
                        <span className="truncate text-xs">
                          {user?.primaryEmailAddress?.emailAddress}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onSelect={() => openUserProfile()}>
                      <CircleUserRound />
                      Account
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => signOut({ redirectUrl: "/sign-in" })}>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
  )
}
