// "use client";


import React from 'react'
import { motion } from "framer-motion"

import Navbar from "@/components/Navbar";
import ForumHeader from "@/components/forum-header"
import PostForm from "@/components/post-form"
import PostList from "@/components/post-list"
import { redirect } from "next/navigation"

import { BentoGrid } from '@/components/ui/bento-grid';
// import { BentoGridDemo } from './home/page';
import { Cover } from '@/components/ui/cover';
import ProductivityDashboard from './dashboard/productivity-analytics/page';
import { GoalDashboard } from '@/components/goal-dashboard';
import HomePage from './home/page';
import { Workspace } from "@/components/workspace"
// import { GlowingEffectDemo } from './home/page';
function page() {

  return (

    <div>
      
      <Navbar/>
      <div>

      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
      Streamline your productivity <br /> with <Cover>Ease</Cover>
      </h1>
      <HomePage/>
    </div>
      {/* <BentoGridDemo/> */}
    </div>
    // <Workspace />

  )
}

export default page