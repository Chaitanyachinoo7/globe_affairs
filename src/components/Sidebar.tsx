import React from 'react';
import { 
  Globe, 
  MapPin, 
  ShieldAlert, 
  TrendingUp, 
  History, 
  Zap, 
  Lock,
  ChevronRight,
  Hexagon
} from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeRegion: string;
  onRegionChange: (region: string) => void;
}

const regions = [
  { name: 'Global', icon: Globe },
  { name: 'Asia-Pacific', icon: MapPin },
  { name: 'EurAsia', icon: MapPin },
  { name: 'Middle East', icon: ShieldAlert },
  { name: 'Americas', icon: MapPin },
  { name: 'Africa', icon: MapPin },
];

const categories = [
  { name: 'Macro', icon: TrendingUp },
  { name: 'Geopolitics', icon: Hexagon },
  { name: 'History', icon: History },
  { name: 'Flashpoints', icon: Zap },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeRegion, onRegionChange }) => {
  return (
    <aside className="w-64 border-r border-intel-border h-screen flex flex-col bg-opacity-50 backdrop-blur-md">
      <div class="h-14 border-b border-intel-border flex items-center justify-between px-6 shrink-0 bg-intel-card">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 bg-intel-accent rounded-sm flex items-center justify-center text-black font-bold text-xs">GP</div>
          <span class="font-semibold tracking-wider text-sm flex items-center gap-1">GLOBAL <span class="text-intel-subtle">PANORAMA</span></span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
        <div>
          <h2 className="text-[10px] font-bold text-intel-subtle uppercase tracking-widest mb-3 px-2">Region Watch</h2>
          <nav className="space-y-1">
            {regions.map((region) => (
              <button
                key={region.name}
                onClick={() => onRegionChange(region.name)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded text-xs transition-all",
                  activeRegion === region.name 
                    ? "bg-intel-border/50 text-white" 
                    : "text-intel-muted hover:bg-intel-border/30 hover:text-white"
                )}
              >
                <span>{region.name}</span>
                {activeRegion === region.name && (
                  <span className="w-1.5 h-1.5 rounded-full bg-intel-accent animate-pulse"></span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-[10px] font-bold text-intel-subtle uppercase tracking-widest mb-3 px-2">Signal Filters</h2>
          <div className="space-y-2 px-3">
            {[
              { name: 'Sanctions Control', color: 'amber-500' },
              { name: 'Supply Shock', color: 'blue-500' },
              { name: 'Sovereign Debt', color: 'purple-500' }
            ].map(filter => (
              <label key={filter.name} className="flex items-center gap-2 text-[11px] text-intel-muted cursor-pointer hover:text-intel-text transition-colors">
                <div className={`w-2.5 h-2.5 rounded border border-${filter.color}/40 bg-${filter.color}/10`}></div>
                {filter.name}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 flex flex-col gap-4">
        <div className="p-3 border border-intel-border rounded bg-slate-900/30">
          <p className="text-[10px] italic text-intel-subtle leading-tight mb-2">"History doesn't repeat, but it often rhymes."</p>
          <p className="text-[9px] text-intel-deep font-mono bg-intel-subtle/20 px-1 inline-block">Mark Twain Module Active</p>
        </div>

        <div className="p-2 border-t border-intel-border pt-4">
          <div className="flex items-center gap-2 text-[9px] text-intel-subtle font-mono">
            <span className="text-green-500 animate-pulse">●</span> LIVE FEED: STABLE
          </div>
        </div>
      </div>
    </aside>
  );
};
