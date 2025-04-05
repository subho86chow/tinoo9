import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"


function ChatBreadcrumb(props: { crumbs: string[] }) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {props.crumbs.map((item, index) => (
            <>
            <BreadcrumbItem key={index}>
              <BreadcrumbPage>{item}</BreadcrumbPage>
            </BreadcrumbItem>
            {index < props.crumbs.length - 1 && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }
  
export default ChatBreadcrumb


