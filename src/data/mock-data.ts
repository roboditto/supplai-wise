import type { Warehouse, InventoryItem, Shipment, Alert, AIPrediction } from '@/types';

export const warehouses: Warehouse[] = [
  {
    id: 'WH-001', name: 'Chicago Central Hub', code: 'CHI', address: '500 W Madison St',
    city: 'Chicago', country: 'USA', lat: 41.8819, lng: -87.6278, capacity: 50000, currentUtilization: 78,
  },
  {
    id: 'WH-002', name: 'Los Angeles Distribution', code: 'LAX', address: '1200 S Figueroa St',
    city: 'Los Angeles', country: 'USA', lat: 34.0195, lng: -118.2568, capacity: 35000, currentUtilization: 62,
  },
  {
    id: 'WH-003', name: 'Miami Port Warehouse', code: 'MIA', address: '300 Biscayne Blvd',
    city: 'Miami', country: 'USA', lat: 25.7751, lng: -80.1868, capacity: 28000, currentUtilization: 85,
  },
];

export const inventoryItems: InventoryItem[] = [
  { id: 'INV-001', name: 'Industrial Bearings', sku: 'BRG-4420', category: 'Machinery Parts', warehouseId: 'WH-001', warehouseName: 'Chicago Central Hub', quantity: 1200, reorderThreshold: 200, unitType: 'units', supplier: 'Precision Parts Co.', unitCost: 12.50, lastUpdated: '2026-03-13T14:30:00Z' },
  { id: 'INV-002', name: 'Hydraulic Fluid', sku: 'HYD-1100', category: 'Liquids', warehouseId: 'WH-001', warehouseName: 'Chicago Central Hub', quantity: 850, reorderThreshold: 300, unitType: 'liters', supplier: 'FluidTech Inc.', unitCost: 8.75, lastUpdated: '2026-03-12T09:15:00Z' },
  { id: 'INV-003', name: 'Steel Rods (6mm)', sku: 'STL-6060', category: 'Raw Materials', warehouseId: 'WH-002', warehouseName: 'Los Angeles Distribution', quantity: 3400, reorderThreshold: 500, unitType: 'units', supplier: 'SteelWorks Global', unitCost: 4.20, lastUpdated: '2026-03-14T08:00:00Z' },
  { id: 'INV-004', name: 'Circuit Boards (Type-C)', sku: 'PCB-7800', category: 'Electronics', warehouseId: 'WH-001', warehouseName: 'Chicago Central Hub', quantity: 45, reorderThreshold: 100, unitType: 'units', supplier: 'TechBoard Mfg.', unitCost: 34.00, lastUpdated: '2026-03-14T07:45:00Z' },
  { id: 'INV-005', name: 'Packing Foam Sheets', sku: 'PKG-2200', category: 'Packaging', warehouseId: 'WH-003', warehouseName: 'Miami Port Warehouse', quantity: 5600, reorderThreshold: 1000, unitType: 'units', supplier: 'PackRight Solutions', unitCost: 1.80, lastUpdated: '2026-03-13T16:20:00Z' },
  { id: 'INV-006', name: 'Lithium Batteries (18650)', sku: 'BAT-1865', category: 'Electronics', warehouseId: 'WH-002', warehouseName: 'Los Angeles Distribution', quantity: 2800, reorderThreshold: 500, unitType: 'units', supplier: 'PowerCell Ltd.', unitCost: 2.40, lastUpdated: '2026-03-14T10:00:00Z' },
  { id: 'INV-007', name: 'Rubber Gaskets', sku: 'GSK-3300', category: 'Machinery Parts', warehouseId: 'WH-001', warehouseName: 'Chicago Central Hub', quantity: 18, reorderThreshold: 50, unitType: 'units', supplier: 'SealPro Industries', unitCost: 6.90, lastUpdated: '2026-03-14T06:30:00Z' },
  { id: 'INV-008', name: 'Copper Wire (12 AWG)', sku: 'COP-1200', category: 'Raw Materials', warehouseId: 'WH-003', warehouseName: 'Miami Port Warehouse', quantity: 1500, reorderThreshold: 300, unitType: 'kg', supplier: 'MetalCraft Co.', unitCost: 15.60, lastUpdated: '2026-03-13T11:45:00Z' },
  { id: 'INV-009', name: 'LED Panel Lights', sku: 'LED-4500', category: 'Electronics', warehouseId: 'WH-002', warehouseName: 'Los Angeles Distribution', quantity: 620, reorderThreshold: 100, unitType: 'units', supplier: 'BrightLight Corp.', unitCost: 22.00, lastUpdated: '2026-03-12T14:00:00Z' },
  { id: 'INV-010', name: 'Stainless Steel Bolts (M8)', sku: 'BLT-0800', category: 'Hardware', warehouseId: 'WH-001', warehouseName: 'Chicago Central Hub', quantity: 8900, reorderThreshold: 1000, unitType: 'units', supplier: 'FastenAll Supply', unitCost: 0.35, lastUpdated: '2026-03-14T09:30:00Z' },
  { id: 'INV-011', name: 'Thermal Paste', sku: 'THP-0100', category: 'Electronics', warehouseId: 'WH-003', warehouseName: 'Miami Port Warehouse', quantity: 340, reorderThreshold: 50, unitType: 'units', supplier: 'CoolTech Supplies', unitCost: 5.50, lastUpdated: '2026-03-13T08:00:00Z' },
  { id: 'INV-012', name: 'Corrugated Boxes (Large)', sku: 'BOX-5500', category: 'Packaging', warehouseId: 'WH-001', warehouseName: 'Chicago Central Hub', quantity: 2200, reorderThreshold: 400, unitType: 'units', supplier: 'PackRight Solutions', unitCost: 3.20, lastUpdated: '2026-03-14T07:00:00Z' },
  { id: 'INV-013', name: 'Pneumatic Hoses', sku: 'PNH-7700', category: 'Machinery Parts', warehouseId: 'WH-002', warehouseName: 'Los Angeles Distribution', quantity: 180, reorderThreshold: 40, unitType: 'units', supplier: 'AirFlow Systems', unitCost: 18.90, lastUpdated: '2026-03-12T16:30:00Z' },
  { id: 'INV-014', name: 'Epoxy Resin (Industrial)', sku: 'EPX-9900', category: 'Chemicals', warehouseId: 'WH-003', warehouseName: 'Miami Port Warehouse', quantity: 420, reorderThreshold: 80, unitType: 'liters', supplier: 'ChemBond Corp.', unitCost: 28.00, lastUpdated: '2026-03-13T13:15:00Z' },
  { id: 'INV-015', name: 'Fiber Optic Cables (50m)', sku: 'FOC-5000', category: 'Electronics', warehouseId: 'WH-001', warehouseName: 'Chicago Central Hub', quantity: 95, reorderThreshold: 30, unitType: 'units', supplier: 'NetConnect Ltd.', unitCost: 45.00, lastUpdated: '2026-03-14T11:00:00Z' },
];

