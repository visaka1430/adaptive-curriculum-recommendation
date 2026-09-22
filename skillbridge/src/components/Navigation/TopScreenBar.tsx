import React from 'react';
import { AppScreen } from '../../types';

interface TopScreenBarProps {
  currentScreen: AppScreen;
  onSelectScreen: (screen: AppScreen) => void;
  onOpenModal: () => void;
}

export const TopScreenBar: React.FC<TopScreenBarProps> = ({
  currentScreen,
  onSelectScreen,
  onOpenModal,
}) => {
  return (
    <div className="bg-[#091426] border-b border-slate-800 text-white px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs sticky top-0 z-50">
      {/* Left: Screen Switcher Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-slate-400 font-headline font-semibold uppercase tracking-wider text-[10px] hidden sm:inline">
          SkillBridge Screens:
        </span>

        <button
          onClick={() => onSelectScreen('desktop-auth')}
          className={`px-3 py-1.5 rounded-lg font-headline font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentScreen === 'desktop-auth'
              ? 'bg-[#FF6F61] text-white shadow-sm'
              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">desktop_windows</span>
          <span>1. Desktop Auth (Screen 4)</span>
        </button>

        <button
          onClick={() => onSelectScreen('mobile-auth')}
          className={`px-3 py-1.5 rounded-lg font-headline font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentScreen === 'mobile-auth'
              ? 'bg-[#FF6F61] text-white shadow-sm'
              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">smartphone</span>
          <span>2. Mobile Auth (Screen 1)</span>
        </button>

        <button
          onClick={() => onSelectScreen('dashboard')}
          className={`px-3 py-1.5 rounded-lg font-headline font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentScreen === 'dashboard'
              ? 'bg-[#FF6F61] text-white shadow-sm'
              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">dashboard</span>
          <span>3. Dashboard & Records (Screen 2)</span>
        </button>

        <button
          onClick={() => onSelectScreen('zero-data-showcase')}
          className={`px-3 py-1.5 rounded-lg font-headline font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            currentScreen === 'zero-data-showcase'
              ? 'bg-[#FF6F61] text-white shadow-sm'
              : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">layers</span>
          <span>4. Zero-Data Patterns (Screen 3)</span>
        </button>
      </div>

      {/* Right: Quick Action to open the Credential Modal & Live indicator */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenModal}
          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-headline font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
          title="Open the AWS Certified Solutions Architect Modal"
        >
          <span className="material-symbols-outlined text-[16px] text-emerald-400">verified</span>
          <span>Inspect Credential Modal</span>
        </button>

        <div className="hidden lg:flex items-center gap-1.5 text-slate-400 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Institutional Sync v2.4</span>
        </div>
      </div>
    </div>
  );
};
