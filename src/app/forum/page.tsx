"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Atom, 
  Layers, 
  Microscope, 
  Zap, 
  MessageSquarePlus, 
  Search,
  Terminal,
  Activity,
  User,
  Clock,
  ExternalLink
} from "lucide-react";
import { createPost } from "@/lib/actions/createPost";
import { PostInput } from "@/lib/validations/postSchema";

type Tab = "quantum" | "metamaterials" | "peer-reviewed" | "hfgw";

export default function ForumPage() {
  const [activeTab, setActiveTab] = useState<Tab>("quantum");
  const [isPosting, setIsPosting] = useState(false);

  const tabs = [
    { id: "quantum", label: "Quantum Gravity", icon: <Atom className="w-4 h-4" /> },
    { id: "metamaterials", label: "Metamaterials", icon: <Layers className="w-4 h-4" /> },
    { id: "peer-reviewed", label: "Peer-Reviewed", icon: <Microscope className="w-4 h-4" /> },
    { id: "hfgw", label: "HFGW Metrics", icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 glass-panel rounded-none border-t-0 border-x-0 h-16 flex items-center px-6">
        <div className="flex items-center space-x-2 font-bold tracking-tighter">
          <Terminal className="text-cyan-400 w-5 h-5" />
          <span>GRAVITY // FORUM</span>
        </div>
        <nav className="hidden md:flex flex-1 justify-center space-x-8 text-xs font-mono text-gray-500 uppercase tracking-widest">
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Nodes</span>
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Protocols</span>
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Archive</span>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">
            <Activity className="w-3 h-3" />
            <span>LEVEL 4 CLEARANCE</span>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Forum Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Theory & Verification</h1>
            <p className="text-gray-500 font-light">Cross-domain research on gravity metrics and exotic propulsion.</p>
          </div>
          <Button 
            className="bg-white text-black hover:bg-cyan-400 transition-colors h-12 px-6 font-bold"
            onClick={() => setIsPosting(true)}
          >
            <MessageSquarePlus className="w-4 h-4 mr-2" />
            INITIATE DISCUSSION
          </Button>
        </div>

        {/* Multi-Tab Interface */}
        <div className="flex flex-wrap gap-2 mb-8 p-1 glass-panel rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id 
                ? "bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.3)]" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 gap-4"
          >
            {getMockThreads(activeTab).map((thread) => (
              <ThreadCard key={thread.id} thread={thread} />
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Posting Modal Mock */}
      {isPosting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel max-w-2xl w-full p-8 space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">New Research Entry</h2>
              <Button variant="ghost" onClick={() => setIsPosting(false)}>Cancel</Button>
            </div>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Subject Line (e.g., Alcubierre Metric Delta)"
                className="w-full bg-white/5 border border-white/10 rounded-none p-3 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <textarea 
                placeholder="Detailed findings... (Markdown supported)"
                className="w-full h-48 bg-white/5 border border-white/10 rounded-none p-3 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <select className="bg-white/5 border border-white/10 p-3 rounded-none">
                  <option>Quantum Gravity</option>
                  <option>Metamaterials</option>
                </select>
                <Button className="bg-cyan-600 hover:bg-cyan-500 text-black">ENCRYPTED SEND</Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function ThreadCard({ thread }: { thread: any }) {
  return (
    <div className="glass-panel p-6 group hover:border-cyan-500/50 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer">
      <div className="space-y-3 flex-1">
        <div className="flex items-center space-x-3 text-[10px] font-mono text-cyan-400">
          <div className="flex items-center">
            <User className="w-3 h-3 mr-1" />
            {thread.author}
          </div>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {thread.time}
          </div>
        </div>
        <h3 className="text-lg font-bold group-hover:text-cyan-400 transition-colors">{thread.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 font-light">{thread.excerpt}</p>
      </div>
      <div className="flex items-center space-x-6 text-sm">
        <div className="text-right">
          <div className="text-gray-500 text-[10px] font-mono uppercase">Reproducibility</div>
          <div className="text-emerald-500 font-bold">{thread.repro}%</div>
        </div>
        <div className="text-right">
          <div className="text-gray-500 text-[10px] font-mono uppercase">Views</div>
          <div className="font-bold">{thread.views}</div>
        </div>
        <Button variant="outline" size="icon" className="border-white/10 group-hover:border-cyan-500/50">
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

function getMockThreads(tab: Tab) {
  const data = {
    quantum: [
      { id: 1, author: "A.VALENTEY", time: "2h ago", title: "Non-Euclidean Gravity Metrics in Superconducting Cooper Pairs", excerpt: "Evidence suggested that macroscopic quantum coherence might interact with high-frequency gravitational waves under specific pulsed magnetic fields...", repro: 94, views: "2.4k" },
      { id: 2, author: "S.HAWKING_ARCHIVE", time: "1d ago", title: "Information Paradox Resolutions for Micro-Warp Stabilities", excerpt: "Analyzing the holographic boundary conditions required to stabilize a negative energy density field without immediate singularity collapse.", repro: 100, views: "12.8k" },
    ],
    metamaterials: [
      { id: 3, author: "BIO_LAB_12", time: "5h ago", title: "Negative Permeability Grids and Photon-Gravity Coupling", excerpt: "We've achieved a -1.2 refractive index at the 5THz range, indicating potential gravity-lensing effects at nano-scale interfaces.", repro: 82, views: "1.1k" },
    ],
    "peer-reviewed": [
      { id: 4, author: "EDITOR", time: "3d ago", title: "ANNUAL REPORT 2026: Advances in Diamagnetic Levitation", excerpt: "Comprehensive summary of room-temperature superconducting advancements and their implications for long-term orbital positioning.", repro: 99, views: "4.5k" },
    ],
    hfgw: [
      { id: 5, author: "PROTO_X", time: "12h ago", title: "HFGW Signal Detection in Graphene-Coated Vacuum Chambers", excerpt: "Calibration data showing anomalous oscillations at 4.2GHz, potentially correlating to distant binary pulsar mergers.", repro: 67, views: "890" },
    ],
  };
  return data[tab] || [];
}
