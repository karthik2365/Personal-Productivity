"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

// Function to format AI response for better readability
const formatResponse = (text: string): string => {
  try {
    // Attempt to parse JSON and format it
    const json = JSON.parse(text);
    return `<pre>${JSON.stringify(json, null, 2)}</pre>`; // Pretty-print JSON
  } catch (error) {
    // Handle other formats: Markdown, lists, bold text, etc.
    return text
      .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold (**bold** → <b>bold</b>)
      .replace(/- (.+)/g, "• $1") // Lists (- item → • item)
      .replace(/```([\s\S]*?)```/g, "<pre>$1</pre>") // Code blocks (```code```)
      .replace(/\n/g, "<br />"); // Preserve line breaks
  }
}

function AIAssistant() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessage = { sender: "user", text: input.trim() }
    setMessages([...messages, newMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      })

      const data = await response.json()
      const formattedText = formatResponse(data.response || "I apologize, I need to process that request further.")
      const aiMessage = { sender: "ai", text: formattedText }

      setMessages((prevMessages) => [...prevMessages, aiMessage])
    } catch (error) {
      const errorMessage = { sender: "ai", text: "An error occurred. Please try again." }
      setMessages((prevMessages) => [...prevMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl rounded-xl overflow-hidden border-2 border-secondary shadow-lg"
      >
        {/* Header */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="p-4 flex items-center space-x-4 rounded-t-xl bg-secondary"
        >
          <div className="relative w-12 h-12">
            <Image src="/images/cat.png" alt="AI Avatar" layout="fill" className="rounded-full" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Lily, Your AI Assistant</h1>
            <p className="text-white text-sm">Powered by Advanced AI</p>
          </div>
        </motion.div>

        {/* Chat messages */}
        <div className="h-[60vh] overflow-y-auto p-6 space-y-4">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === "ai" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.sender === "ai" ? "bg-secondary text-white" : "bg-gray-200 text-black"
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.text }} // Allows formatted HTML
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start items-center space-x-2"
            >
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6 }} className="w-2 h-2 bg-secondary rounded-full" />
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-secondary rounded-full" />
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-secondary rounded-full" />
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input section */}
        <motion.div className="p-6 border-t-2 border-secondary">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="w-full p-4 rounded-full border-2 border-secondary focus:ring-2 focus:ring-secondary text-white placeholder-gray-500 pr-24"
              placeholder="Ask me anything..."
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendMessage}
              className="absolute right-2 top-2 bg-secondary px-6 py-2 rounded-full font-medium text-white transition-colors hover:bg-opacity-80"
              disabled={isLoading}
            >
              Send
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AIAssistant;