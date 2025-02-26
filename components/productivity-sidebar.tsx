"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  AlarmClock,
  BarChart3,
  Bot,
  Brain,
  ChevronDown,
  Gamepad2,
  Lightbulb,
  Rocket,
  Search,
  Settings,
  Target,
  Users,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// Define the categories with their icons and routes
const categories = [
  {
    title: "Time Management Tools",
    icon: AlarmClock,
    route: "/time-management",
  },
  {
    title: "Goal Tracking & Motivation",
    icon: Target,
    route: "/goal-tracking",
  },
  {
    title: "Study & Learning Efficiency",
    icon: Brain,
    route: "/study-efficiency",
  },
  {
    title: "Productivity Analytics",
    icon: BarChart3,
    route: "/productivity-analytics",
  },
  {
    title: "AI-powered Assistants",
    icon: Bot,
    route: "/ai-assistants",
  },
  {
    title: "Collaboration & Accountability",
    icon: Users,
    route: "/collaboration",
  },
  {
    title: "Gamified Productivity & Motivation",
    icon: Gamepad2,
    route: "/gamified-productivity",
  },
  {
    title: "Creativity Booster",
    icon: Lightbulb,
    route: "/creativity-booster",
  },
]

export function ProductivitySidebar() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = React.useState("")

  const filteredCategories = searchQuery
    ? categories.filter((cat) =>
        cat.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categories

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-3">
          <Rocket className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold">ProductivityHub</span>
        </div>
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tools..."
              className="w-full pl-8 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {filteredCategories.map((category) => (
            <SidebarMenuItem key={category.title}>
              <Button
                onClick={() => router.push(category.route)}
                variant="ghost"
                className="w-full justify-start text-sm font-normal flex items-center gap-3"
              >
                <category.icon className="h-4 w-4" />
                <span>{category.title}</span>
              </Button>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" className="w-full">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
