import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarWithSavedList() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [entries, setEntries] = useState({});
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    if (!inputValue) return;
    const dateKey = selectedDate.toDateString();
    setEntries((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), inputValue],
    }));
    setInputValue("");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-2xl shadow-lg w-96">
      <h1 className="text-xl font-bold text-gray-800 mb-4">Calendar with Saved List</h1>
      <Calendar
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="mb-4"
      />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter event"
        className="mb-2 p-2 border rounded w-full"
      />
      <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Save</Button>
      <div className="mt-4 w-full text-left">
        <h3 className="text-lg font-semibold">Entries for {selectedDate.toDateString()}:</h3>
        <ul className="list-disc pl-5">
          {(entries[selectedDate.toDateString()] || []).map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
