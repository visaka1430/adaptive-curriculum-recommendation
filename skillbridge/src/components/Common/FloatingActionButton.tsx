import React, { useState } from 'react';

interface FloatingActionButtonProps {
  onOpenModal: () => void;
  onOpenQuickSim: () => void;
  onNavigateShowcase: () => void;
}

export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onOpenModal,
  onOpenQuickSim,
  onNavigateShowcase,
}) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex flex-col items-end gap-2.5">
      {openMenu && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-2 w-56 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-headline font-semibold text-slate-400 uppercase tracking-wider">
            Quick Actions
          </div>
          <button
            onClick={() => {
              setOpenMenu(false);
              onOpenModal();
            }}
            className="flex items-center gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors text-xs font-headline font-medium"
          >
            <span className="material-symbols-outlined text-[18px] text-[#FF6F61]">verified</span>
            <span>View Verified Record</span>
          </button>
          <button
            onClick={() => {
              setOpenMenu(false);
              onOpenQuickSim();
            }}
            className="flex items-center gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors text-xs font-headline font-medium"
          >
            <span className="material-symbols-outlined text-[18px] text-blue-600">add_task</span>
            <span>Simulate Add Entry</span>
          </button>
          <button
            onClick={() => {
              setOpenMenu(false);
              onNavigateShowcase();
            }}
            className="flex items-center gap-2.5 px-3 py-2 text-left rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors text-xs font-headline font-medium"
          >
            <span className="material-symbols-outlined text-[18px] text-amber-600">layers</span>
            <span>Zero-Data Showcase</span>
          </button>
        </div>
      )}

      <button
        onClick={() => setOpenMenu(!openMenu)}
        className="w-14 h-14 rounded-full bg-[#FF6F61] hover:bg-[#FA5246] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#FF6F61]/30 cursor-pointer"
        title="Quick Add Achievement or Metric"
        aria-label="Quick Actions"
      >
        <span
          className={`material-symbols-outlined text-[28px] transition-transform duration-200 ${
            openMenu ? 'rotate-45' : ''
          }`}
        >
          add
        </span>
      </button>
    </div>
  );
};
