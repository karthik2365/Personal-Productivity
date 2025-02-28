"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TreesIcon as Tree, Clock, Leaf, Award } from "lucide-react";

export default function Forest() {
  const [timeRemaining, setTimeRemaining] = useState<number>(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState<boolean>(false);
  const [trees, setTrees] = useState<number>(0);
  const [coins, setCoins] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsActive(false);
      setTrees((prevTrees) => prevTrees + 1);
      setCoins((prevCoins) => prevCoins + 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeRemaining]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeRemaining(25 * 60);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const treeGrowthPercentage: number =
    ((25 * 60 - timeRemaining) / (25 * 60)) * 100;

  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white flex flex-col items-center justify-center p-4">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center flex items-center justify-center">
          <Tree className="mr-2 h-8 w-8 text-green-600" />
          Forest
        </h1>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="text-center mb-6">
            <div className="text-5xl font-mono font-bold mb-4">
              {formatTime(timeRemaining)}
            </div>
            <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${treeGrowthPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full flex items-center ${
                isActive
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
              onClick={toggleTimer}
            >
              {isActive ? "Stop" : "Plant Tree"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-full flex items-center bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
              onClick={resetTimer}
            >
              Reset
            </motion.button>
          </div>

          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <Tree className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold">{trees}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Trees Planted
              </div>
            </div>
            <div className="text-center">
              <Leaf className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
              <div className="text-2xl font-bold">{coins}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Coins Earned
              </div>
            </div>
          </div>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="mr-2 h-5 w-5 text-primary" />
            Forest Benefits
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Clock className="mr-2 h-5 w-5 text-green-500" />
              <span>Improve focus and productivity</span>
            </li>
            <li className="flex items-center">
              <Tree className="mr-2 h-5 w-5 text-green-500" />
              <span>Plant real trees around the world</span>
            </li>
            <li className="flex items-center">
              <Leaf className="mr-2 h-5 w-5 text-green-500" />
              <span>Earn coins for virtual items and real-world impact</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}