import React from 'react';
import { CampusProvider, useCampus } from './context/CampusContext';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { CommandCenter } from './components/CommandCenter';
import { CampusMap } from './components/CampusMap';
import { SafetyIncidents } from './components/SafetyIncidents';
import { SmartResources } from './components/SmartResources';
import { NetworkCenter } from './components/NetworkCenter';
import { SmartParking } from './components/SmartParking';
import { StudentServices } from './components/StudentServices';
import { AnalyticsImpact } from './components/AnalyticsImpact';
import { EmergencyModal } from './components/EmergencyModal';
import { DemoCenterModal } from './components/DemoCenterModal';
import { X, CheckCircle2, Shield } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, notification, dismissNotification } = useCampus();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'command-center':
        return <CommandCenter />;
      case 'campus-map':
        return <CampusMap />;
      case 'safety-incidents':
        return <SafetyIncidents />;
      case 'smart-resources':
        return <SmartResources />;
      case 'network-center':
        return <NetworkCenter />;
      case 'smart-parking':
        return <SmartParking />;
      case 'student-services':
        return <StudentServices />;
      case 'analytics-impact':
        return <AnalyticsImpact />;
      default:
        return <CommandCenter />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/80 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Application Header */}
      <Header />

      {/* Module Navigation */}
      <Navbar />

      {/* Notification Toast */}
      {notification && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
          <div className="bg-white border border-emerald-200 text-emerald-900 px-4 py-3 rounded-2xl shadow-xs flex items-center justify-between animate-fade-in text-xs font-medium">
            <div className="flex items-center space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{notification}</span>
            </div>
            <button
              onClick={dismissNotification}
              className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActiveView()}
      </main>

      {/* Emergency Protocol Modal */}
      <EmergencyModal />

      {/* Interactive Demo Center Modal */}
      <DemoCenterModal />

      {/* Modern Clean Footer */}
      <footer className="border-t border-slate-200/90 bg-white py-6 text-xs text-slate-500 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-md bg-emerald-600 flex items-center justify-center text-white">
              <Shield className="w-3 h-3" />
            </div>
            <span className="font-bold text-slate-800">Campus Kavach</span>
            <span>•</span>
            <span className="text-slate-500">Autonomous Campus Safety & Resource Intelligence</span>
          </div>
          <div className="flex items-center space-x-4 font-mono text-[11px] text-slate-500">
            <span>SENSE → CONNECT → UNDERSTAND → PREDICT → ACT → LEARN</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <CampusProvider>
      <MainLayout />
    </CampusProvider>
  );
}
