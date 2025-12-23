import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function chatWithGemini(messages: { role: string; content: string }[]) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        // Convert messages to Gemini format
        let history = messages.slice(0, -1).map(m => ({
            role: m.role === "assistant" ? "model" : "user",
            parts: [{ text: m.content }],
        }));

        // Gemini requires the first message in history to be from 'user'
        while (history.length > 0 && history[0].role !== 'user') {
            console.warn("Dropping leading non-user message from Gemini history");
            history.shift();
        }

        const lastMessage = messages[messages.length - 1].content;

        const chat = model.startChat({
            history: history,
        });

        const result = await chat.sendMessage(lastMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        throw new Error("Failed to connect to Gemini AI. Check your API key.");
    }
}

export async function generateGeminiEmbedding(text: string) {
    try {
        const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
        const result = await model.embedContent(text);
        return result.embedding.values;
    } catch (error) {
        console.error("Gemini Embedding Error:", error);
        return null;
    }
}
