import { AppLayout } from "@/components/AppLayout";
import { inventoryItems, warehouses } from "@/data/mock-data";
import { useState, useMemo } from "react";
import { Search, Filter, ArrowUpDown, Package, AlertTriangle, Plus, Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { InventoryItem } from "@/types";

type SortField = 'name' | 'quantity' | 'category' | 'warehouseName' | 'lastUpdated';
type SortDir = 'asc' | 'desc';

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [warehouseFilter, setWarehouseFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'low' | 'ok'>('all');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const categories = useMemo(() => [...new Set(inventoryItems.map(i => i.category))], []);

  const filteredItems = useMemo(() => {
    let items = [...inventoryItems];

    if (search) {
      const s = search.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(s) || i.sku.toLowerCase().includes(s) || i.supplier.toLowerCase().includes(s));
    }
    if (categoryFilter !== 'all') items = items.filter(i => i.category === categoryFilter);
    if (warehouseFilter !== 'all') items = items.filter(i => i.warehouseId === warehouseFilter);
    if (stockFilter === 'low') items = items.filter(i => i.quantity <= i.reorderThreshold);
    if (stockFilter === 'ok') items = items.filter(i => i.quantity > i.reorderThreshold);

    items.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const cmp = typeof aVal === 'string' ? aVal.localeCompare(bVal as string) : (aVal as number) - (bVal as number);
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return items;
  }, [search, categoryFilter, warehouseFilter, stockFilter, sortField, sortDir]);

  const lowStockCount = inventoryItems.filter(i => i.quantity <= i.reorderThreshold).length;
  const totalValue = inventoryItems.reduce((s, i) => s + i.quantity * i.unitCost, 0);

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('asc'); }
  };

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th
      className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
      onClick={() => toggleSort(field)}
    >
      <span className="flex items-center gap-1">
        {children}
        <ArrowUpDown className={cn("w-3 h-3", sortField === field ? "text-primary" : "text-muted-foreground/40")} />
      </span>
    </th>
  );

  return (
    <AppLayout title="Inventory" subtitle={`${inventoryItems.length} items across ${warehouses.length} warehouses`}>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10"><Package className="w-5 h-5 text-primary" /></div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{inventoryItems.length}</p>
              <p className="text-xs text-muted-foreground">Total Items</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10"><AlertTriangle className="w-5 h-5 text-warning" /></div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{lowStockCount}</p>
              <p className="text-xs text-muted-foreground">Low Stock</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10"><Package className="w-5 h-5 text-success" /></div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">${totalValue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search items, SKUs, suppliers..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="px-3 py-2 text-sm rounded-lg bg-muted text-foreground border-0 focus:ring-2 focus:ring-primary/30">
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={warehouseFilter} onChange={e => setWarehouseFilter(e.target.value)} className="px-3 py-2 text-sm rounded-lg bg-muted text-foreground border-0 focus:ring-2 focus:ring-primary/30">
            <option value="all">All Warehouses</option>
            {warehouses.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
          <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
            {(['all', 'low', 'ok'] as const).map(f => (
              <button
                key={f}
                onClick={() => setStockFilter(f)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md transition-colors",
                  stockFilter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f === 'all' ? 'All' : f === 'low' ? 'Low Stock' : 'In Stock'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b">
              <tr>
                <SortHeader field="name">Item</SortHeader>
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">SKU</th>
                <SortHeader field="category">Category</SortHeader>
                <SortHeader field="warehouseName">Warehouse</SortHeader>
                <SortHeader field="quantity">Quantity</SortHeader>
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Supplier</th>
                <SortHeader field="lastUpdated">Updated</SortHeader>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredItems.map(item => {
                const isLow = item.quantity <= item.reorderThreshold;
                const isCritical = item.quantity <= item.reorderThreshold * 0.5;
                return (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-sm font-medium text-card-foreground">{item.name}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-muted-foreground">{item.sku}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground">{item.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground">{item.warehouseName}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={cn("text-sm font-semibold", isCritical ? "text-destructive" : isLow ? "text-warning" : "text-card-foreground")}>
                          {item.quantity.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-muted-foreground">{item.unitType}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {isCritical ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse-slow" />
                          CRITICAL
                        </span>
                      ) : isLow ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-warning bg-warning/10 px-2 py-0.5 rounded-full">
                          LOW
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">
                          OK
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground">{item.supplier}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-muted-foreground">{new Date(item.lastUpdated).toLocaleDateString()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-md hover:bg-muted transition-colors"><Edit2 className="w-3.5 h-3.5 text-muted-foreground" /></button>
                        <button className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors"><Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t bg-muted/30 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Showing {filteredItems.length} of {inventoryItems.length} items</p>
        </div>
      </div>
    </AppLayout>
  );
}
