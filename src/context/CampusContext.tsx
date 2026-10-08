import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  CampusBuilding,
  CampusMetric,
  Incident,
  MQTTMessage,
  ParkingSlot,
  StudentTicket,
  StudySpot,
  MaintenanceEquipment,
  Recommendation,
  UserRole,
  SystemStatus,
} from '../types';

interface CampusContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  metrics: CampusMetric;
  buildings: CampusBuilding[];
  selectedBuilding: CampusBuilding | null;
  setSelectedBuilding: (b: CampusBuilding | null) => void;
  incidents: Incident[];
  selectedIncident: Incident | null;
  setSelectedIncident: (i: Incident | null) => void;
  updateIncidentStatus: (id: string, status: Incident['status'], assignedTo?: string) => void;
  emergencyActive: boolean;
  setEmergencyActive: (active: boolean) => void;
  mqttStream: MQTTMessage[];
  parkingSlots: ParkingSlot[];
  toggleParkingSlot: (id: string) => void;
  reserveParkingSlot: (id: string) => void;
  studentTickets: StudentTicket[];
  createStudentTicket: (description: string, location?: string) => StudentTicket;
  updateTicketStatus: (id: string, status: StudentTicket['status']) => void;
  studySpots: StudySpot[];
  equipmentList: MaintenanceEquipment[];
  recommendations: Recommendation[];
  applyRecommendation: (id: string) => void;
  
  // Simulations from Hackathon guide
  simulateEnergyAnomaly: () => void;
  simulateNetworkFailure: () => void;
  simulateCrowdSurge: () => void;
  toggleEdgeMode: () => void;
  resetToNormal: () => void;
  
  // Notification toast
  notification: string | null;
  dismissNotification: () => void;

  // Theme & Demo Modal
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  demoCenterOpen: boolean;
  setDemoCenterOpen: (open: boolean) => void;
}

