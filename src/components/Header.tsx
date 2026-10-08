import React from 'react';
import { useCampus } from '../context/CampusContext';
import { UserRole } from '../types';
import {
  Shield,
  ShieldAlert,
  Wifi,
  Radio,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Zap,
  Users,
  WifiOff,
  RotateCcw,
  User,
  SlidersHorizontal,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    metrics,
    incidents,
    setEmergencyActive,
    toggleEdgeMode,
    setDemoCenterOpen,
    simulateEnergyAnomaly,
    simulateNetworkFailure,
    simulateCrowdSurge,
    resetToNormal,
    setActiveTab,
  } = useCampus();

  const activeAlerts = incidents.filter(
    (i) => i.status !== 'RESOLVED' && (i.priority === 'HIGH' || i.priority === 'CRITICAL')
  ).length;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('command-center')}>
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm shadow-emerald-500/20">
              <Shield className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
                  Campus <span className="text-emerald-600">Kavach</span>
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/70 rounded-full">
                  Live Shield
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Smart Safety, Resource Intelligence & Student Services
              </p>
            </div>
          </div>

          {/* Quick Health & Edge Status */}
          <div className="hidden lg:flex items-center space-x-3 text-xs">
            <div className="flex items-center space-x-2 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-500">Campus Health:</span>
              <span className="font-bold text-slate-900 font-mono text-xs">
                {metrics.campusHealth}/100
              </span>
            </div>

            <button
              onClick={toggleEdgeMode}
              title="Toggle Edge / Cloud sync mode"
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                metrics.edgeModeActive
                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {metrics.edgeModeActive ? (
                <>
                  <Radio className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                  <span>Edge Buffer</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Cloud Active</span>
                </>
              )}
            </button>

            {activeAlerts > 0 && (
              <button
                onClick={() => setActiveTab('safety-incidents')}
                className="flex items-center space-x-1.5 bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1.5 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors cursor-pointer"
              >
                <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>{activeAlerts} Active Alert</span>
              </button>
            )}
          </div>

          {/* Right Action Tools & Roles */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Quick Demo & Simulation Trigger */}
            <button
              onClick={() => setDemoCenterOpen(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs"
              title="Open full interactive demo & IoT simulation controls"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Demo Scenarios</span>
            </button>

            {/* Quick Simulation Shortcuts (Desktop) */}
            <div className="hidden xl:flex items-center space-x-1 bg-slate-50 border border-slate-200 p-0.5 rounded-xl">
              <button
                onClick={() => {
                  simulateEnergyAnomaly();
                  setActiveTab('safety-incidents');
                }}
                className="p-1.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-white transition-colors cursor-pointer"
                title="Simulate Energy Spike in Block B"
              >
                <Zap className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  simulateCrowdSurge();
                  setActiveTab('smart-resources');
                }}
                className="p-1.5 rounded-lg text-slate-600 hover:text-indigo-600 hover:bg-white transition-colors cursor-pointer"
                title="Simulate Library Crowd Surge"
              >
                <Users className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  simulateNetworkFailure();
                  setActiveTab('network-center');
                }}
                className="p-1.5 rounded-lg text-slate-600 hover:text-rose-600 hover:bg-white transition-colors cursor-pointer"
                title="Simulate IoT Node Offline"
              >
                <WifiOff className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  resetToNormal();
                  setActiveTab('command-center');
                }}
                className="p-1.5 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-white transition-colors cursor-pointer"
                title="Reset to Normal Baseline"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Role Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              {(['ADMIN', 'STUDENT', 'SECURITY'] as UserRole[]).map((r) => {
                const isActive = role === r;
                return (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-2xs font-bold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {r === 'ADMIN' ? 'Admin' : r === 'STUDENT' ? 'Student' : 'Security'}
                  </button>
                );
              })}
            </div>

            {/* Emergency SOS Button */}
            <button
              onClick={() => setEmergencyActive(true)}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
              title="Open Campus Emergency Protocol"
            >
              <ShieldAlert className="w-4 h-4" />
              <span className="hidden sm:inline">SOS HELP</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
