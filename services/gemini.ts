
import { GoogleGenAI } from "@google/genai";

/**
 * Generates an AI-powered greeting for the user using the Gemini API.
 * Follows the latest @google/genai guidelines.
 */
export const getAIGreeting = async (userName: string): Promise<string> => {
  try {
    // Always use new GoogleGenAI({apiKey: process.env.API_KEY}) directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using 'gemini-3-flash-preview' for basic text tasks.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, professional, and inspiring one-sentence welcome message for a user named ${userName} who just logged into their dashboard.`,
      config: {
        temperature: 0.7,
        // Removed maxOutputTokens to avoid unnecessary truncation or blocking.
      }
    });

    // Extracting text output directly from the .text property of GenerateContentResponse.
    return response.text || `Welcome back, ${userName}!`;
  } catch (error) {
    console.error("Gemini Greeting Error:", error);
    // Robust error handling for API failures.
    return `Welcome back, ${userName}! Great to see you again.`;
  }
};
