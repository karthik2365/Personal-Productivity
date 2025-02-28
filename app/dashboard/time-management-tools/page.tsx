"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowRight, Clock, Timer, BarChart2, TreesIcon as Tree, Zap } from 'lucide-react';

function Page() {
  const params = useParams();
  const timeManagementTool = params?.["time-management-tools"] ?? "default";

  return (
    <div className="bg-white text-black dark:bg-black dark:text-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2 text-center">Time Management Tools</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8 max-w-2xl mx-auto">
          Boost your productivity with these powerful time management applications
        </p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          <Link
            href={`/dashboard/time-management-tools/time-management`}
            className="transition-transform hover:scale-105 block h-full"
          >
            <Card className="h-full border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center mb-2">
                  <Timer className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle className="text-xl font-bold">PomoDone Timer</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  A time-tracking tool based on the Pomodoro Technique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="ml-5 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>25-minute focus sessions followed by 5-minute breaks</li>
                  <li>Distraction-free environment</li>
                  <li>Customizable work intervals</li>
                </ul>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex items-center text-primary dark:text-primary font-medium">
                  <span>Start Working</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link
            href={`/dashboard/time-management-tools/clockify`}
            className="transition-transform hover:scale-105 block h-full"
          >
            <Card className="h-full border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center mb-2">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle className="text-xl font-bold">Clockify</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  A time tracking tool that helps users monitor work hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="ml-5 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Tracks work sessions and logs time spent on tasks</li>
                  <li>Generates detailed reports for productivity analysis</li>
                  <li>Integrates with popular project management tools</li>
                </ul>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex items-center text-primary dark:text-primary font-medium">
                  <span>Start Tracking</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link
            href={`/dashboard/time-management-tools/toggl`}
            className="transition-transform hover:scale-105 block h-full"
          >
            <Card className="h-full border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center mb-2">
                  <BarChart2 className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle className="text-xl font-bold">Toggl Track</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Simple time tracking with powerful reporting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="ml-5 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>One-click time tracking with desktop and mobile apps</li>
                  <li>Detailed insights into how you spend your time</li>
                  <li>Team time tracking and project management</li>
                </ul>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex items-center text-primary dark:text-primary font-medium">
                  <span>Explore Toggl</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link
            href={`/dashboard/time-management-tools/forest`}
            className="transition-transform hover:scale-105 block h-full"
          >
            <Card className="h-full border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center mb-2">
                  <Tree className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle className="text-xl font-bold">Forest</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Stay focused and plant real trees
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="ml-5 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Plant virtual trees that grow while you focus</li>
                  <li>If you leave the app, your tree dies</li>
                  <li>Earn coins to plant real trees around the world</li>
                </ul>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex items-center text-primary dark:text-primary font-medium">
                  <span>Plant Trees</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </Link>

          <Link
            href={`/dashboard/time-management-tools/rescuetime`}
            className="transition-transform hover:scale-105 block h-full"
          >
            <Card className="h-full border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center mb-2">
                  <Zap className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle className="text-xl font-bold">RescueTime</CardTitle>
                </div>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Automatic time tracking and distraction blocking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="ml-5 list-disc space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Automatically tracks time spent on applications and websites</li>
                  <li>Blocks distracting websites during focus sessions</li>
                  <li>Provides detailed productivity reports and insights</li>
                </ul>
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex items-center text-primary dark:text-primary font-medium">
                  <span>Analyze Time</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
