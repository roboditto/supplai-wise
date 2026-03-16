import { AppLayout } from "@/components/AppLayout";
import { AlertCard } from "@/components/AlertCard";
import { alerts } from "@/data/mock-data";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Alerts() {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info'>('all');

  const filtered = filter === 'all' ? alerts : alerts.filter(a => a.severity === filter);

  return (
    <AppLayout title="Alerts" subtitle={`${alerts.filter(a => !a.acknowledged).length} unacknowledged`}>
      <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5 mb-6 w-fit">
        {(['all', 'critical', 'warning', 'info'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-1.5 text-xs font-medium rounded-md transition-colors capitalize",
              filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-4 max-w-3xl">
        {filtered.map(alert => (
          <AlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </AppLayout>
  );
}
