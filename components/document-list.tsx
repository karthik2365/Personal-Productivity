"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { File, MoreHorizontal, Plus, Trash } from "lucide-react"
import { SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for documents
const mockDocuments = [
  { id: "1", title: "Getting Started", createdAt: new Date() },
  { id: "2", title: "Meeting Notes", createdAt: new Date() },
  { id: "3", title: "Project Plan", createdAt: new Date() },
  { id: "4", title: "Ideas", createdAt: new Date() },
]

interface DocumentListProps {
  sidebar?: boolean
}

export function DocumentList({ sidebar = false }: DocumentListProps) {
  const router = useRouter()
  const [documents, setDocuments] = useState(mockDocuments)
  const [isCreating, setIsCreating] = useState(false)

  const onCreateDocument = () => {
    const newDocument = {
      id: Math.random().toString(),
      title: "Untitled",
      createdAt: new Date(),
    }

    setDocuments([newDocument, ...documents])
    router.push(`/documents/${newDocument.id}`)
  }

  const onDelete = (documentId: string) => {
    setDocuments(documents.filter((doc) => doc.id !== documentId))
  }

  if (sidebar) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={onCreateDocument}>
            <Plus className="h-4 w-4 mr-2" />
            <span>New page</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        {documents.map((document) => (
          <SidebarMenuItem key={document.id}>
            <SidebarMenuButton asChild isActive={false}>
              <a href={`/documents/${document.id}`}>
                <File className="h-4 w-4 mr-2" />
                <span>{document.title}</span>
              </a>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction>
                  <MoreHorizontal className="h-4 w-4" />
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="right" forceMount>
                <DropdownMenuItem onClick={() => onDelete(document.id)} className="text-destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Your documents</h2>
        <Button onClick={onCreateDocument} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Create
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {documents.map((document) => (
          <div
            key={document.id}
            onClick={() => router.push(`/documents/${document.id}`)}
            className="group flex flex-col p-4 border rounded-lg cursor-pointer hover:border-primary transition"
          >
            <div className="flex items-center justify-between">
              <File className="h-8 w-8" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation()
                      onDelete(document.id)
                    }}
                    className="text-destructive"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="text-sm mt-2">{document.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{document.createdAt.toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}