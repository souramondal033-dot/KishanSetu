export interface ProcurementCentre {
  id: string;
  name: string;
  type: 'APMC Mandi' | 'State Warehouse' | 'Govt Procurement Centre' | 'FCI Depot';
  district: string;
  state: string;
  address: string;
  latitude: number;
  longitude: number;
  cropsAccepted: string[];
  mspRates: Record<string, number>;
  dailyCapacityQuintals: number;
  availableSlotsToday: number;
  verifiedGovtId: string;
  contactPerson: string;
  phone: string;
  queueVehicles: number;
  avgWaitMinutes: number;
  distanceKm?: number;
}

export type UserRole = 'farmer' | 'agent' | 'admin';

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  state: string;
  district: string;
  pincode: string;
  aadhaarLast4?: string;
}

export interface SlotBooking {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  centreId: string;
  centreName: string;
  crop: string;
  quantityQuintals: number;
  estimatedPayment: number;
  date: string;
  timeSlot: string;
  status: 'PENDING' | 'CONFIRMED' | 'WEIGHED' | 'PAID' | 'CANCELLED';
  tokenNumber: string;
}
