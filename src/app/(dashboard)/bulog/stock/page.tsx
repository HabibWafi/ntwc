'use client';
import { Package, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { InfoCard } from '@/components/ui/Card';
import { SimpleBarChart } from '@/components/charts/SimpleBarChart';
import { mockBulogStock, getLowStockItems } from '@/mock/data/bulog-stock';
import { formatNumber } from '@/lib/utils';
import Link from 'next/link';

export default function StockPage() {
  const lowStock = getLowStockItems();
  const totalStock = mockBulogStock.reduce((s, st) => s + st.currentStock, 0);

  // Aggregate by commodity
  const byCommodity: Record<string, number> = {};
  mockBulogStock.forEach(s => {
    byCommodity[s.commodityName] = (byCommodity[s.commodityName] || 0) + s.currentStock;
  });
  const barData = Object.entries(byCommodity).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Stok Nasional</h1>
        <p className="text-sm text-muted mt-1">Total {formatNumber(totalStock)} ton di {mockBulogStock.length} lokasi</p>
      </div>

      {/* Low Stock Warnings */}
      {lowStock.length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50/50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <h2 className="text-sm font-bold text-red-700">{lowStock.length} Item Stok Kritis</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {lowStock.map(item => (
              <div key={item.id} className="rounded-xl border border-red-200 bg-white p-3">
                <div className="text-xs font-semibold text-foreground">{item.warehouseName}</div>
                <div className="text-[10px] text-muted">{item.commodityName}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs font-bold text-red-600">{formatNumber(item.currentStock)} ton</span>
                  <span className="text-[10px] text-muted">Min: {formatNumber(item.minThreshold)} ton</span>
                </div>
                <div className="h-1.5 rounded-full bg-red-100 mt-1.5 overflow-hidden">
                  <div className="h-full rounded-full bg-red-500" style={{ width: `${Math.min((item.currentStock / item.minThreshold) * 100, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <InfoCard title="Stok per Komoditas" description="Agregat semua gudang" icon={<Package className="h-4 w-4" />}>
        <SimpleBarChart data={barData} height={300} />
      </InfoCard>

      {/* Full Stock Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-bold text-foreground">Detail Stok per Gudang</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Gudang</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Komoditas</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Stok</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Min Threshold</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Kapasitas</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockBulogStock.map(s => (
                <tr key={s.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/bulog/warehouses/${s.warehouseId}`} className="text-xs font-semibold text-primary hover:underline">
                      {s.warehouseName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-xs text-foreground">{s.commodityName}</td>
                  <td className={`px-4 py-3 text-xs font-bold text-right ${s.currentStock < s.minThreshold ? 'text-red-600' : 'text-foreground'}`}>
                    {formatNumber(s.currentStock)} ton
                  </td>
                  <td className="px-4 py-3 text-xs text-muted text-right">{formatNumber(s.minThreshold)} ton</td>
                  <td className="px-4 py-3 text-xs text-muted text-right">{s.capacityPct}%</td>
                  <td className="px-4 py-3 text-center">
                    {s.currentStock < s.minThreshold ? (
                      <Badge variant="danger">Kritis</Badge>
                    ) : s.capacityPct > 60 ? (
                      <Badge variant="success">Aman</Badge>
                    ) : (
                      <Badge variant="warning">Perhatian</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
