import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function ClockifyTracker() {
  const [timeTracked, setTimeTracked] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [sessions, setSessions] = useState([]);

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
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-2xl shadow-lg w-96">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Clockify Time Tracker</h1>
      <motion.div 
        animate={{ scale: isTracking ? 1.1 : 1 }}
        transition={{ duration: 0.5 }}
        className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-4"
      >
        {isTracking ? "⏳" : "✅"}
      </motion.div>
      <h2 className="text-2xl font-mono mb-2">Time Tracked: {Math.floor(timeTracked / 60)}:{(timeTracked % 60).toString().padStart(2, '0')}</h2>
      <Progress value={(timeTracked / 3600) * 100} className="w-full mb-4" />
      <div className="flex space-x-4">
        <Button onClick={startTracking} disabled={isTracking} className="bg-blue-600 hover:bg-blue-700">Start</Button>
        <Button onClick={stopTracking} className="bg-red-500 hover:bg-red-600">Stop</Button>
      </div>
      <div className="mt-4 w-full text-left">
        <h3 className="text-lg font-semibold">Previous Sessions:</h3>
        <ul className="list-disc pl-5">
          {sessions.map((session, index) => (
            <li key={index}>Session {index + 1}: {Math.floor(session / 60)}:{(session % 60).toString().padStart(2, '0')}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