export const shipments: Shipment[] = [
  {
    id: 'SHP-001', trackingCode: 'TRK-101', origin: 'Chicago Central Hub', originWarehouseId: 'WH-001',
    destination: 'Detroit Assembly Plant', items: [
      { inventoryItemId: 'INV-001', itemName: 'Industrial Bearings', quantity: 200 },
      { inventoryItemId: 'INV-010', itemName: 'Stainless Steel Bolts (M8)', quantity: 1500 },
    ],
    status: 'in_transit', currentLocation: { lat: 41.65, lng: -83.54, label: 'Toledo, OH' },
    eta: '2026-03-15T10:00:00Z', delayRisk: 'low',
    routeHistory: [
      { lat: 41.8819, lng: -87.6278, timestamp: '2026-03-13T06:00:00Z', label: 'Chicago, IL' },
      { lat: 41.5906, lng: -84.5561, timestamp: '2026-03-13T14:00:00Z', label: 'Defiance, OH' },
      { lat: 41.65, lng: -83.54, timestamp: '2026-03-14T08:00:00Z', label: 'Toledo, OH' },
    ],
    createdAt: '2026-03-12T08:00:00Z', updatedAt: '2026-03-14T08:00:00Z',
  },
  {
    id: 'SHP-002', trackingCode: 'TRK-102', origin: 'Los Angeles Distribution', originWarehouseId: 'WH-002',
    destination: 'Phoenix Retail Center', items: [
      { inventoryItemId: 'INV-006', itemName: 'Lithium Batteries (18650)', quantity: 500 },
      { inventoryItemId: 'INV-009', itemName: 'LED Panel Lights', quantity: 100 },
    ],
    status: 'delayed', currentLocation: { lat: 34.15, lng: -114.29, label: 'Needles, CA' },
    eta: '2026-03-16T18:00:00Z', delayRisk: 'high',
    routeHistory: [
      { lat: 34.0195, lng: -118.2568, timestamp: '2026-03-12T10:00:00Z', label: 'Los Angeles, CA' },
      { lat: 34.15, lng: -114.29, timestamp: '2026-03-13T16:00:00Z', label: 'Needles, CA' },
    ],
    createdAt: '2026-03-11T14:00:00Z', updatedAt: '2026-03-14T06:00:00Z',
  },
  {
    id: 'SHP-003', trackingCode: 'TRK-103', origin: 'Miami Port Warehouse', originWarehouseId: 'WH-003',
    destination: 'Atlanta Distribution Hub', items: [
      { inventoryItemId: 'INV-008', itemName: 'Copper Wire (12 AWG)', quantity: 300 },
    ],
    status: 'dispatched', currentLocation: { lat: 25.7751, lng: -80.1868, label: 'Miami, FL' },
    eta: '2026-03-16T12:00:00Z', delayRisk: 'low',
    routeHistory: [
      { lat: 25.7751, lng: -80.1868, timestamp: '2026-03-14T07:00:00Z', label: 'Miami, FL' },
    ],
    createdAt: '2026-03-14T05:00:00Z', updatedAt: '2026-03-14T07:00:00Z',
  },
  {
    id: 'SHP-004', trackingCode: 'TRK-104', origin: 'Chicago Central Hub', originWarehouseId: 'WH-001',
    destination: 'Minneapolis Depot', items: [
      { inventoryItemId: 'INV-004', itemName: 'Circuit Boards (Type-C)', quantity: 30 },
      { inventoryItemId: 'INV-007', itemName: 'Rubber Gaskets', quantity: 15 },
    ],
    status: 'pending', currentLocation: { lat: 41.8819, lng: -87.6278, label: 'Chicago, IL' },
    eta: '2026-03-17T14:00:00Z', delayRisk: 'medium',
    routeHistory: [],
    createdAt: '2026-03-14T10:00:00Z', updatedAt: '2026-03-14T10:00:00Z',
  },
  {
    id: 'SHP-005', trackingCode: 'TRK-105', origin: 'Los Angeles Distribution', originWarehouseId: 'WH-002',
    destination: 'San Francisco Tech Park', items: [
      { inventoryItemId: 'INV-003', itemName: 'Steel Rods (6mm)', quantity: 800 },
    ],
    status: 'delivered', currentLocation: { lat: 37.7749, lng: -122.4194, label: 'San Francisco, CA' },
    eta: '2026-03-13T16:00:00Z', delayRisk: 'low',
    routeHistory: [
      { lat: 34.0195, lng: -118.2568, timestamp: '2026-03-11T08:00:00Z', label: 'Los Angeles, CA' },
      { lat: 35.3733, lng: -119.0187, timestamp: '2026-03-12T06:00:00Z', label: 'Bakersfield, CA' },
      { lat: 37.7749, lng: -122.4194, timestamp: '2026-03-13T14:00:00Z', label: 'San Francisco, CA' },
    ],
    createdAt: '2026-03-10T12:00:00Z', updatedAt: '2026-03-13T14:00:00Z',
  },
  {
    id: 'SHP-006', trackingCode: 'TRK-106', origin: 'Miami Port Warehouse', originWarehouseId: 'WH-003',
    destination: 'New York Fulfillment Center', items: [
      { inventoryItemId: 'INV-005', itemName: 'Packing Foam Sheets', quantity: 1000 },
      { inventoryItemId: 'INV-014', itemName: 'Epoxy Resin (Industrial)', quantity: 80 },
    ],
    status: 'packed', currentLocation: { lat: 25.7751, lng: -80.1868, label: 'Miami, FL' },
    eta: '2026-03-18T09:00:00Z', delayRisk: 'low',
    routeHistory: [],
    createdAt: '2026-03-14T09:00:00Z', updatedAt: '2026-03-14T11:00:00Z',
  },
];

