import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { X, ExternalLink, Shield, Info, Link2, Download } from 'lucide-react';
import { SignalBrief } from '../services/geminiService';

interface BriefDetailProps {
  signal: SignalBrief | null;
  deepDive: string | null;
  onClose: () => void;
  isLoading: boolean;
}

export const BriefDetail: React.FC<BriefDetailProps> = ({ signal, deepDive, onClose, isLoading }) => {
  if (!signal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          className="relative w-full max-w-5xl max-h-[90vh] bg-intel-deep border border-intel-border rounded shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="p-8 border-b border-intel-border flex justify-between items-start bg-intel-card">
            <div>
              <div className="flex gap-3 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-intel-accent">
                  {signal.category} // INTEL LEVEL 4
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-intel-subtle">
                  VECTOR: {signal.region}
                </span>
              </div>
              <h2 className="text-3xl font-light text-white tracking-tight">{signal.title}</h2>
            </div>
            <button 
              onClick={onClose}
              className="px-4 py-2 border border-intel-border hover:bg-white/5 text-[10px] font-bold uppercase tracking-widest transition-colors text-intel-muted hover:text-white"
            >
              Close Briefing
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Left Column */}
              <div className="space-y-8">
                <div className="bg-intel-card border border-intel-border p-5 rounded">
                  <h4 className="text-[10px] font-bold text-intel-accent uppercase mb-4 tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                    Current Signal
                  </h4>
                  <p className="text-xs text-intel-text leading-relaxed">
                    {signal.summary}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-intel-subtle uppercase tracking-widest">Second-Order Impacts</h4>
                  <div className="space-y-4">
                    {signal.secondOrderImpacts.map((impact, idx) => (
                      <div key={idx} className="flex gap-3 items-start">
                        <div className="shrink-0 w-6 h-6 rounded bg-intel-border/30 border border-intel-border flex items-center justify-center text-[10px] text-intel-muted">
                          0{idx + 1}
                        </div>
                        <p className="text-[11px] text-intel-muted leading-relaxed">{impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main Column */}
              <div className="md:col-span-2 space-y-6">
                <h4 className="text-[10px] font-bold text-intel-accent uppercase tracking-widest">Strategic Analysis</h4>
                <div className="prose prose-invert prose-sm max-w-none">
                  {isLoading ? (
                    <div className="space-y-6 animate-pulse">
                      <div className="h-4 bg-intel-border/50 rounded w-3/4" />
                      <div className="h-4 bg-intel-border/50 rounded w-full" />
                      <div className="h-4 bg-intel-border/50 rounded w-5/6" />
                      <div className="h-32 bg-intel-border/50 rounded w-full" />
                    </div>
                  ) : (
                    <div className="markdown-body text-intel-text leading-relaxed font-light">
                      <ReactMarkdown>{deepDive || "Establishing uplink for deep dive analysis..."}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-intel-border bg-intel-card flex justify-between items-center">
            <button className="px-6 py-2 bg-intel-accent text-black text-[10px] font-bold uppercase tracking-widest hover:bg-intel-accent/80 transition-colors">
              Download Full Dossier
            </button>
            <p className="text-[9px] font-mono text-intel-subtle uppercase tracking-[0.2em]">
              Classified Intelligence Platform // Strictly Internal Access
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
