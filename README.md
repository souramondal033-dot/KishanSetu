# 🌾 KishanSetu — Smart Direct Procurement Gateway & GPS Tracker

> **Hackathon Finals Submission** | Direct Farmer-to-Mandi Procurement System with Real-Time Google Location GPS Tracking & Instant PFMS MSP Settlement.

---

## 🌟 Overview & Problem Statement

In traditional agricultural procurement systems across India, farmers face significant hurdles:
- **Opaque Middlemen Commissions:** High deductions and delays in receiving payments.
- **Unmanaged Mandi Queues:** Farmers wait up to 24–48 hours at procurement centres without real-time vehicle status.
- **Lack of Mandi Navigation:** Difficulty finding official government procurement centres, active crops accepted, and live MSP rates.

**KishanSetu** solves this by establishing a direct, transparent bridge between farmers and government-verified procurement centres.

---

## 🚀 Key Features

### 1. 📍 Live Google Location GPS Mandi Tracker
- **Automatic Geolocation Detection:** Calculates exact distance (in km) from farmer location to nearby government APMC Mandis, State Warehouses, and FCI Depots.
- **Interactive Map Visual:** Displays procurement centres with queue counts, average wait times, available daily slots, and verified government IDs.
- **Direct Navigation:** One-click redirection to Google Maps directions (`https://maps.google.com/?q=lat,lng`) for seamless turn-by-turn routing.
- **Search & Multi-Filter:** Filter procurement centres by accepted crops (Wheat, Paddy, Mustard, etc.), centre type, and sort by nearest distance, capacity, or available slots.

### 2. 📅 Guaranteed MSP Slot Booking & Token Generation
- Farmers can reserve verified time windows (07:00 AM - 09:00 AM, 09:00 AM - 11:00 AM, etc.) to eliminate physical queue delays.
- Generates unique digital entry gate tokens (e.g. `KS-LKO-8821`).

### 3. ⚖️ Procurement Officer Console & PFMS Direct Pay
- Procurement agents verify incoming gate tokens, log weighbridge metrics, grade crop quality, and initiate automated **PFMS (Public Financial Management System)** bank transfers directly to farmer bank accounts.

### 4. 🌐 Multilingual AI Voice Narration
- Full support for 8 Indian regional languages (*Hindi, Bengali, Punjabi, Telugu, Tamil, Marathi, Gujarati, English*) with integrated audio narration.

---

## 🏗️ Technology Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
- **Icons:** Lucide React
- **GPS & Navigation:** HTML5 Geolocation API, Haversine Distance Formula, Google Maps Directions Integration
- **State Management:** React Context / Hooks

---

## 📂 Repository Structure

```
kishansetu-procurement-portal/
├── index.html                  # Main application entry point
├── index.css                   # Custom Tailwind & animation styling
├── index.js                    # Production optimized web application bundle
├── src/                        # Modular React source code
│   ├── components/             # React UI Components
│   │   ├── Header.tsx          # Responsive navigation header
│   │   ├── ProcurementGPSTracker.tsx # Google Location GPS Mandi Tracker
│   │   ├── FarmerDashboard.tsx # Slot booking & token manager
│   │   ├── AgentDashboard.tsx  # Weighment & PFMS transfer console
│   │   ├── LanguageSelector.tsx # Multilingual modal
│   │   └── DemoModal.tsx       # Interactive step-by-step walkthrough
│   ├── data/                   # Verified procurement centre datasets
│   │   └── procurementCentres.ts
│   ├── types.ts                # TypeScript interface definitions
│   ├── App.tsx                 # Root application component
│   └── main.tsx                # React DOM render entry
├── package.json                # Dependencies and build scripts
└── README.md                   # Hackathon documentation
```

---

## 🛠️ Local Development & Setup

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd kishansetu-procurement-portal
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Build Production Bundle:**
   ```bash
   npm run build
   ```

---

kissan-setu-2-hrz2qemej-agrix2.vercel.app
kissan-setu-2.vercel.app
