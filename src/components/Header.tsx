import React from 'react';
import { Layers, GraduationCap, Sparkles, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#090D16]/80 backdrop-blur-md sticky top-0 z-50 transition-colors duration-150">
      <div className="max-w-[90%] mx-auto px-2 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-500/10 flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-display font-bold text-xl sm:text-2xl text-indigo-950 dark:text-indigo-100 tracking-tight">LoopScope</h1>
                <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-900/30 flex items-center gap-0.5 sm:gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> v1.0
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-sans mt-0.5">
                Observe algorithm execution exactly as the computer does.
              </p>
            </div>
          </div>
          
          <div className="flex flex-row items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:py-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-[10px] sm:text-xs font-medium w-full sm:w-auto justify-center sm:justify-start">
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 dark:text-slate-500 flex-shrink-0" />
              <span>Interactive Beginner-First Algorithmic Sandbox</span>
            </div>

            {/* Dark/Light mode selector */}
            <div className="flex bg-slate-100 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-200 dark:border-slate-800 flex-shrink-0">
              <button
                id="theme-light-btn"
                onClick={onToggleTheme}
                disabled={theme === 'light'}
                className={`p-1.5 rounded-md transition-all flex items-center justify-center cursor-pointer ${
                  theme === 'light'
                    ? 'bg-white text-amber-500 shadow-xs'
                    : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
                title="Light Mode"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                id="theme-dark-btn"
                onClick={onToggleTheme}
                disabled={theme === 'dark'}
                className={`p-1.5 rounded-md transition-all flex items-center justify-center cursor-pointer ${
                  theme === 'dark'
                    ? 'bg-slate-800 text-indigo-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
                title="Dark Mode"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
