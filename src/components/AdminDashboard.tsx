"use client";

import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function AdminDashboard() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setFile(e.target.files[0]);
            setStatus('idle');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setStatus('loading');
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/admin/ingest-excel', {
                method: 'POST',
                body: formData,
            });

            const contentType = res.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await res.json();
                if (data.success) {
                    setStatus('success');
                    setMessage(data.message);
                    setFile(null);
                } else {
                    throw new Error(data.error || 'Upload failed');
                }
            } else {
                const text = await res.text();
                console.error('Non-JSON response:', text);
                throw new Error(`Server returned non-JSON response (${res.status}). Please check server logs.`);
            }
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message);
        }
    };

    const seedWebsite = async () => {
        setStatus('loading');
        try {
            const res = await fetch('/api/admin/seed-website');
            const data = await res.json();
            if (data.success) {
                setStatus('success');
                setMessage(`Seeded ${data.count} entries from website content.`);
            } else {
                throw new Error(data.error);
            }
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-8 space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Knowledge Base Management</h1>
                <p className="text-zinc-500 mt-2">Manage the data source for your AI Chatbot.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
                    <div className="flex items-center gap-3 text-blue-500">
                        <Upload size={24} />
                        <h2 className="text-lg font-semibold dark:text-zinc-100">Upload Excel (.xlsx)</h2>
                    </div>
                    <p className="text-sm text-zinc-500">
                        Upload an Excel file with Category, Question, and Answer columns.
                    </p>

                    <div className="relative border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center gap-2 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer">
                        <input
                            type="file"
                            accept=".xlsx"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <FileText size={32} className="text-zinc-300" />
                        <span className="text-sm font-medium dark:text-zinc-400">
                            {file ? file.name : "Click to select or drag and drop"}
                        </span>
                    </div>

                    <button
                        onClick={handleUpload}
                        disabled={!file || status === 'loading'}
                        className="w-full py-2.5 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl font-medium hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                    >
                        {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
                        Process & Ingest
                    </button>
                </div>

                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
                    <div className="flex items-center gap-3 text-green-500">
                        <CheckCircle size={24} />
                        <h2 className="text-lg font-semibold dark:text-zinc-100">Seed Website Content</h2>
                    </div>
                    <p className="text-sm text-zinc-500">
                        Quickly populate the database with core information from kenmarkitan.com.
                    </p>
                    <div className="h-24 flex items-center justify-center border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
                        <span className="text-xs text-zinc-400 italic">Preset content based on research</span>
                    </div>
                    <button
                        onClick={seedWebsite}
                        disabled={status === 'loading'}
                        className="w-full py-2.5 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-xl font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 transition-colors"
                    >
                        {status === 'loading' ? "Seeding..." : "Seed Core Data"}
                    </button>
                </div>
            </div>

            {status !== 'idle' && (
                <div className={cn(
                    "p-4 rounded-xl flex items-center gap-3",
                    status === 'success' ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" :
                        status === 'error' ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400" :
                            "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                )}>
                    {status === 'success' && <CheckCircle size={20} />}
                    {status === 'error' && <AlertCircle size={20} />}
                    {status === 'loading' && <Loader2 size={20} className="animate-spin" />}
                    <span className="text-sm font-medium">{message || (status === 'loading' ? 'Processing...' : '')}</span>
                </div>
            )}
        </div>
    );
}
