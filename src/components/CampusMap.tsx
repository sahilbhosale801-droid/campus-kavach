import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import {
  MapPin,
  Building,
  Users,
  Thermometer,
  Zap,
  Wifi,
  Sparkles,
  X,
  Radio,
  ArrowRight,
} from 'lucide-react';

export const CampusMap: React.FC = () => {
  const { buildings, selectedBuilding, setSelectedBuilding, setActiveTab } = useCampus();
  const [filterType, setFilterType] = useState<string>('all');
  const [showNetworkNodes, setShowNetworkNodes] = useState<boolean>(true);

  const filteredBuildings = buildings.filter((b) => {
    if (filterType === 'all') return true;
    if (filterType === 'academic') return b.type === 'academic';
    if (filterType === 'parking') return b.type === 'parking';
    if (filterType === 'facility') return b.type === 'facility' || b.type === 'hostel' || b.type === 'service';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="bg-white border border-slate-200/90 p-5 rounded-2xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>Campus Digital Twin Map</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select any campus building to inspect live occupancy, climate, power load, and safety status.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            {['all', 'academic', 'facility', 'parking'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-3 py-1 rounded-lg font-semibold uppercase tracking-wider text-[10px] transition-all cursor-pointer ${
                  filterType === t
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowNetworkNodes(!showNetworkNodes)}
            className={`px-3 py-1.5 rounded-xl border font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              showNetworkNodes
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-2xs'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-indigo-600" />
            <span>IoT Sensors</span>
          </button>
        </div>
      </div>

      {/* Map Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* The 2D Map Area (Col 8) */}
        <div className="lg:col-span-8 bg-slate-100/70 border border-slate-200/90 rounded-2xl p-4 relative overflow-hidden min-h-[520px] shadow-2xs">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-60" />

          {/* Clean Campus Plan SVGs */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            {/* Main Roadways */}
            <path
              d="M 120 420 L 700 420 Q 750 420 750 350 L 750 150 Q 750 80 650 80 L 150 80 Q 80 80 80 180 L 80 350 Z"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="14"
              strokeLinejoin="round"
            />
            <line x1="420" y1="80" x2="420" y2="420" stroke="#94a3b8" strokeWidth="10" />
            <line x1="80" y1="240" x2="750" y2="240" stroke="#94a3b8" strokeWidth="8" />

            {/* Lush Lawns & Courtyards */}
            <rect x="220" y="120" width="160" height="90" rx="12" fill="#86efac" opacity="0.35" />
            <rect x="460" y="260" width="220" height="120" rx="16" fill="#86efac" opacity="0.35" />
            <circle cx="280" cy="320" r="45" fill="#93c5fd" opacity="0.3" />
          </svg>

          {/* Status Legend */}
          <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-xs border border-slate-200 px-3 py-1.5 rounded-xl text-xs flex items-center gap-3 shadow-2xs">
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Normal
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Warning
            </span>
            <span className="flex items-center gap-1.5 text-slate-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" /> Critical
            </span>
            {showNetworkNodes && (
              <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-indigo-500 inline-block" /> Sensor Node
              </span>
            )}
          </div>

          {/* Interactive Buildings */}
          <div className="relative w-full h-[520px]">
            {filteredBuildings.map((building) => {
              const isSelected = selectedBuilding?.id === building.id;

              return (
                <div
                  key={building.id}
                  style={{
                    left: `${building.x}%`,
                    top: `${building.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className="absolute z-20 transition-all duration-300"
                >
                  <button
                    onClick={() => setSelectedBuilding(building)}
                    className={`group relative flex flex-col items-center p-2.5 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-white border-emerald-500 ring-2 ring-emerald-400/30 shadow-md scale-105'
                        : building.status === 'CRITICAL'
                        ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400/30 animate-pulse shadow-xs'
                        : building.status === 'WARNING'
                        ? 'bg-amber-50 border-amber-300 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    {/* Status Pip */}
                    <div className="flex items-center justify-between w-full mb-1 gap-1.5">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          building.status === 'NORMAL'
                            ? 'bg-emerald-500'
                            : building.status === 'WARNING'
                            ? 'bg-amber-500'
                            : 'bg-rose-500'
                        }`}
                      />
                      {showNetworkNodes && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" title="IoT Node active" />
                      )}
                      <span className="text-[10px] font-mono text-slate-500 font-bold ml-auto">
                        {building.occupancy}%
                      </span>
                    </div>

                    {/* Building Name */}
                    <span className="text-xs font-bold text-slate-900 whitespace-nowrap max-w-[130px] truncate text-center">
                      {building.name.split('(')[0]}
                    </span>

                    {/* Secondary Quick Metrics */}
                    <div className="flex items-center gap-1.5 mt-1 text-[10px] font-mono text-slate-500">
                      <span>{building.energyKw} kW</span>
                      <span>•</span>
                      <span>{building.temperature}°C</span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail Inspector Drawer (Col 4) */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          {selectedBuilding ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                      selectedBuilding.status === 'NORMAL'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : selectedBuilding.status === 'WARNING'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    STATUS: {selectedBuilding.status}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1.5">{selectedBuilding.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedBuilding.description}</p>
                </div>
                <button
                  onClick={() => setSelectedBuilding(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                    <span>Occupancy</span>
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="text-lg font-bold text-slate-900 font-mono">
                    {selectedBuilding.occupancy}%
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Cap: {selectedBuilding.capacity} people
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                    <span>Power Draw</span>
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div className="text-lg font-bold text-slate-900 font-mono">
                    {selectedBuilding.energyKw} <span className="text-xs text-slate-500">kW</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Baseline: {selectedBuilding.energyBaselineKw} kW
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                    <span>Temperature</span>
                    <Thermometer className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <div className="text-lg font-bold text-slate-900 font-mono">
                    {selectedBuilding.temperature} °C
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">HVAC Target: 22.5°C</div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
                    <span>Network Mesh</span>
                    <Wifi className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <div className="text-sm font-bold text-slate-900 font-mono">
                    {selectedBuilding.networkStatus}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {selectedBuilding.sensorsCount} Active Sensors
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-emerald-50/50 border border-emerald-200/70 p-3.5 rounded-xl">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AI Telemetry Diagnostics</span>
                </div>
                <div className="space-y-1.5">
                  {selectedBuilding.aiInsights.map((insight, idx) => (
                    <div key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2">
                {selectedBuilding.type === 'parking' && (
                  <button
                    onClick={() => setActiveTab('smart-parking')}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>View Parking Slots</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                {selectedBuilding.type === 'academic' && (
                  <button
                    onClick={() => setActiveTab('student-services')}
                    className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Find Study Spots Here</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Select Any Building</h3>
              <p className="text-xs text-slate-500 max-w-[220px] mt-1">
                Click any building pin on the map to inspect live occupancy, temperature, and AI insights.
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
            <span>Coordinate EPSG:3857</span>
            <span className="font-mono text-emerald-700 font-semibold">12 Connected Zones</span>
          </div>
        </div>
      </div>
    </div>
  );
};
