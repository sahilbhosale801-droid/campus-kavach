import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import {
  PhoneCall,
  MapPin,
  BellRing,
  CheckCircle,
  X,
  Siren,
  AlertTriangle,
} from 'lucide-react';

export const EmergencyModal: React.FC = () => {
  const { emergencyActive, setEmergencyActive, setActiveTab } = useCampus();
  const [protocolStarted, setProtocolStarted] = useState(false);
  const [acknowledged, setAcknowledged] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!emergencyActive) return null;

  const handleCallSecurity = () => {
    setStatusMessage('Connecting to Campus Security Command Dispatch (Ext: 911)... Security patrol units alerted.');
  };

  const handleNotifyAdmin = () => {
    setStatusMessage('Push notification & SMS broadcast sent to Campus Registrar, Facilities Lead, and Emergency Ops.');
  };

  const handleStartWorkflow = () => {
    setProtocolStarted(true);
    setStatusMessage('Automated perimeter lockdown protocol armed. Public announcement system alerted.');
  };

  const handleAcknowledge = () => {
    setAcknowledged(true);
    setStatusMessage('Emergency incident acknowledged by command operator.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white border-2 border-rose-400 rounded-3xl w-full max-w-lg p-6 shadow-2xl space-y-5 text-slate-900 relative">
        {/* Top Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-200">
              <Siren className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Critical Campus Alert
              </span>
              <h2 className="text-xl font-bold mt-1 text-slate-900">Emergency Operations Protocol</h2>
            </div>
          </div>
          <button
            onClick={() => setEmergencyActive(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status card */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Affected Location:</span>
            <span className="font-bold text-rose-700 font-mono">Parking Zone A / North Perimeter</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Event Detection:</span>
            <span className="font-semibold text-slate-800">Abnormal thermal & perimeter motion surge</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">AI Confidence:</span>
            <span className="font-bold text-emerald-600 font-mono">94%</span>
          </div>
        </div>

        {statusMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 font-medium">
            {statusMessage}
          </div>
        )}

        {/* 1-Click Action Matrix */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleCallSecurity}
            className="flex items-center justify-center space-x-2 p-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Security</span>
          </button>

          <button
            onClick={() => {
              setEmergencyActive(false);
              setActiveTab('campus-map');
            }}
            className="flex items-center justify-center space-x-2 p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>View Map</span>
          </button>

          <button
            onClick={handleNotifyAdmin}
            className="flex items-center justify-center space-x-2 p-3 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl font-semibold text-xs transition-colors cursor-pointer"
          >
            <BellRing className="w-4 h-4 text-amber-600" />
            <span>Notify Admin</span>
          </button>

          <button
            onClick={handleAcknowledge}
            className={`flex items-center justify-center space-x-2 p-3 rounded-xl font-semibold text-xs transition-colors cursor-pointer ${
              acknowledged
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
            }`}
          >
            <CheckCircle className={`w-4 h-4 ${acknowledged ? 'text-white' : 'text-emerald-600'}`} />
            <span>{acknowledged ? 'Acknowledged ✓' : 'Acknowledge'}</span>
          </button>
        </div>

        <div className="pt-2">
          <button
            onClick={handleStartWorkflow}
            className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            {protocolStarted ? 'Workflow Armed (Level 1 Protocol Active)' : 'Start Emergency Protocol'}
          </button>
        </div>
      </div>
    </div>
  );
};
