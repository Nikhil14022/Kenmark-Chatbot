import { Ollama } from 'ollama';

const ollama = new Ollama({
    host: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
});

const MODEL = process.env.OLLAMA_MODEL || 'llama3';

export async function chatWithOllama(messages: { role: string; content: string }[]) {
    try {
        const response = await ollama.chat({
            model: MODEL,
            messages: messages,
            stream: false,
        });
        return response.message.content;
    } catch (error) {
        console.error('Ollama Chat Error:', error);
        throw new Error('Failed to connect to AI engine. Please ensure Ollama is running.');
    }
}

export async function generateEmbedding(text: string) {
    try {
        const response = await ollama.embeddings({
            model: MODEL,
            prompt: text,
        });
        return response.embedding;
    } catch (error) {
        console.error('Ollama Embedding Error:', error);
        return null;
    }
}
