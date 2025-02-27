"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function ClockifyTracker() {
  const [timeTracked, setTimeTracked] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [sessions, setSessions] = useState([]); // ✅ Removed `<number[]>`

  useEffect(() => {
    let tracker;
    if (isTracking) {
      tracker = setInterval(() => {
        setTimeTracked((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(tracker);
  }, [isTracking]);

  const startTracking = () => {
    setIsTracking(true);
  };

  const stopTracking = () => {
    setIsTracking(false);
    setSessions([...sessions, timeTracked]);
    setTimeTracked(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-black text-white relative overflow-hidden">
      {/* Tracker Display */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative w-96 h-96 rounded-lg border-2 border-white/20 flex flex-col items-center justify-center bg-black"
      >
        <h1 className="text-xl font-bold mb-4">Clockify Time Tracker</h1>
        
        {/* Tracking Status */}
        <motion.div
          animate={{ scale: isTracking ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
          className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-3xl mb-4"
        >
          {isTracking ? "⏳" : "✅"}
        </motion.div>

        {/* Timer Display */}
        <h2 className="text-3xl font-mono">
          {Math.floor(timeTracked / 60)}:{(timeTracked % 60).toString().padStart(2, "0")}
        </h2>

        {/* Progress Bar */}
        <Progress value={(timeTracked / 3600) * 100} className="w-3/4 mt-4" />

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-white text-black"
            onClick={startTracking}
            disabled={isTracking}
          >
            Start
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full border border-white text-white"
            onClick={stopTracking}
          >
            Stop
          </motion.button>
        </div>
      </motion.div>

      {/* Session History */}
      <div className="mt-6 w-3/4 text-left">
        <h3 className="text-lg font-semibold">Previous Sessions:</h3>
        <ul className="list-disc pl-5">
          {sessions.map((session, index) => (
            <li key={index}>
              Session {index + 1}: {Math.floor(session / 60)}:{(session % 60).toString().padStart(2, "0")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
