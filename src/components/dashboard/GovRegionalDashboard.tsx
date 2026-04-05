'use client';
import { Wheat, TrendingUp, MapPin, BarChart3, Layers, Target, Brain } from 'lucide-react';
import { StatCard, InfoCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PriceLineChart } from '@/components/charts/PriceLineChart';
import { SimpleBarChart } from '@/components/charts/SimpleBarChart';
import { mockPriceHistory, mockCurrentPrices } from '@/mock/data/price-data';
import { mockFarmData } from '@/mock/data/farm-data';
import { mockHarvestRecords } from '@/mock/data/harvest-records';
import { supplyDemandRegions } from '@/mock/data/supply-demand';
import { pricePredictions } from '@/mock/data/dashboard-stats';
import { useAuthStore } from '@/stores/auth-store';
import { formatCurrency, formatNumber } from '@/lib/utils';
import Link from 'next/link';

export default function GovRegionalDashboard() {
  const { user } = useAuthStore();
  const regionName = user?.regionName || 'Jawa Barat';

  // Filter data for user's region (simulated — show subset)
  const regionFarms = mockFarmData.filter(f =>
    f.regionName.includes('Subang') || f.regionName.includes('Karawang') ||
    f.regionName.includes('Garut') || f.regionName.includes('Indramayu') ||
    f.regionName.includes('Bandung')
  );
  const activeFarms = regionFarms.filter(f => f.status === 'growing' || f.status === 'planted').length;
  const totalArea = regionFarms.reduce((sum, f) => sum + f.landArea, 0);

  const flaggedHarvests = mockHarvestRecords.filter(h => h.flagged);
  const regionPrices = mockCurrentPrices.filter(p => p.regionName === 'Jawa Barat').slice(0, 6);

  const commodityAreaData = [
    { name: 'Beras', value: 29.5 },
    { name: 'Jagung', value: 2.0 },
    { name: 'Cabai', value: 1.0 },
    { name: 'Bawang', value: 3.0 },
    { name: 'Kedelai', value: 0 },
  ].filter(d => d.value > 0);

  const priceLines = [
    { key: 'beras', name: 'Beras', color: '#047857' },
    { key: 'jagung', name: 'Jagung', color: '#F59E0B' },
    { key: 'cabai', name: 'Cabai', color: '#EF4444' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Dashboard Regional</h1>
        <p className="text-sm text-muted mt-1">Data komoditas pertanian — {regionName}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Lahan Tercatat"
          value={regionFarms.length}
          icon={<Wheat className="h-5 w-5" />}
          subtitle={`${activeFarms} aktif tanam`}
          gradient="from-primary to-primary-light"
        />
        <StatCard
          title="Total Luas Lahan"
          value={`${formatNumber(totalArea)} ha`}
          icon={<Layers className="h-5 w-5" />}
          subtitle="Seluruh komoditas"
          gradient="from-blue-500 to-blue-400"
        />
        <StatCard
          title="Harga Beras"
          value={formatCurrency(regionPrices.find(p => p.commodityId === 'com-001')?.price || 14500)}
          change={1.8}
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
          subtitle={regionName}
          gradient="from-amber-500 to-amber-400"
        />
        <StatCard
          title="Panen Bermasalah"
          value={flaggedHarvests.length}
          icon={<MapPin className="h-5 w-5" />}
          subtitle="Deviasi > 20%"
          gradient="from-red-500 to-red-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Tren Harga Regional"
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
          title="Luas per Komoditas"
          description="Dalam hektar"
          icon={<Layers className="h-4 w-4" />}
        >
          <SimpleBarChart data={commodityAreaData} height={250} layout="vertical" />
        </InfoCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard
          title="Harga Komoditas di Region"
          description={regionName}
          icon={<TrendingUp className="h-4 w-4" />}
          headerAction={
            <Link href="/prices" className="text-xs font-semibold text-primary hover:underline">Semua →</Link>
          }
        >
          <div className="space-y-3">
            {regionPrices.map(p => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{p.commodityIcon}</span>
                  <span className="text-sm font-semibold text-foreground">{p.commodityName}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-foreground">{formatCurrency(p.price)}</div>
                  <Badge variant={p.exceedsHet ? 'danger' : 'success'} dot>
                    {p.exceedsHet ? 'Di atas HET' : 'Normal'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard
          title="Data Lahan Terbaru"
          description="Aktivitas terkini"
          icon={<Wheat className="h-4 w-4" />}
          headerAction={
            <Link href="/farm-data" className="text-xs font-semibold text-primary hover:underline">Semua →</Link>
          }
        >
          <div className="space-y-3">
            {regionFarms.slice(0, 5).map(farm => (
              <div key={farm.id} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-foreground truncate">{farm.userName}</div>
                  <div className="text-[10px] text-muted">{farm.commodityName} • {farm.landArea} ha</div>
                </div>
                <Badge variant={
                  farm.status === 'harvested' ? 'success' :
                  farm.status === 'growing' ? 'warning' :
                  farm.status === 'planted' ? 'info' : 'neutral'
                }>
                  {farm.status}
                </Badge>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* Supply-Demand + AI Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title="Status Supply-Demand Regional" description="Neraca pangan wilayah Jawa" icon={<Target className="h-4 w-4" />}>
          <div className="space-y-3">
            {supplyDemandRegions.filter(r => r.province.includes('Jawa')).slice(0, 5).map(r => (
              <div key={r.province} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <div className="text-xs font-semibold text-foreground">{r.province}</div>
                  <div className="text-[10px] text-muted">Supply: {formatNumber(r.supply)} • Demand: {formatNumber(r.demand)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold ${r.balance > 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {r.balance > 0 ? '+' : ''}{formatNumber(r.balance)}
                  </span>
                  <Badge variant={r.status === 'surplus' ? 'success' : r.status === 'deficit' ? 'danger' : 'warning'} dot>
                    {r.status === 'surplus' ? 'Surplus' : r.status === 'deficit' ? 'Defisit' : 'Seimbang'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard title="Prediksi Harga AI" description="Prediksi 7 hari ke depan" icon={<Brain className="h-4 w-4" />}>
          <div className="space-y-3">
            {pricePredictions.map(p => (
              <div key={p.commodity} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{p.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{p.commodity}</div>
                    <div className="text-[10px] text-muted">{formatCurrency(p.currentPrice)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xs font-bold ${p.predicted7d > p.currentPrice ? 'text-red-500' : 'text-green-600'}`}>
                    {p.predicted7d > p.currentPrice ? '↑' : '↓'} {formatCurrency(p.predicted7d)}
                  </div>
                  <div className="text-[10px] text-muted">Confidence: {p.confidence}%</div>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
