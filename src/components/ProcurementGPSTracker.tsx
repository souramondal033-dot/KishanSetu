import React, { useState, useEffect } from 'react';
import { ProcurementCentre } from '../types';
import {
  MapPin,
  Navigation,
  Compass,
  Search,
  Filter,
  Phone,
  Clock,
  Truck,
  ShieldCheck,
  ExternalLink,
  Calendar,
  AlertCircle,
  Layers,
  RefreshCw
} from 'lucide-react';

interface ProcurementGPSTrackerProps {
  centres: ProcurementCentre[];
  onBookSlot?: (centre: ProcurementCentre) => void;
  selectedCentreId?: string;
}

// Haversine formula to compute distance in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export const ProcurementGPSTracker: React.FC<ProcurementGPSTrackerProps> = ({
  centres,
  onBookSlot,
  selectedCentreId
}) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [activeCentre, setActiveCentre] = useState<ProcurementCentre | null>(
    centres.find((c) => c.id === selectedCentreId) || centres[0] || null
  );
  const [sortBy, setSortBy] = useState<'distance' | 'capacity' | 'slots'>('distance');

  useEffect(() => {
    handleDetectLocation();
  }, []);

  const handleDetectLocation = () => {
    setLocating(true);
    setLocError(null);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: 'Your GPS Coordinates'
          });
          setLocating(false);
        },
        () => {
          setUserLocation({
            lat: 26.8467,
            lng: 80.9462,
            address: 'Lucknow, UP (Default Location)'
          });
          setLocError('Using default GPS location (Lucknow). Grant location access for exact live coordinates.');
          setLocating(false);
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      setUserLocation({
        lat: 26.8467,
        lng: 80.9462,
        address: 'Lucknow, UP (Default Location)'
      });
      setLocating(false);
    }
  };

  const centresWithDistance = centres.map((centre) => {
    const userLat = userLocation?.lat ?? 26.8467;
    const userLng = userLocation?.lng ?? 80.9462;
    const distance = calculateDistance(userLat, userLng, centre.latitude, centre.longitude);
    return { ...centre, distanceKm: distance };
  });

  const allCrops = Array.from(new Set(centres.flatMap((c) => c.cropsAccepted)));

  const filteredCentres = centresWithDistance.filter((centre) => {
    const matchesSearch =
      centre.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      centre.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      centre.state.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCrop = selectedCrop === 'All' || centre.cropsAccepted.includes(selectedCrop);
    const matchesType = selectedType === 'All' || centre.type === selectedType;
    return matchesSearch && matchesCrop && matchesType;
  });

  filteredCentres.sort((a, b) => {
    if (sortBy === 'distance') return (a.distanceKm ?? 0) - (b.distanceKm ?? 0);
    if (sortBy === 'capacity') return b.dailyCapacityQuintals - a.dailyCapacityQuintals;
    if (sortBy === 'slots') return b.availableSlotsToday - a.availableSlotsToday;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
                REAL-TIME GOVT MANDI GPS
              </span>
              <span className="bg-amber-500/20 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/30">
                100% Verified Centres
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight">
              Procurement Centre GPS Tracker & Route Planner
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Find government-verified procurement centres, check live vehicle queues, inspect MSP rates, and navigate directly using precision GPS coordinates.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 flex flex-col gap-2 shrink-0 max-w-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-emerald-400" /> Live GPS Status
              </span>
              <button
                onClick={handleDetectLocation}
                disabled={locating}
                className="text-[11px] bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors"
              >
                <RefreshCw className={`w-3 h-3 ${locating ? 'animate-spin' : ''}`} /> Refresh
              </button>
            </div>
            {userLocation ? (
              <div className="text-xs space-y-0.5">
                <div className="font-semibold text-emerald-300">
                  {userLocation.lat.toFixed(4)}°N, {userLocation.lng.toFixed(4)}°E
                </div>
                <div className="text-slate-400 text-[11px] truncate">{userLocation.address}</div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 animate-pulse">Detecting location...</div>
            )}
          </div>
        </div>

        {locError && (
          <div className="mt-4 bg-amber-500/20 border border-amber-500/30 rounded-xl p-2.5 text-xs text-amber-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-300" />
            <span>{locError}</span>
          </div>
        )}
      </div>

      {/* Filter & Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mandi name, district, state..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Crops</option>
              {allCrops.map((crop) => (
                <option key={crop} value={crop}>
                  {crop}
                </option>
              ))}
            </select>
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="All">All Centre Types</option>
            <option value="APMC Mandi">APMC Mandi</option>
            <option value="State Warehouse">State Warehouse</option>
            <option value="Govt Procurement Centre">Govt Procurement Centre</option>
            <option value="FCI Depot">FCI Depot</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="distance">Sort by: Nearest Distance</option>
            <option value="capacity">Sort by: Highest Capacity</option>
            <option value="slots">Sort by: Available Slots</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Interactive Map Visual & Centres Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-lg relative min-h-[420px] flex flex-col justify-between p-6">
            <div className="flex items-center justify-between z-10 bg-slate-900/80 backdrop-blur-md p-3 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Interactive Mandi GPS Map</span>
              </div>
              <span className="text-[11px] text-slate-400">
                {filteredCentres.length} Procurement Centres Active
              </span>
            </div>

            <div className="my-12 relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredCentres.slice(0, 6).map((centre) => {
                const isSelected = activeCentre?.id === centre.id;
                return (
                  <button
                    key={centre.id}
                    onClick={() => setActiveCentre(centre)}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-emerald-600/90 border-emerald-400 text-white shadow-lg shadow-emerald-600/40 ring-2 ring-emerald-400/30'
                        : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/30">
                        {centre.distanceKm} km
                      </span>
                      <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-emerald-400'}`} />
                    </div>
                    <div className="text-xs font-bold truncate">{centre.name}</div>
                    <div className="text-[10px] opacity-80 truncate">{centre.district}, {centre.state}</div>
                  </button>
                );
              })}
            </div>

            {activeCentre && (
              <div className="relative z-10 bg-slate-950/90 backdrop-blur-md border border-slate-800 rounded-2xl p-4 text-white shadow-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                        {activeCentre.type}
                      </span>
                      <span className="text-slate-400 text-xs flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> {activeCentre.verifiedGovtId}
                      </span>
                    </div>
                    <h3 className="text-base font-bold font-display mt-1 text-white">
                      {activeCentre.name}
                    </h3>
                    <p className="text-slate-400 text-xs flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {activeCentre.address}
                    </p>
                  </div>

                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${activeCentre.latitude},${activeCentre.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/30 transition-transform active:scale-95 shrink-0"
                  >
                    <Navigation className="w-4 h-4" /> Open Google Maps
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Distance</span>
                    <span className="text-emerald-400 font-extrabold text-sm">{activeCentre.distanceKm} km away</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Queue Status</span>
                    <span className="text-amber-400 font-bold text-sm flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> {activeCentre.queueVehicles} Vehicles
                    </span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Avg Wait Time</span>
                    <span className="text-sky-400 font-bold text-sm flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> ~{activeCentre.avgWaitMinutes} mins
                    </span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 text-[11px] block">Available Slots</span>
                    <span className="text-emerald-300 font-bold text-sm flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {activeCentre.availableSlotsToday} Slots
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-3 max-h-[680px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-slate-700">
              Showing {filteredCentres.length} Procurement Mandis
            </span>
            <span className="text-[11px] text-slate-500">
              Sorted by {sortBy}
            </span>
          </div>

          {filteredCentres.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
              <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-700">No procurement centres found</p>
            </div>
          ) : (
            filteredCentres.map((centre) => {
              const isSelected = activeCentre?.id === centre.id;
              return (
                <div
                  key={centre.id}
                  onClick={() => setActiveCentre(centre)}
                  className={`bg-white rounded-2xl p-4 border transition-all cursor-pointer shadow-xs ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20'
                      : 'border-slate-200 hover:border-emerald-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded border border-slate-200">
                          {centre.type}
                        </span>
                        <span className="text-emerald-700 font-extrabold text-xs bg-emerald-100 px-2 py-0.5 rounded">
                          📍 {centre.distanceKm} km
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 mt-1 font-display">
                        {centre.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {centre.district}, {centre.state}
                      </p>
                    </div>

                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${centre.latitude},${centre.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-100 hover:text-emerald-700 text-slate-600 transition-colors"
                      title="Navigate in Google Maps"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-slate-100 pt-2.5">
                    <span className="text-[10px] font-semibold text-slate-500">Crops & MSP:</span>
                    {Object.entries(centre.mspRates).map(([crop, rate]) => (
                      <span
                        key={crop}
                        className="text-[10px] bg-slate-100 text-slate-800 font-medium px-2 py-0.5 rounded border border-slate-200"
                      >
                        {crop}: <strong className="text-emerald-700">₹{rate}/Q</strong>
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-2">
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" /> {centre.contactPerson}
                    </div>

                    {onBookSlot && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookSlot(centre);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                      >
                        Book Slot Here →
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
