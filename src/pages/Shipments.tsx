import { AppLayout } from "@/components/AppLayout";
import { StatusBadge, RiskBadge } from "@/components/StatusBadge";
import { shipments } from "@/data/mock-data";
import { useState, useMemo } from "react";
import { Search, MapPin, Clock, Package, ArrowRight, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ShipmentStatus, Shipment } from "@/types";

const statusSteps: ShipmentStatus[] = ['pending', 'packed', 'dispatched', 'in_transit', 'delivered'];

function ShipmentPipeline({ status }: { status: ShipmentStatus }) {
  const isDelayed = status === 'delayed';
  const currentIdx = isDelayed ? 3 : statusSteps.indexOf(status);

  return (
    <div className="flex items-center gap-1">
      {statusSteps.map((step, i) => {
        const active = i <= currentIdx;
        const isCurrent = i === currentIdx;
        return (
          <div key={step} className="flex items-center gap-1">
            <div className={cn(
              "w-2 h-2 rounded-full transition-colors",
              active
                ? (isDelayed && isCurrent ? "bg-destructive animate-pulse-slow" : isCurrent ? "bg-primary" : "bg-success")
                : "bg-muted-foreground/20"
            )} />
            {i < statusSteps.length - 1 && (
              <div className={cn("w-6 h-0.5 rounded", active ? "bg-success" : "bg-muted-foreground/20")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ShipmentCard({ shipment }: { shipment: Shipment }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl border p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-mono font-bold text-card-foreground">{shipment.trackingCode}</span>
            <StatusBadge status={shipment.status} size="md" />
            <RiskBadge risk={shipment.delayRisk} />
          </div>
          <p className="text-xs text-muted-foreground">{shipment.id}</p>
        </div>
        <button onClick={() => setExpanded(!expanded)} className="text-xs text-primary hover:underline">
          {expanded ? 'Less' : 'Details'}
        </button>
      </div>

      {/* Route */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span>{shipment.origin}</span>
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground/40" />
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="w-3.5 h-3.5" />
          <span>{shipment.destination}</span>
        </div>
      </div>

      {/* Pipeline */}
      <div className="mb-3">
        <ShipmentPipeline status={shipment.status} />
      </div>

      {/* Current location & ETA */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Truck className="w-3.5 h-3.5" />
          <span>Currently: <span className="font-medium text-card-foreground">{shipment.currentLocation.label}</span></span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>ETA: <span className="font-medium text-card-foreground">{new Date(shipment.eta).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span></span>
        </div>
      </div>

      {/* Expanded */}
      {expanded && (
        <div className="mt-4 pt-4 border-t space-y-3 animate-slide-in">
          {/* Items */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Items</p>
            <div className="space-y-1">
              {shipment.items.map(item => (
                <div key={item.inventoryItemId} className="flex items-center justify-between text-xs p-2 rounded bg-muted/50">
                  <span className="text-card-foreground">{item.itemName}</span>
                  <span className="text-muted-foreground font-mono">{item.quantity} units</span>
                </div>
              ))}
            </div>
          </div>

          {/* Route History */}
          {shipment.routeHistory.length > 0 && (
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Route History</p>
              <div className="relative pl-4">
                {shipment.routeHistory.map((loc, i) => (
                  <div key={i} className="relative flex items-start gap-3 pb-3">
                    <div className={cn(
                      "absolute left-[-12px] w-2 h-2 rounded-full mt-1.5",
                      i === shipment.routeHistory.length - 1 ? "bg-primary" : "bg-success"
                    )} />
                    {i < shipment.routeHistory.length - 1 && (
                      <div className="absolute left-[-9px] top-3 w-0.5 h-full bg-border" />
                    )}
                    <div>
                      <p className="text-xs font-medium text-card-foreground">{loc.label}</p>
                      <p className="text-[10px] text-muted-foreground">{new Date(loc.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function Shipments() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ShipmentStatus | 'all'>('all');

  const filtered = useMemo(() => {
    let items = [...shipments];
    if (search) {
      const s = search.toLowerCase();
      items = items.filter(sh => sh.trackingCode.toLowerCase().includes(s) || sh.origin.toLowerCase().includes(s) || sh.destination.toLowerCase().includes(s));
    }
    if (statusFilter !== 'all') items = items.filter(sh => sh.status === statusFilter);
    return items;
  }, [search, statusFilter]);

  const statuses: (ShipmentStatus | 'all')[] = ['all', 'pending', 'packed', 'dispatched', 'in_transit', 'delayed', 'delivered'];

  return (
    <AppLayout title="Shipments" subtitle={`${shipments.length} total shipments`}>
      {/* Filters */}
      <div className="bg-card rounded-xl border p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tracking codes, routes..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5 flex-wrap">
            {statuses.map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap",
                  statusFilter === s ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {s === 'all' ? 'All' : s === 'in_transit' ? 'In Transit' : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Shipment Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(shipment => (
          <ShipmentCard key={shipment.id} shipment={shipment} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Truck className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
          <p className="text-sm">No shipments found</p>
        </div>
      )}
    </AppLayout>
  );
}
