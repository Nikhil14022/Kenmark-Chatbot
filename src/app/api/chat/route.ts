import { NextRequest, NextResponse } from 'next/server';
import { getAiResponse } from '@/lib/rag-engine';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        const { message, sessionId } = await req.json();

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // 1. Get or create session
        let session;
        if (sessionId) {
            session = await prisma.chatSession.findUnique({
                where: { id: sessionId },
                include: { messages: { take: 10, orderBy: { createdAt: 'desc' } } },
            });

            // Re-sort messages to ensure correct order (oldest first)
            // If timestamps are identical, ensure 'user' comes before 'assistant'
            if (session?.messages) {
                (session as any).messages.sort((a: any, b: any) => {
                    const timeDiff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                    if (timeDiff !== 0) return timeDiff;
                    // Tie-breaker: User before Assistant
                    if (a.role === 'user' && b.role === 'assistant') return -1;
                    if (a.role === 'assistant' && b.role === 'user') return 1;
                    return 0;
                });
            }
        }

        if (!session) {
            session = await prisma.chatSession.create({
                data: {},
            });
        }

        // 2. Prepare history for AI
        const history = (session as any).messages?.map((m: any) => ({
            role: m.role,
            content: m.content,
        })) || [];

        // 3. Get AI Response
        const aiResponse = await getAiResponse(message, history);

        // 4. Save messages to database
        // 4. Save messages to database sequentially to ensure order/timestamps
        await prisma.message.create({
            data: { role: 'user', content: message, sessionId: session.id }
        });

        await prisma.message.create({
            data: { role: 'assistant', content: aiResponse, sessionId: session.id }
        });

        return NextResponse.json({
            response: aiResponse,
            sessionId: session.id,
        });
    } catch (error: any) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
    }
}
