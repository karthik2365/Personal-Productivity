"use client";
import React, { useState, useEffect } from "react";

export default function TimeManagementTools() {
  const [time, setTime] = useState<number>(25 * 60); // Default 25-minute timer
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [inputMinutes, setInputMinutes] = useState<number>(25);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isRunning && time > 0) {
      timer = setInterval(() => setTime((prevTime) => prevTime - 1), 1000);
    } else {
      if (timer) clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, time]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStart = () => {
    setTime(inputMinutes * 60);
    setIsRunning(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary text-primary">
      <h1 className="text-3xl font-bold mb-6">Time Management Tools</h1>
      <div className="border border-primary p-6 rounded-lg text-center">
        <h2 className="text-2xl mb-4">Pomodoro Timer</h2>
        <input
          type="number"
          className="mb-4 p-2 text-primary rounded-md w-20 text-center"
          value={inputMinutes}
          onChange={(e) => setInputMinutes(Number(e.target.value))}
          min="1"
        />
        <div className="text-4xl font-bold mb-4">{formatTime(time)}</div>
        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-primary text-secondary rounded-md"
            onClick={handleStart}
          >
            Start
          </button>
          <button
            className="px-4 py-2 bg-primary text-secondary rounded-md"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? "Pause" : "Resume"}
          </button>
          <button
            className="px-4 py-2 bg-primary text-secondary rounded-md"
            onClick={() => {
              setIsRunning(false);
              setTime(inputMinutes * 60);
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}