const INITIAL_BUILDINGS: CampusBuilding[] = [
  {
    id: 'main-gate',
    name: 'Main Gate & Security Post',
    type: 'service',
    x: 15,
    y: 80,
    status: 'NORMAL',
    occupancy: 45,
    capacity: 100,
    temperature: 24.2,
    energyKw: 8.4,
    energyBaselineKw: 8.0,
    waterStatus: 'NORMAL',
    networkStatus: 'ONLINE',
    safetyStatus: 'NORMAL',
    aiInsights: ['Vehicle flow stable at 14 cars/min', 'Access badge scanner latency < 12ms'],
    sensorsCount: 6,
    description: 'Primary vehicular and pedestrian access checkpoint with automated ANPR cameras.',
  },
  {
    id: 'academic-a',
    name: 'Academic Block A (Engineering)',
    type: 'academic',
    x: 35,
    y: 50,
    status: 'NORMAL',
    occupancy: 64,
    capacity: 650,
    temperature: 22.8,
    energyKw: 46.2,
    energyBaselineKw: 48.0,
    waterStatus: 'NORMAL',
    networkStatus: 'ONLINE',
    safetyStatus: 'NORMAL',
    aiInsights: ['Lecture halls 101-104 running at optimal HVAC setpoint', 'Power consumption matches schedule'],
    sensorsCount: 14,
    description: 'Civil and Mechanical engineering faculty classrooms, project studios, and offices.',
  },
  {
    id: 'academic-b',
    name: 'Academic Block B (Management & Arts)',
    type: 'academic',
    x: 65,
    y: 45,
    status: 'NORMAL',
    occupancy: 28,
    capacity: 500,
    temperature: 23.5,
    energyKw: 44.5,
    energyBaselineKw: 45.0,
    waterStatus: 'NORMAL',
    networkStatus: 'ONLINE',
    safetyStatus: 'NORMAL',
    aiInsights: ['Occupancy low (28%)', 'HVAC schedules aligned with afternoon seminars'],
    sensorsCount: 12,
    description: 'Humanities, design studios, auditorium and collaborative seminar halls.',
  },
  {
    id: 'cs-block',
    name: 'Computer Science Block & AI Labs',
    type: 'academic',
    x: 48,
    y: 30,
    status: 'NORMAL',
    occupancy: 78,
    capacity: 400,
    temperature: 21.4,
    energyKw: 58.1,
    energyBaselineKw: 55.0,
    waterStatus: 'NORMAL',
    networkStatus: 'ONLINE',
    safetyStatus: 'NORMAL',
    aiInsights: ['High GPU cluster compute load', 'Server room chillers operating in eco-mode'],
    sensorsCount: 16,
    description: 'High-performance computing datacenter, AI research labs, and cybersecurity workstations.',
  },
  {
    id: 'library',
    name: 'Central Library & Media Center',
    type: 'facility',
    x: 52,
    y: 65,
    status: 'NORMAL',
    occupancy: 72,
    capacity: 450,
    temperature: 22.1,
    energyKw: 31.4,
    energyBaselineKw: 30.0,
    waterStatus: 'NORMAL',
    networkStatus: 'ONLINE',
    safetyStatus: 'NORMAL',
    aiInsights: ['Reading halls nearing peak capacity (72%)', 'Forecasted 91% surge within 60 mins'],
    sensorsCount: 10,
    description: 'Multi-level library with quiet study spaces, digital research labs, and conference pods.',
  },
  {
    id: 'laboratory',
    name: 'Central Research Laboratories',
    type: 'academic',
    x: 25,
    y: 35,
    status: 'NORMAL',
    occupancy: 52,
    capacity: 250,
    temperature: 20.9,
    energyKw: 38.6,
    energyBaselineKw: 40.0,
    waterStatus: 'NORMAL',
    networkStatus: 'ONLINE',
    safetyStatus: 'NORMAL',
    aiInsights: ['Fume hood airflow velocity nominal', 'Chemical storage temperature locked at 18°C'],
    sensorsCount: 15,
    description: 'Precision chemistry, nanotechnology, and advanced physics experimental chambers.',
  },
  {
    id: 'hostel',
    name: 'Student Residence Towers (Hostel)',
    type: 'hostel',
    x: 82,
    y: 28,
    status: 'NORMAL',
    occupancy: 42,
    capacity: 800,
    temperature: 25.0,
    energyKw: 28.5,
    energyBaselineKw: 30.0,
    waterStatus: 'NORMAL',
    networkStatus: 'ONLINE',
    safetyStatus: 'NORMAL',
    aiInsights: ['Daytime energy cycle running normal', 'Solar water heaters supplying 85% hot water demand'],
    sensorsCount: 20,
    description: 'On-campus dormitories with study lounges, common rooms, and residential laundry.',
  },
  {
    id: 'canteen',
    name: 'Campus Dining & Canteen Hub',
    type: 'facility',
    x: 75,
    y: 68,
    status: 'NORMAL',
    occupancy: 55,
    capacity: 350,
    temperature: 24.5,
    energyKw: 22.0,
    energyBaselineKw: 24.0,
    waterStatus: 'NORMAL',
    networkStatus: 'ONLINE',
    safetyStatus: 'NORMAL',
    aiInsights: ['Kitchen gas sensors zero ppm', 'Lunch surge cleared, next peak 17:00'],
    sensorsCount: 8,
    description: 'Cafeteria, food court vendors, and student gathering outdoor courtyard.',
  },
  {
    id: 'parking-a',
    name: 'Parking Zone A (North Facility)',
    type: 'parking',
    x: 30,
    y: 82,
    status: 'NORMAL',
    occupancy: 75,
    capacity: 120,
    temperature: 26.0,
    energyKw: 4.2,
    energyBaselineKw: 4.0,
    waterStatus: 'NORMAL',
    networkStatus: 'ONLINE',
    safetyStatus: 'NORMAL',
    aiInsights: ['18 slots free in Row 1-2', 'YOLO vehicle detection camera feed 98.4% confidence'],
    sensorsCount: 12,
    description: 'Faculty and student multi-slot parking with EV charging stations.',
  },
  {
    id: 'parking-b',
    name: 'Parking Zone B (South Facility)',
    type: 'parking',
    x: 85,
    y: 82,
    status: 'NORMAL',
    occupancy: 42,
    capacity: 150,
    temperature: 26.2,
    energyKw: 3.8,
    energyBaselineKw: 4.0,
    waterStatus: 'NORMAL',
    networkStatus: 'ONLINE',
    safetyStatus: 'NORMAL',
    aiInsights: ['High availability (58% free slots)', 'Recommended alternate for Zone A overflow'],
    sensorsCount: 12,
    description: 'Visitor and commuter covered parking facility.',
  },
  {
    id: 'admin',
    name: 'Administration & Senate Building',
    type: 'facility',
    x: 50,
    y: 15,
    status: 'NORMAL',
    occupancy: 60,
    capacity: 180,
    temperature: 22.5,
    energyKw: 19.8,
    energyBaselineKw: 20.0,
    waterStatus: 'NORMAL',
    networkStatus: 'ONLINE',
    safetyStatus: 'NORMAL',
    aiInsights: ['Registrar and finance offices active', 'Digital security badge sync normal'],
    sensorsCount: 9,
    description: 'Chancellor office, student affairs, admissions, and financial administration.',
  },
  {
    id: 'sports',
    name: 'Sports Complex & Athletics Ground',
    type: 'facility',
    x: 12,
    y: 20,
    status: 'NORMAL',
    occupancy: 25,
    capacity: 500,
    temperature: 27.1,
    energyKw: 11.2,
    energyBaselineKw: 12.0,
    waterStatus: 'NORMAL',
    networkStatus: 'ONLINE',
    safetyStatus: 'NORMAL',
    aiInsights: ['Field floodlights scheduled for 18:30', 'Sprinkler irrigation timer inactive'],
    sensorsCount: 7,
    description: 'Gymnasium, indoor basketball court, synthetic running track, and football pitch.',
  },
];

