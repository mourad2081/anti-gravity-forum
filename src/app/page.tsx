"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Sparkles, Atom, ShieldAlert, BookOpen } from "lucide-react";

const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <Scene />
      
      {/* Overlay Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-10" />
      <div className="scanline absolute inset-0 pointer-events-none opacity-20 z-10" />

      {/* Hero Content */}
      <section className="container relative z-20 px-4 py-24 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono mb-8"
        >
          <Sparkles className="w-3 h-3" />
          <span>ADVANCED PROPULSION LABS // PENTIXAPHARM DIVISION</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-glow"
        >
          THEORETICAL <br />
          <span className="text-cyan-500">ANTI-GRAVITY</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl mb-12 font-light leading-relaxed"
        >
          Exploring Alcubierre metrics, HFGW propulsion, and the limits of diamagnetic levitation through clinical biotech frameworks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button size="lg" className="bg-cyan-600 hover:bg-cyan-500 text-black px-8 py-6 text-lg font-semibold rounded-none">
            <Link href="/forum">ENTER THE FORUM</Link>
          </Button>
          <Button variant="outline" size="lg" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg rounded-none">
            PROTOCOL DOCUMENTATION
          </Button>
        </motion.div>
      </section>

      {/* Feature Bento Grid Summary */}
      <section className="container relative z-20 px-4 pb-24 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BentoItem 
            icon={<Atom className="text-cyan-400" />}
            title="Quantum Metrics"
            description="Verified datasets on superconducting metamaterials and their gravitational interactions."
          />
          <BentoItem 
            icon={<ShieldAlert className="text-blue-400" />}
            title="Secure Nodes"
            description="Enterprise-grade ZK-proofs for clandestine research distribution and peer review."
          />
          <BentoItem 
            icon={<BookOpen className="text-emerald-400" />}
            title="Archived Metrics"
            description="Historical data on HF-GW (High Frequency Gravitational Waves) from 2024-2026."
          />
        </div>
      </section>
    </main>
  );
}

function BentoItem({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-panel p-8 group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}
