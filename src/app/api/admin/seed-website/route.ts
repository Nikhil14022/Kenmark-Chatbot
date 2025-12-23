import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const INITIAL_KNOWLEDGE = [
    {
        category: 'About',
        question: 'What is Kenmark ITan Solutions?',
        answer: 'Kenmark ITan Solutions is an IT services company based in Mumbai, India, founded in 2008. We provide a wide range of IT solutions under one roof, catering to startups, SMBs, and sole proprietors.',
        source: 'website'
    },
    {
        category: 'Services',
        question: 'What services do you offer?',
        answer: 'We offer Web Hosting (Shared, VPS, Dedicated), Software Development (NextJS, React, Flutter), Branding & Design, Digital Marketing (SEO, SMM), Consultancy, Cloud Solutions, and IT Security.',
        source: 'website'
    },
    {
        category: 'Contact',
        question: 'How can I contact Kenmark ITan Solutions?',
        answer: 'You can reach us through our official website at kenmarkitan.com or visit our office in Mumbai. We offer remote support and consultancy globally.',
        source: 'website'
    },
    {
        category: 'Team',
        question: 'Who are the leaders of Kenmark ITan Solutions?',
        answer: 'The company is led by Tanooj Sanjeev Mehra (Expert in Technology & Innovation) and Piyush Thakur (CFO and Chief Business Officer).',
        source: 'website'
    },
    {
        category: 'Security',
        question: 'What security solutions do you provide?',
        answer: 'We offer security audits, risk assessments, SSL setup, authentication hardening, RBAC, firewalls, and vulnerability patching.',
        source: 'website'
    }
];

export async function GET() {
    try {
        const created = await prisma.knowledge.createMany({
            data: INITIAL_KNOWLEDGE,
        });

        return NextResponse.json({
            success: true,
            count: created.count,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
