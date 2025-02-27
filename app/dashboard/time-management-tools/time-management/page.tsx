"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

const MAX_HOURS = 24;
const MAX_MINUTES = 59;
const MAX_SECONDS = 59;

export default function CyberTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(hours * 3600 + minutes * 60 + seconds); // Total time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            audioRef.current?.play();
            return 0;
          }
          return prev - 1; // Decrement time every second
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    // Update hours, minutes, and seconds whenever `time` changes
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    setHours(hrs);
    setMinutes(mins);
    setSeconds(secs);
  }, [time]);

  const formatTime = (h: number, m: number, s: number) => {
    const hrs = h.toString().padStart(2, "0");
    const mins = m.toString().padStart(2, "0");
    const secs = s.toString().padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: string,
    max: number
  ) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) {
      setter(0);
    } else {
      setter(Math.min(max, Math.max(0, num)));
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(25);
    setSeconds(0);
    setTime(25 * 60); // Reset to 25 minutes
  };

  // Snowflakes animation
  const snowflakesRef = useRef(
    Array.from({ length: 100 }).map(() => ({
      left: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Audio for alarm */}
      <audio ref={audioRef} src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" />

      {/* Timer Display */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative w-96 h-96 rounded-lg border-2 border-black/20 flex flex-col items-center justify-center bg-black text-white"
      >
        <div className="flex gap-2 text-4xl font-bold font-mono">
          <input
            type="number"
            className="w-20 text-center bg-transparent border-b border-white outline-none"
            value={hours}
            onChange={(e) => handleInputChange(setHours, e.target.value, MAX_HOURS)}
          />
          :
          <input
            type="number"
            className="w-20 text-center bg-transparent border-b border-white outline-none"
            value={minutes}
            onChange={(e) => handleInputChange(setMinutes, e.target.value, MAX_MINUTES)}
          />
          :
          <input
            type="number"
            className="w-20 text-center bg-transparent border-b border-white outline-none"
            value={seconds}
            onChange={(e) => handleInputChange(setSeconds, e.target.value, MAX_SECONDS)}
          />
        </div>
        <div className="mt-6 flex gap-4 items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-white text-black"
            onClick={() => {
              setIsRunning(!isRunning);
              setTime(hours * 3600 + minutes * 60 + seconds); // Sync time with inputs
            }}
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full border border-white text-white"
            onClick={resetTimer}
          >
            <RotateCcw size={24} />
          </motion.button>
        </div>
      </motion.div>

      {/* Falling Black Dots (Snowflakes) */}
      <div className="absolute inset-0 pointer-events-none">
        {snowflakesRef.current.map((flake, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-black rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: "100vh" }}
            transition={{
              duration: flake.duration,
              repeat: Infinity,
              delay: flake.delay,
            }}
            style={{ left: `${flake.left}vw` }}
          />
        ))}
      </div>
    </div>
  );
}