import React from 'react';
import { useCampus } from '../context/CampusContext';
import {
  Play,
  Zap,
  WifiOff,
  Users,
  RotateCcw,
  Sparkles,
  HelpCircle,
  Radio,
  Clock,
} from 'lucide-react';

export const HackathonDemoBar: React.FC = () => {
  const {
    setActiveTab,
    simulateEnergyAnomaly,
    simulateNetworkFailure,
    simulateCrowdSurge,
    resetToNormal,
    setSelectedIncident,
    incidents,
  } = useCampus();

  const handleDemo = (demoIndex: number) => {
    switch (demoIndex) {
      case 1: // Normal Campus
        resetToNormal();
        setActiveTab('command-center');
        break;
      case 2: // MQTT Telemetry & Network
        setActiveTab('network-center');
        break;
      case 3: // AI Energy Anomaly
        simulateEnergyAnomaly();
        setActiveTab('safety-incidents');
        break;
      case 4: // AI Explainability
        simulateEnergyAnomaly();
        setActiveTab('safety-incidents');
        // Select the newest incident
        setTimeout(() => {
          const latest = incidents[0];
          if (latest) setSelectedIncident(latest);
        }, 100);
        break;
      case 5: // Incident Lifecycle
        setActiveTab('safety-incidents');
        break;
      case 6: // Crowd Prediction
        simulateCrowdSurge();
        setActiveTab('smart-resources');
        break;
      case 7: // Resource Optimization
        setActiveTab('smart-resources');
        break;
      case 8: // Student AI
        setActiveTab('student-services');
        break;
      case 9: // Network Failure
        simulateNetworkFailure();
        setActiveTab('network-center');
        break;
      case 10: // Final Impact
        setActiveTab('analytics-impact');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-slate-900/60 border-b border-slate-800 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        {/* Left: Hackathon Demonstration Flow */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
          <div className="flex items-center space-x-1 text-xs font-bold text-cyan-400 shrink-0 mr-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HACKATHON FLOW:</span>
          </div>

          <div className="flex items-center space-x-1.5 text-[11px]">
            <button
              onClick={() => handleDemo(1)}
              className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 whitespace-nowrap cursor-pointer transition-colors"
            >
              1. Normal
            </button>
            <button
              onClick={() => handleDemo(2)}
              className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 whitespace-nowrap cursor-pointer transition-colors"
            >
              2. MQTT Stream
            </button>
            <button
              onClick={() => handleDemo(3)}
              className="px-2 py-1 rounded bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 border border-amber-800/60 whitespace-nowrap cursor-pointer transition-colors font-medium"
            >
              3. AI Anomaly
            </button>
            <button
              onClick={() => handleDemo(4)}
              className="px-2 py-1 rounded bg-indigo-950/40 hover:bg-indigo-900/50 text-indigo-300 border border-indigo-800/60 whitespace-nowrap cursor-pointer transition-colors font-medium"
            >
              4. Explainability
            </button>
            <button
              onClick={() => handleDemo(5)}
              className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 whitespace-nowrap cursor-pointer transition-colors"
            >
              5. Incidents
            </button>
            <button
              onClick={() => handleDemo(6)}
              className="px-2 py-1 rounded bg-cyan-950/40 hover:bg-cyan-900/50 text-cyan-300 border border-cyan-800/60 whitespace-nowrap cursor-pointer transition-colors font-medium"
            >
              6. Crowd AI
            </button>
            <button
              onClick={() => handleDemo(7)}
              className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 whitespace-nowrap cursor-pointer transition-colors"
            >
              7. Optimize
            </button>
            <button
              onClick={() => handleDemo(8)}
              className="px-2 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700/60 whitespace-nowrap cursor-pointer transition-colors"
            >
              8. Student AI
            </button>
            <button
              onClick={() => handleDemo(9)}
              className="px-2 py-1 rounded bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 border border-rose-800/60 whitespace-nowrap cursor-pointer transition-colors font-medium"
            >
              9. Net Failure
            </button>
            <button
              onClick={() => handleDemo(10)}
              className="px-2 py-1 rounded bg-emerald-950/40 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-800/60 whitespace-nowrap cursor-pointer transition-colors font-semibold"
            >
              10. Impact
            </button>
          </div>
        </div>

        {/* Right: Live Interactive Simulation Triggers */}
        <div className="flex items-center space-x-1.5 shrink-0 text-xs">
          <button
            id="sim-energy-anomaly-btn"
            onClick={simulateEnergyAnomaly}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 transition-all cursor-pointer font-medium"
            title="Inject high energy consumption in Block B (92 kW with 28% occupancy)"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simulate Energy Spike</span>
          </button>

          <button
            id="sim-network-fail-btn"
            onClick={simulateNetworkFailure}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-all cursor-pointer font-medium"
            title="Disconnect node ESP32-17 and degrade Wi-Fi mesh"
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span>Simulate Net Drop</span>
          </button>

          <button
            id="sim-crowd-surge-btn"
            onClick={simulateCrowdSurge}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-md bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 transition-all cursor-pointer font-medium"
            title="Surge library crowd to 91%"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Crowd Surge</span>
          </button>

          <button
            onClick={resetToNormal}
            className="flex items-center space-x-1 px-2 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer"
            title="Reset campus telemetry to normal"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
};
