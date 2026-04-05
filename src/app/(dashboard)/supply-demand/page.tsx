'use client';
import {
  GitCompareArrows, MapPin, ArrowRight, Target, AlertTriangle,
  TrendingUp, BarChart3, Zap,
} from 'lucide-react';
import { InfoCard, StatCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DonutChart } from '@/components/charts/DonutChart';
import { SimpleBarChart } from '@/components/charts/SimpleBarChart';
import { supplyDemandRegions, matchingRecommendations } from '@/mock/data/supply-demand';
import { formatNumber } from '@/lib/utils';

export default function SupplyDemandPage() {
  const totalSupply = supplyDemandRegions.reduce((s, r) => s + r.supply, 0);
  const totalDemand = supplyDemandRegions.reduce((s, r) => s + r.demand, 0);
  const surplusCount = supplyDemandRegions.filter(r => r.status === 'surplus').length;
  const deficitCount = supplyDemandRegions.filter(r => r.status === 'deficit').length;

  const statusChart = [
    { name: 'Surplus', value: surplusCount, color: '#10B981' },
    { name: 'Defisit', value: deficitCount, color: '#EF4444' },
    { name: 'Seimbang', value: supplyDemandRegions.length - surplusCount - deficitCount, color: '#F59E0B' },
  ];

  const regionBarData = supplyDemandRegions.map(r => ({
    name: r.province.length > 12 ? r.province.substring(0, 12) + '…' : r.province,
    value: r.balance,
    fill: r.status === 'surplus' ? '#10B981' : r.status === 'deficit' ? '#EF4444' : '#F59E0B',
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          <GitCompareArrows className="h-3.5 w-3.5" />
          Supply-Demand Matching
        </div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Pemetaan Supply-Demand Antarwilayah</h1>
        <p className="text-sm text-muted mt-1">AI matching engine — mencocokkan surplus dan defisit secara real-time</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Supply" value={`${(totalSupply / 1000).toFixed(1)}K ton`} icon={<TrendingUp className="h-5 w-5" />} subtitle={`${supplyDemandRegions.length} provinsi dipantau`} gradient="from-primary to-primary-light" />
        <StatCard title="Total Demand" value={`${(totalDemand / 1000).toFixed(1)}K ton`} icon={<BarChart3 className="h-5 w-5" />} subtitle="Permintaan agregat" gradient="from-blue-500 to-blue-400" />
        <StatCard title="Wilayah Surplus" value={surplusCount} icon={<Zap className="h-5 w-5" />} subtitle="Kelebihan pasokan" gradient="from-emerald-500 to-emerald-400" />
        <StatCard title="Wilayah Defisit" value={deficitCount} icon={<AlertTriangle className="h-5 w-5" />} subtitle="Butuh redistribusi" gradient="from-red-500 to-red-400" />
      </div>

      {/* Map Placeholder + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard title="Peta Geospasial Supply-Demand" description="Visualisasi surplus-defisit per provinsi" icon={<MapPin className="h-4 w-4" />} className="lg:col-span-2">
          <div className="relative rounded-xl bg-gradient-to-br from-blue-500/5 to-primary/5 border-2 border-dashed border-border h-[380px] flex flex-col items-center justify-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-lg font-bold text-foreground mb-2">Peta Indonesia Interaktif</h3>
            <p className="text-sm text-muted text-center max-w-sm">Integrasi Leaflet dengan layer supply-demand heatmap per provinsi akan ditampilkan di sini</p>
            <div className="flex gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-xs"><div className="h-3 w-3 rounded-full bg-green-500" /> Surplus</div>
              <div className="flex items-center gap-1.5 text-xs"><div className="h-3 w-3 rounded-full bg-amber-400" /> Seimbang</div>
              <div className="flex items-center gap-1.5 text-xs"><div className="h-3 w-3 rounded-full bg-red-500" /> Defisit</div>
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Status Wilayah" description="Distribusi surplus/defisit" icon={<Target className="h-4 w-4" />}>
          <DonutChart data={statusChart} height={200} innerLabel="Provinsi" />
          <div className="flex justify-center gap-4 mt-2">
            {statusChart.map(s => (
              <div key={s.name} className="flex items-center gap-1.5 text-xs">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="font-medium text-foreground">{s.name}</span>
                <span className="text-muted">({s.value})</span>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* Balance Chart + Detail Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title="Balance per Provinsi" description="Surplus (+) / Defisit (-) dalam ton" icon={<BarChart3 className="h-4 w-4" />}>
          <SimpleBarChart data={regionBarData} height={350} />
        </InfoCard>

        <InfoCard title="Detail per Wilayah" description="Supply, demand, dan neraca" icon={<MapPin className="h-4 w-4" />}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-[10px] font-semibold text-muted uppercase">Provinsi</th>
                  <th className="pb-3 text-right text-[10px] font-semibold text-muted uppercase">Supply</th>
                  <th className="pb-3 text-right text-[10px] font-semibold text-muted uppercase">Demand</th>
                  <th className="pb-3 text-center text-[10px] font-semibold text-muted uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {supplyDemandRegions.map(r => (
                  <tr key={r.province} className="border-b border-border/50 hover:bg-surface transition-colors">
                    <td className="py-2.5">
                      <div className="font-semibold text-foreground text-xs">{r.province}</div>
                      <div className="text-[10px] text-muted">{r.topCommodity}</div>
                    </td>
                    <td className="py-2.5 text-right text-xs font-medium text-foreground">{formatNumber(r.supply)}</td>
                    <td className="py-2.5 text-right text-xs font-medium text-foreground">{formatNumber(r.demand)}</td>
                    <td className="py-2.5 text-center">
                      <Badge variant={r.status === 'surplus' ? 'success' : r.status === 'deficit' ? 'danger' : 'warning'} dot>
                        {r.balance > 0 ? '+' : ''}{formatNumber(r.balance)}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InfoCard>
      </div>

      {/* AI Matching */}
      <InfoCard title="Rekomendasi AI Matching" description="Algoritma mencocokkan wilayah surplus ke defisit untuk optimalisasi distribusi" icon={<Target className="h-4 w-4" />}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchingRecommendations.map(m => (
            <div key={m.id} className="rounded-xl border border-border p-5 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-4">
                <Badge variant={m.priority === 'high' ? 'danger' : 'warning'}>
                  {m.priority === 'high' ? '🔴 Prioritas Tinggi' : '🟡 Medium'}
                </Badge>
                <span className="text-xs font-semibold text-muted">Confidence: {m.confidence}%</span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 text-center rounded-xl bg-green-50 p-3 border border-green-200">
                  <div className="text-[10px] font-semibold text-green-600 uppercase">Surplus</div>
                  <div className="text-sm font-bold text-green-800">{m.from}</div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted shrink-0" />
                <div className="flex-1 text-center rounded-xl bg-red-50 p-3 border border-red-200">
                  <div className="text-[10px] font-semibold text-red-600 uppercase">Defisit</div>
                  <div className="text-sm font-bold text-red-800">{m.to}</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">{m.commodity} • {formatNumber(m.volume)} ton</span>
                <span className="font-bold text-primary">Hemat {m.potentialSaving}</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-gray-100 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-700" style={{ width: `${m.confidence}%` }} />
              </div>
              <button className="mt-4 w-full rounded-xl border border-primary py-2 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-all">
                Eksekusi Redistribusi
              </button>
            </div>
          ))}
        </div>
      </InfoCard>
    </div>
  );
}
