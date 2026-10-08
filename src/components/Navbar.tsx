import React from 'react';
import { useCampus } from '../context/CampusContext';
import {
  Activity,
  Map,
  ShieldAlert,
  Zap,
  Car,
  GraduationCap,
  Radio,
  BarChart3,
} from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  roles: Array<'ADMIN' | 'STUDENT' | 'SECURITY'>;
}

const TABS: TabItem[] = [
  { id: 'command-center', label: 'Overview', icon: Activity, roles: ['ADMIN', 'SECURITY'] },
  { id: 'campus-map', label: 'Campus Map', icon: Map, roles: ['ADMIN', 'STUDENT', 'SECURITY'] },
  { id: 'safety-incidents', label: 'Safety & Alerts', icon: ShieldAlert, roles: ['ADMIN', 'SECURITY'] },
  { id: 'smart-resources', label: 'Energy & Resources', icon: Zap, roles: ['ADMIN'] },
  { id: 'smart-parking', label: 'Smart Parking', icon: Car, roles: ['ADMIN', 'STUDENT'] },
  { id: 'student-services', label: 'Student Helpdesk & AI', icon: GraduationCap, roles: ['ADMIN', 'STUDENT'] },
  { id: 'network-center', label: 'IoT Network', icon: Radio, roles: ['ADMIN', 'SECURITY'] },
  { id: 'analytics-impact', label: 'Impact & Reports', icon: BarChart3, roles: ['ADMIN', 'STUDENT', 'SECURITY'] },
];

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, role, incidents } = useCampus();

  const availableTabs = TABS.filter((tab) => tab.roles.includes(role));
  const activeCriticalIncidents = incidents.filter((i) => i.status !== 'RESOLVED').length;

  return (
    <nav className="bg-white border-b border-slate-200/80 sticky top-16 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-1.5 overflow-x-auto py-2 scrollbar-none items-center">
          {availableTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700 stroke-[2.2]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>

                {tab.id === 'safety-incidents' && activeCriticalIncidents > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono leading-none font-bold">
                    {activeCriticalIncidents}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
