'use client';
import {
  Truck, Clock, Package, MapPin, Zap, CheckCircle2,
  AlertCircle, Timer, ArrowRight, Navigation, Gauge,
} from 'lucide-react';
import { InfoCard, StatCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { logisticsRoutes } from '@/mock/data/logistics';
import { formatCurrency, formatNumber } from '@/lib/utils';

const statusConfig: Record<string, { label: string; variant: 'info' | 'success' | 'warning' | 'danger'; icon: typeof Truck }> = {
  'in-transit': { label: 'Dalam Perjalanan', variant: 'info', icon: Truck },
  'delivered': { label: 'Terkirim', variant: 'success', icon: CheckCircle2 },
  'pending': { label: 'Menunggu', variant: 'warning', icon: Timer },
  'delayed': { label: 'Tertunda', variant: 'danger', icon: AlertCircle },
};

export default function LogisticsPage() {
  const inTransit = logisticsRoutes.filter(r => r.status === 'in-transit').length;
  const delivered = logisticsRoutes.filter(r => r.status === 'delivered').length;
  const totalSaved = logisticsRoutes.reduce((s, r) => s + r.costSaved, 0);
  const totalVolume = logisticsRoutes.reduce((s, r) => s + r.volume, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-widest mb-1">
          <Truck className="h-3.5 w-3.5" />
          Logistik Cerdas
        </div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">Smart Logistics & Route Optimization</h1>
        <p className="text-sm text-muted mt-1">Optimisasi rute, tracking real-time, dan estimasi shelf-life</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Dalam Perjalanan" value={inTransit} icon={<Truck className="h-5 w-5" />} subtitle={`${logisticsRoutes.length} total pengiriman`} gradient="from-blue-500 to-blue-400" />
        <StatCard title="Terkirim" value={delivered} icon={<CheckCircle2 className="h-5 w-5" />} subtitle="Pengiriman berhasil" gradient="from-primary to-primary-light" />
        <StatCard title="Penghematan" value={formatCurrency(totalSaved)} icon={<Zap className="h-5 w-5" />} subtitle="Hemat dari optimisasi rute" gradient="from-amber-500 to-amber-400" />
        <StatCard title="Total Volume" value={`${formatNumber(totalVolume)} kg`} icon={<Package className="h-5 w-5" />} subtitle="Komoditas terdistribusi" gradient="from-violet-500 to-violet-700" />
      </div>

      {/* Route Map Placeholder + Efficiency */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard title="Peta Rute Pengiriman" description="Tracking real-time dan optimisasi rute" icon={<Navigation className="h-4 w-4" />} className="lg:col-span-2">
          <div className="relative rounded-xl bg-gradient-to-br from-amber-500/5 to-primary/5 border-2 border-dashed border-border h-[350px] flex flex-col items-center justify-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-lg font-bold text-foreground mb-2">Tracking Rute Real-Time</h3>
            <p className="text-sm text-muted text-center max-w-sm">Integrasi Leaflet dengan polyline rute pengiriman, titik asal-tujuan, dan status real-time</p>
            <div className="flex gap-4 mt-4">
              {Object.entries(statusConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-1.5 text-xs">
                  <div className={`h-3 w-3 rounded-full ${
                    config.variant === 'success' ? 'bg-green-500' :
                    config.variant === 'info' ? 'bg-blue-500' :
                    config.variant === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                  }`} />
                  {config.label}
                </div>
              ))}
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Efisiensi Logistik" description="Metrik performa" icon={<Gauge className="h-4 w-4" />}>
          <div className="space-y-5">
            {[
              { label: 'On-time Delivery', value: 84.5, color: 'from-primary to-primary-light' },
              { label: 'Route Efficiency', value: 78.3, color: 'from-blue-500 to-blue-400' },
              { label: 'Waste Reduction', value: 18.7, color: 'from-amber-500 to-amber-400' },
              { label: 'Cost Optimization', value: 92.1, color: 'from-violet-500 to-violet-700' },
            ].map(metric => (
              <div key={metric.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-foreground">{metric.label}</span>
                  <span className="font-bold text-foreground">{metric.value}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                  <div className={`h-full rounded-full bg-gradient-to-r ${metric.color} transition-all duration-700`} style={{ width: `${metric.value}%` }} />
                </div>
              </div>
            ))}

            <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-2">
                <Zap className="h-4 w-4" />
                Penghematan Total
              </div>
              <div className="text-2xl font-extrabold text-amber-800">{formatCurrency(totalSaved)}</div>
              <div className="text-[10px] text-amber-600 mt-1">Dari optimisasi rute AI bulan ini</div>
            </div>
          </div>
        </InfoCard>
      </div>

      {/* Shipment Table */}
      <InfoCard title="Daftar Pengiriman" description={`${logisticsRoutes.length} pengiriman aktif`} icon={<Truck className="h-4 w-4" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                {['ID', 'Rute', 'Komoditas', 'Volume', 'Jarak', 'Waktu', 'Status', 'Hemat'].map(h => (
                  <th key={h} className="pb-3 text-left text-[10px] font-semibold text-muted uppercase tracking-wider px-2 first:pl-0">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logisticsRoutes.map(route => {
                const status = statusConfig[route.status];
                return (
                  <tr key={route.id} className="border-b border-border/50 hover:bg-surface transition-colors">
                    <td className="py-3 pr-2 font-mono text-xs text-muted">{route.id}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1.5 text-xs">
                        <MapPin className="h-3 w-3 text-primary shrink-0" />
                        <span className="font-medium text-foreground">{route.from}</span>
                        <ArrowRight className="h-3 w-3 text-muted shrink-0" />
                        <span className="font-medium text-foreground">{route.to}</span>
                      </div>
                      <div className="text-[10px] text-muted mt-0.5">Driver: {route.driver}</div>
                    </td>
                    <td className="py-3 px-2 text-xs text-foreground">{route.commodity}</td>
                    <td className="py-3 px-2 text-xs font-medium text-foreground">{formatNumber(route.volume)} kg</td>
                    <td className="py-3 px-2 text-xs text-muted">{route.distance} km</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-1 text-xs text-muted">
                        <Clock className="h-3 w-3" />
                        {route.estimatedTime}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge variant={status.variant} dot>{status.label}</Badge>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`text-xs font-bold ${route.costSaved > 0 ? 'text-primary' : 'text-muted'}`}>
                        {route.costSaved > 0 ? formatCurrency(route.costSaved) : '-'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </InfoCard>
    </div>
  );
}
