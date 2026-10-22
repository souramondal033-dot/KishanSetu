import React, { useState } from 'react';
import { ProcurementCentre } from '../types';
import { ProcurementGPSTracker } from './ProcurementGPSTracker';
import {
  Building2,
  Scale,
  Truck,
  CheckCircle,
  Search,
  IndianRupee,
  UserCheck,
  Clock,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';

interface AgentDashboardProps {
  centres: ProcurementCentre[];
}

export const AgentDashboard: React.FC<AgentDashboardProps> = ({ centres }) => {
  const [selectedCentre, setSelectedCentre] = useState<ProcurementCentre>(centres[0]);
  const [weighmentInput, setWeighmentInput] = useState('');
  const [qualityGrade, setQualityGrade] = useState('Grade A (Dry)');
  const [processedStatus, setProcessedStatus] = useState<string | null>(null);

  const handleProcessWeighment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weighmentInput) return;
    const qty = parseFloat(weighmentInput);
    const msp = selectedCentre.mspRates['Wheat'] || 2275;
    const total = qty * msp;
    setProcessedStatus(`Weighment logged for ${qty} Quintals (${qualityGrade}). PFMS Direct Bank Payment of ₹${total.toLocaleString('en-IN')} approved!`);
    setWeighmentInput('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Agent Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold px-3 py-1 rounded-full inline-block">
              🏛️ Government Procurement Officer Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              Official Mandi Procurement Control Console
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Log verified weighment data, approve quality grading, monitor GPS vehicle arrivals, and initiate automated PFMS direct bank transfers.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
            <span className="text-xs text-slate-400 block font-semibold">Active Operating Centre</span>
            <select
              value={selectedCentre.id}
              onChange={(e) => {
                const found = centres.find((c) => c.id === e.target.value);
                if (found) setSelectedCentre(found);
              }}
              className="bg-slate-900 text-emerald-400 font-bold text-xs p-2 rounded-xl border border-slate-700 w-full focus:outline-none"
            >
              {centres.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.district})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Quick Agent Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weighment & Quality Grading Entry */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">Live Weighbridge & Grade Entry</h2>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md">
              Govt Scale Calibration Active
            </span>
          </div>

          {processedStatus && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-2xl text-xs font-bold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{processedStatus}</span>
            </div>
          )}

          <form onSubmit={handleProcessWeighment} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Farmer Token ID / Aadhaar</label>
                <input
                  type="text"
                  defaultValue="LKO-W-042 (Ramesh Kumar)"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-semibold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Crop Type</label>
                <select className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 font-semibold">
                  {selectedCentre.cropsAccepted.map((crop) => (
                    <option key={crop} value={crop}>{crop} (MSP ₹{selectedCentre.mspRates[crop] ?? 2275}/Q)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Electronic Weighment (Quintals)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weighmentInput}
                  onChange={(e) => setWeighmentInput(e.target.value)}
                  placeholder="e.g. 45.5"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Moisture & Quality Grade</label>
                <select
                  value={qualityGrade}
                  onChange={(e) => setQualityGrade(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 font-semibold"
                >
                  <option value="Grade A (Moisture < 12%)">Grade A (Moisture &lt; 12% - Full MSP)</option>
                  <option value="Grade B (Moisture 12-14%)">Grade B (Moisture 12-14% - Standard MSP)</option>
                  <option value="Fair Average Quality (FAQ)">Fair Average Quality (FAQ)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" /> Confirm Weighment & Generate Automated PFMS Voucher
            </button>
          </form>
        </div>

        {/* Live Queue & Vehicle Tracking */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-bold text-slate-900">Arriving Vehicles GPS Queue</h2>
            </div>
            <span className="text-xs text-slate-500 font-bold">{selectedCentre.queueVehicles} Vehicles in Gate Queue</span>
          </div>

          <div className="space-y-3">
            {[
              { id: 'TRK-UP32-8812', farmer: 'Ramesh Kumar', crop: 'Wheat · 45 Q', status: 'At Gate Weighbridge', time: '2 mins ago' },
              { id: 'TRK-UP32-4109', farmer: 'Suresh Chandra', crop: 'Mustard · 28 Q', status: 'GPS En Route (1.2 km)', time: 'ETA 5 mins' },
              { id: 'TRK-UP32-1102', farmer: 'Mohd. Aslam', crop: 'Paddy · 60 Q', status: 'Quality Lab Inspection', time: '12 mins ago' }
            ].map((v) => (
              <div key={v.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-800">{v.id} • {v.farmer}</div>
                  <div className="text-slate-500 text-[11px]">{v.crop}</div>
                </div>
                <div className="text-right">
                  <span className="text-emerald-700 font-bold block">{v.status}</span>
                  <span className="text-[10px] text-slate-400">{v.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Embedded Live Google Location GPS Tracker Section for Agents */}
      <div id="gps-tracker" className="pt-4">
        <ProcurementGPSTracker centres={centres} />
      </div>
    </div>
  );
};
