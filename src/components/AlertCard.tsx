import { cn } from "@/lib/utils";
import type { Alert } from "@/types";
import { AlertTriangle, AlertCircle, Info, Package, Truck } from "lucide-react";

interface AlertCardProps {
  alert: Alert;
  compact?: boolean;
}

const severityStyles = {
  critical: { bg: 'bg-destructive/5 border-destructive/20', icon: AlertTriangle, iconColor: 'text-destructive' },
  warning: { bg: 'bg-warning/5 border-warning/20', icon: AlertCircle, iconColor: 'text-warning' },
  info: { bg: 'bg-info/5 border-info/20', icon: Info, iconColor: 'text-info' },
};

const typeIcons = {
  low_stock: Package,
  stockout_risk: Package,
  shipment_delay: Truck,
  reorder: Package,
  general: Info,
};

export function AlertCard({ alert, compact = false }: AlertCardProps) {
  const style = severityStyles[alert.severity];
  const Icon = style.icon;
  const TypeIcon = typeIcons[alert.type];

  if (compact) {
    return (
      <div className={cn("flex items-start gap-3 p-3 rounded-lg border", style.bg)}>
        <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0", style.iconColor)} />
        <div className="min-w-0">
          <p className="text-sm font-medium text-card-foreground truncate">{alert.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{alert.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("p-4 rounded-xl border", style.bg)}>
      <div className="flex items-start gap-3">
        <div className={cn("p-2 rounded-lg", `${style.iconColor} bg-current/10`)}>
          <Icon className={cn("w-5 h-5", style.iconColor)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
              alert.severity === 'critical' ? 'bg-destructive/10 text-destructive' :
              alert.severity === 'warning' ? 'bg-warning/10 text-warning' : 'bg-info/10 text-info'
            )}>
              {alert.severity}
            </span>
            <TypeIcon className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
          <h4 className="text-sm font-semibold text-card-foreground">{alert.title}</h4>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{alert.message}</p>
          <p className="text-[10px] text-muted-foreground/60 mt-2">
            {new Date(alert.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
