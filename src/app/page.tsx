"use client";

import ChatWidget from '@/components/ChatWidget';
import Link from 'next/link';
import { ArrowRight, Globe, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navigation */}
      <nav className="border-b border-zinc-100 dark:border-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 dark:bg-zinc-100" />
            <span className="font-bold text-xl tracking-tight dark:text-zinc-100">Kenmark ITan</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Services</Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">Hosting</Link>
            <Link href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100">About</Link>
            <Link href="/admin" className="px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-lg hover:opacity-90 transition-opacity">
              Admin Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-24 left-10 w-96 h-96 bg-blue-400/10 dark:bg-blue-600/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 dark:bg-purple-600/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Next-Gen IT Solutions
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6"
          >
            Building the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Digital Innovation.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Kenmark ITan Solutions provides end-to-end technology services for startups and enterprises worldwide. From web hosting to AI-powered development.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="w-full sm:w-auto px-8 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-2xl font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2">
              Get Started <ArrowRight size={20} />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              Our Services
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/40">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <FeatureCard
            icon={<Globe className="text-blue-500" />}
            title="Global Infrastructure"
            description="High-performance hosting solutions spanning multiple continents with 99.9% uptime."
          />
          <FeatureCard
            icon={<Zap className="text-yellow-500" />}
            title="Rapid Development"
            description="Our agile team delivers production-ready applications across web and mobile platforms."
          />
          <FeatureCard
            icon={<Shield className="text-green-500" />}
            title="Enterprise Security"
            description="State-of-the-art security audits and implementation to protect your digital assets."
          />
        </div>
      </section>

      {/* Chatbot Widget */}
      <ChatWidget />
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-shadow group"
    >
      <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">{title}</h3>
      <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
}
