import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import {
  Zap,
  Droplets,
  Users,
  Sparkles,
  Wrench,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingDown,
} from 'lucide-react';

export const SmartResources: React.FC = () => {
  const {
    metrics,
    recommendations,
    applyRecommendation,
    equipmentList,
    simulateCrowdSurge,
  } = useCampus();

  const [activeSubTab, setActiveSubTab] = useState<'ENERGY' | 'CROWD' | 'WATER' | 'MAINTENANCE'>('ENERGY');

  return (
    <div className="space-y-6">
      {/* Top Banner & Sub-Navigation */}
      <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Smart Resource & Prediction Hub</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              AI Forecast Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Predictive load balancing, automated crowd modeling, leak acoustic monitoring & preventative maintenance.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          {(['ENERGY', 'CROWD', 'WATER', 'MAINTENANCE'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeSubTab === tab
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab === 'ENERGY' && '⚡ Energy AI'}
              {tab === 'CROWD' && '👥 Crowd AI'}
              {tab === 'WATER' && '💧 Water Flow'}
              {tab === 'MAINTENANCE' && '🛠 Maintenance'}
            </button>
          ))}
        </div>
      </div>

      {/* ENERGY AI TAB */}
      {activeSubTab === 'ENERGY' && (
        <div className="space-y-5">
          {/* Energy Prediction Key Matrix */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Current Grid Load</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 font-mono">
                  {metrics.energyConsumptionKw}
                </span>
                <span className="text-xs font-medium text-slate-500">kW</span>
              </div>
              <span className="text-xs text-slate-500 mt-1 block">Baseline: 60.0 kW</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Predicted Next Hour</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-indigo-600 font-mono">71.0</span>
                <span className="text-xs font-medium text-slate-500">kW</span>
              </div>
              <span className="text-xs text-emerald-600 font-medium mt-1 block">XGBoost Horizon 60m</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Forecasted Peak Demand</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-amber-600 font-mono">3:30 PM</span>
              </div>
              <span className="text-xs text-slate-500 mt-1 block">Estimated 89.2 kW load</span>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Potential Savings</span>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-emerald-600 font-mono">18.4%</span>
              </div>
              <span className="text-xs text-emerald-600 font-medium mt-1 block">~₹1,250 / day if applied</span>
            </div>
          </div>

          {/* Energy Hourly Visual Curve (24h simulation) */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">24-Hour Energy Forecast & Optimization Curve</h3>
                <p className="text-xs text-slate-500">
                  Model: Random Forest Regressor trained on 18 months of seasonal academic calendar data.
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-slate-600">
                  <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block" /> Measured
                </span>
                <span className="flex items-center gap-1.5 text-indigo-600">
                  <span className="w-2.5 h-2.5 rounded bg-indigo-400 inline-block" /> AI Predicted
                </span>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="h-44 flex items-end justify-between gap-1.5 pt-6 px-2 border-b border-slate-100 pb-2">
              {[
                { time: '08:00', kw: 42, pred: 44 },
                { time: '09:00', kw: 58, pred: 60 },
                { time: '10:00', kw: 68, pred: 70 },
                { time: '11:00', kw: 74, pred: 72 },
                { time: '12:00', kw: 70, pred: 69 },
                { time: '13:00', kw: 64, pred: 66 },
                { time: '14:00', kw: 72, pred: 71 },
                { time: '15:00', kw: 0, pred: 86, isFuture: true },
                { time: '16:00', kw: 0, pred: 78, isFuture: true },
                { time: '17:00', kw: 0, pred: 62, isFuture: true },
                { time: '18:00', kw: 0, pred: 48, isFuture: true },
                { time: '19:00', kw: 0, pred: 38, isFuture: true },
              ].map((slot, i) => {
                const heightPct = ((slot.isFuture ? slot.pred : slot.kw) / 100) * 100;

                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <div className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      {slot.isFuture ? `${slot.pred} kW` : `${slot.kw} kW`}
                    </div>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-md transition-all ${
                        slot.isFuture
                          ? 'bg-indigo-200 border border-indigo-300'
                          : 'bg-emerald-500'
                      }`}
                    />
                    <span className="text-[10px] font-mono text-slate-500 mt-1">{slot.time}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 text-xs text-slate-500 flex items-center justify-between">
              <span>Peak Demand Window: 14:30 – 16:30 (Afternoon lab sessions)</span>
              <span className="text-emerald-600 font-semibold font-mono">Grid Tariff: Off-peak optimal</span>
            </div>
          </div>
        </div>
      )}

      {/* CROWD AI TAB */}
      {activeSubTab === 'CROWD' && (
        <div className="space-y-5">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Predictive Crowd Modeling
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Central Library & Reading Halls</h3>
                <p className="text-xs text-slate-500">
                  Inputs: Entrance turnstiles, Wi-Fi probe density, academic exam timetable, and ambient noise.
                </p>
              </div>
              <button
                onClick={simulateCrowdSurge}
                className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                + Trigger 91% Crowd Surge Demo
              </button>
            </div>

            {/* Time horizon projections */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center my-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <span className="text-xs text-slate-500 font-medium">Current Occupancy</span>
                <div className="text-2xl font-bold text-slate-900 font-mono mt-1">72%</div>
                <span className="text-[11px] text-slate-400">324 / 450 seats</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <span className="text-xs text-slate-500 font-medium">Forecast in 30 Min</span>
                <div className="text-2xl font-bold text-amber-600 font-mono mt-1">84%</div>
                <span className="text-[11px] text-amber-600">Elevated inflow</span>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                <span className="text-xs text-amber-800 font-semibold">Forecast in 1 Hour</span>
                <div className="text-2xl font-bold text-rose-600 font-mono mt-1">91%</div>
                <span className="text-[10px] font-bold text-rose-600 animate-pulse">HIGH CROWD EXPECTED</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <span className="text-xs text-slate-500 font-medium">Forecast in 3 Hours</span>
                <div className="text-2xl font-bold text-indigo-600 font-mono mt-1">76%</div>
                <span className="text-[11px] text-slate-400">Evening taper</span>
              </div>
            </div>

            {/* Actionable Alert */}
            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-bold text-indigo-900">AI Early Warning & Mitigation Recommendation:</span>
                <p className="text-indigo-800 mt-0.5">
                  Unlock Classroom 204 in Academic Block A as secondary quiet study space to distribute foot traffic.
                </p>
              </div>
              <button
                onClick={() => applyRecommendation('rec-2')}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                Dispatch Room Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WATER AI TAB */}
      {activeSubTab === 'WATER' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Main Flow Rate</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {metrics.waterFlowRate}
              </span>
              <span className="text-xs font-medium text-slate-500">L/min</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Acoustic sensors along primary feed pipe indicate normal laminar flow.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Daily Cumulative</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">18,420</span>
              <span className="text-xs font-medium text-slate-500">Liters</span>
            </div>
            <p className="text-xs text-emerald-600 font-medium mt-2">
              ↓ 9.4% lower consumption vs historic Tuesday baseline.
            </p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Leakage Risk Index</span>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-emerald-600 font-mono">LOW</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Micro-leak in Hostel Tower West isolated and repaired via valve IV-08.
            </p>
          </div>
        </div>
      )}

      {/* PREDICTIVE MAINTENANCE TAB */}
      {activeSubTab === 'MAINTENANCE' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Wrench className="w-4 h-4 text-emerald-600" />
                <span>Predictive Equipment Health Monitoring</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Vibration harmonics, motor current signature analysis (MCSA) & thermal cycles detect degradation weeks ahead.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 font-semibold">
              3 Monitored Assets
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {equipmentList.map((eq) => (
              <div
                key={eq.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white shadow-2xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {eq.type}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1.5">{eq.name}</h4>
                      <p className="text-xs text-slate-500">{eq.location}</p>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-slate-400">Health</div>
                      <div
                        className={`text-xl font-bold font-mono ${
                          eq.healthScore < 70
                            ? 'text-amber-600'
                            : 'text-emerald-600'
                        }`}
                      >
                        {eq.healthScore}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                      AI Prediction
                    </span>
                    <p className="text-xs text-slate-700 mt-1">{eq.prediction}</p>
                  </div>

                  <div className="mt-3 space-y-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Signals:</span>
                    {eq.signals.map((sig, sIdx) => (
                      <div key={sIdx} className="text-xs text-slate-600 flex items-center gap-1.5">
                        <span className="text-emerald-600">•</span>
                        <span>{sig}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 line-clamp-1">{eq.recommendation}</span>
                  <button
                    onClick={() => alert(`Service ticket dispatched for ${eq.name}`)}
                    className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[11px] rounded-lg transition-colors shrink-0 ml-2 cursor-pointer"
                  >
                    Schedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI RECOMMENDATION ENGINE */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">AI Recommendation Engine</h3>
              <p className="text-xs text-slate-500">
                Actionable interventions to eliminate power waste and maintain campus comfort.
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
            Actionable Directives
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="bg-slate-50/60 border border-slate-200 p-4 rounded-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {rec.category}
                  </span>
                  <span className="text-[10px] font-mono text-amber-700 font-bold">
                    {rec.priority} PRIORITY
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-2">{rec.title}</h4>
                <p className="text-xs text-slate-600 mt-1">{rec.reason}</p>

                {rec.potentialSaving && (
                  <div className="mt-3 p-2 bg-emerald-50 rounded-lg border border-emerald-100 text-xs">
                    <span className="text-emerald-700 text-[10px] block">Projected Benefit:</span>
                    <span className="font-mono font-bold text-emerald-800">{rec.potentialSaving}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 line-clamp-1">{rec.actionText}</span>
                <button
                  onClick={() => applyRecommendation(rec.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer shrink-0 ml-2 ${
                    rec.isApplied
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                  }`}
                >
                  {rec.isApplied ? 'Applied ✓' : 'Take Action'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
