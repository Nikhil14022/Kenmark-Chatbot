import prisma from './prisma';
import { chatWithGemini } from './gemini';

const SYSTEM_PROMPT = `You are a helpful and polite AI assistant for Kenmark ITan Solutions.
Using the following information about the company and its services, answer the user's question.
If the information provided below does not contain the answer, say "I don't have that information yet." 
Do NOT make up any information or hallucinate. Be concise and professional.`;

export async function getAiResponse(userQuery: string, history: { role: string; content: string }[] = []) {
    // 1. Extract keywords from user query (remove common words)
    const stopWords = ['what', 'is', 'are', 'the', 'a', 'an', 'how', 'do', 'does', 'can', 'you', 'your', 'tell', 'me', 'about'];
    const keywords = userQuery
        .toLowerCase()
        .split(/\s+/)
        .filter(word => word.length > 2 && !stopWords.includes(word));

    console.log('RAG_ENGINE: Extracted keywords:', keywords);

    // 2. Retrieve relevant knowledge from MongoDB using broader search
    let relevantKnowledge: any[] = [];

    if (keywords.length > 0) {
        // Build OR conditions for each keyword across all fields
        const searchConditions = keywords.flatMap(keyword => [
            { answer: { contains: keyword, mode: 'insensitive' } },
            { question: { contains: keyword, mode: 'insensitive' } },
            { category: { contains: keyword, mode: 'insensitive' } },
        ]);

        relevantKnowledge = await prisma.knowledge.findMany({
            where: {
                OR: searchConditions as any,
            },
            take: 10,
        });
    }

    // Fallback: if no results, get some general entries
    if (relevantKnowledge.length === 0) {
        console.log('RAG_ENGINE: No keyword matches, fetching general entries...');
        relevantKnowledge = await prisma.knowledge.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
        });
    }

    const context = relevantKnowledge
        .map((k: any) => `[${k.category}] ${k.question ? k.question + ': ' : ''}${k.answer}`)
        .join('\n\n');

    // 3. Construct the messages properly
    console.log(`RAG_ENGINE: Context retrieved (${relevantKnowledge.length} entries)`);

    // Prepare system message with context
    const contextBlock = `${SYSTEM_PROMPT}\n\nRELEVANT INFORMATION:\n${context || 'No specific information found in knowledge base.'}`;

    // Construct the full message chain:
    // 1. Chat history (previous turns)
    // 2. Current user query PREPENDED with context (to ensure it's always available and compatible)
    const combinedUserMessage = `${contextBlock}\n\nUSER QUESTION: ${userQuery}`;

    const messages = [
        ...history,
        { role: 'user', content: combinedUserMessage }
    ];

    console.log('RAG_ENGINE: Message structure:', {
        historyCount: history.length,
        currentMessageLength: combinedUserMessage.length,
    });

    // 4. Get response from AI
    console.log('RAG_ENGINE: Requesting AI response...');

    if (process.env.GEMINI_API_KEY) {
        try {
            return await chatWithGemini(messages as any);
        } catch (error) {
            console.error('RAG_ENGINE: Gemini failed:', error);
            throw error;
        }
    }

    throw new Error('GEMINI_API_KEY not found');
}
