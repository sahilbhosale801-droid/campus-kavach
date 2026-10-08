import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import {
  Car,
  CheckCircle2,
  Navigation,
  Sparkles,
  Camera,
  MapPin,
  Clock,
  ArrowRight,
} from 'lucide-react';

export const SmartParking: React.FC = () => {
  const { parkingSlots, toggleParkingSlot, reserveParkingSlot } = useCampus();
  const [selectedZone, setSelectedZone] = useState<'Zone A' | 'Zone B'>('Zone A');
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  const zoneSlots = parkingSlots.filter((s) => s.zone === selectedZone);
  const totalInZone = zoneSlots.length;
  const occupiedInZone = zoneSlots.filter((s) => s.isOccupied).length;
  const availableInZone = totalInZone - occupiedInZone;

  const recommendedSlot = parkingSlots.find((s) => !s.isOccupied && !s.isReserved) || parkingSlots[2];

  const handleSimulateNavigation = (slotNumber: string) => {
    setNavigatingTo(slotNumber);
    setTimeout(() => {
      setNavigatingTo(null);
    }, 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Car className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Smart Parking System</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              Live Vacancy & Vision AI
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time ultrasonic bay sensors, computer vision detection, and 1-click slot reservations.
          </p>
        </div>

        {/* Zone Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          {(['Zone A', 'Zone B'] as const).map((z) => (
            <button
              key={z}
              onClick={() => setSelectedZone(z)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                selectedZone === z
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {z} {z === 'Zone A' ? '(North - 120m)' : '(South - 230m)'}
            </button>
          ))}
        </div>
      </div>

      {/* Recommended Slot & Zone Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recommended Slot (Col 7) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                AI Optimal Recommendation
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                Congestion: Low
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">Best Vacant Bay:</span>
                <span className="text-3xl font-extrabold text-slate-900 font-mono">
                  Slot {recommendedSlot?.slotNumber || 'A03'}
                </span>
                <p className="text-xs text-slate-600 mt-1">
                  Zone A North Facility • 120m walking distance to Academic Block A
                </p>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-500">Availability Chance</div>
                <div className="text-2xl font-bold text-emerald-600 font-mono">98.4%</div>
                <span className="text-[11px] text-slate-400">Predicted free next 45m</span>
              </div>
            </div>
          </div>

          {navigatingTo && (
            <div className="my-3 p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-700 flex items-center gap-2 animate-pulse">
              <Navigation className="w-4 h-4 text-indigo-600" />
              <span>Simulating Turn-by-Turn GPS to Slot {navigatingTo}... ETA: 2 mins</span>
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <button
              onClick={() => reserveParkingSlot(recommendedSlot.id)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Reserve Slot Now
            </button>
            <button
              onClick={() => handleSimulateNavigation(recommendedSlot.slotNumber)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-slate-600" />
              <span>Navigate</span>
            </button>
            <span className="text-xs text-slate-500 ml-auto">
              Saves ~11 mins search time
            </span>
          </div>
        </div>

        {/* Zone Quick Metrics (Col 5) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{selectedZone} Status Summary</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <span className="text-xs text-slate-500 font-medium">Available Bays</span>
                <div className="text-3xl font-extrabold text-emerald-600 font-mono mt-1">
                  {availableInZone}
                </div>
                <span className="text-[11px] text-slate-400">Ready for parking</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <span className="text-xs text-slate-500 font-medium">Occupied Bays</span>
                <div className="text-3xl font-extrabold text-slate-700 font-mono mt-1">
                  {occupiedInZone}
                </div>
                <span className="text-[11px] text-slate-400">Of {totalInZone} total</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Ultrasonic Sensors + Overhead CV</span>
            <span className="font-semibold text-emerald-600">99.1% Sensor Health</span>
          </div>
        </div>
      </div>

      {/* Interactive Slot Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Interactive Parking Bay Matrix</h3>
            <p className="text-xs text-slate-500">
              Click any slot to simulate vehicle entry / exit or test instant reservation.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> Vacant
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2.5 h-2.5 rounded bg-slate-400 inline-block" /> Occupied
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2.5 h-2.5 rounded bg-indigo-500 inline-block" /> Reserved
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {zoneSlots.map((slot) => {
            return (
              <button
                key={slot.id}
                onClick={() => toggleParkingSlot(slot.id)}
                className={`p-3.5 rounded-xl border flex flex-col items-center justify-between h-32 transition-all cursor-pointer relative overflow-hidden group ${
                  slot.isOccupied
                    ? 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    : slot.isReserved
                    ? 'bg-indigo-50/70 border-indigo-300'
                    : 'bg-emerald-50/40 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50/70'
                }`}
              >
                {/* Slot Name */}
                <div className="flex items-center justify-between w-full text-xs font-mono font-bold">
                  <span className="text-slate-800">{slot.slotNumber}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{slot.distanceMeters}m</span>
                </div>

                {/* Car Icon or Empty State */}
                <div className="my-auto text-center">
                  {slot.isOccupied ? (
                    <div className="flex flex-col items-center">
                      <Car className="w-6 h-6 text-slate-500" />
                      <span className="text-[10px] font-mono text-slate-500 mt-1">
                        {slot.vehiclePlate || 'OCCUPIED'}
                      </span>
                    </div>
                  ) : slot.isReserved ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                      <span className="text-[11px] font-bold text-indigo-700 mt-1">RESERVED</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-emerald-600">VACANT</span>
                      <span className="text-[10px] text-slate-400 mt-0.5">Click to park</span>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-400 font-mono">
                  {slot.detectionConfidence}% conf
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Computer Vision YOLO Pipeline Simulation */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Overhead CCTV Computer Vision Pipeline (YOLOv8)</h3>
              <p className="text-xs text-slate-500">
                Camera Feed → Frame Capture → Multi-Vehicle Bounding Box Detection → Slot State Verification.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-700 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 font-semibold">
            30 FPS • Latency: 14ms
          </span>
        </div>

        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 h-60 flex items-center justify-center">
          {/* Subtle grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          {/* Parking bays road stripes */}
          <div className="absolute inset-0 flex justify-around items-center px-10 pointer-events-none opacity-20">
            <div className="w-16 h-44 border-2 border-dashed border-white rounded" />
            <div className="w-16 h-44 border-2 border-dashed border-white rounded" />
            <div className="w-16 h-44 border-2 border-dashed border-white rounded" />
            <div className="w-16 h-44 border-2 border-dashed border-white rounded" />
            <div className="w-16 h-44 border-2 border-dashed border-white rounded" />
          </div>

          {/* YOLO Bounding Box Overlays */}
          <div className="absolute top-10 left-20 w-28 h-36 border-2 border-slate-400 bg-slate-400/20 rounded-lg p-1 text-[10px] font-mono text-white">
            <span className="bg-slate-700 text-white px-1.5 py-0.5 rounded text-[9px] font-bold">
              car: 0.98 | A01
            </span>
          </div>

          <div className="absolute top-10 left-56 w-28 h-36 border-2 border-slate-400 bg-slate-400/20 rounded-lg p-1 text-[10px] font-mono text-white">
            <span className="bg-slate-700 text-white px-1.5 py-0.5 rounded text-[9px] font-bold">
              car: 0.96 | A02
            </span>
          </div>

          <div className="absolute top-10 right-56 w-28 h-36 border-2 border-emerald-400 bg-emerald-500/20 rounded-lg p-1 text-[10px] font-mono text-emerald-200">
            <span className="bg-emerald-600 text-white px-1.5 py-0.5 rounded text-[9px] font-bold">
              vacant: 0.99 | A03
            </span>
          </div>

          <div className="absolute top-10 right-20 w-28 h-36 border-2 border-slate-400 bg-slate-400/20 rounded-lg p-1 text-[10px] font-mono text-white">
            <span className="bg-slate-700 text-white px-1.5 py-0.5 rounded text-[9px] font-bold">
              suv: 0.95 | A04
            </span>
          </div>

          {/* CCTV Info Overlay */}
          <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-300 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-700">
            CAM_04_NORTH_PARKING • RTSP STREAM • YOLOv8n-pose
          </div>
        </div>
      </div>
    </div>
  );
};
