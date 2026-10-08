import React from 'react';
import { Incident } from '../types';
import { Sparkles, X } from 'lucide-react';

interface Props {
  incident: Incident | null;
  onClose: () => void;
}

export const ExplainabilityModal: React.FC<Props> = ({ incident, onClose }) => {
  if (!incident) return null;

  const { explainability } = incident;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl p-6 shadow-xl space-y-5 relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {incident.ticketNumber}
                </span>
                <h3 className="text-base font-bold text-slate-900">AI Incident Explainability</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Model: <span className="font-mono text-slate-700 font-semibold">{explainability.modelName}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Highlight Question: WHY DID AI FLAG THIS? */}
        <div className="bg-indigo-50/70 border border-indigo-200/80 p-4 rounded-xl">
          <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1">
            Why did AI flag this?
          </h4>
          <p className="text-sm font-medium text-slate-700 leading-relaxed">
            {explainability.aiExplanation}
          </p>
        </div>

        {/* Quantitative Deviation Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block mb-1">Measured Value</span>
            <span className="text-base font-bold text-rose-600 font-mono">
              {explainability.currentVal}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block mb-1">Normal Baseline</span>
            <span className="text-base font-bold text-slate-800 font-mono">
              {explainability.baselineVal}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block mb-1">Zone Occupancy</span>
            <span className="text-base font-bold text-blue-600 font-mono">
              {explainability.occupancy}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <span className="text-slate-500 block mb-1">Deviation</span>
            <span className="text-base font-bold text-amber-600 font-mono">
              {explainability.deviation}
            </span>
          </div>
        </div>

        {/* Machine Learning Pipeline Context */}
        <div className="bg-slate-50/80 border border-slate-200/80 p-3.5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Model Inference Confidence:</span>
            <span className="font-bold text-emerald-600 font-mono">{incident.confidence}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all"
              style={{ width: `${incident.confidence}%` }}
            />
          </div>
          <div className="text-xs text-slate-500 pt-1 flex items-center justify-between">
            <span>Location: {incident.location}</span>
            <span>Detected: {incident.detectedAt}</span>
          </div>
        </div>

        {/* Recommended Action */}
        <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/80 text-xs">
          <span className="font-bold text-emerald-900 block mb-1">Recommended Action:</span>
          <p className="text-slate-700">{incident.recommendation}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
