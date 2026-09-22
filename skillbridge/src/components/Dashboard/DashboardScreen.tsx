import React, { useState } from 'react';
import { UserProfile, CredentialRecord, NotificationItem } from '../../types';
import { mockNotifications } from '../../data/mockData';

interface DashboardScreenProps {
  user: UserProfile;
  onOpenCredentialModal: () => void;
  onNavigateToZeroData: () => void;
  onToast: (msg: string) => void;
  onSwitchRole: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  onOpenCredentialModal,
  onNavigateToZeroData,
  onToast,
  onSwitchRole,
}) => {
  const [activeNav, setActiveNav] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('AY 2024-2025');

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    onToast('All notifications marked as read');
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'space_dashboard' },
    { id: 'curriculum-certificates', label: 'Curriculum & Certificates', icon: 'verified' },
    { id: 'academic-info', label: 'Academic Info', icon: 'school' },
    { id: 'soft-skills-activities', label: 'Soft Skills & Activities', icon: 'psychology' },
    { id: 'projects-publications', label: 'Projects & Publications', icon: 'rocket_launch' },
    { id: 'competitions', label: 'Competitions', icon: 'military_tech' },
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      setShowCommandPalette(true);
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="min-h-screen bg-[#F7F9FB] flex flex-col focus:outline-none"
    >
      {/* ⌘K Command Palette Overlay */}
      {showCommandPalette && (
        <div
          className="fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 p-4"
          onClick={() => setShowCommandPalette(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 border-b border-slate-200 flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400 text-[20px]">search</span>
              <input
                autoFocus
                placeholder="Type a command or search record..."
                className="w-full text-sm outline-none text-slate-800 placeholder:text-slate-400"
              />
              <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">ESC</span>
            </div>
            <div className="p-2 space-y-1 text-xs">
              <button
                onClick={() => {
                  setShowCommandPalette(false);
                  onOpenCredentialModal();
                }}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 flex items-center gap-2.5 text-slate-700"
              >
                <span className="material-symbols-outlined text-[18px] text-[#EE6356]">verified</span>
                <span>Open AWS Certified Solutions Architect Modal</span>
              </button>
              <button
                onClick={() => {
                  setShowCommandPalette(false);
                  onNavigateToZeroData();
                }}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 flex items-center gap-2.5 text-slate-700"
              >
                <span className="material-symbols-outlined text-[18px] text-blue-600">layers</span>
                <span>Switch to Zero-Data Empty States Showcase</span>
              </button>
              <button
                onClick={() => {
                  setShowCommandPalette(false);
                  onToast('Exporting verified academic portfolio transcript...');
                }}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 flex items-center gap-2.5 text-slate-700"
              >
                <span className="material-symbols-outlined text-[18px] text-emerald-600">download</span>
                <span>Export Full Official Transcript &amp; Cryptographic Ledger</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-72 bg-[#1E293B] z-40 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] hidden lg:flex">
        <div className="flex flex-col">
          {/* Logo & Tagline */}
          <div className="px-6 py-6 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#EE6356] flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-[20px]">hub</span>
              </div>
              <div className="flex items-baseline font-headline font-bold text-xl tracking-tight">
                <span className="text-white">Skill</span>
                <span className="text-[#EE6356] ml-0.5">Bridge</span>
              </div>
            </div>
            <span className="font-headline text-[11px] font-semibold text-slate-400 tracking-wider uppercase pl-1">
              beat the job market
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-3 mt-2">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    if (item.id === 'curriculum-certificates') {
                      onOpenCredentialModal();
                    } else {
                      onToast(`Switched view to ${item.label}`);
                    }
                  }}
                  className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-left transition-all font-headline font-semibold text-xs cursor-pointer ${
                    isActive
                      ? 'bg-slate-700/60 text-white border-l-4 border-[#EE6356]'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Card & Support Footer */}
        <div className="p-4 flex flex-col gap-2 bg-[#091426]/50 border-t border-slate-700/50">
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex flex-col">
              <span className="font-headline font-semibold text-xs text-white">{user.name}</span>
              <span className="text-[11px] text-slate-400">
                {user.major} {user.classYear}
              </span>
            </div>
            <button
              onClick={onSwitchRole}
              className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Switch to Institutional Administrator view"
            >
              <span className="material-symbols-outlined text-[18px]">swap_horiz</span>
            </button>
          </div>

          <button
            onClick={() => onToast('Connecting to Stanford Academic Advising & Career Counseling...')}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white font-headline text-xs transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">help_center</span>
            <span>Help &amp; Advising Support</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area (offset by 72 on desktop) */}
      <div className="lg:pl-72 flex-1 flex flex-col">
        {/* Top Sticky Header */}
        <header className="sticky top-0 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 z-30 flex items-center justify-between px-6 sm:px-8">
          {/* Left: Search Bar & University Pill */}
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search competencies, records, peers..."
                className="w-full h-11 pl-11 pr-14 bg-slate-100/80 hover:bg-slate-100 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#EE6356]/20 transition-all"
              />
              <button
                onClick={() => setShowCommandPalette(true)}
                className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-600 font-mono text-[10px] cursor-pointer"
              >
                ⌘K
              </button>
            </div>

            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d0e1fb] text-[#1E293B] whitespace-nowrap text-xs font-headline font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#EE6356]"></span>
              <span>{user.university}</span>
            </div>
          </div>

          {/* Right: Notifications & User Avatar */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#EE6356] text-white font-headline text-[10px] flex items-center justify-center leading-none font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-headline font-bold text-xs text-slate-800">Recent Notifications</span>
                    <button
                      onClick={markAllRead}
                      className="text-[11px] font-headline text-[#EE6356] hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto mt-1">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2 px-1 hover:bg-slate-50 rounded-lg text-xs">
                        <div className="flex items-center justify-between font-headline font-semibold text-slate-800">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                        </div>
                        <p className="text-slate-500 text-[11px] mt-0.5">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200"></div>

            {/* Profile pill */}
            <div
              onClick={() => onToast('Logged in as Alex Chen (Student account)')}
              className="flex items-center gap-2.5 cursor-pointer p-1 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-[#091426] flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-[18px]">person</span>
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-white flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-[#EE6356]"></span>
                </span>
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="font-headline font-semibold text-xs text-slate-900 leading-tight">{user.name}</span>
                <span className="font-headline text-[11px] text-slate-500 leading-tight">Student</span>
              </div>
              <span className="material-symbols-outlined text-slate-400 text-[18px]">expand_more</span>
            </div>
          </div>
        </header>

        {/* Dashboard Main Workspace */}
        <main className="p-6 sm:p-8 space-y-6 flex-1">
          {/* Top Hero Banner & Quick Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-headline font-extrabold text-2xl text-[#091426] tracking-tight">
                Academic Portfolio &amp; Career Ledger
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Stanford University School of Engineering • Continuous Skill Verification
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={onOpenCredentialModal}
                className="px-4 py-2 rounded-xl bg-[#EE6356] hover:bg-[#FA5246] text-white font-headline font-semibold text-xs shadow-sm hover:shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>View AWS Solutions Architect Record</span>
              </button>

              <button
                onClick={onNavigateToZeroData}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-headline font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-blue-600">layers</span>
                <span>Zero-Data Patterns</span>
              </button>
            </div>
          </div>

          {/* 4 Key Metrics Cards Matching Screen 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Overall Competency */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
              <span className="font-headline text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Overall Competency
              </span>
              <div className="flex items-baseline justify-between">
                <span className="font-headline font-bold text-2xl text-[#091426] tabular-nums">94.8%</span>
                <span className="text-[#EE6356] font-headline font-semibold text-xs flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>+4.2%
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#EE6356] h-full w-[94.8%] rounded-full transition-all duration-500"></div>
              </div>
            </div>

            {/* 2. Verified Badges */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
              <span className="font-headline text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Verified Badges
              </span>
              <div className="flex items-baseline justify-between">
                <span className="font-headline font-bold text-2xl text-[#091426] tabular-nums">18</span>
                <span className="text-xs text-slate-500">3 Pending</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#091426] h-full w-[85%] rounded-full transition-all duration-500"></div>
              </div>
            </div>

            {/* 3. Active Capstones */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
              <span className="font-headline text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Active Capstones
              </span>
              <div className="flex items-baseline justify-between">
                <span className="font-headline font-bold text-2xl text-[#091426] tabular-nums">4</span>
                <span className="text-xs text-slate-500">Stanford CS Lab</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-slate-600 h-full w-[60%] rounded-full transition-all duration-500"></div>
              </div>
            </div>

            {/* 4. Market Readiness */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm space-y-2">
              <span className="font-headline text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Market Readiness
              </span>
              <div className="flex items-baseline justify-between">
                <span className="font-headline font-bold text-2xl text-[#091426]">Tier 1</span>
                <span className="font-headline font-semibold text-xs text-[#EE6356]">Top 5%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#EE6356] h-full w-[92%] rounded-full transition-all duration-500"></div>
              </div>
            </div>
          </div>

          {/* Curriculum Progress Matrix & Recent Institutional Sign-offs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Curriculum Progress Matrix */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-headline font-bold text-base text-[#091426]">Curriculum Progress Matrix</h3>
                  <p className="text-xs text-slate-500">Stanford Computer Science &amp; Systems Specialization</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="h-8 px-2.5 rounded-lg bg-slate-100 border-0 text-xs font-headline font-semibold text-slate-700"
                  >
                    <option>AY 2024-2025</option>
                    <option>AY 2023-2024</option>
                  </select>
                </div>
              </div>

              {/* Matrix Interactive Items */}
              <div className="space-y-3 pt-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-headline">
                    <span className="font-semibold text-slate-800">Distributed Systems &amp; Cloud Infrastructure</span>
                    <span className="text-[#EE6356] font-bold">98% Mastery</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#EE6356] w-[98%] rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-headline">
                    <span className="font-semibold text-slate-800">Deep Learning &amp; Autonomous Agents</span>
                    <span className="text-slate-700 font-bold">94% Mastery</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#1E293B] w-[94%] rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-headline">
                    <span className="font-semibold text-slate-800">Database Internals &amp; Storage Engines</span>
                    <span className="text-slate-700 font-bold">91% Mastery</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-600 w-[91%] rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-headline">
                    <span className="font-semibold text-slate-800">Information Retrieval &amp; Vector Indexing</span>
                    <span className="text-slate-700 font-bold">89% Mastery</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-500 w-[89%] rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Coursework list pills */}
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">CS244B: Distributed Systems (A+)</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">CS229: Machine Learning (A)</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">CS145: Data Management (A+)</span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">CS251: Cryptocurrencies &amp; Blockchains (A)</span>
              </div>
            </div>

            {/* Right Col: Recent Institutional Sign-offs */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="font-headline font-bold text-base text-[#091426]">Recent Institutional Sign-offs</h3>
                <p className="text-xs text-slate-500">Dean of Engineering cryptographic seals</p>

                <div className="space-y-2.5 mt-4">
                  {/* Item 1 */}
                  <div className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-between border border-slate-100 transition-colors">
                    <div>
                      <span className="font-headline font-semibold text-xs text-[#091426] block">
                        Distributed Systems (CS244B)
                      </span>
                      <span className="text-[11px] text-slate-400 block">Coursework Final Evaluation</span>
                    </div>
                    <span className="font-headline font-bold text-xs text-[#EE6356] bg-[#FFF1F0] px-2 py-0.5 rounded-full">
                      Passed A+
                    </span>
                  </div>

                  {/* Item 2 (Clickable trigger for AWS modal!) */}
                  <div
                    onClick={onOpenCredentialModal}
                    className="p-3 bg-slate-50 hover:bg-[#FFF1F0]/50 rounded-xl flex items-center justify-between border border-slate-100 hover:border-[#EE6356]/30 cursor-pointer transition-all group"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-headline font-semibold text-xs text-[#091426] group-hover:text-[#EE6356] transition-colors">
                          AWS Solutions Architect
                        </span>
                        <span className="material-symbols-outlined text-[14px] text-slate-400 group-hover:text-[#EE6356]">
                          open_in_new
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 block">Professional Certification</span>
                    </div>
                    <span className="font-headline font-semibold text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Verified
                    </span>
                  </div>

                  {/* Item 3 */}
                  <div className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl flex items-center justify-between border border-slate-100 transition-colors">
                    <div>
                      <span className="font-headline font-semibold text-xs text-[#091426] block">
                        MIT Hackathon 1st Place
                      </span>
                      <span className="text-[11px] text-slate-400 block">Collegiate Podium Ledger</span>
                    </div>
                    <span className="font-headline font-bold text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
                      Gold Trophy
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Ledger Sync: 100% Valid</span>
                <button
                  onClick={onOpenCredentialModal}
                  className="font-headline font-semibold text-[#EE6356] hover:underline cursor-pointer"
                >
                  Inspect Full Modal &rarr;
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
