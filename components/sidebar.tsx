"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useMediaQuery } from "usehooks-ts"
import { PlusCircle, Search, Settings, Trash } from "lucide-react"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { DocumentList } from "@/components/document-list"
import UserItem from "./user-item"

export function Sidebar() {
  const pathname = usePathname()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <SidebarComponent>
        <SidebarHeader>
          <UserItem />
          <div className="flex items-center gap-2 px-4">
            <Search className="h-4 w-4" />
            <Input placeholder="Search" className="h-7 bg-secondary" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname === "/documents"}>
                    <a href="/documents">
                      <PlusCircle className="h-4 w-4 mr-2" />
                      <span>New page</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Pages</SidebarGroupLabel>
            <SidebarGroupContent>
              <DocumentList sidebar />
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/trash">
                  <Trash className="h-4 w-4 mr-2" />
                  <span>Trash</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarComponent>
    </SidebarProvider>
  )
}

