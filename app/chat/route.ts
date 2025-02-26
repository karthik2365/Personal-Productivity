import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    // Format messages for the AI SDK
    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Get the last user message
    const lastUserMessage = formattedMessages.filter((msg: any) => msg.role === "user").pop()

    // Create a conversation history for context
    const conversationHistory = formattedMessages
      .map((msg: any) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
      .join("\n")

    // Generate response using AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `The following is a conversation between a user and an AI assistant. The assistant is helpful, creative, clever, and very friendly.

Conversation history:
${conversationHistory}

User's latest message: ${lastUserMessage?.content}

Provide a helpful response to the user's latest message.`,
      system: "You are a helpful AI assistant. Provide concise, accurate, and friendly responses.",
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to process your request" }, { status: 500 })
  }
}

