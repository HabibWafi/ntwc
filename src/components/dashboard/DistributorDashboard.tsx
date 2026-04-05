'use client';
import { Truck, TrendingUp, Package, ShoppingCart, BarChart3, ArrowRight, Navigation, Target, Zap } from 'lucide-react';
import { StatCard, InfoCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PriceLineChart } from '@/components/charts/PriceLineChart';
import { mockPriceHistory, getLatestPricesByCommodity } from '@/mock/data/price-data';
import { mockDistributions } from '@/mock/data/bulog-distributions';
import { logisticsRoutes } from '@/mock/data/logistics';
import { matchingRecommendations } from '@/mock/data/supply-demand';
import { formatCurrency, formatNumber, formatDate, formatWeight } from '@/lib/utils';
import Link from 'next/link';

export default function DistributorDashboard() {
  const latestPrices = getLatestPricesByCommodity();
  const recentDist = mockDistributions.slice(0, 6);
  const totalVolume = mockDistributions.filter(d => d.direction === 'out').reduce((s, d) => s + d.volume, 0);

  const priceLines = [
    { key: 'beras', name: 'Beras', color: '#047857' },
    { key: 'jagung', name: 'Jagung', color: '#F59E0B' },
    { key: 'gula', name: 'Gula', color: '#8B5CF6' },
    { key: 'minyak', name: 'Minyak', color: '#3B82F6' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Dashboard Distributor</h1>
        <p className="text-sm text-muted mt-1">Monitoring harga dan ketersediaan komoditas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Komoditas Tersedia"
          value="10"
          icon={<Package className="h-5 w-5" />}
          subtitle="Dari semua provinsi"
          gradient="from-primary to-primary-light"
        />
        <StatCard
          title="Volume Distribusi"
          value={formatWeight(totalVolume)}
          icon={<Truck className="h-5 w-5" />}
          subtitle="Bulan ini"
          gradient="from-blue-500 to-blue-400"
        />
        <StatCard
          title="Order Aktif"
          value="—"
          icon={<ShoppingCart className="h-5 w-5" />}
          subtitle="Marketplace Phase 2"
          gradient="from-amber-500 to-amber-400"
        />
        <StatCard
          title="Harga Beras Avg"
          value={formatCurrency(latestPrices.find(p => p.commodityId === 'com-001')?.price || 0)}
          change={2.3}
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
          subtitle="Nasional"
          gradient="from-violet-500 to-violet-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Tren Harga Komoditas"
          description="6 bulan terakhir"
          icon={<BarChart3 className="h-4 w-4" />}
          className="lg:col-span-2"
          headerAction={
            <Link href="/prices/history" className="text-xs font-semibold text-primary hover:underline">Detail →</Link>
          }
        >
          <PriceLineChart data={mockPriceHistory} lines={priceLines} height={280} />
        </InfoCard>

        <InfoCard
          title="Harga Terkini"
          description="Top komoditas"
          icon={<TrendingUp className="h-4 w-4" />}
        >
          <div className="space-y-3">
            {latestPrices.slice(0, 6).map(p => (
              <div key={p.commodityId} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{p.commodityIcon}</span>
                  <span className="text-xs font-semibold text-foreground">{p.commodityName}</span>
                </div>
                <span className="text-xs font-bold text-foreground">{formatCurrency(p.price)}</span>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      <InfoCard
        title="Distribusi Terbaru"
        description="Aktivitas distribusi nasional"
        icon={<Truck className="h-4 w-4" />}
      >
        <div className="space-y-3">
          {recentDist.map(dist => (
            <div key={dist.id} className="flex items-center justify-between rounded-xl border border-border p-3">
              <div className="min-w-0 flex-1">
                <div className="text-xs font-semibold text-foreground truncate">
                  {dist.commodityName} — {formatNumber(dist.volume)} ton
                </div>
                <div className="text-[10px] text-muted">
                  {dist.warehouseName}{dist.destinationRegionName ? ` → ${dist.destinationRegionName}` : ''} • {formatDate(dist.distributionDate)}
                </div>
              </div>
              <Badge variant={dist.direction === 'out' ? 'warning' : 'info'}>
                {dist.direction === 'out' ? 'Keluar' : 'Masuk'}
              </Badge>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Logistics Routes + AI Matching */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard
          title="Rute Logistik Aktif"
          description={`${logisticsRoutes.length} pengiriman`}
          icon={<Navigation className="h-4 w-4" />}
          headerAction={<Link href="/logistics" className="text-xs font-semibold text-primary hover:underline">Detail →</Link>}
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
                    <div className="text-[10px] text-muted">{r.commodity} • {formatNumber(r.volume)} kg • {r.estimatedTime}</div>
                  </div>
                  <Badge variant={status.variant} dot>{status.label}</Badge>
                </div>
              );
            })}
          </div>
        </InfoCard>

        <InfoCard
          title="Rekomendasi AI Matching"
          description="Peluang redistribusi"
          icon={<Target className="h-4 w-4" />}
          headerAction={<Link href="/supply-demand" className="text-xs font-semibold text-primary hover:underline">Detail →</Link>}
        >
          <div className="space-y-3">
            {matchingRecommendations.map(m => (
              <div key={m.id} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={m.priority === 'high' ? 'danger' : 'warning'}>
                    {m.priority === 'high' ? 'Prioritas Tinggi' : 'Medium'}
                  </Badge>
                  <span className="text-[10px] text-muted">Confidence: {m.confidence}%</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-green-700 bg-green-50 rounded px-1.5 py-0.5">{m.from}</span>
                  <ArrowRight className="h-3 w-3 text-muted shrink-0" />
                  <span className="text-xs font-semibold text-red-700 bg-red-50 rounded px-1.5 py-0.5">{m.to}</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-muted">{m.commodity} • {formatNumber(m.volume)} ton</span>
                  <span className="font-bold text-primary">Hemat {m.potentialSaving}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-primary/60" style={{ width: `${m.confidence}%` }} />
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
