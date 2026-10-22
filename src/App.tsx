import React, { useState } from 'react';
import { Header } from './components/Header';
import { FarmerDashboard } from './components/FarmerDashboard';
import { AgentDashboard } from './components/AgentDashboard';
import { ProcurementGPSTracker } from './components/ProcurementGPSTracker';
import { DemoModal } from './components/DemoModal';
import { PROCUREMENT_CENTRES } from './data/procurementCentres';
import { UserRole, ProcurementCentre } from './types';
import {
  Sprout,
  MapPin,
  ShieldCheck,
  IndianRupee,
  Truck,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Building2,
  Navigation
} from 'lucide-react';

export function App() {
  const [role, setRole] = useState<UserRole>('farmer');
  const [lang, setLang] = useState<string>('en');
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState<string | null>(null);

  const handleBookSlot = (centre: ProcurementCentre) => {
    setBookingSuccessMsg(`Slot reserved successfully at ${centre.name}! Delivery token generated.`);
    setTimeout(() => setBookingSuccessMsg(null), 6000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        currentRole={role}
        onRoleChange={setRole}
        lang={lang}
        onLangChange={setLang}
        onOpenDemo={() => setIsDemoOpen(true)}
      />

      {bookingSuccessMsg && (
        <div className="bg-emerald-600 text-white font-bold text-xs py-3 px-4 text-center shadow-lg transition-all sticky top-16 z-40 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{bookingSuccessMsg}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Main Role-Based Dashboard View */}
        {role === 'farmer' ? (
          <FarmerDashboard centres={PROCUREMENT_CENTRES} onBookSlot={handleBookSlot} />
        ) : (
          <AgentDashboard centres={PROCUREMENT_CENTRES} />
        )}

        {/* Feature Highlights Banner */}
        <section id="features" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Transforming Agricultural Procurement
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 font-display">
              Why KishanSetu Solves the Mandi Congestion Problem
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Connecting rural farmers directly with government procurement centers through real-time GPS tracking and guaranteed slot scheduling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center font-bold">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Real-Time Location GPS Tracker</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Uses browser geolocation and Haversine mathematical calculations to locate the nearest government APMC mandi, state warehouse, or FCI depot with turn-by-turn navigation links.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Live Mandi Queue Visibility</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Check vehicle counts and estimated wait times at each procurement center before driving your harvest tractor, preventing long overnight queues.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Guaranteed Govt MSP Payments</h3>
              <p className="text-slate-600 text-xs leading-relaxed">
                Direct integration with PFMS payment gateways ensures full Minimum Support Price transfers straight into the farmer's verified bank account without commission agents.
              </p>
            </div>
          </div>
        </section>

        {/* Live MSP Rates Section */}
        <section id="msp-rates" className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-amber-400 font-extrabold text-xs uppercase tracking-wider">
                Govt Minimum Support Price (MSP) 2024-25
              </span>
              <h2 className="text-xl font-bold font-display mt-1">Official MSP Rates for Major Crops</h2>
            </div>
            <span className="text-xs text-slate-400 font-mono bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
              Verified by Ministry of Agriculture
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
              <span className="text-slate-400 block font-semibold">🌾 Wheat</span>
              <span className="text-emerald-400 font-extrabold text-lg">₹2,275 / Quintal</span>
              <span className="text-[10px] text-slate-500 block">Up ₹150 from last year</span>
            </div>

            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
              <span className="text-slate-400 block font-semibold">🌾 Paddy (Common)</span>
              <span className="text-emerald-400 font-extrabold text-lg">₹2,183 / Quintal</span>
              <span className="text-[10px] text-slate-500 block">Grade A @ ₹2,203/Q</span>
            </div>

            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
              <span className="text-slate-400 block font-semibold">🌱 Mustard / Rapeseed</span>
              <span className="text-emerald-400 font-extrabold text-lg">₹5,650 / Quintal</span>
              <span className="text-[10px] text-slate-500 block">Oil content verified</span>
            </div>

            <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 space-y-1">
              <span className="text-slate-400 block font-semibold">🫘 Gram (Chana)</span>
              <span className="text-emerald-400 font-extrabold text-lg">₹5,440 / Quintal</span>
              <span className="text-[10px] text-slate-500 block">Moisture limit &lt; 12%</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-white text-sm font-display">KishanSetu</span>
            <span className="text-slate-500">• Hackathon Finals Build</span>
          </div>

          <p className="text-slate-500 text-[11px]">
            Created for Hackathon Finals Submission. Features Google Location GPS Tracking & Automated MSP Procurement Workflow.
          </p>

          <div className="flex items-center gap-4 text-slate-300 font-semibold">
            <a href="#gps-tracker" className="hover:text-emerald-400">GPS Tracker</a>
            <a href="#msp-rates" className="hover:text-emerald-400">MSP Rates</a>
          </div>
        </div>
      </footer>

      <DemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}

export default App;
