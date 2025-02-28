"use client"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Play, Pause, RotateCcw, Timer, Volume2, VolumeX } from "lucide-react"

const MAX_HOURS = 24
const MAX_MINUTES = 59
const MAX_SECONDS = 59

export default function PomoDoneTimer() {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [time, setTime] = useState(hours * 3600 + minutes * 60 + seconds) // Total time in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const audioRef = useRef<HTMLAudioElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!)
            setIsRunning(false)
            if (soundEnabled) audioRef.current?.play()
            return 0
          }
          return prev - 1 // Decrement time every second
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRunning, soundEnabled])

  useEffect(() => {
    // Update hours, minutes, and seconds whenever `time` changes
    const hrs = Math.floor(time / 3600)
    const mins = Math.floor((time % 3600) / 60)
    const secs = time % 60
    setHours(hrs)
    setMinutes(mins)
    setSeconds(secs)
  }, [time])

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: string, max: number) => {
    const num = Number.parseInt(value, 10)
    if (isNaN(num)) {
      setter(0)
    } else {
      setter(Math.min(max, Math.max(0, num)))
    }
  }

  const resetTimer = () => {
    setIsRunning(false)
    setHours(0)
    setMinutes(25)
    setSeconds(0)
    setTime(25 * 60) // Reset to 25 minutes
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  // Particles animation
  const particlesRef = useRef(
    Array.from({ length: 50 }).map(() => ({
      left: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    })),
  )

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
          <Timer className="mr-2 h-8 w-8 text-primary" />
          PomoDone Timer
        </h1>

        {/* Audio for alarm */}
        <audio ref={audioRef} src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" />

        {/* Timer Display */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative w-full max-w-md mx-auto rounded-lg border border-gray-200 dark:border-gray-800 shadow-md flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-8"
        >
          <div className="flex gap-4 text-4xl font-bold font-mono mb-8">
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">Hours</label>
              <input
                type="number"
                className="w-16 text-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md outline-none py-2"
                value={hours}
                onChange={(e) => handleInputChange(setHours, e.target.value, MAX_HOURS)}
                disabled={isRunning}
              />
            </div>
            <span className="self-end mb-2">:</span>
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">Minutes</label>
              <input
                type="number"
                className="w-16 text-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md outline-none py-2"
                value={minutes}
                onChange={(e) => handleInputChange(setMinutes, e.target.value, MAX_MINUTES)}
                disabled={isRunning}
              />
            </div>
            <span className="self-end mb-2">:</span>
            <div className="flex flex-col items-center">
              <label className="text-xs text-gray-500 dark:text-gray-400 mb-1">Seconds</label>
              <input
                type="number"
                className="w-16 text-center bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md outline-none py-2"
                value={seconds}
                onChange={(e) => handleInputChange(setSeconds, e.target.value, MAX_SECONDS)}
                disabled={isRunning}
              />
            </div>
          </div>

          <div className="flex gap-4 items-center mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full bg-primary text-white dark:bg-primary dark:text-white shadow-md"
              onClick={() => {
                setIsRunning(!isRunning)
                if (!isRunning) setTime(hours * 3600 + minutes * 60 + seconds) // Sync time with inputs
              }}
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 shadow-md"
              onClick={resetTimer}
            >
              <RotateCcw size={24} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 shadow-md"
              onClick={toggleSound}
            >
              {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </motion.button>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
            {isRunning ? "Timer is running" : "Timer is paused"}
            <br />
            {soundEnabled ? "Sound is enabled" : "Sound is disabled"}
          </div>
        </motion.div>

        {/* Tips Section */}
        <div className="mt-12 w-full max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-4">Pomodoro Technique Tips</h3>
          <ul className="space-y-2 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
            <li className="flex items-start py-2">
              <span className="bg-primary text-white dark:bg-primary dark:text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 shrink-0">
                1
              </span>
              <span>Work for 25 minutes (one "Pomodoro"), then take a 5-minute break</span>
            </li>
            <li className="flex items-start py-2">
              <span className="bg-primary text-white dark:bg-primary dark:text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 shrink-0">
                2
              </span>
              <span>After 4 Pomodoros, take a longer break (15-30 minutes)</span>
            </li>
            <li className="flex items-start py-2">
              <span className="bg-primary text-white dark:bg-primary dark:text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 shrink-0">
                3
              </span>
              <span>Use the technique to break down complex tasks into manageable intervals</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Particles Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {particlesRef.current.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/10 dark:bg-primary/20"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 0.3, y: "100vh" }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: particle.delay,
            }}
            style={{
              left: `${particle.left}vw`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

