import React from 'react';
import { useCampus } from '../context/CampusContext';
import {
  X,
  Play,
  Zap,
  WifiOff,
  Users,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export const DemoCenterModal: React.FC = () => {
  const {
    demoCenterOpen,
    setDemoCenterOpen,
    setActiveTab,
    simulateEnergyAnomaly,
    simulateNetworkFailure,
    simulateCrowdSurge,
    resetToNormal,
    setSelectedIncident,
    incidents,
  } = useCampus();

  if (!demoCenterOpen) return null;

  const handleRunStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        resetToNormal();
        setActiveTab('command-center');
        break;
      case 2:
        setActiveTab('network-center');
        break;
      case 3:
        simulateEnergyAnomaly();
        setActiveTab('safety-incidents');
        break;
      case 4:
        simulateEnergyAnomaly();
        setActiveTab('safety-incidents');
        setTimeout(() => {
          const latest = incidents[0];
          if (latest) setSelectedIncident(latest);
        }, 100);
        break;
      case 5:
        setActiveTab('safety-incidents');
        break;
      case 6:
        simulateCrowdSurge();
        setActiveTab('smart-resources');
        break;
      case 7:
        setActiveTab('smart-resources');
        break;
      case 8:
        setActiveTab('student-services');
        break;
      case 9:
        simulateNetworkFailure();
        setActiveTab('network-center');
        break;
      case 10:
        setActiveTab('analytics-impact');
        break;
      default:
        break;
    }
    setDemoCenterOpen(false);
  };

  const steps = [
    {
      num: 1,
      title: 'Normal Campus Baseline',
      desc: 'View campus health (94/100), 12 monitored zones, and live telemetry status across the board.',
      tab: 'Command Center',
      tag: 'BASELINE',
      actionLabel: 'Launch Step 1',
    },
    {
      num: 2,
      title: 'Live MQTT Telemetry Stream',
      desc: 'Real-time JSON message ingestion from ESP32 edge nodes at campus/# with QoS 1 verification.',
      tab: 'Network Center',
      tag: 'IOT MESH',
      actionLabel: 'Launch Step 2',
    },
    {
      num: 3,
      title: 'AI Energy Anomaly Injection',
      desc: 'Simulate high energy consumption in Block B (92 kW with low occupancy). Isolation Forest triggers alert.',
      tab: 'Safety & Incidents',
      tag: 'ANOMALY DETECT',
      actionLabel: 'Simulate & View',
    },
    {
      num: 4,
      title: 'AI Explainability ("Why Flagged?")',
      desc: 'Inspect statistical root cause (+92% deviation above baseline, uncoordinated with occupancy).',
      tab: 'Explainability Modal',
      tag: 'XAI ENGINE',
      actionLabel: 'View Explainability',
    },
    {
      num: 5,
      title: 'Incident Lifecycle & Dispatch',
      desc: 'Observe the state transition: DETECTED → ASSIGNED → IN PROGRESS → RESOLVED with audit logging.',
      tab: 'Incident Workflow',
      tag: 'WORKFLOW',
      actionLabel: 'View Lifecycle',
    },
    {
      num: 6,
      title: 'Predictive Crowd Modeling',
      desc: 'Forecast Central Library surge to 91% and trigger automatic classroom spillover balancing.',
      tab: 'Smart Resources',
      tag: 'LSTM FORECAST',
      actionLabel: 'Run Crowd Surge',
    },
    {
      num: 7,
      title: 'AI Resource Optimization',
      desc: 'Automate HVAC setbacks and smart corridor lighting to conserve ~18.4% energy daily.',
      tab: 'Resource Optimizer',
      tag: 'AUTOMATION',
      actionLabel: 'Optimize Resources',
    },
    {
      num: 8,
      title: 'Student Services & Campus AI',
      desc: 'Test grounded Campus Assistant answering study hall availability, parking, and HVAC complaints.',
      tab: 'Student Services',
      tag: 'GROUNDED RAG',
      actionLabel: 'Chat with AI',
    },
    {
      num: 9,
      title: 'Network Failure & Edge Resilience',
      desc: 'Sever ESP32-17 node connectivity to verify offline flash memory buffering and mesh rerouting.',
      tab: 'Network Center',
      tag: 'FAILOVER RESILIENCE',
      actionLabel: 'Sever Connection',
    },
    {
      num: 10,
      title: 'Measured Outcomes & Governance',
      desc: 'Examine quantifiable ROI: 12.8% energy drop, 61% faster parking, 96.4% YOLOv8 accuracy.',
      tab: 'Analytics & Impact',
      tag: 'AUDIT REPORT',
      actionLabel: 'Review Impact',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-900">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Interactive Demo & Simulation Center
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                  CAMPUS KAVACH
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Execute end-to-end scenarios or trigger simulated IoT anomalies with one click.
              </p>
            </div>
          </div>

          <button
            onClick={() => setDemoCenterOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Quick Anomaly Triggers */}
          <div className="bg-slate-50/70 border border-slate-200/80 p-5 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant Sensor Telemetry Simulators</span>
              </span>
              <span className="text-xs text-slate-500">
                Click to immediately inject anomalies into live telemetry
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button
                onClick={() => {
                  simulateEnergyAnomaly();
                  setActiveTab('safety-incidents');
                  setDemoCenterOpen(false);
                }}
                className="p-3 rounded-xl bg-white hover:bg-amber-50 text-slate-800 border border-slate-200 hover:border-amber-300 text-xs font-medium transition-all text-left flex flex-col justify-between cursor-pointer shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-amber-600 font-bold">ENERGY</span>
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <span className="mt-2 font-bold text-slate-900">Simulate Energy Spike</span>
                <span className="text-[11px] text-slate-500 mt-0.5">92 kW in Block B</span>
              </button>

              <button
                onClick={() => {
                  simulateNetworkFailure();
                  setActiveTab('network-center');
                  setDemoCenterOpen(false);
                }}
                className="p-3 rounded-xl bg-white hover:bg-rose-50 text-slate-800 border border-slate-200 hover:border-rose-300 text-xs font-medium transition-all text-left flex flex-col justify-between cursor-pointer shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-rose-600 font-bold">NETWORK</span>
                  <WifiOff className="w-3.5 h-3.5 text-rose-500" />
                </div>
                <span className="mt-2 font-bold text-slate-900">Simulate Mesh Drop</span>
                <span className="text-[11px] text-slate-500 mt-0.5">ESP32-17 Disconnect</span>
              </button>

              <button
                onClick={() => {
                  simulateCrowdSurge();
                  setActiveTab('smart-resources');
                  setDemoCenterOpen(false);
                }}
                className="p-3 rounded-xl bg-white hover:bg-blue-50 text-slate-800 border border-slate-200 hover:border-blue-300 text-xs font-medium transition-all text-left flex flex-col justify-between cursor-pointer shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-blue-600 font-bold">CROWD</span>
                  <Users className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <span className="mt-2 font-bold text-slate-900">Simulate Crowd Surge</span>
                <span className="text-[11px] text-slate-500 mt-0.5">Library 91% capacity</span>
              </button>

              <button
                onClick={() => {
                  resetToNormal();
                  setActiveTab('command-center');
                  setDemoCenterOpen(false);
                }}
                className="p-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-xs font-medium transition-all text-left flex flex-col justify-between cursor-pointer shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-emerald-600 font-bold">RESET</span>
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <span className="mt-2 font-bold text-slate-900">Reset to Baseline</span>
                <span className="text-[11px] text-slate-500 mt-0.5">Health 94/100 normal</span>
              </button>
            </div>
          </div>

          {/* 10 Step Presentation Tour */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Play className="w-3.5 h-3.5 text-emerald-600" />
                <span>10-Step Feature Demonstration Flow</span>
              </span>
              <span className="text-xs text-slate-500">
                Click any step to view and demonstrate that module
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {steps.map((s) => (
                <div
                  key={s.num}
                  className="bg-white border border-slate-200 hover:border-emerald-300 p-4 rounded-xl flex flex-col justify-between transition-all group shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-xs font-bold flex items-center justify-center">
                          {s.num}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {s.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {s.tag}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">
                      {s.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">
                      Module: {s.tab}
                    </span>
                    <button
                      onClick={() => handleRunStep(s.num)}
                      className="px-3 py-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>{s.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Telemetry Pipeline: Active & Resilient</span>
          </div>
          <button
            onClick={() => setDemoCenterOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