export const alerts: Alert[] = [
  { id: 'ALT-001', type: 'low_stock', severity: 'critical', title: 'Critical: Circuit Boards Nearly Depleted', message: 'INV-004 Circuit Boards (Type-C) at Chicago Central Hub has only 45 units remaining (threshold: 100). Pending shipment TRK-104 will further reduce stock by 30 units.', relatedItemId: 'INV-004', createdAt: '2026-03-14T07:50:00Z', acknowledged: false },
  { id: 'ALT-002', type: 'low_stock', severity: 'warning', title: 'Low Stock: Rubber Gaskets', message: 'INV-007 Rubber Gaskets at Chicago Central Hub has only 18 units remaining (threshold: 50).', relatedItemId: 'INV-007', createdAt: '2026-03-14T06:35:00Z', acknowledged: false },
  { id: 'ALT-003', type: 'shipment_delay', severity: 'critical', title: 'Shipment TRK-102 Delayed', message: 'Shipment TRK-102 (LA → Phoenix) has been stalled at Needles, CA for 14+ hours. High delay risk. Original ETA was March 14, now estimated March 16.', relatedShipmentId: 'SHP-002', createdAt: '2026-03-14T06:00:00Z', acknowledged: false },
  { id: 'ALT-004', type: 'stockout_risk', severity: 'critical', title: 'Stockout Risk: Circuit Boards', message: 'With current usage rate and delayed supply shipments, Circuit Boards (Type-C) will reach zero stock within 2 days. Immediate reorder recommended.', relatedItemId: 'INV-004', createdAt: '2026-03-14T08:00:00Z', acknowledged: false },
  { id: 'ALT-005', type: 'reorder', severity: 'info', title: 'Reorder Suggestion: Hydraulic Fluid', message: 'Hydraulic Fluid (INV-002) stock is trending down. Consider placing reorder within the next 5 days.', relatedItemId: 'INV-002', createdAt: '2026-03-13T12:00:00Z', acknowledged: true },
];

