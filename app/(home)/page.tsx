import Chat from "@/components/Chat"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@radix-ui/react-separator"
import ChatBreadcrumb from "./_components/ChatBreadcrumb"
import { ThinkingMessage } from "@/components/Messages"

function HomePage() {
  return (
    <SidebarInset>
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <ChatBreadcrumb crumbs={["first page"]} />
      </div>
    </header>
    <div className="relative flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
      <Chat/>
    </div>
  </SidebarInset>
  )
}

export default HomePage