const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'inc-1',
    ticketNumber: 'INC-2041',
    title: 'HVAC Airflow Restriction Detected',
    category: 'HVAC',
    location: 'Academic Block B - Room 204',
    detectedAt: '12:14:02',
    confidence: 91,
    priority: 'MEDIUM',
    status: 'IN PROGRESS',
    assignedTo: 'Facility Team - Tech Ravi',
    description: 'Temperature variance of +3.8°C above setpoint with reduced duct airflow.',
    recommendation: 'Inspect secondary air dampers and replace intake particulate filter.',
    explainability: {
      currentVal: '27.2 °C',
      baselineVal: '23.0 °C',
      occupancy: '18 students',
      expectedVal: '23.4 °C',
      deviation: '+16.2%',
      aiExplanation: 'Air handler motor draw is 1.4x standard without delivering expected static pressure.',
      modelName: 'ThermalBalance-XGBoost v2',
    },
  },
  {
    id: 'inc-2',
    ticketNumber: 'INC-2039',
    title: 'Water Line Pressure Drop Alert',
    category: 'WATER',
    location: 'Hostel Tower West Basement',
    detectedAt: '10:48:19',
    confidence: 88,
    priority: 'LOW',
    status: 'ASSIGNED',
    assignedTo: 'Campus Plumber - Unit B',
    description: 'Micro-leak detected in secondary supply line via acoustic ultrasonic sensor.',
    recommendation: 'Check isolation valve IV-08 and tighten pipe joint flange.',
    explainability: {
      currentVal: '1.8 Bar',
      baselineVal: '3.2 Bar',
      occupancy: 'N/A (Utility Line)',
      expectedVal: '3.1 Bar',
      deviation: '-43.7%',
      aiExplanation: 'Sustained pressure drop over 25 minutes without corresponding flow meter increase at taps.',
      modelName: 'HydroAcoustic-IsolationForest',
    },
  },
];

const INITIAL_PARKING_SLOTS: ParkingSlot[] = [
  { id: 'p-a1', zone: 'Zone A', slotNumber: 'A01', isOccupied: true, distanceMeters: 110, isReserved: false, vehiclePlate: 'KA-05-MN-2091', detectionConfidence: 98 },
  { id: 'p-a2', zone: 'Zone A', slotNumber: 'A02', isOccupied: true, distanceMeters: 115, isReserved: false, vehiclePlate: 'DL-01-AB-7821', detectionConfidence: 97 },
  { id: 'p-a3', zone: 'Zone A', slotNumber: 'A03', isOccupied: false, distanceMeters: 120, isReserved: false, detectionConfidence: 99 },
  { id: 'p-a4', zone: 'Zone A', slotNumber: 'A04', isOccupied: true, distanceMeters: 125, isReserved: false, vehiclePlate: 'MH-12-PQ-4411', detectionConfidence: 96 },
  { id: 'p-a5', zone: 'Zone A', slotNumber: 'A05', isOccupied: false, distanceMeters: 130, isReserved: false, detectionConfidence: 99 },
  { id: 'p-a6', zone: 'Zone A', slotNumber: 'A06', isOccupied: true, distanceMeters: 135, isReserved: false, vehiclePlate: 'UP-32-CD-9012', detectionConfidence: 95 },
  { id: 'p-a7', zone: 'Zone A', slotNumber: 'A07', isOccupied: true, distanceMeters: 140, isReserved: false, vehiclePlate: 'MH-14-EF-3382', detectionConfidence: 97 },
  { id: 'p-a8', zone: 'Zone A', slotNumber: 'A08', isOccupied: false, distanceMeters: 145, isReserved: false, detectionConfidence: 99 },
  { id: 'p-b1', zone: 'Zone B', slotNumber: 'B01', isOccupied: false, distanceMeters: 220, isReserved: false, detectionConfidence: 99 },
  { id: 'p-b2', zone: 'Zone B', slotNumber: 'B02', isOccupied: false, distanceMeters: 225, isReserved: false, detectionConfidence: 99 },
  { id: 'p-b3', zone: 'Zone B', slotNumber: 'B03', isOccupied: true, distanceMeters: 230, isReserved: false, vehiclePlate: 'KA-03-XX-1102', detectionConfidence: 98 },
  { id: 'p-b4', zone: 'Zone B', slotNumber: 'B04', isOccupied: false, distanceMeters: 235, isReserved: false, detectionConfidence: 99 },
];