export const aiPredictions: AIPrediction[] = [
  { id: 'PRED-001', type: 'delay_risk', entityId: 'SHP-002', entityType: 'shipment', prediction: 'High delay risk - 82% probability of 2+ day delay', confidence: 82, details: 'Shipment stalled at Needles, CA. Route I-40 showing congestion. Weather advisory in Mojave Desert region.', recommendation: 'Consider rerouting via I-15 through Las Vegas. Alternative ETA: March 16.', createdAt: '2026-03-14T06:00:00Z' },
  { id: 'PRED-002', type: 'stockout', entityId: 'INV-004', entityType: 'inventory', prediction: 'Stockout in 2 days', confidence: 91, details: 'Current stock: 45 units. Daily usage: ~20 units. No incoming shipments within 48 hours.', recommendation: 'Place emergency reorder of 200 units from TechBoard Mfg. Consider express shipping.', createdAt: '2026-03-14T08:00:00Z' },
  { id: 'PRED-003', type: 'eta', entityId: 'SHP-001', entityType: 'shipment', prediction: 'On-time delivery expected', confidence: 94, details: 'Currently at Toledo, OH. Clear roads ahead. 60 miles remaining to Detroit.', recommendation: 'No action needed. Delivery on track for March 15.', createdAt: '2026-03-14T08:30:00Z' },
  { id: 'PRED-004', type: 'stockout', entityId: 'INV-007', entityType: 'inventory', prediction: 'Stockout in 5 days', confidence: 73, details: 'Current stock: 18 units. Usage rate: ~3/day. Pending shipment may replenish partial stock.', recommendation: 'Place reorder of 100 units from SealPro Industries. Standard shipping acceptable.', createdAt: '2026-03-14T08:00:00Z' },
  { id: 'PRED-005', type: 'delay_risk', entityId: 'SHP-004', entityType: 'shipment', prediction: 'Medium delay risk - 45% probability', confidence: 45, details: 'Pending shipment not yet dispatched. Contains low-stock items that need priority handling.', recommendation: 'Expedite packing and dispatch within 4 hours to maintain ETA.', createdAt: '2026-03-14T10:00:00Z' },
];

