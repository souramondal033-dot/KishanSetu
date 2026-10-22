import { ProcurementCentre } from '../types';

export const PROCUREMENT_CENTRES: ProcurementCentre[] = [
  {
    id: 'pc-1',
    name: 'Lucknow Central APMC Mandi',
    type: 'APMC Mandi',
    district: 'Lucknow',
    state: 'Uttar Pradesh',
    address: 'Sitapur Road, Mohibullapur, Lucknow, UP 226021',
    latitude: 26.8920,
    longitude: 80.9380,
    cropsAccepted: ['Wheat', 'Paddy', 'Mustard', 'Gram'],
    mspRates: {
      Wheat: 2275,
      Paddy: 2183,
      Mustard: 5650,
      Gram: 5440
    },
    dailyCapacityQuintals: 5000,
    availableSlotsToday: 42,
    verifiedGovtId: 'UP-LKO-APMC-001',
    contactPerson: 'Shri R.K. Verma (Mandi Secretary)',
    phone: '+91 94150 12345',
    queueVehicles: 14,
    avgWaitMinutes: 25
  },
  {
    id: 'pc-2',
    name: 'FCI Grain Storage Depot Hardoi',
    type: 'FCI Depot',
    district: 'Hardoi',
    state: 'Uttar Pradesh',
    address: 'FCI Road, Industrial Area, Hardoi, UP 241001',
    latitude: 27.3989,
    longitude: 80.1311,
    cropsAccepted: ['Wheat', 'Paddy'],
    mspRates: {
      Wheat: 2275,
      Paddy: 2183
    },
    dailyCapacityQuintals: 8000,
    availableSlotsToday: 78,
    verifiedGovtId: 'GOI-FCI-HRD-102',
    contactPerson: 'Shri Suresh Yadav (Depot Manager)',
    phone: '+91 94501 98765',
    queueVehicles: 8,
    avgWaitMinutes: 15
  },
  {
    id: 'pc-3',
    name: 'Barabanki State Warehousing Corporation',
    type: 'State Warehouse',
    district: 'Barabanki',
    state: 'Uttar Pradesh',
    address: 'Faizabad Road, Rasauli, Barabanki, UP 225001',
    latitude: 26.9271,
    longitude: 81.1834,
    cropsAccepted: ['Wheat', 'Paddy', 'Maize'],
    mspRates: {
      Wheat: 2275,
      Paddy: 2183,
      Maize: 2090
    },
    dailyCapacityQuintals: 3500,
    availableSlotsToday: 29,
    verifiedGovtId: 'UPSWC-BBK-304',
    contactPerson: 'Smt. Anita Singh (Warehouse In-Charge)',
    phone: '+91 98390 45678',
    queueVehicles: 19,
    avgWaitMinutes: 35
  },
  {
    id: 'pc-4',
    name: 'Unnao Farmers Procurement Centre',
    type: 'Govt Procurement Centre',
    district: 'Unnao',
    state: 'Uttar Pradesh',
    address: 'Kanpur-Lucknow Highway, Unnao, UP 209801',
    latitude: 26.5393,
    longitude: 80.4878,
    cropsAccepted: ['Wheat', 'Mustard', 'Gram'],
    mspRates: {
      Wheat: 2275,
      Mustard: 5650,
      Gram: 5440
    },
    dailyCapacityQuintals: 4000,
    availableSlotsToday: 55,
    verifiedGovtId: 'UP-UNO-PROC-089',
    contactPerson: 'Shri Manoj Tripathi (Co-op Officer)',
    phone: '+91 97920 11223',
    queueVehicles: 5,
    avgWaitMinutes: 10
  },
  {
    id: 'pc-5',
    name: 'Sitapur Regional APMC Krishi Mandi',
    type: 'APMC Mandi',
    district: 'Sitapur',
    state: 'Uttar Pradesh',
    address: 'Naimisharanya Road, Sitapur, UP 261001',
    latitude: 27.5612,
    longitude: 80.6821,
    cropsAccepted: ['Wheat', 'Paddy', 'Sugarcane', 'Gram'],
    mspRates: {
      Wheat: 2275,
      Paddy: 2183,
      Gram: 5440
    },
    dailyCapacityQuintals: 6000,
    availableSlotsToday: 64,
    verifiedGovtId: 'UP-STP-APMC-005',
    contactPerson: 'Shri Amit Shukla',
    phone: '+91 94155 88990',
    queueVehicles: 11,
    avgWaitMinutes: 20
  }
];
