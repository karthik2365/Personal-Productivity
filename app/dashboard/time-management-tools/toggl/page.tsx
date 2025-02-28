"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Clock, BarChart2, Tag, Folder } from "lucide-react";

interface Entry {
  projectName: string;
  taskName: string;
  duration: number;
}

export default function TogglTrack() {
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [projectName, setProjectName] = useState<string>("");
  const [taskName, setTaskName] = useState<string>("");
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleStartStop = () => {
    if (isTracking) {
      setEntries([...entries, { projectName, taskName, duration: elapsedTime }]);
      setElapsedTime(0);
      setProjectName("");
      setTaskName("");
    }
    setIsTracking(!isTracking);
  };

  const handleReset = () => {
    setElapsedTime(0);
    setIsTracking(false);
    setProjectName("");
    setTaskName("");
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col items-center justify-center p-4">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
          <Clock className="mr-2 h-8 w-8 text-primary" />
          Toggl Track
        </h1>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="text-4xl font-mono font-bold text-center mb-4">{formatTime(elapsedTime)}</div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="project">
              <Folder className="inline mr-1 h-4 w-4" /> Project
            </label>
            <input
              type="text"
              id="project"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Enter project name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="task">
              <Tag className="inline mr-1 h-4 w-4" /> Task
            </label>
            <input
              type="text"
              id="task"
              className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="What are you working on?"
            />
          </div>

          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full flex items-center ${
                isTracking ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
              } text-white`}
              onClick={handleStartStop}
            >
              {isTracking ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
              {isTracking ? "Stop" : "Start"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full flex items-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={handleReset}
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </motion.button>
          </div>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart2 className="mr-2 h-5 w-5 text-primary" />
            Recent Entries
          </h2>
          {entries.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center">No entries yet. Start tracking to see your history.</p>
          ) : (
            <ul className="space-y-2">
              {entries.map((entry, index) => (
                <li key={index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md flex justify-between items-center">
                  <div>
                    <span className="font-medium">{entry.projectName}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">- {entry.taskName}</span>
                  </div>
                  <span className="font-mono">{formatTime(entry.duration)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}