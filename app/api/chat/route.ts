
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Parse incoming request to extract user query
    const { query } = await request.json();

    if (!query) {
      return NextResponse.json(
        { error: 'User query is required' },
        { status: 400 }
      );
    }

    // Fetch Gemini API Key from environment variables
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      return NextResponse.json(
        { error: 'Gemini API key is missing in environment variables' },
        { status: 500 }
      );
    }

    // Prepare the payload for Gemini API
    const payload = {
      contents: [
        {
          parts: [
            {
              text: `Given the following productivity-related query, provide a detailed, interactive, and helpful response with advice:
              User Query: ${query}.
              Ensure the response offers clear, actionable strategies to help individuals manage their time, track their goals, and improve efficiency in academic and personal activities. Keep the response concise, easy to understand, and free of excessive formatting.`
 }
          ]
        }
      ]
    };

    // Call Gemini API for generating a response
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    // Check if the response is OK
    const responseData = await response.json();

    // Log response for debugging
    console.log('Gemini API Response:', responseData);

    if (!response.ok) {
      return NextResponse.json(
        { error: responseData.error?.message || 'Failed to generate response' },
        { status: response.status }
      );
    }

    // Extract and return the generated response from Gemini
    const chatbotResponse = responseData?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';

    return NextResponse.json({ response: chatbotResponse });

  } catch (error) {
    console.error('Error during chatbot response generation:', error);
    return NextResponse.json(
      { error: error || 'Failed to generate response' },
      { status: 500 }
    );
  }
}