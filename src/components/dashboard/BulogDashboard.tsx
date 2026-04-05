'use client';
import { Warehouse, AlertTriangle, TrendingDown, ArrowUpDown, Package, BarChart3, Gauge, Route } from 'lucide-react';
import { StatCard, InfoCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SimpleBarChart } from '@/components/charts/SimpleBarChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { mockWarehouses } from '@/mock/data/bulog-warehouses';
import { mockBulogStock, getLowStockItems } from '@/mock/data/bulog-stock';
import { mockDistributions } from '@/mock/data/bulog-distributions';
import { logisticsRoutes } from '@/mock/data/logistics';
import { formatWeight, formatDate, formatNumber } from '@/lib/utils';
import Link from 'next/link';

export default function BulogDashboard() {
  const totalStock = mockBulogStock.reduce((sum, s) => sum + s.currentStock, 0);
  const lowStockItems = getLowStockItems();
  const totalDistOut = mockDistributions.filter(d => d.direction === 'out').reduce((sum, d) => sum + d.volume, 0);
  const totalDistIn = mockDistributions.filter(d => d.direction === 'in').reduce((sum, d) => sum + d.volume, 0);

  // Stock by commodity
  const stockByCommodity: Record<string, number> = {};
  mockBulogStock.forEach(s => {
    stockByCommodity[s.commodityName] = (stockByCommodity[s.commodityName] || 0) + s.currentStock;
  });
  const stockBarData = Object.entries(stockByCommodity)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const stockDonutData = [
    { name: 'Beras Premium', value: stockByCommodity['Beras Premium'] || 0, color: '#047857' },
    { name: 'Beras Medium', value: stockByCommodity['Beras Medium'] || 0, color: '#10B981' },
    { name: 'Jagung', value: stockByCommodity['Jagung'] || 0, color: '#F59E0B' },
    { name: 'Gula Pasir', value: stockByCommodity['Gula Pasir'] || 0, color: '#8B5CF6' },
    { name: 'Bawang Merah', value: stockByCommodity['Bawang Merah'] || 0, color: '#EF4444' },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Dashboard Bulog</h1>
        <p className="text-sm text-muted mt-1">Monitoring stok & distribusi komoditas nasional</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Stok Nasional"
          value={formatWeight(totalStock)}
          icon={<Package className="h-5 w-5" />}
          subtitle={`${mockWarehouses.length} gudang`}
          gradient="from-primary to-primary-light"
        />
        <StatCard
          title="Low Stock Alert"
          value={lowStockItems.length}
          icon={<AlertTriangle className="h-5 w-5" />}
          subtitle="Di bawah threshold"
          gradient="from-red-500 to-red-400"
        />
        <StatCard
          title="Distribusi Keluar"
          value={formatWeight(totalDistOut)}
          icon={<TrendingDown className="h-5 w-5" />}
          subtitle="Bulan ini"
          gradient="from-blue-500 to-blue-400"
        />
        <StatCard
          title="Pengadaan Masuk"
          value={formatWeight(totalDistIn)}
          icon={<ArrowUpDown className="h-5 w-5" />}
          subtitle="Bulan ini"
          gradient="from-amber-500 to-amber-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Stok per Komoditas"
          description="Total semua gudang"
          icon={<BarChart3 className="h-4 w-4" />}
          className="lg:col-span-2"
        >
          <SimpleBarChart data={stockBarData} height={280} />
        </InfoCard>

        <InfoCard
          title="Komposisi Stok"
          description="Persentase per komoditas"
          icon={<Package className="h-4 w-4" />}
        >
          <DonutChart data={stockDonutData} height={200} innerLabel="Total Ton" />
          <div className="mt-3 space-y-2">
            {stockDonutData.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-muted">{s.name}</span>
                </div>
                <span className="font-semibold text-foreground">{formatNumber(s.value)} ton</span>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Low Stock Alerts */}
        <InfoCard
          title="Peringatan Stok Rendah"
          description={`${lowStockItems.length} item di bawah threshold`}
          icon={<AlertTriangle className="h-4 w-4" />}
          headerAction={
            <Link href="/bulog/stock" className="text-xs font-semibold text-primary hover:underline">Detail →</Link>
          }
        >
          {lowStockItems.length === 0 ? (
            <p className="text-sm text-muted text-center py-4">Semua stok dalam kondisi aman</p>
          ) : (
            <div className="space-y-3">
              {lowStockItems.map(item => (
                <div key={item.id} className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50/50 p-3">
                  <div>
                    <div className="text-xs font-semibold text-foreground">{item.warehouseName}</div>
                    <div className="text-[10px] text-muted">{item.commodityName}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-red-600">{formatNumber(item.currentStock)} ton</div>
                    <div className="text-[10px] text-muted">Min: {formatNumber(item.minThreshold)} ton</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </InfoCard>

        {/* Recent Distributions */}
        <InfoCard
          title="Distribusi Terbaru"
          description="Aktivitas distribusi & pengadaan"
          icon={<Warehouse className="h-4 w-4" />}
          headerAction={
            <Link href="/bulog/distributions" className="text-xs font-semibold text-primary hover:underline">Semua →</Link>
          }
        >
          <div className="space-y-3">
            {mockDistributions.slice(0, 5).map(dist => (
              <div key={dist.id} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-foreground truncate">
                    {dist.commodityName} — {formatNumber(dist.volume)} ton
                  </div>
                  <div className="text-[10px] text-muted truncate">
                    {dist.warehouseName}{dist.destinationRegionName ? ` → ${dist.destinationRegionName}` : ''}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={dist.direction === 'out' ? 'warning' : 'info'}>
                    {dist.direction === 'out' ? 'Keluar' : 'Masuk'}
                  </Badge>
                  <span className="text-[10px] text-muted">{formatDate(dist.distributionDate)}</span>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* Logistics Efficiency + Active Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title="Efisiensi Logistik" description="Metrik performa distribusi" icon={<Gauge className="h-4 w-4" />}>
          <div className="space-y-4">
            {[
              { label: 'On-time Delivery', value: 84.5, color: 'from-primary to-primary-light' },
              { label: 'Route Efficiency', value: 78.3, color: 'from-blue-500 to-blue-400' },
              { label: 'Waste Reduction', value: 18.7, color: 'from-amber-500 to-amber-400' },
              { label: 'Cost Optimization', value: 92.1, color: 'from-violet-500 to-violet-700' },
            ].map(m => (
              <div key={m.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted">{m.label}</span>
                  <span className="font-bold text-foreground">{m.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${m.color}`} style={{ width: `${m.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard
          title="Rute Pengiriman Aktif"
          description={`${logisticsRoutes.length} pengiriman`}
          icon={<Route className="h-4 w-4" />}
          headerAction={<Link href="/logistics" className="text-xs font-semibold text-primary hover:underline">Semua →</Link>}
        >
          <div className="space-y-3">
            {logisticsRoutes.map(r => {
              const statusMap: Record<string, { label: string; variant: 'info' | 'success' | 'warning' | 'danger' }> = {
                'in-transit': { label: 'Dalam Perjalanan', variant: 'info' },
                'delivered': { label: 'Terkirim', variant: 'success' },
                'pending': { label: 'Menunggu', variant: 'warning' },
                'delayed': { label: 'Tertunda', variant: 'danger' },
              };
              const status = statusMap[r.status] || { label: r.status, variant: 'neutral' as const };
              return (
                <div key={r.id} className="flex items-center justify-between rounded-xl border border-border p-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-foreground truncate">{r.from} → {r.to}</div>
                    <div className="text-[10px] text-muted">{r.commodity} • {formatNumber(r.volume)} kg</div>
                  </div>
                  <Badge variant={status.variant} dot>{status.label}</Badge>
                </div>
              );
            })}
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
