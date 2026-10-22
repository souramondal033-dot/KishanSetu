import React from 'react';
import { UserRole } from '../types';
import { Sprout, Navigation, Globe, ShieldCheck, UserCheck, ArrowRight, MapPin } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  lang: string;
  onLangChange: (lang: string) => void;
  onOpenDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  lang,
  onLangChange,
  onOpenDemo
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-amber-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
            <Sprout className="w-6 h-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg sm:text-xl font-display tracking-tight text-white">
                KishanSetu
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                Hackathon Final
              </span>
            </div>
            <span className="text-[11px] text-slate-400 block -mt-1 hidden sm:block">
              Smart Procurement & Live GPS Mandi Tracker
            </span>
          </div>
        </div>

        {/* Quick Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
          <a href="#gps-tracker" className="hover:text-emerald-400 flex items-center gap-1.5 transition-colors">
            <MapPin className="w-4 h-4 text-emerald-400" /> Mandi GPS Tracker
          </a>
          <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
          <a href="#msp-rates" className="hover:text-emerald-400 transition-colors">Govt MSP Rates</a>
        </nav>

        {/* Controls: Role Switcher, Language & Demo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDemo}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 text-xs font-bold transition-all"
          >
            🎬 Interactive Demo
          </button>

          <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex items-center gap-1 text-xs">
            <button
              onClick={() => onRoleChange('farmer')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                currentRole === 'farmer'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🌾 Farmer Portal
            </button>
            <button
              onClick={() => onRoleChange('agent')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                currentRole === 'agent'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              🏛️ Mandi Agent
            </button>
          </div>

          <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-xl px-2 py-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={lang}
              onChange={(e) => onLangChange(e.target.value)}
              className="bg-transparent text-white font-semibold focus:outline-none text-xs"
            >
              <option value="en" className="bg-slate-900">English</option>
              <option value="hi" className="bg-slate-900">हिंदी (Hindi)</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};