// Dashboard summary stats
export const dashboardStats = {
  totalInventoryItems: inventoryItems.length,
  lowStockItems: inventoryItems.filter(i => i.quantity <= i.reorderThreshold).length,
  totalInventoryValue: inventoryItems.reduce((sum, i) => sum + i.quantity * i.unitCost, 0),
  activeShipments: shipments.filter(s => !['delivered'].includes(s.status)).length,
  delayedShipments: shipments.filter(s => s.status === 'delayed').length,
  predictedStockouts: aiPredictions.filter(p => p.type === 'stockout').length,
  criticalAlerts: alerts.filter(a => a.severity === 'critical' && !a.acknowledged).length,
  warehouseCount: warehouses.length,
};

// Chart data
export const inventoryTrendData = [
  { date: 'Mar 8', inStock: 28500, belowThreshold: 1, orders: 3 },
  { date: 'Mar 9', inStock: 27800, belowThreshold: 1, orders: 5 },
  { date: 'Mar 10', inStock: 27200, belowThreshold: 1, orders: 2 },
  { date: 'Mar 11', inStock: 26900, belowThreshold: 2, orders: 4 },
  { date: 'Mar 12', inStock: 26400, belowThreshold: 2, orders: 6 },
  { date: 'Mar 13', inStock: 25800, belowThreshold: 2, orders: 3 },
  { date: 'Mar 14', inStock: 25265, belowThreshold: 2, orders: 4 },
];

export const shipmentPerformanceData = [
  { date: 'Mar 8', onTime: 4, delayed: 0, delivered: 2 },
  { date: 'Mar 9', onTime: 3, delayed: 1, delivered: 1 },
  { date: 'Mar 10', onTime: 5, delayed: 0, delivered: 3 },
  { date: 'Mar 11', onTime: 4, delayed: 1, delivered: 2 },
  { date: 'Mar 12', onTime: 3, delayed: 1, delivered: 1 },
  { date: 'Mar 13', onTime: 4, delayed: 1, delivered: 2 },
  { date: 'Mar 14', onTime: 3, delayed: 1, delivered: 0 },
];

export const categoryDistribution = [
  { name: 'Electronics', value: 4, fill: 'hsl(220, 70%, 45%)' },
  { name: 'Machinery Parts', value: 3, fill: 'hsl(142, 71%, 45%)' },
  { name: 'Raw Materials', value: 2, fill: 'hsl(38, 92%, 50%)' },
  { name: 'Packaging', value: 2, fill: 'hsl(199, 89%, 48%)' },
  { name: 'Liquids', value: 1, fill: 'hsl(280, 60%, 50%)' },
  { name: 'Hardware', value: 1, fill: 'hsl(340, 65%, 50%)' },
  { name: 'Chemicals', value: 1, fill: 'hsl(160, 50%, 45%)' },
];
