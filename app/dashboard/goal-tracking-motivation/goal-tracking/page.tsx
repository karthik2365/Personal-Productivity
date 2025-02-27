"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, CheckCircle } from "lucide-react";

export default function InsaneToDoList() {
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTask = () => {
    if (!inputValue.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: inputValue, completed: false }]);
    setInputValue("");
  };

  const handleToggleComplete = (id: number) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
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
                <Button onClick={() => handleToggleComplete(task.id)} className="bg-blue-500 hover:bg-blue-600 p-1">
                  <CheckCircle size={20} />
                </Button>
                <Button onClick={() => handleDeleteTask(task.id)} className="bg-red-500 hover:bg-red-600 p-1">
                  <Trash2 size={20} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
