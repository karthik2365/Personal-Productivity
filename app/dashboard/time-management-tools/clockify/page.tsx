"use client"
import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Clock, Play, Square, BarChart } from "lucide-react"

export default function ClockifyTracker() {
  const [timeTracked, setTimeTracked] = useState<number>(0)
  const [isTracking, setIsTracking] = useState<boolean>(false)
  const [sessions, setSessions] = useState<number[]>([])

  useEffect(() => {
    let tracker: NodeJS.Timeout | undefined
    if (isTracking) {
      tracker = setInterval(() => {
        setTimeTracked((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (tracker) clearInterval(tracker)
    }
  }, [isTracking])

  const startTracking = () => {
    setIsTracking(true)
  }

  const stopTracking = () => {
    setIsTracking(false)
    setSessions((prev) => [...prev, timeTracked])
    setTimeTracked(0)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white text-black dark:bg-black dark:text-white relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
          <Clock className="mr-2 h-8 w-8 text-primary" />
          Clockify Time Tracker
        </h1>

        {/* Tracker Display */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative w-full max-w-md mx-auto rounded-lg border border-gray-200 dark:border-gray-800 shadow-md flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-8"
        >
          {/* Tracking Status */}
          <motion.div
            animate={{ scale: isTracking ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-3xl mb-6 shadow-inner"
          >
            {isTracking ? (
              <Clock className="h-10 w-10 text-primary animate-pulse" />
            ) : (
              <BarChart className="h-10 w-10 text-gray-500 dark:text-gray-400" />
            )}
          </motion.div>

          {/* Timer Display */}
          <h2 className="text-4xl font-mono font-bold mb-4">
            {Math.floor(timeTracked / 60)}:{(timeTracked % 60).toString().padStart(2, "0")}
          </h2>

          {/* Progress Bar */}
          <Progress value={(timeTracked / 3600) * 100} className="w-full h-2 mb-8" />

          {/* Buttons */}
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full flex items-center ${
                isTracking
                  ? "bg-gray-200 text-gray-500 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed"
                  : "bg-primary text-white dark:bg-primary dark:text-white"
              }`}
              onClick={startTracking}
              disabled={isTracking}
            >
              <Play className="mr-2 h-4 w-4" />
              Start
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full flex items-center ${
                !isTracking
                  ? "border border-gray-300 text-gray-500 dark:border-gray-700 dark:text-gray-400"
                  : "border border-red-500 text-red-500 dark:border-red-500 dark:text-red-400"
              }`}
              onClick={stopTracking}
              disabled={!isTracking}
            >
              <Square className="mr-2 h-4 w-4" />
              Stop
            </motion.button>
          </div>
        </motion.div>

        {/* Session History */}
        <div className="mt-12 w-full max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart className="mr-2 h-5 w-5 text-primary" />
            Previous Sessions
          </h3>

          {sessions.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4 border border-dashed border-gray-200 dark:border-gray-800 rounded-lg">
              No sessions recorded yet. Start tracking to see your history.
            </p>
          ) : (
            <ul className="space-y-2 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
              {sessions.map((session, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800 last:border-0"
                >
                  <span className="font-medium">Session {index + 1}</span>
                  <span className="font-mono bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-md">
                    {Math.floor(session / 60)}:{(session % 60).toString().padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}