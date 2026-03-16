// ============================================================
// Core Domain Types for SupplAI Wise
// ============================================================

export type UserRole = 'admin' | 'operator';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  createdAt: string;
}

export interface Warehouse {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  capacity: number;
  currentUtilization: number;
}

export type UnitType = 'units' | 'kg' | 'liters' | 'pallets' | 'boxes' | 'tons';

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  warehouseId: string;
  warehouseName: string;
  quantity: number;
  reorderThreshold: number;
  unitType: UnitType;
  supplier: string;
  unitCost: number;
  lastUpdated: string;
}

export type ShipmentStatus = 'pending' | 'packed' | 'dispatched' | 'in_transit' | 'delayed' | 'delivered';

export interface ShipmentItem {
  inventoryItemId: string;
  itemName: string;
  quantity: number;
}

export interface LocationLog {
  lat: number;
  lng: number;
  timestamp: string;
  label?: string;
}

export interface Shipment {
  id: string;
  trackingCode: string;
  origin: string;
  originWarehouseId: string;
  destination: string;
  destinationWarehouseId?: string;
  items: ShipmentItem[];
  status: ShipmentStatus;
  currentLocation: { lat: number; lng: number; label: string };
  eta: string;
  delayRisk: 'low' | 'medium' | 'high';
  routeHistory: LocationLog[];
  createdAt: string;
  updatedAt: string;
}

export type AlertSeverity = 'info' | 'warning' | 'critical';
export type AlertType = 'low_stock' | 'stockout_risk' | 'shipment_delay' | 'reorder' | 'general';

export interface Alert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  title: string;
  message: string;
  relatedItemId?: string;
  relatedShipmentId?: string;
  createdAt: string;
  acknowledged: boolean;
}

export type PredictionType = 'eta' | 'delay_risk' | 'stockout';

export interface AIPrediction {
  id: string;
  type: PredictionType;
  entityId: string;
  entityType: 'shipment' | 'inventory';
  prediction: string;
  confidence: number;
  details: string;
  recommendation: string;
  createdAt: string;
}

// ============================================================
// AI Integration Port Interfaces
// TODO: Replace mock implementations with real AI providers
// ============================================================

export interface ETAPredictionInput {
  shipmentId: string;
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  currentLocation: { lat: number; lng: number };
  status: ShipmentStatus;
  routeHistory: LocationLog[];
}

export interface ETAPredictionOutput {
  estimatedArrival: string;
  confidencePercent: number;
  factors: string[];
}

export interface DelayRiskInput {
  shipmentId: string;
  origin: string;
  destination: string;
  currentStatus: ShipmentStatus;
  currentEta: string;
  routeHistory: LocationLog[];
}

export interface DelayRiskOutput {
  riskLevel: 'low' | 'medium' | 'high';
  probabilityPercent: number;
  riskFactors: string[];
  recommendation: string;
}

export interface StockoutForecastInput {
  itemId: string;
  currentQuantity: number;
  reorderThreshold: number;
  averageDailyUsage: number;
  pendingShipmentEtas: string[];
}

export interface StockoutForecastOutput {
  daysUntilStockout: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface AssistantMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// AI Provider Port interface
// TODO: Implement with real AI providers (OpenAI, Gemini, Anthropic)
export interface AIProviderPort {
  predictETA(input: ETAPredictionInput): Promise<ETAPredictionOutput>;
  predictDelayRisk(input: DelayRiskInput): Promise<DelayRiskOutput>;
  forecastStockout(input: StockoutForecastInput): Promise<StockoutForecastOutput>;
  chat(messages: AssistantMessage[]): Promise<string>;
}
