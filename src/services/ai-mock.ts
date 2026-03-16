// ============================================================
// Mock AI Service Implementation
// TODO: Replace with real AI provider (OpenAI, Gemini, Anthropic, etc.)
// Each function follows the AIProviderPort interface from types/index.ts
// ============================================================

import type {
  AIProviderPort,
  ETAPredictionInput,
  ETAPredictionOutput,
  DelayRiskInput,
  DelayRiskOutput,
  StockoutForecastInput,
  StockoutForecastOutput,
  AssistantMessage,
} from '@/types';
import { inventoryItems, shipments, alerts, aiPredictions } from '@/data/mock-data';

const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export const mockAIProvider: AIProviderPort = {
  // TODO: Connect to real ETA prediction API
  async predictETA(_input: ETAPredictionInput): Promise<ETAPredictionOutput> {
    await delay(800);
    return {
      estimatedArrival: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
      confidencePercent: 87,
      factors: ['Current traffic conditions', 'Weather forecast', 'Historical route data'],
    };
  },

  // TODO: Connect to real delay risk prediction API
  async predictDelayRisk(_input: DelayRiskInput): Promise<DelayRiskOutput> {
    await delay(600);
    return {
      riskLevel: 'medium',
      probabilityPercent: 45,
      riskFactors: ['Route congestion', 'Weather advisory'],
      recommendation: 'Monitor and prepare alternative route',
    };
  },

  // TODO: Connect to real stockout forecasting API
  async forecastStockout(_input: StockoutForecastInput): Promise<StockoutForecastOutput> {
    await delay(700);
    return {
      daysUntilStockout: 5,
      riskLevel: 'medium',
      recommendation: 'Place reorder within 2 days',
    };
  },

  // TODO: Connect to real AI chat API (OpenAI, Gemini, etc.)
  async chat(messages: AssistantMessage[]): Promise<string> {
    await delay(1000);
    const lastMessage = messages[messages.length - 1]?.content.toLowerCase() || '';

    if (lastMessage.includes('trk-102') || lastMessage.includes('shipment') && lastMessage.includes('delay')) {
      const s = shipments.find(s => s.trackingCode === 'TRK-102');
      return `**Shipment TRK-102 Status:**\n\n📍 **Current Location:** ${s?.currentLocation.label || 'Unknown'}\n📦 **Status:** ${s?.status.toUpperCase()}\n⚠️ **Delay Risk:** HIGH\n\nThis shipment has been stalled at Needles, CA for over 14 hours. The original ETA was March 14, but it's now estimated for **March 16**.\n\n**Recommendation:** Consider rerouting via I-15 through Las Vegas to avoid further delays.`;
    }

    if (lastMessage.includes('low') && lastMessage.includes('stock')) {
      const lowStock = inventoryItems.filter(i => i.quantity <= i.reorderThreshold);
      const list = lowStock.map(i => `- **${i.name}** (${i.sku}): ${i.quantity} ${i.unitType} remaining (threshold: ${i.reorderThreshold})`).join('\n');
      return `**Low Stock Items:**\n\n${list}\n\n⚠️ Circuit Boards (Type-C) are critically low and expected to stockout in ~2 days. Immediate reorder recommended.`;
    }

    if (lastMessage.includes('risk') || lastMessage.includes('at risk')) {
      return `**Highest Risk Items:**\n\n1. 🔴 **Shipment TRK-102** — HIGH delay risk (82% probability of 2+ day delay)\n2. 🔴 **Circuit Boards (INV-004)** — Stockout predicted in 2 days\n3. 🟡 **Rubber Gaskets (INV-007)** — Low stock, 5-day runway\n4. 🟡 **Shipment TRK-104** — MEDIUM delay risk, pending dispatch\n\n**Priority Actions:**\n- Emergency reorder Circuit Boards from TechBoard Mfg.\n- Expedite TRK-104 dispatch\n- Reroute TRK-102 via I-15`;
    }

    if (lastMessage.includes('run out') || lastMessage.includes('stockout')) {
      return `**Stockout Forecast:**\n\n1. **Circuit Boards (Type-C)** — ⏰ ~2 days until stockout (91% confidence)\n2. **Rubber Gaskets** — ⏰ ~5 days until stockout (73% confidence)\n\nAll other items have sufficient runway (10+ days). I recommend placing an emergency order for Circuit Boards immediately.`;
    }

    return `I can help you with:\n\n- 📦 **Shipment tracking** — "Where is shipment TRK-102?"\n- 📊 **Inventory status** — "Which items are low in stock?"\n- ⚠️ **Risk analysis** — "What shipment is most at risk?"\n- 📈 **Forecasting** — "What inventory will run out first?"\n\nWhat would you like to know?`;
  },
};
