import { GoogleGenAI } from '@google/genai';

async function test() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are a helpful test bot.",
      },
    });
    
    console.log("Sending message...");
    const response = await chat.sendMessage({ message: "Hello" });
    console.log("Response:", response.text);
  } catch (e) {
    console.error("ERROR:", e);
  }
}
test();
