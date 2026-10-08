import React from 'react';
import { useCampus } from '../context/CampusContext';
import {
  Wifi,
  Radio,
  Server,
  Activity,
  Cpu,
  Terminal,
  Database,
} from 'lucide-react';

export const NetworkCenter: React.FC = () => {
  const {
    metrics,
    mqttStream,
    simulateNetworkFailure,
    toggleEdgeMode,
    resetToNormal,
  } = useCampus();

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Radio className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Network & Sensor Telemetry Hub</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold">
              Mesh Telemetry Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            ESP32 Edge Nodes → Wi-Fi Mesh → MQTT Broker → Campus Gateway → Fast API / WebSocket → Dashboard.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={simulateNetworkFailure}
            className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Simulate Drop
          </button>
          <button
            onClick={toggleEdgeMode}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              metrics.edgeModeActive
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
            }`}
          >
            {metrics.edgeModeActive ? 'Switch to Cloud' : 'Toggle Edge / Offline Mode'}
          </button>
        </div>
      </div>

      {/* Network Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-bold uppercase tracking-wider">Network Health</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="my-2">
            <span
              className={`text-3xl font-extrabold font-mono ${
                metrics.networkHealth > 90 ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {metrics.networkHealth}%
            </span>
          </div>
          <span className="text-xs text-slate-400">Target SLA: 98.5%</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-bold uppercase tracking-wider">Connected Nodes</span>
            <Cpu className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="my-2">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {metrics.connectedNodes}
            </span>
            <span className="text-xs text-slate-400 font-mono"> / {metrics.totalNodes}</span>
          </div>
          <span className="text-xs text-indigo-600 font-medium">ESP32 & LoRa Mesh</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-bold uppercase tracking-wider">Mesh Latency</span>
            <Wifi className="w-4 h-4 text-blue-600" />
          </div>
          <div className="my-2">
            <span
              className={`text-3xl font-extrabold font-mono ${
                metrics.networkHealth < 85 ? 'text-rose-600' : 'text-slate-900'
              }`}
            >
              {metrics.networkHealth < 85 ? '86' : '21'}
            </span>
            <span className="text-xs text-slate-500 ml-1">ms</span>
          </div>
          <span className="text-xs text-slate-400">Normal range: 18-25 ms</span>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-bold uppercase tracking-wider">MQTT Packet Loss</span>
            <Radio className="w-4 h-4 text-amber-600" />
          </div>
          <div className="my-2">
            <span
              className={`text-3xl font-extrabold font-mono ${
                metrics.networkHealth < 85 ? 'text-rose-600' : 'text-emerald-600'
              }`}
            >
              {metrics.networkHealth < 85 ? '8.7%' : '0.4%'}
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">128 msg/sec throughput</span>
        </div>
      </div>

      {/* Offline / Edge Mode Banner */}
      {metrics.edgeModeActive && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Radio className="w-5 h-5 text-amber-700 animate-pulse" />
              <h3 className="font-bold text-amber-900 text-base">SYSTEM MODE: EDGE / LOCAL BUFFERING</h3>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-bold">
              OFFLINE BUFFERING
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="bg-white p-2.5 rounded-lg border border-amber-200">
              <span className="text-slate-500 block">INTERNET:</span>
              <span className="text-rose-600 font-bold">OFFLINE (SIMULATED)</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-amber-200">
              <span className="text-slate-500 block">MQTT BROKER:</span>
              <span className="text-emerald-700 font-bold">ONLINE (LOCAL GATEWAY)</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-amber-200">
              <span className="text-slate-500 block">CAMPUS GATEWAY:</span>
              <span className="text-emerald-700 font-bold">ONLINE (EDGE HOST)</span>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-amber-200">
              <span className="text-slate-500 block">CONNECTED SENSORS:</span>
              <span className="text-indigo-700 font-bold">46 / 48 BUFFERING</span>
            </div>
          </div>

          <p className="text-xs text-amber-900">
            Edge nodes are buffering environmental and security telemetry in non-volatile storage. Automatic synchronization will upload all logged packets once upstream connectivity is restored.
          </p>
        </div>
      )}

      {/* Hardware Architecture Flow */}
      <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-2xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Hardware & Ingestion Pipeline
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
          {[
            { step: 'ESP32 / Sensors', detail: 'PIR, Ultrasound, CT, Flow', icon: Cpu, color: 'text-indigo-600 bg-indigo-50' },
            { step: 'Wi-Fi / LoRa Mesh', detail: '802.11 b/g/n / 868MHz', icon: Wifi, color: 'text-blue-600 bg-blue-50' },
            { step: 'MQTT Broker', detail: 'Mosquitto 1883 / TLS', icon: Radio, color: 'text-emerald-600 bg-emerald-50' },
            { step: 'Campus Gateway', detail: 'Edge Node Ingress', icon: Server, color: 'text-amber-600 bg-amber-50' },
            { step: 'FastAPI Backend', detail: 'REST + WebSockets', icon: Database, color: 'text-purple-600 bg-purple-50' },
            { step: 'Smart Dashboard', detail: 'React Real-Time UI', icon: Activity, color: 'text-rose-600 bg-rose-50' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/80 flex flex-col items-center justify-between"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-slate-800">{item.step}</span>
                <span className="text-[11px] text-slate-500 mt-1">{item.detail}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live MQTT Event Stream */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-slate-700" />
            <h3 className="font-bold text-slate-900 text-base">Real-Time MQTT Telemetry Stream</h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
              Subscribed: campus/#
            </span>
          </div>
          <span className="text-xs text-slate-400 font-mono">Live Ingestion</span>
        </div>

        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1 font-mono text-xs">
          {mqttStream.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all ${
                msg.status === 'ERROR'
                  ? 'bg-rose-50 border-rose-200 text-rose-800'
                  : msg.status === 'ANOMALY'
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-[11px] text-slate-400">{msg.timestamp}</span>
                <span className="px-2 py-0.5 rounded bg-white text-slate-800 font-bold text-[11px] border border-slate-200 shadow-2xs">
                  {msg.deviceId}
                </span>
                <span className="text-slate-800 font-medium">{msg.topic}</span>
              </div>

              <div className="text-[11px] text-slate-600 truncate max-w-md">
                payload: <span className="font-semibold text-slate-800">{JSON.stringify(msg.payload)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Broker: tcp://mqtt.campuskavach.internal:1883</span>
          <span className="font-mono text-emerald-600 font-semibold">QoS: 1 (At least once)</span>
        </div>
      </div>
    </div>
  );
};
