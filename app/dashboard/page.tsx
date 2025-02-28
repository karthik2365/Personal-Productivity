import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary text-center">Empower Your Productivity</h1>
      
      <div className="grid grid-cols-2 gap-6">
        <Section title="Time Management Tools" description="Stay organized with timers, scheduling, and reminders to enhance time efficiency." />
        <Section title="Goal Tracking" description="Set, monitor, and achieve your goals with progress indicators and milestones." />
        <Section title="Study & Learning Efficiency" description="Optimize your learning with smart techniques, flashcards, and spaced repetition." />
        <Section title="Productivity Analytics" description="Gain insights into your performance through analytics and reports." />
        <Section title="AI-powered Assistant" description="Leverage AI to automate tasks, provide suggestions, and boost efficiency." />
        <Section title="Collaboration & Accountability" description="Work with teams effectively and stay accountable for your tasks and goals." />
        <Section title="Productivity & Motivation" description="Boost motivation with challenges, rewards, and habit-building strategies." />
        <Section title="Creativity Booster" description="Unlock your creative potential with brainstorming tools and idea generators." />
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; description: string }> = ({ title, description }) => {
  return (
    <Card className="shadow-md rounded-lg transition-transform transform hover:scale-105 hover:bg-secondary bg-card text-card-foreground aspect-square flex items-center justify-center">
      <CardContent className="p-4 text-center">
        <h2 className="text-xl font-semibold mb-2 text-primary">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
