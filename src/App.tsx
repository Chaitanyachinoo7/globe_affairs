import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { GlobalMarketTicker } from './components/GlobalMarketTicker';
import { SignalCard } from './components/SignalCard';
import { BriefDetail } from './components/BriefDetail';
import { generateSignals, generateDeepDive, SignalBrief } from './services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, RefreshCw, Layers } from 'lucide-react';
import { cn } from './lib/utils';

export default function App() {
  const [region, setRegion] = useState('Global');
  const [signals, setSignals] = useState<SignalBrief[]>([]);
  const [selectedSignal, setSelectedSignal] = useState<SignalBrief | null>(null);
  const [deepDive, setDeepDive] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);

  const fetchSignals = async (r: string) => {
    setLoading(true);
    try {
      const data = await generateSignals(r);
      setSignals(data);
    } catch (error) {
      console.error("Error fetching signals:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSignals(region);
  }, [region]);

  const handleSignalClick = async (signal: SignalBrief) => {
    setSelectedSignal(signal);
    setDeepDive(null);
    setDetailLoading(true);
    try {
      const dive = await generateDeepDive(signal);
      setDeepDive(dive);
    } catch (error) {
      console.error(error);
    }
    setDetailLoading(false);
  };

  return (
    <div className="flex h-screen bg-intel-bg text-intel-text overflow-hidden selection:bg-intel-accent/30 font-sans">
      <Sidebar activeRegion={region} onRegionChange={setRegion} />
      
      <main className="flex-1 flex flex-col min-w-0 relative bg-intel-deep">
        <nav className="h-14 border-b border-intel-border bg-intel-card flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs font-medium text-intel-muted">
              <span className="text-intel-accent cursor-pointer">INTELLIGENCE</span>
              <span className="hover:text-intel-text cursor-pointer transition-colors">GEOPOLITICS</span>
              <span className="hover:text-intel-text cursor-pointer transition-colors">TRADING</span>
              <span className="hover:text-intel-text cursor-pointer transition-colors">HISTORY</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-3 text-[10px] items-center">
              <span className="text-intel-subtle uppercase">Node Activity:</span>
              <span className="text-green-400 font-mono animate-pulse">OPTIMAL</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-intel-border border border-white/5"></div>
          </div>
        </nav>

        <GlobalMarketTicker />
        
        {/* Header Section */}
        <div className="p-8 pb-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-intel-subtle mb-1">
                <span className="text-[10px] font-mono tracking-widest uppercase">Intelligence Level 4 • Cluster: Alpha</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-light tracking-tight flex items-center gap-3">
                Strategic Briefing: <span className="text-intel-accent">{region} Vector</span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-intel-muted group-hover:text-intel-accent transition-colors" />
                <input 
                  type="text" 
                  placeholder="Scan vectors..." 
                  className="bg-intel-card border border-intel-border rounded-none pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-intel-accent w-64 transition-all placeholder:text-intel-muted/50"
                />
              </div>
              <button 
                onClick={() => fetchSignals(region)}
                className="px-4 py-2 bg-intel-accent text-black text-[10px] font-bold uppercase tracking-tighter hover:bg-intel-accent/80 transition-colors"
                title="Refresh Intel"
              >
                Sync Data
              </button>
            </div>
          </div>
        </div>

        {/* Signals Feed */}
        <div className="flex-1 overflow-y-auto p-8 pt-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-64 bg-intel-card/50 border border-intel-border rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
              <AnimatePresence mode="popLayout">
                {signals.map((signal) => (
                  <SignalCard 
                    key={signal.id} 
                    signal={signal} 
                    onClick={handleSignalClick} 
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {!loading && signals.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center">
              <div className="bg-intel-card p-6 rounded-full mb-4 border border-intel-border border-dashed">
                <RefreshCw className="w-8 h-8 text-intel-muted opacity-20" />
              </div>
              <h3 className="text-lg font-bold">No active signals found in {region}</h3>
              <p className="text-intel-muted max-w-sm mt-1">
                Nodes are returning empty vectors for this region. Attempting reconnection...
              </p>
            </div>
          )}
        </div>

        {/* Bottom Banner */}
        <footer className="h-8 border-t border-intel-border bg-intel-bg flex items-center px-4 justify-between shrink-0">
          <div className="flex items-center gap-4 text-[9px] text-intel-subtle tracking-wider font-mono">
            <span className="text-green-500">● LIVE CONNECTED</span>
            <span>DATA SOURCE: AI STUDIO GEO-VECTOR ENGINE</span>
            <span>LATENCY: 12ms</span>
          </div>
          <div className="text-[9px] text-intel-subtle font-mono">
            SYSTEM TIME: {new Date().toUTCString().split(' ')[4]} GMT+0
          </div>
        </footer>
      </main>

      <BriefDetail 
        signal={selectedSignal} 
        deepDive={deepDive} 
        onClose={() => setSelectedSignal(null)}
        isLoading={detailLoading}
      />
    </div>
  );
}
