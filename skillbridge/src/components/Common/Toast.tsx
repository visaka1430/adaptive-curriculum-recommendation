import React from 'react';

interface ToastProps {
  message: string | null;
  visible: boolean;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, visible }) => {
  if (!visible || !message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1E293B] text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 border border-slate-700/60 backdrop-blur-md transition-all duration-300 animate-in fade-in slide-in-from-bottom-3">
      <span className="material-symbols-outlined text-[19px] text-[#FF6F61]">check_circle</span>
      <span className="font-headline font-medium text-sm text-slate-100">{message}</span>
    </div>
  );
};
