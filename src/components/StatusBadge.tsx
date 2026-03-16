import { cn } from "@/lib/utils";
import type { ShipmentStatus } from "@/types";

interface StatusBadgeProps {
  status: ShipmentStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<ShipmentStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-muted text-muted-foreground' },
  packed: { label: 'Packed', className: 'bg-info/10 text-info border border-info/20' },
  dispatched: { label: 'Dispatched', className: 'bg-primary/10 text-primary border border-primary/20' },
  in_transit: { label: 'In Transit', className: 'bg-info/10 text-info border border-info/20' },
  delayed: { label: 'Delayed', className: 'bg-destructive/10 text-destructive border border-destructive/20' },
  delivered: { label: 'Delivered', className: 'bg-success/10 text-success border border-success/20' },
};

export function StatusBadge({ status, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={cn(
      "inline-flex items-center rounded-full font-medium",
      size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs',
      config.className
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full mr-1.5",
        status === 'delivered' ? 'bg-success' :
        status === 'delayed' ? 'bg-destructive animate-pulse-slow' :
        status === 'in_transit' ? 'bg-info' :
        'bg-muted-foreground'
      )} />
      {config.label}
    </span>
  );
}

interface RiskBadgeProps {
  risk: 'low' | 'medium' | 'high';
}

export function RiskBadge({ risk }: RiskBadgeProps) {
  const styles = {
    low: 'bg-success/10 text-success',
    medium: 'bg-warning/10 text-warning',
    high: 'bg-destructive/10 text-destructive',
  };

  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider", styles[risk])}>
      {risk}
    </span>
  );
}
