"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

const MAX_MINUTES = 60;

export default function CyberTimer() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(25);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const progress = ((minutes * 60 - time) / (minutes * 60)) * circumference;

  const calculateMinutes = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return 25;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(clientY - centerY, clientX - centerX) + Math.PI / 2;
    let percent = (angle + Math.PI) / (Math.PI * 2);
    percent = percent < 0 ? 0 : percent > 1 ? 1 : percent;
    return Math.round(percent * MAX_MINUTES) || MAX_MINUTES;
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    const newMinutes = calculateMinutes(e.clientX, e.clientY);
    setMinutes(newMinutes);
    setTime(newMinutes * 60);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const newMinutes = calculateMinutes(touch.clientX, touch.clientY);
    setMinutes(newMinutes);
    setTime(newMinutes * 60);
  };

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
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("mouseup", () => setIsDragging(false));
    document.addEventListener("touchend", () => setIsDragging(false));

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <audio ref={audioRef} src="https://actions.google.com/sounds/v1/alarms/beep_short.ogg" />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative w-96 h-96 rounded-full border-2 border-black/20 flex items-center justify-center"
        ref={containerRef}
      >
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle cx="50%" cy="50%" r={radius} className="stroke-black/20" fill="transparent" strokeWidth="4" />
          <circle
            cx="50%" cy="50%" r={radius}
            className="stroke-black"
            fill="transparent"
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            strokeLinecap="round"
          />
        </svg>

        <div
          className="absolute w-full h-full cursor-pointer"
          onMouseDown={() => setIsDragging(true)}
          onTouchStart={() => setIsDragging(true)}
        />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="text-6xl font-bold font-mono text-black">{formatTime(time)}</div>
          <div className="flex gap-4 items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full bg-black text-white"
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full border border-black"
              onClick={() => {
                setIsRunning(false);
                setTime(minutes * 60);
              }}
            >
              <RotateCcw size={24} />
            </motion.button>
          </div>
        </div>
      </motion.div>
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-black rounded-full"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: "100vh" }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 5 }}
            style={{ left: `${Math.random() * 100}vw` }}
          />
        ))}
      </div>
    </div>
  );
}