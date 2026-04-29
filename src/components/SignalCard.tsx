import React from 'react';
import { motion } from 'motion/react';
import { SignalBrief } from '../services/geminiService';
import { cn } from '../lib/utils';
import { Activity, AlertTriangle, Clock, Users, ArrowRight } from 'lucide-react';

interface SignalCardProps {
  signal: SignalBrief;
  onClick: (signal: SignalBrief) => void;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal, onClick }) => {
  const impactColor = signal.impactScore >= 8 ? 'text-red-400' : signal.impactScore >= 5 ? 'text-amber-400' : 'text-intel-accent';

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-intel-card border border-intel-border p-4 rounded group cursor-pointer hover:border-intel-accent/50 transition-all shadow-lg"
      onClick={() => onClick(signal)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2">
          <h3 className="text-xs font-bold text-intel-accent uppercase flex items-center gap-2">
            <span className={cn(
              "w-1.5 h-1.5 rounded-full",
              signal.status === 'Active' ? 'bg-red-500' : 'bg-intel-accent'
            )}></span> 
            {signal.category}
          </h3>
        </div>
        <div className="text-[10px] font-mono text-intel-subtle uppercase">
          ID: {signal.id.slice(0, 6)}
        </div>
      </div>

      <h2 className="text-lg font-light text-white mb-2 group-hover:text-intel-accent transition-colors leading-tight">
        {signal.title}
      </h2>
      
      <p className="text-intel-muted text-xs line-clamp-3 mb-4 leading-relaxed font-normal">
        {signal.summary}
      </p>

      <div className="space-y-3 pt-3 border-t border-intel-border">
        <div className="flex gap-3">
          <div className="shrink-0 w-6 h-6 rounded bg-intel-border/30 border border-intel-border flex items-center justify-center text-[10px] text-intel-muted">
            HP
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold text-intel-text truncate">{signal.historicalPrecedent}</p>
            <p className="text-[9px] text-intel-subtle">Historical Context</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-[10px] font-mono">
          <div className="flex items-center gap-2 text-intel-subtle">
            <Activity className="w-3 h-3" />
            Impact: <span className={impactColor}>{signal.impactScore}/10</span>
          </div>
          <div className="px-2 py-0.5 bg-intel-border/50 text-intel-muted rounded-sm">
            {signal.region}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
