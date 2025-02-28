"use client"; // Required for using hooks in App Router

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

function Page() {
  const params = useParams(); // Get dynamic route parameters
  const timeManagementTool = params?.["time-management-tools"] ?? "default"; // Fallback if undefined

  return (
    <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center justify-center">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* PomoDone Timer Card */}
          <Link
            href={`/dashboard/time-management-tools/time-management`}
            className="transition-transform hover:scale-105"
          >
            <Card className="h-full border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">PomoDone Timer</CardTitle>
                <CardDescription>
                  PomoDone is a time-tracking tool based on the Pomodoro Technique, designed to help users stay focused and productive by breaking work into intervals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="ml-5 list-disc space-y-2 text-muted-foreground">
                  <li>25-minute focus sessions followed by 5-minute breaks.</li>
                  <li>Distraction-free</li>
                </ul>
                <div className="mt-4 flex items-center text-primary">
                  <span className="text-sm">Start Working</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Clockify Card */}
          <Link
            href={`/dashboard/time-management-tools/clockify`}
            className="transition-transform hover:scale-105"
          >
            <Card className="h-full border-border bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-xl">Clockify</CardTitle>
                <CardDescription>Clockify is a time tracking tool that helps users monitor work hours.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="ml-5 list-disc space-y-2 text-muted-foreground">
                  <li>Tracks work sessions and logs time spent on tasks.</li>
                  <li>Generates detailed reports for productivity analysis.</li>
                </ul>
                <div className="mt-4 flex items-center text-primary">
                  <span className="text-sm">Start Learning</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
