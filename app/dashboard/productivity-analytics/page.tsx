"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Calendar,
  ChevronDown,
  Clock,
  Filter,
  LayoutDashboard,
  LineChartIcon,
  ListChecks,
  LogOut,
  Settings,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for charts
const productivityData = [
  { name: "Mon", productivity: 67, focus: 78 },
  { name: "Tue", productivity: 72, focus: 82 },
  { name: "Wed", productivity: 85, focus: 90 },
  { name: "Thu", productivity: 76, focus: 84 },
  { name: "Fri", productivity: 80, focus: 87 },
  { name: "Sat", productivity: 45, focus: 52 },
  { name: "Sun", productivity: 40, focus: 48 },
]

const taskCompletionData = [
  { name: "Email", completed: 24, total: 30 },
  { name: "Meetings", completed: 8, total: 10 },
  { name: "Projects", completed: 12, total: 15 },
  { name: "Admin", completed: 18, total: 20 },
  { name: "Learning", completed: 5, total: 8 },
]

const timeAllocationData = [
  { name: "Deep Work", value: 35, color: "#8884d8" },
  { name: "Meetings", value: 25, color: "#82ca9d" },
  { name: "Email", value: 15, color: "#ffc658" },
  { name: "Admin", value: 10, color: "#ff8042" },
  { name: "Breaks", value: 15, color: "#0088fe" },
]

const insightsData = [
  {
    id: 1,
    insight: "Peak productivity hours",
    description: "Your most productive hours are between 9AM-11AM",
    change: "+15%",
    trend: "positive",
  },
  {
    id: 2,
    insight: "Meeting efficiency",
    description: "Average meeting time reduced by 10 minutes",
    change: "-12%",
    trend: "positive",
  },
  {
    id: 3,
    insight: "Task completion rate",
    description: "You completed 87% of planned tasks this week",
    change: "+5%",
    trend: "positive",
  },
  {
    id: 4,
    insight: "Context switching",
    description: "You switch between apps 35 times per hour",
    change: "+8%",
    trend: "negative",
  },
  {
    id: 5,
    insight: "Focus sessions",
    description: "Average focus session duration is 52 minutes",
    change: "+12%",
    trend: "positive",
  },
]

const dateRanges = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 days", value: "week" },
  { label: "Last 30 days", value: "month" },
  { label: "This quarter", value: "quarter" },
  { label: "Custom range", value: "custom" },
]

export default function ProductivityDashboard() {
  const [dateRange, setDateRange] = useState("week")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-6 w-6" />
          <span className="hidden md:inline-block">Productivity Analytics</span>
        </div>
        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
          <a className="font-medium text-primary" href="#">
            Dashboard
          </a>
          <a className="font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
            Reports
          </a>
          <a className="font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
            Tasks
          </a>
          <a className="font-medium text-muted-foreground transition-colors hover:text-primary" href="#">
            Goals
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <img src="/placeholder-user.jpg" alt="Avatar" className="rounded-full" height="32" width="32" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Productivity Dashboard</h1>
            <p className="text-muted-foreground">Track and analyze your productivity metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[180px] justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  {dateRanges.find((range) => range.value === dateRange)?.label}
                  <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuLabel>Date Range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dateRanges.map((range) => (
                  <DropdownMenuItem
                    key={range.value}
                    onClick={() => setDateRange(range.value)}
                    className={dateRange === range.value ? "bg-muted" : ""}
                  >
                    {range.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Productivity Score</CardTitle>
              <LineChartIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+12%</span> from last week
              </p>
              <div className="mt-4 h-1 w-full bg-muted">
                <div className="h-1 w-[78%] bg-primary"></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Focus Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5h 24m</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">+45m</span> from last week
              </p>
              <div className="mt-4 h-1 w-full bg-muted">
                <div className="h-1 w-[65%] bg-primary"></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
              <ListChecks className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">67/78</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">86%</span> completion rate
              </p>
              <div className="mt-4 h-1 w-full bg-muted">
                <div className="h-1 w-[86%] bg-primary"></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Meeting Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h 15m</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-emerald-500">-30m</span> from last week
              </p>
              <div className="mt-4 h-1 w-full bg-muted">
                <div className="h-1 w-[28%] bg-primary"></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="charts" className="mb-6">
          <TabsList>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          <TabsContent value="charts" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Productivity Trends</CardTitle>
                  <CardDescription>Daily productivity and focus scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={productivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="productivity"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          name="Productivity"
                        />
                        <Line type="monotone" dataKey="focus" stroke="#82ca9d" name="Focus" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Time Allocation</CardTitle>
                  <CardDescription>How your time is distributed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        
                      <PieChart>
                        <Pie
                          data={timeAllocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                          {timeAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Task Completion</CardTitle>
                <CardDescription>Completed vs. total tasks by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={taskCompletionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="completed" fill="#8884d8" name="Completed" />
                      <Bar dataKey="total" fill="#82ca9d" name="Total" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle>Top Productivity Insights</CardTitle>
                <CardDescription>Key insights based on your productivity data</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Insight</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insightsData.map((insight) => (
                      <TableRow key={insight.id}>
                        <TableCell className="font-medium">{insight.insight}</TableCell>
                        <TableCell>{insight.description}</TableCell>
                        <TableCell
                            className={`text-right ${insight.trend === "positive" ? "text-emerald-500" : "text-red-500"}`}
                            >
                          {insight.change}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}