const INITIAL_STUDENT_TICKETS: StudentTicket[] = [
  {
    id: 'st-1042',
    ticketCode: 'SC-1042',
    category: 'HVAC',
    priority: 'MEDIUM',
    location: 'Academic Block B - Room 204',
    description: 'AC not cooling properly in seminar hall, room getting stuffy during lectures.',
    status: 'IN PROGRESS',
    submittedAt: '13:10 Today',
    updatedAt: '13:25 Assigned to HVAC technician',
    aiSummary: 'Categorized under HVAC climate control. Correlated with sensor INC-2041.',
  },
  {
    id: 'st-1038',
    ticketCode: 'SC-1038',
    category: 'ELECTRICAL',
    priority: 'LOW',
    location: 'Central Library - 2nd Floor Pod 4',
    description: 'Desk power socket 3 is loose and not charging laptop.',
    status: 'RESOLVED',
    submittedAt: 'Yesterday 16:40',
    updatedAt: 'Resolved at 18:15',
    aiSummary: 'Categorized under Electrical Maintenance. Socket faceplate replaced.',
  },
];

const INITIAL_STUDY_SPOTS: StudySpot[] = [
  {
    id: 'sp-1',
    name: 'Study Hall 2 (Silent Zone)',
    building: 'Central Library Annex',
    occupancy: 34,
    seatsAvailable: 42,
    noiseLevel: 'Quiet',
    powerOutlets: true,
    availableUntil: '4:30 PM (No reserved booking)',
    distanceMeters: 120,
  },
  {
    id: 'sp-2',
    name: 'CS Block Collaborative Lounge',
    building: 'Computer Science Block 2F',
    occupancy: 52,
    seatsAvailable: 19,
    noiseLevel: 'Moderate',
    powerOutlets: true,
    availableUntil: '8:00 PM',
    distanceMeters: 180,
  },
  {
    id: 'sp-3',
    name: 'Garden Study Pergola',
    building: 'Central Courtyard',
    occupancy: 20,
    seatsAvailable: 24,
    noiseLevel: 'Quiet',
    powerOutlets: false,
    availableUntil: '6:00 PM',
    distanceMeters: 90,
  },
  {
    id: 'sp-4',
    name: 'Main Reading Room 1',
    building: 'Central Library 1F',
    occupancy: 88,
    seatsAvailable: 6,
    noiseLevel: 'Quiet',
    powerOutlets: true,
    availableUntil: '10:00 PM',
    distanceMeters: 140,
  },
];

const INITIAL_EQUIPMENT: MaintenanceEquipment[] = [
  {
    id: 'eq-1',
    name: 'Chiller Unit AC-B1 (Primary)',
    location: 'Academic Block B - Rooftop',
    type: 'AC_UNIT',
    healthScore: 62,
    prediction: 'Potential compressor degradation within 7-10 days',
    signals: ['Rising energy draw (+34%)', 'Increased runtime (+4.2 hrs/day)', 'Refrigerant head pressure instability'],
    recommendation: 'Schedule mechanical technician inspection and inspect condenser fins.',
    lastChecked: '2 days ago',
    status: 'ATTENTION',
  },
  {
    id: 'eq-2',
    name: 'Main Hydro-Pneumatic Pump P-2',
    location: 'Campus Water Reservoir Base',
    type: 'WATER_PUMP',
    healthScore: 94,
    prediction: 'Nominal operation across all duty cycles',
    signals: ['Vibration frequency 28 Hz (Target < 35 Hz)', 'Current draw 14.2A nominal'],
    recommendation: 'Next scheduled lubrication in 24 days.',
    lastChecked: 'Yesterday',
    status: 'OPTIMAL',
  },
  {
    id: 'eq-3',
    name: 'Campus Gateway LoRa/ESP Node Router',
    location: 'Central Library Tower',
    type: 'IOT_GATEWAY',
    healthScore: 99,
    prediction: 'Healthy packet routing at 99.8% delivery rate',
    signals: ['MQTT throughput 128 msg/sec', 'Internal CPU temp 41°C'],
    recommendation: 'Keep firmware at v3.4.1.',
    lastChecked: 'Today 12:00',
    status: 'OPTIMAL',
  },
];

