import { AppLayout } from "@/components/AppLayout";
import { StatsCard } from "@/components/StatsCard";
import { AlertCard } from "@/components/AlertCard";
import { StatusBadge, RiskBadge } from "@/components/StatusBadge";
import {
  dashboardStats,
  alerts,
  shipments,
  inventoryItems,
  inventoryTrendData,
  shipmentPerformanceData,
} from "@/data/mock-data";
import {
  Package,
  AlertTriangle,
  Truck,
  Clock,
  TrendingDown,
  Warehouse,
  DollarSign,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Landing from "@/components/Landing";

export default function Dashboard() {
  const lowStockItems = inventoryItems.filter(i => i.quantity <= i.reorderThreshold);
  const activeShipments = shipments.filter(s => s.status !== 'delivered');
  const criticalAlerts = alerts.filter(a => a.severity === 'critical' && !a.acknowledged);

  return (
    <>
    <Landing />
    <AppLayout title="Dashboard" subtitle="Real-time logistics overview">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Items"
          value={dashboardStats.totalInventoryItems}
          subtitle={`$${dashboardStats.totalInventoryValue.toLocaleString()} total value`}
          icon={Package}
        />
        <StatsCard
          title="Low Stock"
          value={dashboardStats.lowStockItems}
          subtitle="Items below threshold"
          icon={AlertTriangle}
          variant="warning"
        />
        <StatsCard
          title="Active Shipments"
          value={dashboardStats.activeShipments}
          subtitle={`${dashboardStats.delayedShipments} delayed`}
          icon={Truck}
          variant={dashboardStats.delayedShipments > 0 ? "danger" : "info"}
        />
        <StatsCard
          title="Stockout Risks"
          value={dashboardStats.predictedStockouts}
          subtitle="AI-predicted risks"
          icon={TrendingDown}
          variant="danger"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Inventory Trend */}
        <div className="bg-card rounded-xl border p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Inventory Levels (7 days)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={inventoryTrendData}>
              <defs>
                <linearGradient id="colorStock" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(220, 70%, 45%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(220, 70%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 50%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 50%)" />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid hsl(220, 15%, 90%)' }} />
              <Area type="monotone" dataKey="inStock" stroke="hsl(220, 70%, 45%)" fill="url(#colorStock)" strokeWidth={2} name="Total Stock" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Shipment Performance */}
        <div className="bg-card rounded-xl border p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Shipment Performance (7 days)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={shipmentPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 50%)" />
              <YAxis tick={{ fontSize: 11 }} stroke="hsl(220, 10%, 50%)" />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid hsl(220, 15%, 90%)' }} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="onTime" fill="hsl(142, 71%, 45%)" radius={[2, 2, 0, 0]} name="On Time" />
              <Bar dataKey="delayed" fill="hsl(0, 72%, 51%)" radius={[2, 2, 0, 0]} name="Delayed" />
              <Bar dataKey="delivered" fill="hsl(220, 70%, 45%)" radius={[2, 2, 0, 0]} name="Delivered" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Alerts */}
        <div className="bg-card rounded-xl border p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            Critical Alerts
            <span className="ml-auto text-[10px] font-bold bg-destructive/10 text-destructive rounded-full px-2 py-0.5">
              {criticalAlerts.length}
            </span>
          </h3>
          <div className="space-y-3">
            {criticalAlerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} compact />
            ))}
          </div>
        </div>

        {/* Active Shipments */}
        <div className="bg-card rounded-xl border p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Truck className="w-4 h-4 text-primary" />
            Active Shipments
          </h3>
          <div className="space-y-3">
            {activeShipments.map(s => (
              <div key={s.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="min-w-0">
                  <p className="text-sm font-mono font-medium text-card-foreground">{s.trackingCode}</p>
                  <p className="text-xs text-muted-foreground truncate">{s.origin} → {s.destination}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge status={s.status} />
                  <RiskBadge risk={s.delayRisk} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-card rounded-xl border p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-warning" />
            Low Stock Items
          </h3>
          <div className="space-y-3">
            {lowStockItems.map(item => (
              <div key={item.id} className="p-3 rounded-lg bg-muted/50">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-card-foreground">{item.name}</p>
                  <span className="text-xs font-mono text-muted-foreground">{item.sku}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{item.warehouseName}</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${item.quantity <= item.reorderThreshold * 0.5 ? 'text-destructive' : 'text-warning'}`}>
                      {item.quantity} {item.unitType}
                    </span>
                    <span className="text-[10px] text-muted-foreground">/ {item.reorderThreshold}</span>
                  </div>
                </div>
                {/* Stock bar */}
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${item.quantity <= item.reorderThreshold * 0.5 ? 'bg-destructive' : 'bg-warning'}`}
                    style={{ width: `${Math.min((item.quantity / item.reorderThreshold) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
            {lowStockItems.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">All items well-stocked ✓</p>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  </>);
}
