"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarWithSavedList() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [entries, setEntries] = useState<{ [key: string]: string[] }>({});
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (selectedDate === null) {
      setSelectedDate(new Date());
    }
  }, [selectedDate]); // Ensures the update only happens when selectedDate is null

  const handleSave = () => {
    if (!inputValue || !selectedDate) return;
    const dateKey = selectedDate.toDateString();

    setEntries((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), inputValue],
    }));
    setInputValue("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center p-6 bg-gray-900 text-white rounded-2xl shadow-lg w-[400px]">
        <h1 className="text-xl font-bold text-gray-200 mb-4">Calendar with Entries</h1>

        {/* Calendar Component (Render Only When selectedDate is Not Null) */}
        {selectedDate && (
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => setSelectedDate(date)}
            className="mb-4 border border-gray-700 rounded-lg p-2 w-full bg-gray-800 text-gray-300"
          />
        )}

        {/* Input for Adding Entries */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter event"
          className="mb-2 p-2 border border-gray-600 rounded w-full bg-gray-800 text-white placeholder-gray-400"
        />

        {/* Save Button */}
        <Button onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 w-full text-white">
          Save Entry
        </Button>

        {/* Entries List */}
        <div className="mt-4 w-full text-left">
          <h3 className="text-lg font-semibold text-gray-300">
            Entries for {selectedDate ? selectedDate.toDateString() : "Select a date"}:
          </h3>
          <ul className="list-disc pl-5 mt-2 text-gray-400">
            {(entries[selectedDate?.toDateString() || ""] || []).map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
