import { NextRequest, NextResponse } from 'next/server';
import { parseExcelKnowledge } from '@/lib/excel-parser';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
    try {
        console.log('INGEST_ROUTE: Route hit');
        console.log('INGEST_ROUTE: DATABASE_URL present:', !!process.env.DATABASE_URL);

        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            console.log('INGEST_ROUTE: No file found');
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        console.log(`File: ${file.name}, Size: ${file.size}`);
        const buffer = Buffer.from(await file.arrayBuffer());
        const entries = parseExcelKnowledge(buffer);
        console.log(`Parsed ${entries.length} entries`);

        if (entries.length === 0) {
            return NextResponse.json({ error: 'No valid data found in Excel' }, { status: 400 });
        }

        // Insert into MongoDB
        console.log('Attempting DB insertion...');
        const created = await prisma.knowledge.createMany({
            data: entries.map(e => ({
                ...e,
                source: 'excel',
            })),
        });
        console.log('DB insertion successful:', created.count);

        return NextResponse.json({
            success: true,
            count: created.count,
            message: `Successfully ingested ${created.count} entries.`,
        });
    } catch (error: any) {
        console.error('Ingestion Error DETAILS:', {
            message: error.message,
            stack: error.stack,
            error
        });
        return NextResponse.json({
            error: error.message || 'Failed to ingest data',
            details: error.stack
        }, { status: 500 });
    }
}
