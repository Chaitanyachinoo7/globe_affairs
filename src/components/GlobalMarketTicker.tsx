import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Radio } from 'lucide-react';

const mocks = [
  { pair: 'USD/EUR', val: '1.0924', change: '+0.12%', up: true },
  { pair: 'OIL (BRENT)', val: '$82.45', change: '-0.34%', up: false },
  { pair: 'GOLD', val: '$2,342', change: '+0.89%', up: true },
  { pair: 'UST 10Y', val: '4.24%', change: '+0.01%', up: true },
  { pair: 'SHANGHAI COMP', val: '3,024', change: '-1.12%', up: false },
];

export const GlobalMarketTicker: React.FC = () => {
  return (
    <div className="h-10 border-b border-intel-border bg-intel-bg flex items-center overflow-hidden">
      <div className="px-6 border-r border-intel-border h-full flex items-center bg-intel-accent/5 text-intel-accent whitespace-nowrap">
        <Radio className="w-3.5 h-3.5 mr-2 animate-pulse" />
        <span className="text-[9px] font-bold font-mono uppercase tracking-[0.2em]">LIVE SIGNAL FEED</span>
      </div>
      
      <div className="flex-1 relative overflow-hidden flex items-center">
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="flex gap-8 whitespace-nowrap items-center px-4"
        >
          {Array(3).fill(0).map((_, groupIdx) => (
            <React.Fragment key={groupIdx}>
              {mocks.map((item, idx) => (
                <div key={`${groupIdx}-${idx}`} className="flex items-center gap-2 group">
                  <span className="text-[10px] font-mono text-intel-muted group-hover:text-white transition-colors">{item.pair}</span>
                  <span className="text-xs font-mono font-bold">{item.val}</span>
                  <span className={`text-[10px] font-mono flex items-center ${item.up ? 'text-green-400' : 'text-red-400'}`}>
                    {item.up ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {item.change}
                  </span>
                  <span className="text-intel-border last:hidden">|</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
