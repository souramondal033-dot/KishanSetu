import React from 'react';
import { X, Play, Volume2, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full text-white p-6 sm:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Play className="w-3.5 h-3.5 fill-current" />
            HACKATHON PRESENTATION MODE
          </span>
          <h2 className="text-2xl font-extrabold font-display">
            KishanSetu — Live Flow Demo Walkthrough
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Experience how KishanSetu connects smallholder farmers directly with verified government procurement centres, eliminates middlemen, and ensures transparent MSP payments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm">
              1
            </div>
            <h3 className="font-bold text-sm text-white">Live GPS Mandi Search</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Detect location automatically or select a district to view nearby APMC mandis and warehouses.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm">
              2
            </div>
            <h3 className="font-bold text-sm text-white">Slot Booking & Token</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Reserve guaranteed delivery slots with digital QR tokens to avoid long mandi queues.
            </p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-sm">
              3
            </div>
            <h3 className="font-bold text-sm text-white">Direct PFMS Bank Transfer</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Official weighment automatically generates MSP payment directly into the farmer's bank account.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Volume2 className="w-4 h-4 text-amber-400" /> Multi-lingual voice assistance supported for rural literacy.
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-6 py-2.5 rounded-xl text-xs transition-all shadow-lg shadow-emerald-500/20"
          >
            Explore Interactive App →
          </button>
        </div>
      </div>
    </div>
  );
};
