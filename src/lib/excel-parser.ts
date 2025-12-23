import * as XLSX from 'xlsx';

export interface KnowledgeEntry {
    category: string;
    question?: string;
    answer: string;
}

export function parseExcelKnowledge(buffer: Buffer): KnowledgeEntry[] {
    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet) as any[];

    return data.map((row) => ({
        category: row.Category || row.category || 'General',
        question: row.Question || row.question || '',
        answer: row.Answer || row.answer || '',
    })).filter(entry => entry.answer);
}
