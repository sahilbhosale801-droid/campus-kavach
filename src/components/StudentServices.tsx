import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { StudentTicket } from '../types';
import {
  GraduationCap,
  Sparkles,
  Search,
  Send,
  MessageSquare,
  Clock,
  MapPin,
  CheckCircle2,
  Zap,
  Wrench,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sourceContext?: string;
  suggestedAction?: { label: string; action: () => void };
}

export const StudentServices: React.FC = () => {
  const {
    studySpots,
    studentTickets,
    createStudentTicket,
    parkingSlots,
    metrics,
    buildings,
    setEmergencyActive,
    setActiveTab,
  } = useCampus();

  const [activeTab, setSubTab] = useState<'CHAT' | 'STUDY' | 'TICKETS'>('CHAT');

  // Campus AI Assistant State
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'ai',
      text: 'Hello! I am your Campus Kavach AI Assistant. I have live access to campus environmental sensors, quiet study spot vacancies, parking slots, and facility ticket dispatch. How can I help you today?',
      timestamp: 'Just now',
      sourceContext: 'Grounded in real-time campus sensors & facility schedules',
    },
  ]);

  // Issue Reporting Form State
  const [issueText, setIssueText] = useState('');
  const [issueLocation, setIssueLocation] = useState('Academic Block B - Room 204');

  const handleSendMessage = (customPrompt?: string) => {
    const prompt = customPrompt || chatInput;
    if (!prompt.trim()) return;

    const userMsg: ChatMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customPrompt) setChatInput('');

    // Generate grounded contextual response
    setTimeout(() => {
      const lower = prompt.toLowerCase();
      let aiText = '';
      let sourceContext = 'Grounded: Campus Knowledge + Live Sensors';
      let action: ChatMessage['suggestedAction'] = undefined;

      if (lower.includes('study') || lower.includes('where can i study') || lower.includes('quiet')) {
        const quietSpot = studySpots[0]; // Study Hall 2
        aiText = `${quietSpot.name} currently has ${quietSpot.occupancy}% occupancy (${quietSpot.seatsAvailable} seats available) and is open until ${quietSpot.availableUntil}. It is approximately ${quietSpot.distanceMeters}m from the central lawn.`;
        sourceContext = 'Sensor Context: Live turnstile counter in Central Library Annex';
        action = {
          label: 'View Study Spots',
          action: () => setSubTab('STUDY'),
        };
      } else if (lower.includes('parking') || lower.includes('car') || lower.includes('park')) {
        const freeZoneA = parkingSlots.filter((s) => s.zone === 'Zone A' && !s.isOccupied).length;
        aiText = `Parking Zone A currently has ${freeZoneA} slots free. Slot A03 is vacant and only 120m from Academic Block A. Congestion is currently LOW.`;
        sourceContext = 'Sensor Context: YOLOv8 CCTV feed & ultrasonic sensors';
        action = {
          label: 'Reserve Slot A03',
          action: () => setActiveTab('smart-parking'),
        };
      } else if (lower.includes('ac') || lower.includes('room 204') || lower.includes('cooling') || lower.includes('broken')) {
        aiText = `I noticed your issue regarding Room 204. Thermal sensors indicate a variance of +3.8°C. I can automatically generate Ticket #SC-1042 categorized under HVAC maintenance. Would you like me to submit it?`;
        sourceContext = 'Correlated with active telemetry incident INC-2041';
        action = {
          label: 'File Ticket #SC-1042',
          action: () => {
            createStudentTicket('AC not working in Room 204', 'Academic Block B - Room 204');
            setSubTab('TICKETS');
          },
        };
      } else if (lower.includes('library') && (lower.includes('time') || lower.includes('hour') || lower.includes('open'))) {
        aiText = `The Central Library is open from 8:00 AM to 11:00 PM on weekdays (24/7 during midterm & final exam weeks). Current overall library occupancy is 72%.`;
        sourceContext = 'Campus Knowledge Base: Library Operating Schedule';
      } else if (lower.includes('emergency') || lower.includes('security') || lower.includes('contact') || lower.includes('help')) {
        aiText = `Campus Security Command is available 24/7 at Ext: 911 or direct helpline +1 (800) 555-KAVACH. The Security Station is fully staffed.`;
        sourceContext = 'Emergency Protocol Database';
        action = {
          label: 'Open SOS Protocol',
          action: () => setEmergencyActive(true),
        };
      } else {
        aiText = `I understand your question regarding "${prompt}". Based on current sensor readings (Campus Health: ${metrics.campusHealth}/100, Occupancy: ${metrics.occupancyRate}%), campus operations are nominal. You can ask about study hall vacancies, parking spots, HVAC status, or library timings!`;
      }

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceContext,
        suggestedAction: action,
      };

      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueText.trim()) return;
    createStudentTicket(issueText, issueLocation);
    setIssueText('');
    setSubTab('TICKETS');
  };

  const openTicketsCount = studentTickets.filter((t) => t.status !== 'RESOLVED').length;
  const resolvedTicketsCount = studentTickets.filter((t) => t.status === 'RESOLVED').length;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white border border-slate-200/90 p-6 rounded-2xl shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Student Services & AI Assistant</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
              Live Services
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Grounded Campus AI Assistant, real-time quiet study spot availability & instant automated facility ticketing.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setSubTab('CHAT')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === 'CHAT' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            💬 Campus AI
          </button>
          <button
            onClick={() => setSubTab('STUDY')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === 'STUDY' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📚 Study Spots ({studySpots.length})
          </button>
          <button
            onClick={() => setSubTab('TICKETS')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === 'TICKETS' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎫 Issue Tickets ({openTicketsCount} open)
          </button>
        </div>
      </div>

      {/* 1. CAMPUS AI ASSISTANT */}
      {activeTab === 'CHAT' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Chat Window (Col 8) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl flex flex-col h-[520px] overflow-hidden shadow-2xs">
            {/* Chat Header */}
            <div className="p-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Campus Kavach AI Assistant</h3>
                  <p className="text-[11px] text-emerald-600 font-medium">
                    ● Connected to Real-Time Campus Telemetry
                  </p>
                </div>
              </div>
              <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                Instant Grounded RAG
              </span>
            </div>

            {/* Messages Feed */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-xl p-3.5 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-slate-900 text-white rounded-br-none'
                        : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-bl-none'
                    }`}
                  >
                    <p>{m.text}</p>
                    {m.sourceContext && (
                      <div className="mt-2 pt-1.5 border-t border-slate-200/80 text-[10px] text-indigo-600 font-mono">
                        {m.sourceContext}
                      </div>
                    )}
                  </div>

                  {m.suggestedAction && (
                    <button
                      onClick={m.suggestedAction.action}
                      className="mt-1.5 px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <span>{m.suggestedAction.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}

                  <span className="text-[10px] text-slate-400 mt-1 font-mono">{m.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px]">
              <span className="text-slate-400 shrink-0 font-bold text-[10px]">TRY ASKING:</span>
              <button
                onClick={() => handleSendMessage('Where can I study right now?')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap cursor-pointer transition-colors shadow-2xs"
              >
                Where can I study right now?
              </button>
              <button
                onClick={() => handleSendMessage('AC not working in Room 204')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap cursor-pointer transition-colors shadow-2xs"
              >
                AC not working in Room 204
              </button>
              <button
                onClick={() => handleSendMessage('Is Parking Zone A full?')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap cursor-pointer transition-colors shadow-2xs"
              >
                Is Parking Zone A full?
              </button>
              <button
                onClick={() => handleSendMessage('What are the Central Library hours?')}
                className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap cursor-pointer transition-colors shadow-2xs"
              >
                Library Hours
              </button>
            </div>

            {/* Message Input Bar */}
            <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about study spots, parking, building climate, or report an issue..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={() => handleSendMessage()}
                className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Issue Report Drawer (Col 4) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Wrench className="w-4 h-4 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-base">Quick Issue Reporter</h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                State your classroom problem in natural language; the AI will auto-categorize and assign priority instantly.
              </p>

              <form onSubmit={handleCreateTicketSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Location / Room:</label>
                  <input
                    type="text"
                    value={issueLocation}
                    onChange={(e) => setIssueLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-semibold">Describe Problem:</label>
                  <textarea
                    rows={4}
                    value={issueText}
                    onChange={(e) => setIssueText(e.target.value)}
                    placeholder="e.g. AC not cooling in seminar hall 204, or flickering light near desk 3..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-900 text-xs focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Submit Ticket via AI Engine
                </button>
              </form>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Avg Resolution Time:</span>
              <span className="font-mono text-emerald-600 font-bold">14 mins</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. STUDY SPOTS */}
      {activeTab === 'STUDY' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {studySpots.map((spot) => (
            <div
              key={spot.id}
              className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {spot.noiseLevel}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{spot.distanceMeters}m away</span>
                </div>

                <h4 className="text-base font-bold text-slate-900 mt-2">{spot.name}</h4>
                <p className="text-xs text-slate-500">{spot.building}</p>

                <div className="my-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Occupancy:</span>
                    <span
                      className={`font-mono font-bold ${
                        spot.occupancy > 80 ? 'text-rose-600' : 'text-emerald-600'
                      }`}
                    >
                      {spot.occupancy}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Free Seats:</span>
                    <span className="font-mono text-slate-900 font-bold">{spot.seatsAvailable} seats</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Power Outlets:</span>
                    <span className="text-slate-700">{spot.powerOutlets ? 'Available ✓' : 'Limited'}</span>
                  </div>
                </div>

                <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free until {spot.availableUntil}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  alert(`Navigating to ${spot.name}...`);
                  setActiveTab('campus-map');
                }}
                className="mt-4 w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-slate-600" />
                <span>Locate on Map</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 3. STUDENT ISSUE TICKETS */}
      {activeTab === 'TICKETS' && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Open Tickets</span>
              <div className="text-2xl font-extrabold text-amber-600 font-mono mt-1">
                {openTicketsCount}
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Resolved Today</span>
              <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
                {resolvedTicketsCount}
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Critical Issues</span>
              <div className="text-2xl font-extrabold text-slate-700 font-mono mt-1">0</div>
            </div>
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Avg Resolution</span>
              <div className="text-2xl font-extrabold text-indigo-600 font-mono mt-1">14 min</div>
            </div>
          </div>

          <div className="space-y-3">
            {studentTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white border border-slate-200 p-5 rounded-2xl shadow-2xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {ticket.ticketCode}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                      {ticket.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{ticket.submittedAt}</span>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      ticket.status === 'RESOLVED'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    STATUS: {ticket.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{ticket.description}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Location: {ticket.location}</p>
                  <p className="text-xs text-indigo-600 mt-1 font-mono">
                    AI Routing: {ticket.aiSummary}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{ticket.updatedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
