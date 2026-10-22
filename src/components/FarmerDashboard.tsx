import React, { useState } from 'react';
import { ProcurementCentre, SlotBooking } from '../types';
import { ProcurementGPSTracker } from './ProcurementGPSTracker';
import {
  PlusCircle,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  IndianRupee,
  Truck,
  QrCode,
  ArrowRight
} from 'lucide-react';

interface FarmerDashboardProps {
  centres: ProcurementCentre[];
  onBookSlot: (centre: ProcurementCentre) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({ centres, onBookSlot }) => {
  const [bookings, setBookings] = useState<SlotBooking[]>([
    {
      id: 'BK-9081',
      farmerId: 'F-102',
      farmerName: 'Ramesh Kumar',
      farmerPhone: '+91 98765 43210',
      centreId: 'pc-1',
      centreName: 'Lucknow Central APMC Mandi',
      crop: 'Wheat',
      quantityQuintals: 45,
      estimatedPayment: 102375,
      date: '2025-03-28',
      timeSlot: '10:00 AM - 12:00 PM',
      status: 'CONFIRMED',
      tokenNumber: 'LKO-W-042'
    },
    {
      id: 'BK-8712',
      farmerId: 'F-102',
      farmerName: 'Ramesh Kumar',
      farmerPhone: '+91 98765 43210',
      centreId: 'pc-3',
      centreName: 'Barabanki State Warehousing Corporation',
      crop: 'Paddy',
      quantityQuintals: 30,
      estimatedPayment: 65490,
      date: '2025-03-15',
      timeSlot: '02:00 PM - 04:00 PM',
      status: 'PAID',
      tokenNumber: 'BBK-P-018'
    }
  ]);

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome & KPI Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold px-3 py-1 rounded-full inline-block">
              🌾 Verified Farmer Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display">
              Namaste, Ramesh Kumar Ji
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
              Aadhaar Verified ID: <strong className="text-amber-300 font-mono">XXXX-XXXX-4821</strong> • Hardoi, Uttar Pradesh
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
              <span className="text-emerald-200 text-[11px] block">Total Harvest Sold</span>
              <span className="text-xl font-extrabold text-white">75 Quintals</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
              <span className="text-emerald-200 text-[11px] block">Direct Bank Transfer</span>
              <span className="text-xl font-extrabold text-amber-300">₹1,67,865</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 col-span-2 sm:col-span-1">
              <span className="text-emerald-200 text-[11px] block">Active Slot Token</span>
              <span className="text-xl font-extrabold text-emerald-300">LKO-W-042</span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Bookings List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            Your Procurement Appointments & Slot Tokens
          </h2>
          <span className="text-xs text-slate-500 font-semibold">{bookings.length} Bookings Found</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-emerald-300 transition-all space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Token #{booking.tokenNumber}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 font-display">{booking.crop} Harvest Delivery</h3>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    booking.status === 'CONFIRMED'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-blue-100 text-blue-800 border-blue-300'
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Procurement Centre:</span>
                  <span className="font-bold text-slate-800">{booking.centreName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Scheduled Date & Time:</span>
                  <span className="font-semibold text-slate-800">{booking.date} ({booking.timeSlot})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Quantity & Guaranteed MSP:</span>
                  <span className="font-bold text-emerald-700">{booking.quantityQuintals} Quintals • ₹{booking.estimatedPayment.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5 text-slate-500" /> Digital QR Token Ready
                </span>
                <a
                  href="#gps-tracker"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                >
                  View Live Route <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Live Google Location GPS Tracker Section */}
      <div id="gps-tracker" className="pt-4">
        <ProcurementGPSTracker centres={centres} onBookSlot={onBookSlot} />
      </div>
    </div>
  );
};
