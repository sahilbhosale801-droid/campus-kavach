import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { Incident, IncidentStatus } from '../types';
import {
  ShieldAlert,
  AlertTriangle,
  Sparkles,
  CheckCircle2,
  Clock,
  UserCheck,
  ArrowRight,
  Flame,
  Zap,
  Droplets,
  Wifi,
  Users,
} from 'lucide-react';
import { ExplainabilityModal } from './ExplainabilityModal';

export const SafetyIncidents: React.FC = () => {
  const {
    incidents,
    updateIncidentStatus,
    selectedIncident,
    setSelectedIncident,
    setEmergencyActive,
    simulateEnergyAnomaly,
  } = useCampus();

  const [filter, setFilter] = useState<string>('ALL');

  const filtered = incidents.filter((i) => {
    if (filter === 'ALL') return true;
    if (filter === 'ACTIVE') return i.status !== 'RESOLVED';
    if (filter === 'RESOLVED') return i.status === 'RESOLVED';
    return i.category === filter;
  });

  const getCategoryIcon = (category: Incident['category']) => {
    switch (category) {
      case 'ENERGY':
        return <Zap className="w-4 h-4 text-amber-600" />;
      case 'WATER':
        return <Droplets className="w-4 h-4 text-sky-600" />;
      case 'HVAC':
        return <Flame className="w-4 h-4 text-orange-600" />;
      case 'NETWORK':
        return <Wifi className="w-4 h-4 text-indigo-600" />;
      case 'CROWD':
        return <Users className="w-4 h-4 text-blue-600" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
    }
  };

  const steps: IncidentStatus[] = ['DETECTED', 'ASSIGNED', 'IN PROGRESS', 'RESOLVED'];

  return (
    <div className="space-y-6">
      {/* Top Header & Pipeline Overview */}
      <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Incident & Safety Response Hub</h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                {incidents.filter((i) => i.status !== 'RESOLVED').length} Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              End-to-end incident orchestration: Sensor Data → Baseline → Anomaly Scoring → AI Explainability → Resolution.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={simulateEnergyAnomaly}
              className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              + Trigger Energy Spike
            </button>
            <button
              onClick={() => setEmergencyActive(true)}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
            >
              Open SOS Protocol
            </button>
          </div>
        </div>

        {/* AI Detection Pipeline Graphic */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            ML Automated Detection Pipeline
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-xs">
            {[
              { title: '1. Sensors', desc: 'ESP32 Telemetry' },
              { title: '2. Baseline', desc: 'Rolling 30d Mean' },
              { title: '3. Anomaly Detect', desc: 'Isolation Forest' },
              { title: '4. Scoring', desc: '0.00 – 1.00 Matrix' },
              { title: '5. Severity', desc: 'Rule Prioritizer' },
              { title: '6. AI Explanation', desc: 'SHAP Feature Matrix' },
              { title: '7. Action', desc: 'Rapid Dispatch' },
            ].map((p, idx) => (
              <div
                key={idx}
                className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 flex flex-col justify-center"
              >
                <span className="font-bold text-slate-800 text-[11px]">{p.title}</span>
                <span className="text-[10px] text-slate-500 mt-0.5">{p.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs shadow-2xs">
          {['ALL', 'ACTIVE', 'ENERGY', 'HVAC', 'NETWORK', 'WATER', 'RESOLVED'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                filter === f
                  ? 'bg-slate-900 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-500 font-mono">Showing {filtered.length} incidents</span>
      </div>

      {/* Incident Cards List */}
      <div className="space-y-4">
        {filtered.map((incident) => {
          const currentStepIndex = steps.indexOf(incident.status);

          return (
            <div
              key={incident.id}
              className={`p-5 rounded-2xl border transition-all bg-white shadow-2xs ${
                incident.status === 'RESOLVED'
                  ? 'border-slate-200 opacity-75'
                  : incident.priority === 'HIGH' || incident.priority === 'CRITICAL'
                  ? 'border-rose-200 hover:border-rose-300'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Info Block */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {incident.ticketNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        incident.priority === 'HIGH' || incident.priority === 'CRITICAL'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {incident.priority} PRIORITY
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-slate-500">
                      {getCategoryIcon(incident.category)}
                      <span className="font-medium">{incident.category}</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">
                      Detected: {incident.detectedAt}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{incident.title}</h3>
                  <p className="text-xs text-slate-600">{incident.description}</p>
                  <p className="text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Location:</span> {incident.location}
                  </p>

                  {incident.assignedTo && (
                    <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 font-mono">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Assigned to: {incident.assignedTo}</span>
                    </div>
                  )}
                </div>

                {/* AI Confidence & Explainability Trigger */}
                <div className="flex flex-col sm:items-end gap-2 shrink-0">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-right">
                    <div className="text-[10px] text-slate-400 font-medium">AI Confidence Score</div>
                    <div className="text-lg font-bold text-slate-900 font-mono">
                      {incident.confidence}%
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedIncident(incident)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Why did AI flag this?</span>
                  </button>
                </div>
              </div>

              {/* Lifecycle Progress Bar */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-400 text-[10px] uppercase tracking-wider">
                    LIFECYCLE STATUS
                  </span>
                  <span className="font-mono text-emerald-700 font-bold">{incident.status}</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {steps.map((step, idx) => {
                    const isPassed = idx <= currentStepIndex;
                    const isCurrent = idx === currentStepIndex;

                    return (
                      <div
                        key={step}
                        className={`p-2 rounded-xl text-center border transition-all ${
                          isCurrent
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800 font-bold'
                            : isPassed
                            ? 'bg-slate-50 border-slate-200 text-slate-700'
                            : 'bg-slate-50/50 border-slate-200/50 text-slate-400'
                        }`}
                      >
                        <div className="text-[10px] font-mono tracking-wider">{step}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Status Advancement Buttons */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-2">
                  <div className="flex items-center gap-2">
                    {incident.status === 'DETECTED' && (
                      <button
                        onClick={() => updateIncidentStatus(incident.id, 'ASSIGNED', 'Campus Kavach Dispatch Alpha')}
                        className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
                      >
                        Acknowledge & Assign
                      </button>
                    )}

                    {incident.status === 'ASSIGNED' && (
                      <button
                        onClick={() => updateIncidentStatus(incident.id, 'IN PROGRESS')}
                        className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
                      >
                        Mark In Progress
                      </button>
                    )}

                    {incident.status === 'IN PROGRESS' && (
                      <button
                        onClick={() => updateIncidentStatus(incident.id, 'RESOLVED')}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
                      >
                        Resolve Incident ✓
                      </button>
                    )}

                    {incident.status === 'RESOLVED' && (
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Incident closed and archived.
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 italic">
                    Recommendation: {incident.recommendation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Popup for Explainability */}
      <ExplainabilityModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
};
