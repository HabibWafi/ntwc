'use client';
import {
  Building2, Users, Activity, Landmark, Zap, Shield, TrendingUp,
  AlertTriangle, MapPin, BarChart3, Target, FileText, Download, Clock,
} from 'lucide-react';
import { StatCard, InfoCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PriceLineChart } from '@/components/charts/PriceLineChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { mockPriceHistory } from '@/mock/data/price-data';
import { mockAlerts } from '@/mock/data/alerts';
import { dashboardStats } from '@/mock/data/dashboard-stats';
import { supplyDemandRegions } from '@/mock/data/supply-demand';
import { subsidyData } from '@/mock/data/credit-scores';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function GovCentralDashboard() {
  const totalSupply = supplyDemandRegions.reduce((s, r) => s + r.supply, 0);
  const totalDemand = supplyDemandRegions.reduce((s, r) => s + r.demand, 0);
  const balanceRatio = ((totalSupply / totalDemand) * 100).toFixed(1);
  const openAlerts = mockAlerts.filter(a => a.status !== 'resolved' && a.status !== 'false_positive');

  const regionStatusData = [
    { name: 'Aman', value: supplyDemandRegions.filter(r => r.status === 'surplus').length, color: '#10B981' },
    { name: 'Waspada', value: supplyDemandRegions.filter(r => r.status === 'balanced').length, color: '#F59E0B' },
    { name: 'Kritis', value: supplyDemandRegions.filter(r => r.status === 'deficit').length, color: '#EF4444' },
  ];

  const priceLines = [
    { key: 'beras', name: 'Beras', color: '#047857' },
    { key: 'cabai', name: 'Cabai', color: '#EF4444' },
    { key: 'bawang', name: 'Bawang Merah', color: '#8B5CF6' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-widest mb-1">
          <Building2 className="h-3.5 w-3.5" />
          Dashboard Pemerintah
        </div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Monitoring Ketahanan Pangan Daerah</h1>
        <p className="text-sm text-muted mt-1">Dashboard terintegrasi untuk pengambilan keputusan berbasis data</p>
      </div>

      {/* Executive Summary Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-blue-500 p-6 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
        <div className="absolute -left-8 -bottom-12 h-32 w-32 rounded-full bg-white/5" />
        <div className="relative">
          <div className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-2">
            📝 Ringkasan Eksekutif — Maret 2026
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-extrabold">{balanceRatio}%</div>
              <div className="text-xs text-blue-200 mt-1">Rasio Supply/Demand</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">{dashboardStats.alertsToday}</div>
              <div className="text-xs text-blue-200 mt-1">Alert Aktif Hari Ini</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">{formatNumber(dashboardStats.totalRegions)}</div>
              <div className="text-xs text-blue-200 mt-1">Provinsi Dipantau</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">{dashboardStats.predictionAccuracy}%</div>
              <div className="text-xs text-blue-200 mt-1">Akurasi AI Model</div>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Petani Terdaftar" value={formatNumber(dashboardStats.totalFarmers)} change={12.3} trend="up" icon={<Users className="h-5 w-5" />} gradient="from-primary to-primary-light" />
        <StatCard title="Total Transaksi" value={formatNumber(dashboardStats.totalTransactions)} change={dashboardStats.transactionGrowth} trend="up" icon={<Activity className="h-5 w-5" />} gradient="from-blue-500 to-blue-400" />
        <StatCard title="Subsidi Tersalurkan" value={formatCurrency(subsidyData.distributed)} icon={<Landmark className="h-5 w-5" />} subtitle={`${formatNumber(subsidyData.beneficiaries)} penerima`} gradient="from-violet-500 to-violet-700" />
        <StatCard title="Efisiensi Logistik" value={`${dashboardStats.logisticsEfficiency}%`} change={3.2} trend="up" icon={<Zap className="h-5 w-5" />} gradient="from-amber-500 to-amber-400" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Tren Harga Komoditas Strategis"
          description="Monitoring 3 komoditas utama"
          icon={<TrendingUp className="h-4 w-4" />}
          className="lg:col-span-2"
          headerAction={
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition-colors">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          }
        >
          <PriceLineChart data={mockPriceHistory} lines={priceLines} height={300} />
        </InfoCard>

        <InfoCard title="Status Ketahanan Pangan" description="Per provinsi" icon={<Shield className="h-4 w-4" />}>
          <DonutChart data={regionStatusData} height={180} innerLabel="Provinsi" />
          <div className="space-y-1.5 mt-3">
            {regionStatusData.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-foreground font-medium">{s.name}</span>
                </div>
                <span className="font-bold text-foreground">{s.value} provinsi</span>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* Regional Detail + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard
          title="Neraca Pangan per Wilayah"
          description="Status terkini supply vs demand"
          icon={<MapPin className="h-4 w-4" />}
          headerAction={
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 transition-colors">
              <Download className="h-3.5 w-3.5" /> Download Laporan
            </button>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {['Provinsi', 'Supply', 'Demand', 'Neraca', 'Status'].map(h => (
                    <th key={h} className="pb-3 text-left text-[10px] font-semibold text-muted uppercase tracking-wider first:pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {supplyDemandRegions.map(r => (
                  <tr key={r.province} className="border-b border-border/50 hover:bg-surface transition-colors">
                    <td className="py-2.5 pr-4">
                      <div className="font-semibold text-foreground text-xs">{r.province}</div>
                      <div className="text-[10px] text-muted">{r.topCommodity}</div>
                    </td>
                    <td className="py-2.5 text-xs font-medium">{formatNumber(r.supply)} ton</td>
                    <td className="py-2.5 text-xs font-medium">{formatNumber(r.demand)} ton</td>
                    <td className="py-2.5">
                      <span className={`text-xs font-bold ${r.balance > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {r.balance > 0 ? '+' : ''}{formatNumber(r.balance)}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <Badge variant={r.status === 'surplus' ? 'success' : r.status === 'deficit' ? 'danger' : 'warning'} dot>
                        {r.status === 'surplus' ? 'Aman' : r.status === 'deficit' ? 'Kritis' : 'Waspada'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InfoCard>

        <InfoCard
          title="Alert & Peringatan"
          description="Notifikasi untuk pengambilan keputusan"
          icon={<AlertTriangle className="h-4 w-4" />}
        >
          <div className="space-y-3">
            {mockAlerts.slice(0, 5).map(alert => (
              <div key={alert.id} className={`rounded-xl border p-4 ${
                alert.severity === 'high' ? 'border-red-200 bg-red-50/50' :
                alert.severity === 'medium' ? 'border-amber-200 bg-amber-50/50' :
                'border-blue-200 bg-blue-50/50'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs font-bold text-foreground">{alert.title}</span>
                  <Badge variant={alert.severity === 'high' ? 'danger' : alert.severity === 'medium' ? 'warning' : 'info'}>{alert.severity}</Badge>
                </div>
                <p className="text-xs text-muted leading-relaxed mb-2 line-clamp-2">{alert.description}</p>
                <div className="flex items-center gap-3 text-[10px] text-muted">
                  <div className="flex items-center gap-1"><MapPin className="h-3 w-3" />{alert.regionName}</div>
                  <div className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(alert.detectedAt).toLocaleString('id-ID')}</div>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* Policy Simulation & Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Simulasi Kebijakan" description="Digital Twin — simulasi skenario intervensi" icon={<Target className="h-4 w-4" />}>
          <div className="rounded-xl bg-gradient-to-br from-violet-50 to-blue-50 border-2 border-dashed border-violet-200 p-8 text-center">
            <div className="text-4xl mb-3">🧪</div>
            <h3 className="text-sm font-bold text-foreground mb-2">Digital Twin Engine</h3>
            <p className="text-xs text-muted mb-4 max-w-xs mx-auto">
              Simulasi dampak kebijakan (subsidi, distribusi, impor) terhadap harga dan pasokan secara real-time
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Subsidi Pupuk', 'Impor Beras', 'Distribusi Cabai', 'Relokasi Logistik'].map(sim => (
                <button key={sim} className="rounded-lg border border-violet-200 bg-white px-3 py-1.5 text-xs font-medium text-violet-700 hover:bg-violet-500 hover:text-white transition-all">
                  {sim}
                </button>
              ))}
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Laporan Otomatis" description="Generate & download laporan" icon={<FileText className="h-4 w-4" />}>
          <div className="space-y-3">
            {[
              { name: 'Laporan Ketahanan Pangan Bulanan', period: 'Maret 2026', type: 'PDF', status: 'ready' },
              { name: 'Analisis Harga Komoditas Strategis', period: 'Q1 2026', type: 'XLSX', status: 'ready' },
              { name: 'Neraca Pangan per Provinsi', period: 'Maret 2026', type: 'PDF', status: 'ready' },
              { name: 'Evaluasi Penyaluran Subsidi', period: 'Q1 2026', type: 'PDF', status: 'generating' },
              { name: 'Rekomendasi Kebijakan AI', period: 'Maret 2026', type: 'PDF', status: 'ready' },
            ].map(report => (
              <div key={report.name} className="flex items-center justify-between rounded-xl border border-border p-3 hover:bg-surface transition-colors">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{report.name}</div>
                    <div className="text-[10px] text-muted">{report.period} • {report.type}</div>
                  </div>
                </div>
                {report.status === 'ready' ? (
                  <button className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-[10px] font-semibold text-white hover:bg-primary-dark transition-colors">
                    <Download className="h-3 w-3" /> Download
                  </button>
                ) : (
                  <Badge variant="warning">Generating...</Badge>
                )}
              </div>
            ))}
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
