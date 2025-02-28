"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, CheckCircle } from "lucide-react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export default function InsaneToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");

  // Ensure tasks are set only after hydration to prevent SSR mismatches
  useEffect(() => {
    setTasks([]);
  }, []);

  const handleAddTask = () => {
    if (!inputValue.trim()) return;
    setTasks(prevTasks => [...prevTasks, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue("");
  };

  const handleToggleComplete = (id: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-2xl shadow-2xl w-[400px] flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-blue-400">To-Do List</h1>

        <div className="flex gap-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task"
            className="flex-1 bg-gray-700 text-white placeholder-gray-400 border-gray-600 rounded-lg p-2"
          />
          <Button onClick={handleAddTask} className="bg-green-500 hover:bg-green-600">
            Add
          </Button>
        </div>

        <ul className="space-y-2">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-3 border rounded-lg bg-gray-700 border-gray-600 transition-all ${task.completed ? 'opacity-50 line-through' : ''}`}
            >
              <span>{task.text}</span>
              <div className="flex gap-2">
                {/* Toggle Complete */}
                <div
                  onClick={() => handleToggleComplete(task.id)}
                  className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg cursor-pointer"
                >
                  <CheckCircle size={20} />
                </div>

                {/* Delete Task */}
                <div
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer"
                >
                  <Trash2 size={20} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
