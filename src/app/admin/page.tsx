import AdminDashboard from '@/components/AdminDashboard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AdminPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                        <ArrowLeft size={20} />
                        <span className="font-medium text-sm">Back to Website</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Authenticated</span>
                    </div>
                </div>
            </nav>

            <main className="py-12">
                <AdminDashboard />
            </main>
        </div>
    );
}