const INITIAL_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'rec-1',
    title: 'Block B Energy Optimization',
    priority: 'HIGH',
    category: 'ENERGY',
    reason: 'Energy 46% above historical baseline with only 28% occupancy recorded.',
    actionText: 'Reduce HVAC in unbooked seminar halls 201-206 & idle lighting zones',
    potentialSaving: '₹1,250 / day (estimated)',
    isApplied: false,
  },
  {
    id: 'rec-2',
    title: 'Library High Crowd Mitigation',
    priority: 'MEDIUM',
    category: 'CROWD',
    reason: 'Central Library forecasted to hit 91% capacity by 15:00.',
    actionText: 'Unlock overflow Study Hall 204 in Academic Block A for group study',
    potentialSaving: 'Prevents corridor crowding & reduces noise fatigue',
    isApplied: false,
  },
  {
    id: 'rec-3',
    title: 'Parking Zone A Congestion Divert',
    priority: 'MEDIUM',
    category: 'PARKING',
    reason: 'Zone A reached 85% capacity with steady inbound student arrival.',
    actionText: 'Activate digital signage redirecting incoming vehicles to Zone B (58% free)',
    potentialSaving: 'Reduces parking search time by 11 minutes per vehicle',
    isApplied: false,
  },
];

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export const CampusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('ADMIN');
  const [activeTab, setActiveTab] = useState<string>('command-center');
  const [buildings, setBuildings] = useState<CampusBuilding[]>(INITIAL_BUILDINGS);
  const [selectedBuilding, setSelectedBuilding] = useState<CampusBuilding | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>(INITIAL_INCIDENTS);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [emergencyActive, setEmergencyActive] = useState<boolean>(false);
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>(INITIAL_PARKING_SLOTS);
  const [studentTickets, setStudentTickets] = useState<StudentTicket[]>(INITIAL_STUDENT_TICKETS);
  const [studySpots, setStudySpots] = useState<StudySpot[]>(INITIAL_STUDY_SPOTS);
  const [equipmentList, setEquipmentList] = useState<MaintenanceEquipment[]>(INITIAL_EQUIPMENT);
  const [recommendations, setRecommendations] = useState<Recommendation[]>(INITIAL_RECOMMENDATIONS);
  const [notification, setNotification] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [demoCenterOpen, setDemoCenterOpen] = useState<boolean>(false);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      }
      return next;
    });
  }, []);

  useEffect(() => {
    // initialize theme class on document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [theme]);

  // Live Metrics State
  const [metrics, setMetrics] = useState<CampusMetric>({
    campusHealth: 94,
    safetyStatus: 'NORMAL',
    occupancyRate: 68,
    energyConsumptionKw: 72.4,
    waterFlowRate: 42.0,
    waterStatus: 'NORMAL',
    networkHealth: 98.7,
    connectedNodes: 47,
    totalNodes: 48,
    activeIncidentsCount: 2,
    aiInsightsCount: 5,
    edgeModeActive: false,
  });

  // MQTT Live Message Feed
  const [mqttStream, setMqttStream] = useState<MQTTMessage[]>([
    {
      id: 'm-1',
      timestamp: new Date().toLocaleTimeString(),
      topic: 'campus/parking/zoneA/slot03',
      deviceId: 'ESP32-P03',
      payload: { slot: 'A03', status: 'VACANT', distance_cm: 284 },
      status: 'NORMAL',
    },
    {
      id: 'm-2',
      timestamp: new Date(Date.now() - 2000).toLocaleTimeString(),
      topic: 'campus/resource/electricity/blockA',
      deviceId: 'ESP32-E01',
      payload: { power_kw: 46.2, pf: 0.94, phase_v: 231.2 },
      status: 'NORMAL',
    },
    {
      id: 'm-3',
      timestamp: new Date(Date.now() - 4000).toLocaleTimeString(),
      topic: 'campus/safety/library/occupancy',
      deviceId: 'ESP32-C11',
      payload: { people_count: 324, ambient_lux: 480, db_level: 38 },
      status: 'NORMAL',
    },
  ]);

  // Periodic Telemetry Simulator to show real MQTT packets streaming
  useEffect(() => {
    const timer = setInterval(() => {
      const topics = [
        { topic: 'campus/parking/zoneA/slot01', dev: 'ESP32-P01', payload: { slot: 'A01', occupied: true, ultrasonic_cm: 42 } },
        { topic: 'campus/resource/electricity/csblock', dev: 'ESP32-E04', payload: { power_kw: +(57 + Math.random() * 2).toFixed(1), volts: 230 } },
        { topic: 'campus/resource/water/flow_main', dev: 'ESP32-W02', payload: { flow_lpm: +(41 + Math.random() * 2).toFixed(1), pressure_bar: 3.1 } },
        { topic: 'campus/safety/blockB/temp', dev: 'ESP32-T12', payload: { temp_c: +(23 + Math.random()).toFixed(1), humidity_pct: 46 } },
        { topic: 'campus/classroom/room101', dev: 'ESP32-R101', payload: { seats_occupied: 42, co2_ppm: 620 } },
      ];
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      const newMsg: MQTTMessage = {
        id: 'msg-' + Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        topic: randomTopic.topic,
        deviceId: randomTopic.dev,
        payload: randomTopic.payload,
        status: 'NORMAL',
      };
      setMqttStream((prev) => [newMsg, ...prev.slice(0, 24)]);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  const dismissNotification = useCallback(() => {
    setNotification(null);
  }, []);

  // Update incident lifecycle
  const updateIncidentStatus = useCallback(
    (id: string, newStatus: Incident['status'], assignedTo?: string) => {
      setIncidents((prev) =>
        prev.map((inc) => {
          if (inc.id === id) {
            return {
              ...inc,
              status: newStatus,
              assignedTo: assignedTo || inc.assignedTo,
            };
          }
          return inc;
        })
      );
      setNotification(`Incident ${id} updated to ${newStatus}`);
    },
    []
  );

  // Toggle parking slot
  const toggleParkingSlot = useCallback((id: string) => {
    setParkingSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === id) {
          const nextOccupied = !slot.isOccupied;
          return {
            ...slot,
            isOccupied: nextOccupied,
            isReserved: nextOccupied ? false : slot.isReserved,
            vehiclePlate: nextOccupied ? 'MH-02-KA-7788' : undefined,
          };
        }
        return slot;
      })
    );
  }, []);

  // Reserve parking slot
  const reserveParkingSlot = useCallback((id: string) => {
    setParkingSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === id) {
          return { ...slot, isReserved: true, isOccupied: false };
        }
        return slot;
      })
    );
    setNotification(`Slot reserved successfully! Access token valid for 30 minutes.`);
  }, []);

  // Student ticket creation with AI categorizer
  const createStudentTicket = useCallback((description: string, location: string = 'Campus Facility') => {
    const lower = description.toLowerCase();
    let category: StudentTicket['category'] = 'IT';
    let priority: StudentTicket['priority'] = 'MEDIUM';

    if (lower.includes('ac') || lower.includes('cooling') || lower.includes('heat') || lower.includes('temperature') || lower.includes('air')) {
      category = 'HVAC';
      priority = 'MEDIUM';
    } else if (lower.includes('light') || lower.includes('socket') || lower.includes('power') || lower.includes('switch') || lower.includes('electricity')) {
      category = 'ELECTRICAL';
      priority = 'MEDIUM';
    } else if (lower.includes('chair') || lower.includes('desk') || lower.includes('bench') || lower.includes('table')) {
      category = 'FURNITURE';
      priority = 'LOW';
    } else if (lower.includes('water') || lower.includes('clean') || lower.includes('trash') || lower.includes('washroom')) {
      category = 'CLEANLINESS';
      priority = 'HIGH';
    }

    const newCode = `SC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTicket: StudentTicket = {
      id: 'ticket-' + Date.now(),
      ticketCode: newCode,
      category,
      priority,
      location,
      description,
      status: 'SUBMITTED',
      submittedAt: 'Just now',
      updatedAt: 'AI processed & routed to campus facilities team',
      aiSummary: `Auto-categorized as ${category} with ${priority} urgency based on natural language analysis.`,
    };

    setStudentTickets((prev) => [newTicket, ...prev]);
    setNotification(`Ticket ${newCode} created successfully! Assigned to facility queue.`);
    return newTicket;
  }, []);

  const updateTicketStatus = useCallback((id: string, status: StudentTicket['status']) => {
    setStudentTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              status,
              updatedAt: `Status shifted to ${status} by campus admin`,
            }
          : ticket
      )
    );
  }, []);

  // Recommendations
  const applyRecommendation = useCallback((id: string) => {
    setRecommendations((prev) =>
      prev.map((rec) => {
        if (rec.id === id) {
          return {
            ...rec,
            isApplied: true,
            appliedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        }
        return rec;
      })
    );
    setNotification(`Recommendation dispatched to building automation controllers.`);
  }, []);

  // 1. SIMULATE ENERGY ANOMALY (Demo 3 & 4)
  const simulateEnergyAnomaly = useCallback(() => {
    // Update Academic Block B
    setBuildings((prev) =>
      prev.map((b) => {
        if (b.id === 'academic-b') {
          return {
            ...b,
            energyKw: 92.0,
            status: 'CRITICAL',
            safetyStatus: 'WARNING',
            aiInsights: [
              'HIGH ENERGY ANOMALY: Consumption 92 kW vs baseline 45 kW (+92%) despite only 28% occupancy.',
              'Recommendation: Inspect HVAC and unbooked rooms 201-206.',
            ],
          };
        }
        return b;
      })
    );

    // Update overall metric
    setMetrics((prev) => ({
      ...prev,
      campusHealth: 86,
      safetyStatus: 'WARNING',
      energyConsumptionKw: 114.2,
      activeIncidentsCount: prev.activeIncidentsCount + 1,
    }));

    // Inject high priority incident
    const anomalyIncident: Incident = {
      id: 'inc-energy-anomaly-' + Date.now(),
      ticketNumber: 'INC-3088',
      title: 'High Energy Spike & Thermal Anomaly',
      category: 'ENERGY',
      location: 'Academic Block B',
      detectedAt: new Date().toLocaleTimeString(),
      confidence: 94,
      priority: 'HIGH',
      status: 'DETECTED',
      description: 'Sensor #ESP32-E02 reports sudden draw surge to 92 kW while building occupancy remains at 28%.',
      recommendation: 'Inspect HVAC chillers and shut down unassigned lecture hall electrical sub-panels.',
      explainability: {
        currentVal: '92.0 kW',
        baselineVal: '40–60 kW',
        occupancy: '28%',
        expectedVal: '48.0 kW',
        deviation: '+92%',
        aiExplanation:
          'Energy consumption is significantly above the historical baseline despite low occupancy. Machine learning Isolation Forest tagged anomaly score 0.91.',
        modelName: 'EnergyAnomaly-IsolationForest v3.1',
      },
    };

    setIncidents((prev) => [anomalyIncident, ...prev]);
    setSelectedIncident(anomalyIncident);

    // Inject anomaly message in MQTT stream
    const mqttAnomaly: MQTTMessage = {
      id: 'm-anomaly-' + Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      topic: 'campus/resource/electricity/blockB',
      deviceId: 'ESP32-E02',
      payload: { power_kw: 92.0, baseline_kw: 45.0, anomaly_score: 0.91, alert: 'CRITICAL_SPIKE' },
      status: 'ANOMALY',
    };
    setMqttStream((prev) => [mqttAnomaly, ...prev]);

    setNotification('⚠️ Energy Anomaly Injected: Academic Block B (92 kW with 28% occupancy). View Explainability!');
  }, []);

  // 2. SIMULATE NETWORK FAILURE (Demo 9)
  const simulateNetworkFailure = useCallback(() => {
    setMetrics((prev) => ({
      ...prev,
      networkHealth: 78.4,
      connectedNodes: 46,
      campusHealth: 88,
    }));

    setBuildings((prev) =>
      prev.map((b) => {
        if (b.id === 'academic-a') {
          return { ...b, networkStatus: 'DEGRADED', status: 'WARNING' };
        }
        return b;
      })
    );

    const netIncident: Incident = {
      id: 'inc-net-' + Date.now(),
      ticketNumber: 'INC-4011',
      title: 'ESP32-17 Gateway Degradation & Packet Drop',
      category: 'NETWORK',
      location: 'Academic Block A - Node 17',
      detectedAt: new Date().toLocaleTimeString(),
      confidence: 96,
      priority: 'HIGH',
      status: 'DETECTED',
      description: 'Device ESP32-17 dropped off Wi-Fi mesh. Packet loss surged from 0.4% to 8.7%, latency spiked to 86ms.',
      recommendation: 'Inspect sensor/gateway power rail and force mesh rerouting through Gateway Node 02.',
      explainability: {
        currentVal: '86 ms latency / 8.7% loss',
        baselineVal: '20 ms latency / 0.4% loss',
        occupancy: 'N/A (Telemetry)',
        expectedVal: '21 ms',
        deviation: '+330% latency',
        aiExplanation:
          'Network degradation detected. Node ESP32-17 unacknowledged heartbeats; mesh failover initialized.',
        modelName: 'NetWatch-StatisticalAnomaly',
      },
    };

    setIncidents((prev) => [netIncident, ...prev]);
    setSelectedIncident(netIncident);

    const mqttFail: MQTTMessage = {
      id: 'm-fail-' + Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      topic: 'campus/network/node17/heartbeat',
      deviceId: 'ESP32-17',
      payload: { status: 'OFFLINE', last_latency_ms: 86, packet_loss_pct: 8.7, error: 'TIMEOUT' },
      status: 'ERROR',
    };
    setMqttStream((prev) => [mqttFail, ...prev]);

    setNotification('⚠️ Network Failure Injected: ESP32-17 OFFLINE, packet loss 8.7%.');
  }, []);

  // 3. SIMULATE CROWD SURGE (Demo 6)
  const simulateCrowdSurge = useCallback(() => {
    setBuildings((prev) =>
      prev.map((b) => {
        if (b.id === 'library') {
          return {
            ...b,
            occupancy: 91,
            status: 'WARNING',
            aiInsights: [
              'HIGH CROWD DETECTED: 91% capacity reached in Central Library.',
              'Crowd prediction: Sustained overflow for next 2.5 hours due to midterm exams.',
            ],
          };
        }
        return b;
      })
    );

    setStudySpots((prev) =>
      prev.map((spot) => {
        if (spot.id === 'sp-4') return { ...spot, occupancy: 96, seatsAvailable: 2 };
        if (spot.id === 'sp-1') return { ...spot, occupancy: 42, seatsAvailable: 38 };
        return spot;
      })
    );

    setNotification('👥 Crowd Surge Triggered: Library reached 91% occupancy. Recommendation generated to open Study Hall 204.');
  }, []);

  // 4. TOGGLE EDGE / OFFLINE MODE (Section 18)
  const toggleEdgeMode = useCallback(() => {
    setMetrics((prev) => {
      const nextEdge = !prev.edgeModeActive;
      return {
        ...prev,
        edgeModeActive: nextEdge,
      };
    });
  }, []);

  // 5. RESET TO NORMAL
  const resetToNormal = useCallback(() => {
    setBuildings(INITIAL_BUILDINGS);
    setIncidents(INITIAL_INCIDENTS);
    setMetrics({
      campusHealth: 94,
      safetyStatus: 'NORMAL',
      occupancyRate: 68,
      energyConsumptionKw: 72.4,
      waterFlowRate: 42.0,
      waterStatus: 'NORMAL',
      networkHealth: 98.7,
      connectedNodes: 47,
      totalNodes: 48,
      activeIncidentsCount: 2,
      aiInsightsCount: 5,
      edgeModeActive: false,
    });
    setEmergencyActive(false);
    setSelectedIncident(null);
    setSelectedBuilding(null);
    setNotification('✅ Campus returned to standard baseline operations.');
  }, []);

  return (
    <CampusContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        metrics,
        buildings,
        selectedBuilding,
        setSelectedBuilding,
        incidents,
        selectedIncident,
        setSelectedIncident,
        updateIncidentStatus,
        emergencyActive,
        setEmergencyActive,
        mqttStream,
        parkingSlots,
        toggleParkingSlot,
        reserveParkingSlot,
        studentTickets,
        createStudentTicket,
        updateTicketStatus,
        studySpots,
        equipmentList,
        recommendations,
        applyRecommendation,
        simulateEnergyAnomaly,
        simulateNetworkFailure,
        simulateCrowdSurge,
        toggleEdgeMode,
        resetToNormal,
        notification,
        dismissNotification,
        theme,
        toggleTheme,
        demoCenterOpen,
        setDemoCenterOpen,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
