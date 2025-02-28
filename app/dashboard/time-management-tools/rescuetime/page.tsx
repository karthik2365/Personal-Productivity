"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart2, Clock, Zap, Shield, AlertTriangle } from "lucide-react";

interface Activity {
  name: string;
  time: number;
}

export default function RescueTime() {
  const [productivityPulse, setProductivityPulse] = useState<number>(0);
  const [timeTracked, setTimeTracked] = useState<number>(0);
  const [topActivities, setTopActivities] = useState<Activity[]>([]);
  const [distractions, setDistractions] = useState<Activity[]>([]);

  useEffect(() => {
    // Simulating data fetching and updates
    const interval = setInterval(() => {
      setProductivityPulse(Math.floor(Math.random() * 100));
      setTimeTracked((prev) => prev + 60); // Add 1 minute every second for demo purposes
      setTopActivities([
        { name: "Coding", time: Math.floor(Math.random() * 120) },
        { name: "Meetings", time: Math.floor(Math.random() * 60) },
        { name: "Email", time: Math.floor(Math.random() * 30) },
      ]);
      setDistractions([
        { name: "Social Media", time: Math.floor(Math.random() * 15) },
        { name: "News Sites", time: Math.floor(Math.random() * 10) },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col items-center justify-center p-4">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
          <Zap className="mr-2 h-8 w-8 text-primary" />
          RescueTime
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-primary" />
              Productivity Pulse
            </h2>
            <div className="text-5xl font-bold text-center mb-4">
              {productivityPulse}
            </div>
            <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-primary transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${productivityPulse}%` }}
              ></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-primary" />
              Time Tracked Today
            </h2>
            <div className="text-5xl font-bold text-center mb-4">
              {formatTime(timeTracked)}
            </div>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Zap className="mr-2 h-5 w-5 text-primary" />
              Top Productive Activities
            </h2>
            <ul className="space-y-2">
              {topActivities.map((activity, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{activity.name}</span>
                  <span className="font-mono">{formatTime(activity.time)}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              Top Distractions
            </h2>
            <ul className="space-y-2">
              {distractions.map((distraction, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{distraction.name}</span>
                  <span className="font-mono">{formatTime(distraction.time)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            RescueTime Features
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Zap className="mr-2 h-5 w-5 text-yellow-500" />
              <span>Automatic time tracking of applications and websites</span>
            </li>
            <li className="flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-green-500" />
              <span>Detailed productivity reports and insights</span>
            </li>
            <li className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              <span>Distraction blocking during focus sessions</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}