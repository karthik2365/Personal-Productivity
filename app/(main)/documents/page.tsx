import { DocumentList } from "@/components/document-list"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function DocumentsPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Documents</h1>
        <Button size="sm" className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          Create
        </Button>
      </div>
      <DocumentList />
    </div>
  )
}
