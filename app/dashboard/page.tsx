import { ProductivitySidebar } from "@/components/productivity-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function Home() {
  return (
    <SidebarProvider>
      <ProductivitySidebar />
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
            <h1 className="text-xl font-semibold">Productivity Dashboard</h1>
          </header>
          <main className="flex-1 p-6">
            <div className="grid gap-6">
              <div className="rounded-lg border bg-card p-6">
                <h2 className="text-lg font-semibold mb-4">Welcome to your Productivity Hub</h2>
                <p className="text-muted-foreground">
                  Select a category from the sidebar to get started with your productivity journey.
                </p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-lg border bg-card p-6">
                    <div className="h-40 rounded-md bg-muted/50"></div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
