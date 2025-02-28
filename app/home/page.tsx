// import { cn } from "@/lib/utils";
// import React from "react";
// import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
// import {
//   IconArrowWaveRightUp,
//   IconBoxAlignRightFilled,
//   IconBoxAlignTopLeft,
//   IconClipboardCopy,
//   IconFileBroken,
//   IconSignature,
//   IconTableColumn,
// } from "@tabler/icons-react";

// export function BentoGridDemo() {
//   return (
//     <BentoGrid className="max-w-4xl mx-auto">
//       {items.map((item, i) => (
//         <BentoGridItem
//           key={i}
//           title={item.title}
//           description={item.description}
//           header={item.header}
//           icon={item.icon}
//           className={i === 3 || i === 6 ? "md:col-span-2" : ""}
//         />
//       ))}
//     </BentoGrid>
//   );
// }
// const Skeleton = () => (
//   <div className="flex flex-1 w-full h-full min-h-[10rem] "></div>
// );
// const items = [
//   {
//     title: "Ai-Assistant",
//     description: "Learns from interactions to provide personalized responses.",
//     header: <Skeleton />,
//     icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "Calender",
//     description: " Keep track of dates and events effortlessly.",
//     header: <Skeleton />,
//     icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "Time Management Tools",
//     description: "Focus & Balance – Manage time effectively for work and personal life.",
//     header: <Skeleton />,
//     icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "Creativity Booster",
//     description:
//       "Share ideas, gather feedback, and work with teams to refine and enhance your creative output.",
//     header: <Skeleton />,
//     icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "To-Do-List",
//     description: "Task Management Made Easy – Keep track of tasks, deadlines, and priorities in one place.",
//     header: <Skeleton />,
//     icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "Productive Analytics",
//     description: "Data-Driven Insights – Track work habits, time usage, and task completion rates.",
//     header: <Skeleton />,
//     icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "Learning Guidance",
//     description: "Embark on exciting journeys and thrilling discoveries.",  
//     header: <Skeleton />,
//     icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
//   },
// ];


"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Calculator, CreditCard, PiggyBank, Smartphone, BellRing, Languages, Bot, Trophy, Users, BrainCircuit, Factory, LineChart } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
// import Navbar from "@/components/ui/Navbar"
import { Footer } from "@/components/ui/Footer"
import Navbar from "@/components/Navbar"

interface Feature {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  className: string
}

const features: Feature[] = [
  {
    title: "Ai-Assistant",
    description: "An AI assistant enhances productivity by automating tasks, providing insights, and offering smart suggestions. It streamlines workflows, helping you work faster and more efficiently.",
    icon: Smartphone,
    href: "/auth",
    className: "md:col-span-2 bg-gradient-to-br from-green-50 to-50% dark:from-green-900/20",
  },
  {

    title: "Creativity Booster",
    description: "Embark on exciting journeys and thrilling discoveries.",      
    icon: BookOpen,
    href: "/dashboard/learn",
    className: "md:col-span-2 row-span-2 bg-gradient-to-br from-green-50 via-white to-50% dark:from-green-900/20 dark:via-green-900/10",
  },
  {
    title: "Goal Tracking",
    description: "Set clear goals, track your progress, and stay motivated with powerful goal-tracking tools. Break big ambitions into achievable milestones, visualize your journey, and celebrate every success along the way. 🚀",
    icon: LineChart,
    href: "/dashboard/expenses",
    className: "bg-green-50/50 dark:bg-green-900/20",
  },
  {
    title: "Calender",
    description: "A smart calendar that lets you mark tasks, set deadlines, and stay organized effortlessly. Manage your schedule with ease and never miss a task again!",
    icon: Calculator,
    href: "/dashboard/loan-calculator",
    className: "bg-green-50/50 dark:bg-green-900/20",
  },
  {
    title: "Creativity Booster",
    description: "Enhance your creativity with powerful brainstorming tools, idea generators, and inspiration prompts. Overcome creative blocks with structured exercises and innovative techniques. Turn your ideas into reality with guidance designed to spark imagination and originality.", 
    icon: BrainCircuit,
    href: "/dashboard/budget",
    className: "md:col-span-2 row-span-2 bg-gradient-to-br from-green-50 to-50% dark:from-green-900/20",
  },
  {
    title: "Clock",
    description: "Helps you to stay focused and manage your time effectively.",
    icon: BellRing,
    href: "/dashboard/community",
    className: "bg-green-50/50 dark:bg-green-900/20",
  },
  {
    title: "Gamification",
    description: "Earn rewards while mastering financial literacy.",
    icon: Trophy,
    href: "/dashboard/rewards",
    className: "bg-green-50/50 dark:bg-green-900/20",
  },
  {
    title: "Productivity Analytics",
    description: "Gain deep insights into your productivity with detailed analytics and reports. Track your progress, identify patterns, and optimize your workflow for peak efficiency.",
    icon: Factory,
    href: "/credit",
    className: "md:col-span-2 bg-gradient-to-br from-green-50 to-50% dark:from-green-900/20",
  },

]

export default function HomePage() {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-background">

      <section className="px-4 py-12 md:py-24 lg:py-32 text-center bg-gradient-to-b from-green-50 to-white dark:from-background dark:to-background">
        <div className="container mx-auto space-y-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/20 transition-all duration-300"
            >
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="px-4 py-12 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center mb-12 text-foreground"
          >
            Your Productivity Toolkit
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className={cn("relative group", feature.className)}
              >
                <Link href={feature.href}>
                  <Card className={cn(
                    "h-full flex flex-col justify-between transition-all duration-300 ease-in-out",
                    "border-2 hover:border-green-600 dark:hover:border-green-400",
                    "bg-green-50 hover:bg-green-100 dark:bg-background dark:hover:bg-background",
                    "hover:shadow-xl dark:hover:shadow-green-900/20",
                    "hover:scale-[1.03] active:scale-[0.97]",
                    "before:absolute before:inset-0 before:rounded-lg before:bg-green-100/50 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 dark:before:bg-green-900/30"
                  )}>
                    <CardHeader className="flex flex-col items-start space-y-3 relative z-10">
                      <div className="p-3 rounded-lg bg-green-200 dark:bg-green-900/50 transition-colors duration-300">
                        <feature.icon className="h-6 w-6 text-green-700 dark:text-green-400" />
                      </div>
                      <CardTitle className="text-xl text-green-800 dark:text-foreground">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-green-700 dark:text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
