import React from 'react';
import { useCampus } from '../context/CampusContext';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  Zap,
  Droplets,
  Wifi,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  Building,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  TrendingDown,
} from 'lucide-react';

export const CommandCenter: React.FC = () => {
  const {
    metrics,
    incidents,
    buildings,
    setSelectedBuilding,
    setActiveTab,
    setSelectedIncident,
    recommendations,
    simulateEnergyAnomaly,
    simulateCrowdSurge,
    resetToNormal,
  } = useCampus();

  const activeIncidents = incidents.filter((i) => i.status !== 'RESOLVED');

  return (
    <div className="space-y-6">
      {/* Welcome & Campus Shield Banner */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
                Active Protection
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs font-medium text-slate-500">12 Campus Zones Monitored</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Campus Kavach Command Dashboard
            </h2>
            <p className="text-sm text-slate-500">
              Real-time campus surveillance, predictive energy savings, and rapid student assistance.
            </p>
          </div>

          {/* Quick Simulation Shortcuts */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                simulateEnergyAnomaly();
                setActiveTab('safety-incidents');
              }}
              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              Simulate Spike
            </button>
            <button
              onClick={() => {
                simulateCrowdSurge();
                setActiveTab('smart-resources');
              }}
              className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              Simulate Surge
            </button>
            <button
              onClick={resetToNormal}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-medium transition-colors cursor-pointer"
            >
              Reset Normal
            </button>
          </div>
        </div>
      </div>

      {/* Primary Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Campus Health */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Campus Health Score
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {metrics.campusHealth}
            </span>
            <span className="text-xs font-medium text-slate-400">/ 100</span>
          </div>
          <div className="space-y-1.5">
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${metrics.campusHealth}%` }}
              />
            </div>
            <p className="text-xs text-slate-500">
              {metrics.campusHealth >= 90
                ? 'All infrastructure running optimally'
                : 'Attention needed on flagged anomalies'}
            </p>
          </div>
        </div>

        {/* Metric 2: Safety & Incidents */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Safety Status
            </span>
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                metrics.safetyStatus === 'NORMAL'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'bg-amber-50 text-amber-600'
              }`}
            >
              {metrics.safetyStatus === 'NORMAL' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <AlertTriangle className="w-4 h-4" />
              )}
            </div>
          </div>
          <div className="my-3">
            <span
              className={`text-2xl font-bold font-mono ${
                metrics.safetyStatus === 'NORMAL'
                  ? 'text-emerald-600'
                  : 'text-amber-600'
              }`}
            >
              {metrics.safetyStatus}
            </span>
          </div>
          <p className="text-xs text-slate-500">
            {activeIncidents.length === 0
              ? 'Zero active critical security alerts'
              : `${activeIncidents.length} active event requiring review`}
          </p>
        </div>

        {/* Metric 3: Active Occupancy */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Campus Occupancy
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3 flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {metrics.occupancyRate}%
            </span>
            <span className="text-xs text-slate-400 font-normal">capacity</span>
          </div>
          <p className="text-xs text-slate-500">
            ~2,840 active students & staff inside zones
          </p>
        </div>

        {/* Metric 4: Energy Consumption */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Power Load
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="my-3 flex items-baseline space-x-1.5">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {metrics.energyConsumptionKw}
            </span>
            <span className="text-xs font-medium text-slate-400">kW</span>
          </div>
          <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            18.4% conserved via AI smart setback
          </p>
        </div>
      </div>

      {/* Middle Section: Active Alerts & AI Optimization */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Safety Alerts (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Safety & Anomaly Incidents
                  </h3>
                  <p className="text-xs text-slate-500">
                    Live isolation forest & vision camera detections
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('safety-incidents')}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {activeIncidents.slice(0, 3).map((incident) => (
                <div
                  key={incident.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                          {incident.ticketNumber}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            incident.priority === 'HIGH' || incident.priority === 'CRITICAL'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {incident.priority}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {incident.detectedAt}
                        </span>
                      </div>
                      <h4 className="font-semibold text-sm text-slate-900">
                        {incident.title}
                      </h4>
                      <p className="text-xs text-slate-500">{incident.location}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="inline-block text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-2xs">
                        {incident.status}
                      </span>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Confidence: <span className="font-bold text-emerald-600">{incident.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <p className="text-slate-600 line-clamp-1 italic text-[11px]">
                      Recommended: {incident.recommendation}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedIncident(incident);
                        setActiveTab('safety-incidents');
                      }}
                      className="text-indigo-600 hover:text-indigo-700 font-semibold text-xs whitespace-nowrap ml-3 cursor-pointer"
                    >
                      Why AI flagged this? →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Automated Anomaly Watchdog: Active
            </span>
            <span className="font-mono text-slate-600">99.8% precision rate</span>
          </div>
        </div>

        {/* AI Recommendations (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    Smart Resource Optimizer
                  </h3>
                  <p className="text-xs text-slate-500">
                    Automated cost & carbon reductions
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                Actionable
              </span>
            </div>

            <div className="space-y-3">
              {recommendations.slice(0, 2).map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {rec.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1.5">
                        {rec.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {rec.reason}
                      </p>
                    </div>
                  </div>

                  {rec.potentialSaving && (
                    <div className="mt-2.5 p-2 bg-emerald-50/80 rounded-lg border border-emerald-100 text-xs flex items-center justify-between">
                      <span className="text-emerald-700 font-medium">Estimated Impact:</span>
                      <span className="font-bold text-emerald-800 font-mono">
                        {rec.potentialSaving}
                      </span>
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/80">
                    <span className="text-[11px] text-slate-500 line-clamp-1">
                      {rec.actionText}
                    </span>
                    <button
                      onClick={() => setActiveTab('smart-resources')}
                      className="ml-2 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer"
                    >
                      {rec.isApplied ? 'Applied ✓' : 'Apply'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Machine learning model v2.4</span>
            <button
              onClick={() => setActiveTab('smart-resources')}
              className="text-emerald-600 font-semibold hover:text-emerald-700 cursor-pointer"
            >
              All recommendations →
            </button>
          </div>
        </div>
      </div>

      {/* Facilities Status Grid (12 Monitored Zones) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-600" />
              <span>Campus Facility Telemetry (12 Zones)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live status across academic blocks, laboratories, parking lots, and residential halls
            </p>
          </div>
          <button
            onClick={() => setActiveTab('campus-map')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Open Interactive Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {buildings.map((b) => (
            <button
              key={b.id}
              onClick={() => {
                setSelectedBuilding(b);
                setActiveTab('campus-map');
              }}
              className={`p-3.5 rounded-xl border text-left transition-all hover:shadow-2xs cursor-pointer ${
                b.status === 'CRITICAL'
                  ? 'bg-rose-50/60 border-rose-200 hover:border-rose-300'
                  : b.status === 'WARNING'
                  ? 'bg-amber-50/60 border-amber-200 hover:border-amber-300'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    b.status === 'NORMAL'
                      ? 'bg-emerald-500'
                      : b.status === 'WARNING'
                      ? 'bg-amber-500'
                      : 'bg-rose-500 animate-pulse'
                  }`}
                />
                <span className="text-[11px] font-mono text-slate-500">{b.occupancy}% occ</span>
              </div>
              <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{b.name}</h4>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>{b.energyKw} kW</span>
                <span>{b.temperature}°C</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
