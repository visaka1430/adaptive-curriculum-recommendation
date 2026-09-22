import React, { useState } from 'react';
import { ZeroStatePattern } from '../../types';
import { zeroStatePatterns } from '../../data/mockData';
import {
  IllustrationCert,
  IllustrationRocket,
  IllustrationTrophy,
  IllustrationBook,
  IllustrationPuzzle,
  IllustrationCalendar,
  IllustrationGrand,
} from '../Common/Illustrations';

interface EmptyStatesShowcaseProps {
  onToast: (msg: string) => void;
  onOpenCredentialModal: () => void;
}

export const EmptyStatesShowcase: React.FC<EmptyStatesShowcaseProps> = ({
  onToast,
  onOpenCredentialModal,
}) => {
  const [filterModule, setFilterModule] = useState<'all' | 'student' | 'institution'>('all');
  const [layoutMode, setLayoutMode] = useState<'grid' | 'deck'>('grid');
  const [activeSandboxId, setActiveSandboxId] = useState<number>(1);
  const [showSimModal, setShowSimModal] = useState(false);
  const [simTitle, setSimTitle] = useState('');
  const [simCategory, setSimCategory] = useState('Certificate');
  const [codeModalPattern, setCodeModalPattern] = useState<ZeroStatePattern | null>(null);

  const filteredPatterns = zeroStatePatterns.filter((p) => {
    if (filterModule === 'all') return true;
    return p.module === filterModule;
  });

  const activeSandboxPattern =
    zeroStatePatterns.find((p) => p.id === activeSandboxId) || zeroStatePatterns[0];

  const renderIllustration = (type: ZeroStatePattern['svgType'], className = 'w-36 h-36') => {
    switch (type) {
      case 'cert':
        return <IllustrationCert className={className} />;
      case 'rocket':
        return <IllustrationRocket className={className} />;
      case 'trophy':
        return <IllustrationTrophy className={className} />;
      case 'book':
        return <IllustrationBook className={className} />;
      case 'puzzle':
        return <IllustrationPuzzle className={className} />;
      case 'calendar':
        return <IllustrationCalendar className={className} />;
      case 'grand':
        return <IllustrationGrand className={className} />;
      default:
        return <IllustrationCert className={className} />;
    }
  };

  const handleSimSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSimModal(false);
    onToast(`Added mock entry: "${simTitle || 'New Achievement'}" to ${simCategory}`);
    setSimTitle('');
  };

  const copyCodeSnippet = (pattern: ZeroStatePattern) => {
    const snippet = `// SkillBridge Empty State Pattern: ${pattern.patternCode}
<EmptyStateCard
  code="${pattern.patternCode}"
  headline="${pattern.headline}"
  description="${pattern.description}"
  primaryCta="${pattern.primaryCta}"
  secondaryCta="${pattern.secondaryCta}"
/>`;
    navigator.clipboard?.writeText(snippet);
    onToast(`Copied ${pattern.patternCode} component code snippet!`);
  };

  const handleExportTokens = () => {
    const tokens = {
      primaryNavy: '#091426',
      accentCoral: '#EE6356',
      secondarySlate: '#505F76',
      surfaceCanvas: '#F8FAFC',
      surfaceCard: '#FFFFFF',
      borderRadiusCard: '24px',
      fontHeadings: 'Plus Jakarta Sans',
      fontBody: 'Inter',
    };
    navigator.clipboard?.writeText(JSON.stringify(tokens, null, 2));
    onToast('Exported Design Tokens (JSON) to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-6 sm:p-10 font-body selection:bg-[#EE6356]/20">
      <div className="max-w-[1400px] mx-auto space-y-8">
        {/* Breadcrumb Header */}
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-headline font-semibold uppercase tracking-wider">
            <span>Academic Portfolio &amp; Design System</span>
            <span>&gt;</span>
            <span className="text-[#EE6356]">Empty States &amp; Zero-Data Patterns</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
            <div>
              <h1 className="font-headline font-extrabold text-3xl sm:text-4xl text-[#091426] tracking-tight">
                Empty State Patterns &amp; Micro-Interactions
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                Standardized empty states designed to maintain motivation, provide low-friction on-ramps, and
                consistently prompt students and campus staff to populate their verified record.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1.5 rounded-full bg-slate-200/80 text-slate-700 font-headline font-bold text-xs">
                7 Patterns Standardized
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#FFF1F0] text-[#EE6356] font-headline font-bold text-xs border border-[#EE6356]/20">
                100% Micro Interactivity
              </span>
            </div>
          </div>
        </div>

        {/* Toolbar: Filters & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Module Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setFilterModule('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-headline font-semibold transition-all cursor-pointer ${
                filterModule === 'all' ? 'bg-white text-[#091426] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All States (7)
            </button>
            <button
              onClick={() => setFilterModule('student')}
              className={`px-3 py-1.5 rounded-lg text-xs font-headline font-semibold transition-all cursor-pointer ${
                filterModule === 'student' ? 'bg-white text-[#091426] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student Dashboard (5)
            </button>
            <button
              onClick={() => setFilterModule('institution')}
              className={`px-3 py-1.5 rounded-lg text-xs font-headline font-semibold transition-all cursor-pointer ${
                filterModule === 'institution'
                  ? 'bg-white text-[#091426] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Institution Hub (2)
            </button>
          </div>

          {/* Action buttons & Layout Toggle */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  layoutMode === 'grid' ? 'bg-white text-[#091426] shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Grid Layout"
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
              <button
                onClick={() => setLayoutMode('deck')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  layoutMode === 'deck' ? 'bg-white text-[#091426] shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
                title="Deck Layout"
              >
                <span className="material-symbols-outlined text-[18px]">view_agenda</span>
              </button>
            </div>

            <button
              onClick={() => setShowSimModal(true)}
              className="px-4 py-2 rounded-xl bg-[#EE6356] hover:bg-[#FA5246] text-white font-headline font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Test Add Action</span>
            </button>
          </div>
        </div>

        {/* Live In-Situ Dashboard Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
            <div>
              <span className="text-[11px] font-headline font-bold text-[#EE6356] tracking-widest uppercase">
                Live Component Preview
              </span>
              <h2 className="font-headline font-bold text-xl text-[#091426]">Active Sandbox Context</h2>
            </div>

            {/* Sandbox switcher pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {zeroStatePatterns.map((pat) => (
                <button
                  key={pat.id}
                  onClick={() => setActiveSandboxId(pat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-headline font-medium transition-all cursor-pointer ${
                    activeSandboxId === pat.id
                      ? 'bg-[#091426] text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {pat.headline.replace('No ', '').replace(' added yet', '').replace(' uploaded yet', '')}
                </button>
              ))}
            </div>
          </div>

          {/* Centered In-Situ Card Container */}
          <div className="py-12 px-4 rounded-2xl bg-gradient-to-b from-slate-50/80 to-slate-100/50 border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
            {/* Animated SVG Container */}
            <div className="mb-4">{renderIllustration(activeSandboxPattern.svgType, 'w-40 h-40')}</div>

            {/* Sub-category tag */}
            <span className="font-headline text-xs font-semibold text-[#EE6356] uppercase tracking-wider">
              {activeSandboxPattern.subCategory}
            </span>

            {/* Headline */}
            <h3 className="font-headline font-bold text-xl sm:text-2xl text-[#091426] mt-1.5 max-w-md">
              {activeSandboxPattern.headline}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md leading-relaxed">
              {activeSandboxPattern.description}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-6">
              <button
                onClick={() => {
                  if (activeSandboxPattern.id === 1) {
                    onOpenCredentialModal();
                  } else {
                    setShowSimModal(true);
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-[#EE6356] hover:bg-[#FA5246] text-white font-headline font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[19px]">{activeSandboxPattern.primaryIcon}</span>
                <span>{activeSandboxPattern.primaryCta}</span>
              </button>

              <button
                onClick={() => onToast(`Invoked: ${activeSandboxPattern.secondaryCta}`)}
                className="font-headline font-semibold text-xs text-slate-600 hover:text-[#091426] px-3 py-2 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                {activeSandboxPattern.secondaryCta} &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Component Showcase Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline font-bold text-xl text-[#091426]">
              All 7 Standardized Zero-Data Blueprints
            </h2>
            <span className="text-xs text-slate-500">Click any card to inspect or test action</span>
          </div>

          <div
            className={`grid gap-6 ${
              layoutMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            }`}
          >
            {filteredPatterns.map((pattern) => (
              <div
                key={pattern.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Strip */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {pattern.patternCode}
                    </span>
                    <span className={`text-[11px] font-headline font-bold ${pattern.badgeColor || 'text-slate-500'}`}>
                      {pattern.badgeText}
                    </span>
                  </div>

                  <button
                    onClick={() => copyCodeSnippet(pattern)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-[#091426] hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Copy code snippet"
                  >
                    <span className="material-symbols-outlined text-[18px]">code</span>
                  </button>
                </div>

                {/* Illustration Body */}
                <div className="flex flex-col items-center text-center my-6">
                  <div className="py-2">{renderIllustration(pattern.svgType, 'w-36 h-36')}</div>

                  <span className="font-headline text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-2">
                    {pattern.subCategory}
                  </span>

                  <h3 className="font-headline font-bold text-base text-[#091426] mt-1 group-hover:text-[#EE6356] transition-colors">
                    {pattern.headline}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                    {pattern.description}
                  </p>
                </div>

                {/* Card Actions Footer */}
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      if (pattern.id === 1) {
                        onOpenCredentialModal();
                      } else {
                        onToast(`Triggered: ${pattern.primaryCta}`);
                      }
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-[#EE6356] text-white font-headline font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[17px]">{pattern.primaryIcon}</span>
                    <span>{pattern.primaryCta}</span>
                  </button>

                  <button
                    onClick={() => onToast(`Invoked: ${pattern.secondaryCta}`)}
                    className="text-center text-[11px] font-headline font-medium text-slate-500 hover:text-[#EE6356] transition-colors py-1 cursor-pointer"
                  >
                    {pattern.secondaryCta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SkillBridge UX Principles for Zero-Data States */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-headline font-bold text-[#EE6356] tracking-widest uppercase">
                Design System Standards
              </span>
              <h2 className="font-headline font-bold text-2xl text-[#091426]">
                SkillBridge UX Principles for Zero-Data States
              </h2>
            </div>
            <button
              onClick={handleExportTokens}
              className="px-4 py-2 bg-[#091426] hover:bg-slate-800 text-white rounded-xl text-xs font-headline font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">palette</span>
              <span>Export Design Tokens (JSON)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#EE6356]/15 text-[#EE6356] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]">flag</span>
              </div>
              <h3 className="font-headline font-bold text-base text-[#091426]">Action-Oriented Prompts</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero data states must never feel like a dead end. Always provide an unambiguous primary call-to-action
                that opens the input flow or modal in 1 click.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#091426]/10 text-[#091426] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]">verified_user</span>
              </div>
              <h3 className="font-headline font-bold text-base text-[#091426]">Academic Credibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Emphasize that entries are backed by university registrars, SSO checks, and blockchain validation to
                encourage authentic credentials.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-[22px]">sync_alt</span>
              </div>
              <h3 className="font-headline font-bold text-base text-[#091426]">Low-Friction Sync</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Offer secondary import options like GitHub repositories, LinkedIn certifications, or Google Scholar
                DOIs so students aren't blocked by manual data entry.
              </p>
            </div>
          </div>

          {/* Color Tokens Strip */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="font-headline font-bold text-slate-700 text-xs">Core Color Tokens:</span>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#091426] border border-slate-300"></span>
              <span>Primary #091426</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#EE6356]"></span>
              <span>Coral Accent #EE6356</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#505F76]"></span>
              <span>Slate #505F76</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-[#F8FAFC] border border-slate-300"></span>
              <span>Surface #F8FAFC</span>
            </div>
          </div>
        </div>
      </div>

      {/* Simulation Add Modal */}
      {showSimModal && (
        <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline font-bold text-base text-slate-900">Simulate Add Achievement</h3>
              <button
                onClick={() => setShowSimModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSimSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-headline font-semibold text-slate-700 block mb-1">Target Module</label>
                <select
                  value={simCategory}
                  onChange={(e) => setSimCategory(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none"
                >
                  <option>Certificate / Industry Badge</option>
                  <option>Software Project / Capstone</option>
                  <option>Collegiate Hackathon &amp; Contest</option>
                  <option>Research Paper &amp; Pre-print</option>
                  <option>Soft Skills &amp; Leadership</option>
                  <option>Campus Placement Drive</option>
                </select>
              </div>

              <div>
                <label className="font-headline font-semibold text-slate-700 block mb-1">Entry Title</label>
                <input
                  required
                  placeholder="e.g. Distributed Consensus Engine"
                  value={simTitle}
                  onChange={(e) => setSimTitle(e.target.value)}
                  className="w-full h-10 px-3 border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:border-[#EE6356]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSimModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#EE6356] hover:bg-[#FA5246] text-white rounded-xl font-semibold"
                >
                  Save &amp; Verify
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
