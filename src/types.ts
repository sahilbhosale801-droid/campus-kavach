export type UserRole = 'ADMIN' | 'STUDENT' | 'SECURITY';

export type SystemStatus = 'NORMAL' | 'WARNING' | 'CRITICAL';

export type IncidentStatus = 'DETECTED' | 'ASSIGNED' | 'IN PROGRESS' | 'RESOLVED';

export type IncidentPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface CampusMetric {
  campusHealth: number; // 0 - 100
  safetyStatus: SystemStatus;
  occupancyRate: number; // percentage
  energyConsumptionKw: number; // kW
  waterFlowRate: number; // L/min
  waterStatus: SystemStatus;
  networkHealth: number; // percentage
  connectedNodes: number;
  totalNodes: number;
  activeIncidentsCount: number;
  aiInsightsCount: number;
  edgeModeActive: boolean;
}

export interface CampusBuilding {
  id: string;
  name: string;
  type: 'academic' | 'facility' | 'hostel' | 'service' | 'parking';
  x: number; // % on map
  y: number; // % on map
  status: SystemStatus;
  occupancy: number; // %
  capacity: number;
  temperature: number; // °C
  energyKw: number;
  energyBaselineKw: number;
  waterStatus: SystemStatus;
  networkStatus: 'ONLINE' | 'DEGRADED' | 'OFFLINE';
  safetyStatus: SystemStatus;
  aiInsights: string[];
  sensorsCount: number;
  description: string;
}

export interface Incident {
  id: string;
  ticketNumber: string;
  title: string;
  category: 'ENERGY' | 'HVAC' | 'SAFETY' | 'NETWORK' | 'WATER' | 'CROWD';
  location: string;
  detectedAt: string;
  confidence: number;
  priority: IncidentPriority;
  status: IncidentStatus;
  assignedTo?: string;
  description: string;
  recommendation: string;
  explainability: {
    currentVal: string;
    baselineVal: string;
    occupancy: string;
    expectedVal: string;
    deviation: string;
    aiExplanation: string;
    modelName: string;
  };
}

export interface MQTTMessage {
  id: string;
  timestamp: string;
  topic: string;
  payload: Record<string, unknown>;
  deviceId: string;
  status: 'NORMAL' | 'ANOMALY' | 'ERROR';
}

export interface ParkingSlot {
  id: string;
  zone: 'Zone A' | 'Zone B';
  slotNumber: string;
  isOccupied: boolean;
  distanceMeters: number;
  isReserved: boolean;
  vehiclePlate?: string;
  detectionConfidence: number;
}

export interface StudentTicket {
  id: string;
  ticketCode: string;
  category: 'HVAC' | 'ELECTRICAL' | 'FURNITURE' | 'CLEANLINESS' | 'IT';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  location: string;
  description: string;
  status: 'SUBMITTED' | 'ASSIGNED' | 'IN PROGRESS' | 'RESOLVED';
  submittedAt: string;
  updatedAt: string;
  aiSummary: string;
}

export interface StudySpot {
  id: string;
  name: string;
  building: string;
  occupancy: number; // %
  seatsAvailable: number;
  noiseLevel: 'Quiet' | 'Moderate' | 'Collaborative';
  powerOutlets: boolean;
  availableUntil: string;
  distanceMeters: number;
}

export interface MaintenanceEquipment {
  id: string;
  name: string;
  location: string;
  type: 'AC_UNIT' | 'WATER_PUMP' | 'SUBSTATION' | 'IOT_GATEWAY';
  healthScore: number; // %
  prediction: string;
  signals: string[];
  recommendation: string;
  lastChecked: string;
  status: 'OPTIMAL' | 'ATTENTION' | 'CRITICAL';
}

export interface Recommendation {
  id: string;
  title: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  category: 'ENERGY' | 'CROWD' | 'PARKING' | 'SAFETY';
  reason: string;
  actionText: string;
  potentialSaving?: string;
  isApplied: boolean;
  appliedAt?: string;
}
