"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";

const roadmaps = [
  { language: "JavaScript", steps: ["Basics (Syntax, Variables, Loops, Functions)", "DOM Manipulation", "ES6+ Features", "Asynchronous JS (Promises, Async/Await)", "APIs & Fetch", "Frameworks (React, Vue, Angular)", "Backend (Node.js, Express.js)"] },
  { language: "Python", steps: ["Syntax & Data Types", "Control Flow (Loops, Conditions)", "Functions & Modules", "OOP & File Handling", "Libraries (NumPy, Pandas, Matplotlib)", "Web Development (Flask, Django)", "Data Science & AI (TensorFlow, Scikit-learn)"] },
  { language: "Java", steps: ["Basic Syntax & Data Types", "OOP Principles", "Exception Handling", "Collections & Streams", "Multithreading", "Spring Boot", "Microservices & Cloud"] },
  { language: "C++", steps: ["Syntax & Data Types", "Control Flow & Functions", "Pointers & Memory Management", "OOP & STL", "Data Structures & Algorithms", "Competitive Programming", "Game Development (Unreal Engine)"] },
  { language: "C#", steps: ["Syntax & Data Types", "OOP & LINQ", "Exception Handling", ".NET Framework", "Entity Framework", "Game Development (Unity)", "ASP.NET & Web Apps"] },
  { language: "Swift", steps: ["Syntax & Basics", "Xcode & Interface Builder", "SwiftUI & UIKit", "Networking & API Integration", "Core Data & Persistence", "Building & Publishing Apps"] },
  { language: "Go", steps: ["Syntax & Basics", "Concurrency & Goroutines", "Building APIs & Microservices", "Error Handling", "Testing & Debugging", "Deploying Go Applications"] },
  { language: "PHP", steps: ["Syntax & Basics", "Working with Databases", "OOP in PHP", "Frameworks (Laravel, Symfony)", "Building REST APIs", "Security Best Practices"] },
  { language: "Kotlin", steps: ["Syntax & Basics", "OOP & Functional Programming", "Android Development", "Jetpack Compose & UI Design", "Networking & APIs", "Publishing Android Apps"] },
  { language: "TypeScript", steps: ["Learn JavaScript Basics", "TypeScript Fundamentals", "Interfaces & Generics", "Using TypeScript with React/Angular", "Advanced Type Features", "Building Scalable Applications"] },
];

const CodingRoadmaps = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center bg-black p-6">
      <h1 className="text-4xl font-extrabold text-green-600">
        🚀 Programming Language Roadmaps
      </h1>
      <div className="w-full max-w-3xl mt-6 space-y-4">
        {roadmaps.map((roadmap, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-2xl p-4 shadow-lg hover:bg-gray-800 transition-all border border-green-600"
          >
            <div
              onClick={() => setSelectedLanguage(selectedLanguage === roadmap.language ? null : roadmap.language)}
              className="flex justify-between items-center cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-green-600">{roadmap.language}</h2>
              {selectedLanguage === roadmap.language ? (
                <ChevronDown size={24} className="text-green-600" />
              ) : (
                <ChevronRight size={24} className="text-green-600" />
              )}
            </div>

            <AnimatePresence>
              {selectedLanguage === roadmap.language && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 space-y-2 pl-4 border-l-2 border-green-600"
                >
                  {roadmap.steps.map((step, stepIndex) => (
                    <motion.li
                      key={stepIndex}
                      className="text-green-500 text-sm hover:text-green-400 transition-all"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: stepIndex * 0.1 }}
                    >
                      • {step}
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodingRoadmaps;
