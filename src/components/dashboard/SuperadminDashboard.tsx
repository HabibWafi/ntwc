'use client';
import {
  Users, Shield, Activity, Database, Server, FileText,
  TrendingUp, BarChart3, Brain, Leaf, MapPin, Target,
  ArrowRight, AlertTriangle, Clock, Bell, ShoppingCart,
} from 'lucide-react';
import { StatCard, InfoCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PriceLineChart } from '@/components/charts/PriceLineChart';
import { SimpleBarChart } from '@/components/charts/SimpleBarChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { mockUsers } from '@/mock/data/users';
import { mockAlerts } from '@/mock/data/alerts';
import { mockAuditLog } from '@/mock/data/audit-log';
import { mockPriceHistory, getLatestPricesByCommodity } from '@/mock/data/price-data';
import { dashboardStats } from '@/mock/data/dashboard-stats';
import { supplyDemandRegions, matchingRecommendations } from '@/mock/data/supply-demand';
import { ROLE_LABELS } from '@/lib/constants';
import { formatCurrency, formatNumber, formatTimeAgo, getStatusColor } from '@/lib/utils';
import Link from 'next/link';

export default function SuperadminDashboard() {
  const latestPrices = getLatestPricesByCommodity();
  const openAlerts = mockAlerts.filter(a => a.status !== 'resolved' && a.status !== 'false_positive');
  const totalUsers = mockUsers.length;

  const totalSupply = supplyDemandRegions.reduce((s, r) => s + r.supply, 0);
  const totalDemand = supplyDemandRegions.reduce((s, r) => s + r.demand, 0);
  const balanceRatio = ((totalSupply / totalDemand) * 100).toFixed(1);

  // Users by role for donut
  const usersByRole = mockUsers.reduce<Record<string, number>>((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});
  const roleDonutData = Object.entries(usersByRole).map(([role, count]) => ({
    name: ROLE_LABELS[role as keyof typeof ROLE_LABELS] || role,
    value: count,
    color: role === 'superadmin' ? '#EF4444' : role === 'gov_central' ? '#8B5CF6' :
           role === 'gov_regional' ? '#3B82F6' : role === 'bulog' ? '#F59E0B' :
           role === 'farmer' ? '#047857' : role === 'distributor' ? '#EC4899' : '#6B7280',
  }));

  const priceLines = [
    { key: 'beras', name: 'Beras', color: '#047857' },
    { key: 'jagung', name: 'Jagung', color: '#F59E0B' },
    { key: 'cabai', name: 'Cabai', color: '#EF4444' },
    { key: 'bawang', name: 'Bawang', color: '#8B5CF6' },
    { key: 'kedelai', name: 'Kedelai', color: '#3B82F6' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-widest mb-1">
          <Activity className="h-3.5 w-3.5" />
          Dashboard Utama
        </div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Nusantara TwinChain</h1>
        <p className="text-sm text-muted mt-1">AI-Powered National Food Security & Supply Chain Intelligence</p>
      </div>

      {/* Executive Summary Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary-dark to-primary p-6 text-white relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5" />
        <div className="absolute -left-8 -bottom-12 h-32 w-32 rounded-full bg-white/5" />
        <div className="relative">
          <div className="text-[10px] font-bold uppercase tracking-widest text-primary-lighter mb-2">
            📝 Ringkasan Eksekutif — Maret 2026
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-3xl font-extrabold">{balanceRatio}%</div>
              <div className="text-xs text-primary-lighter mt-1">Rasio Supply/Demand</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">{dashboardStats.alertsToday}</div>
              <div className="text-xs text-primary-lighter mt-1">Alert Aktif Hari Ini</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">{formatNumber(dashboardStats.totalRegions)}</div>
              <div className="text-xs text-primary-lighter mt-1">Provinsi Dipantau</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">{dashboardStats.predictionAccuracy}%</div>
              <div className="text-xs text-primary-lighter mt-1">Akurasi AI Model</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Petani"
          value={formatNumber(dashboardStats.totalFarmers)}
          change={12.3}
          trend="up"
          icon={<Users className="h-5 w-5" />}
          subtitle={`${formatNumber(dashboardStats.activeFarmers)} aktif bulan ini`}
          gradient="from-primary to-primary-light"
        />
        <StatCard
          title="Transaksi"
          value={formatNumber(dashboardStats.totalTransactions)}
          change={dashboardStats.transactionGrowth}
          trend="up"
          icon={<ShoppingCart className="h-5 w-5" />}
          subtitle="Marketplace bulan ini"
          gradient="from-blue-500 to-blue-400"
        />
        <StatCard
          title="Akurasi AI"
          value={`${dashboardStats.predictionAccuracy}%`}
          change={2.1}
          trend="up"
          icon={<Brain className="h-5 w-5" />}
          subtitle="Prediksi harga komoditas"
          gradient="from-violet-500 to-violet-700"
        />
        <StatCard
          title="Food Waste"
          value={`-${dashboardStats.wasteReduction}%`}
          change={dashboardStats.wasteReduction}
          trend="down"
          icon={<Leaf className="h-5 w-5" />}
          subtitle="Pengurangan waste logistik"
          gradient="from-amber-500 to-amber-400"
        />
      </div>

      {/* Price Trend + Current Prices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Tren Harga Komoditas"
          description="Harga 5 komoditas utama (6 bulan terakhir)"
          icon={<TrendingUp className="h-4 w-4" />}
          className="lg:col-span-2"
          headerAction={
            <Link href="/prices/history" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
              Lihat detail <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <PriceLineChart data={mockPriceHistory} lines={priceLines} height={320} />
        </InfoCard>

        <InfoCard
          title="Harga Komoditas Terkini"
          description="Update real-time"
          icon={<BarChart3 className="h-4 w-4" />}
        >
          <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
            {latestPrices.slice(0, 8).map(c => (
              <div key={c.commodityId} className="flex items-center justify-between rounded-xl bg-surface p-3 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{c.commodityIcon}</span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{c.commodityName}</div>
                    <div className="text-xs text-muted">{c.regionName}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-foreground">{formatCurrency(c.price)}</div>
                  <div className={`text-xs font-semibold ${(c.change ?? 0) > 0 ? 'text-red-500' : (c.change ?? 0) < 0 ? 'text-green-600' : 'text-gray-500'}`}>
                    {(c.change ?? 0) > 0 ? '+' : ''}{c.change ?? 0}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* Supply-Demand + AI Matching + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Supply-Demand */}
        <InfoCard
          title="Supply-Demand per Wilayah"
          description="Status pasokan dan permintaan"
          icon={<MapPin className="h-4 w-4" />}
          headerAction={
            <Link href="/supply-demand" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
              Peta interaktif <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1">
            {supplyDemandRegions.slice(0, 7).map(r => (
              <div key={r.province} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${r.status === 'surplus' ? 'bg-green-500' : r.status === 'deficit' ? 'bg-red-500' : 'bg-amber-400'}`} />
                  <span className="text-sm text-foreground">{r.province}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={r.status === 'surplus' ? 'success' : r.status === 'deficit' ? 'danger' : 'warning'} dot>
                    {r.status === 'surplus' ? 'Surplus' : r.status === 'deficit' ? 'Defisit' : 'Seimbang'}
                  </Badge>
                  <span className="text-xs font-semibold text-muted tabular-nums w-14 text-right">
                    {r.balance > 0 ? '+' : ''}{formatNumber(r.balance)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

        {/* AI Matching */}
        <InfoCard
          title="Rekomendasi AI Matching"
          description="Surplus → Defisit otomatis"
          icon={<Target className="h-4 w-4" />}
          headerAction={
            <Link href="/supply-demand" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
              Detail <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          <div className="space-y-3">
            {matchingRecommendations.map(m => (
              <div key={m.id} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-sm">
                    <span className="font-semibold text-green-600">{m.from}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-muted" />
                    <span className="font-semibold text-red-500">{m.to}</span>
                  </div>
                  <Badge variant={m.priority === 'high' ? 'danger' : 'warning'}>
                    {m.priority === 'high' ? 'Prioritas' : 'Medium'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>{m.commodity} • {formatNumber(m.volume)} ton</span>
                  <span className="font-semibold text-primary">Hemat {m.potentialSaving}</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500" style={{ width: `${m.confidence}%` }} />
                </div>
                <div className="text-[10px] text-muted mt-1">Confidence: {m.confidence}%</div>
              </div>
            ))}
          </div>
        </InfoCard>

        {/* Alerts */}
        <InfoCard
          title="Alert & Peringatan"
          description={`${openAlerts.length} alert terbaru`}
          icon={<AlertTriangle className="h-4 w-4" />}
        >
          <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
            {mockAlerts.slice(0, 5).map(alert => (
              <div key={alert.id} className={`rounded-xl border p-3 ${
                alert.severity === 'high' ? 'border-red-200 bg-red-50/50' :
                alert.severity === 'medium' ? 'border-amber-200 bg-amber-50/50' :
                'border-blue-200 bg-blue-50/50'
              }`}>
                <div className="flex items-start justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">
                      {alert.type === 'price_spike' ? '📊' : alert.type === 'stock_low' ? '📦' : alert.type === 'het_breach' ? '🌾' : '⚠️'}
                    </span>
                    <span className="text-xs font-bold text-foreground">{alert.title}</span>
                  </div>
                  <Badge variant={alert.severity === 'high' ? 'danger' : alert.severity === 'medium' ? 'warning' : 'info'}>
                    {alert.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted leading-relaxed line-clamp-2">{alert.description}</p>
                <div className="flex items-center gap-2 mt-2 text-[10px] text-muted">
                  <Clock className="h-3 w-3" />
                  <span>{alert.regionName}</span>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* System Admin Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Pengguna per Role"
          description="Distribusi role"
          icon={<Shield className="h-4 w-4" />}
        >
          <DonutChart data={roleDonutData} height={200} innerLabel="Total User" />
          <div className="mt-3 space-y-2">
            {roleDonutData.map(r => (
              <div key={r.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                  <span className="text-muted">{r.name}</span>
                </div>
                <span className="font-semibold text-foreground">{r.value}</span>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard
          title="Audit Log Terbaru"
          description="Aktivitas sistem"
          icon={<FileText className="h-4 w-4" />}
          headerAction={
            <Link href="/admin/audit-log" className="text-xs font-semibold text-primary hover:underline">Semua →</Link>
          }
        >
          <div className="space-y-3">
            {mockAuditLog.slice(0, 5).map(log => (
              <div key={log.id} className="flex items-start gap-3 rounded-xl border border-border p-3">
                <div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-foreground">{log.description}</div>
                  <div className="text-[10px] text-muted mt-0.5">{log.userName} • {log.entityType}</div>
                  <div className="text-[10px] text-muted">{formatTimeAgo(log.createdAt)}</div>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard
          title="Manajemen Pengguna"
          description="Akses cepat"
          icon={<Users className="h-4 w-4" />}
          headerAction={
            <Link href="/admin/users" className="text-xs font-semibold text-primary hover:underline">Kelola →</Link>
          }
        >
          <div className="space-y-3">
            {mockUsers.slice(0, 5).map(user => (
              <div key={user.id} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 text-xs font-bold text-primary">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{user.name}</div>
                    <div className="text-[10px] text-muted">{user.email}</div>
                  </div>
                </div>
                <Badge variant={getStatusColor(user.role === 'superadmin' ? 'high' : 'active') as 'danger' | 'success'}>
                  {ROLE_LABELS[user.role]}
                </Badge>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { href: '/marketplace', icon: '🛒', label: 'Marketplace', desc: 'Jual beli langsung', color: 'from-primary/5 to-primary/10' },
          { href: '/prices', icon: '📊', label: 'Monitor Harga', desc: 'AI predictions', color: 'from-red-500/5 to-red-500/10' },
          { href: '/supply-demand', icon: '🔄', label: 'Supply-Demand', desc: 'Matching engine', color: 'from-blue-500/5 to-blue-500/10' },
          { href: '/pembiayaan', icon: '🏦', label: 'Pembiayaan', desc: 'Credit scoring', color: 'from-violet-500/5 to-violet-500/10' },
          { href: '/logistics', icon: '🚚', label: 'Logistik', desc: 'Route optimization', color: 'from-amber-500/5 to-amber-500/10' },
        ].map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex flex-col items-center gap-2 rounded-2xl bg-gradient-to-br ${item.color} border border-border p-5 text-center hover:shadow-md hover:-translate-y-0.5 transition-all duration-300`}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
            <div>
              <div className="text-sm font-bold text-foreground">{item.label}</div>
              <div className="text-[10px] text-muted">{item.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
