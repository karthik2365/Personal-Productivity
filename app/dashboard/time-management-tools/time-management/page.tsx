"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, Plus } from "lucide-react";

const MAX_HOURS = 24;
const MAX_MINUTES = 59;
const MAX_SECONDS = 59;

export default function CyberTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(hours * 3600 + minutes * 60 + seconds);
  const [isRunning, setIsRunning] = useState(false);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);
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
          return prev - 1;
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
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time % 3600) / 60);
    const secs = time % 60;
    setHours(hrs);
    setMinutes(mins);
    setSeconds(secs);
  }, [time]);

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: string,
    max: number
  ) => {
    const num = parseInt(value, 10);
    setter(isNaN(num) ? 0 : Math.min(max, Math.max(0, num)));
  };

  const resetTimer = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(25);
    setSeconds(0);
    setTime(25 * 60);
  };

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task.trim()]);
      setTask("");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <audio ref={audioRef} src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" />

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
              setTime(hours * 3600 + minutes * 60 + seconds);
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

      <div className="mt-6 w-96">
        <div className="flex gap-2">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            placeholder="Enter your task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-black text-white rounded-lg"
            onClick={addTask}
          >
            <Plus size={24} />
          </motion.button>
        </div>
        <ul className="mt-4 space-y-2">
          {tasks.map((t, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded-lg">{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}