import { AppLayout } from "@/components/AppLayout";
import { warehouses, inventoryItems } from "@/data/mock-data";
import { MapPin, Package, TrendingUp } from "lucide-react";

export default function Warehouses() {
  return (
    <AppLayout title="Warehouses" subtitle={`${warehouses.length} locations`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {warehouses.map(wh => {
          const items = inventoryItems.filter(i => i.warehouseId === wh.id);
          const lowStock = items.filter(i => i.quantity <= i.reorderThreshold).length;
          const value = items.reduce((s, i) => s + i.quantity * i.unitCost, 0);

          return (
            <div key={wh.id} className="bg-card rounded-xl border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">{wh.code}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-card-foreground">{wh.name}</h3>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <span>{wh.city}, {wh.country}</span>
                  </div>
                </div>
              </div>

              {/* Utilization bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Utilization</span>
                  <span className="text-xs font-semibold text-card-foreground">{wh.currentUtilization}%</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${wh.currentUtilization >= 80 ? 'bg-warning' : 'bg-primary'}`}
                    style={{ width: `${wh.currentUtilization}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <Package className="w-4 h-4 mx-auto mb-1 text-primary" />
                  <p className="text-sm font-bold text-card-foreground">{items.length}</p>
                  <p className="text-[10px] text-muted-foreground">Items</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <TrendingUp className="w-4 h-4 mx-auto mb-1 text-success" />
                  <p className="text-sm font-bold text-card-foreground">${(value / 1000).toFixed(0)}k</p>
                  <p className="text-[10px] text-muted-foreground">Value</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-muted/50">
                  <Package className="w-4 h-4 mx-auto mb-1 text-warning" />
                  <p className="text-sm font-bold text-card-foreground">{lowStock}</p>
                  <p className="text-[10px] text-muted-foreground">Low Stock</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
