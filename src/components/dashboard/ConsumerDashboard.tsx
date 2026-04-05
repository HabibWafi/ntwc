'use client';
import { TrendingUp, ShoppingBag, MapPin, BarChart3, Search, Brain, Star, ShoppingCart } from 'lucide-react';
import { StatCard, InfoCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PriceLineChart } from '@/components/charts/PriceLineChart';
import { mockPriceHistory, getLatestPricesByCommodity, mockCurrentPrices } from '@/mock/data/price-data';
import { pricePredictions } from '@/mock/data/dashboard-stats';
import { mockListings } from '@/mock/data/marketplace';
import { formatCurrency, formatNumber } from '@/lib/utils';
import Link from 'next/link';

export default function ConsumerDashboard() {
  const latestPrices = getLatestPricesByCommodity();
  const jakartaPrices = mockCurrentPrices.filter(p => p.regionName === 'DKI Jakarta');

  const priceLines = [
    { key: 'beras', name: 'Beras', color: '#047857' },
    { key: 'cabai', name: 'Cabai', color: '#EF4444' },
    { key: 'bawang', name: 'Bawang', color: '#8B5CF6' },
    { key: 'minyak', name: 'Minyak', color: '#3B82F6' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Dashboard Konsumen</h1>
        <p className="text-sm text-muted mt-1">Monitoring harga dan ketersediaan komoditas di sekitar Anda</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Harga Beras"
          value={formatCurrency(jakartaPrices.find(p => p.commodityId === 'com-001')?.price || 14500)}
          change={1.5}
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
          subtitle="DKI Jakarta"
          gradient="from-primary to-primary-light"
        />
        <StatCard
          title="Harga Cabai"
          value={formatCurrency(jakartaPrices.find(p => p.commodityId === 'com-005')?.price || 45000)}
          change={-3.2}
          trend="down"
          icon={<TrendingUp className="h-5 w-5" />}
          subtitle="DKI Jakarta"
          gradient="from-red-500 to-red-400"
        />
        <StatCard
          title="Komoditas Dipantau"
          value="10"
          icon={<Search className="h-5 w-5" />}
          subtitle="Semua jenis"
          gradient="from-blue-500 to-blue-400"
        />
        <StatCard
          title="Marketplace"
          value="Segera"
          icon={<ShoppingBag className="h-5 w-5" />}
          subtitle="Phase 2"
          gradient="from-amber-500 to-amber-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Tren Harga Pangan"
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
          title="Harga di Daerah Anda"
          description="DKI Jakarta"
          icon={<MapPin className="h-4 w-4" />}
        >
          <div className="space-y-3">
            {jakartaPrices.slice(0, 8).map(p => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{p.commodityIcon}</span>
                  <span className="text-xs font-semibold text-foreground">{p.commodityName}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-foreground">{formatCurrency(p.price)}</div>
                  <Badge variant={p.exceedsHet ? 'danger' : 'success'} dot>
                    {p.exceedsHet ? 'Di atas HET' : 'Normal'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      <InfoCard
        title="Perbandingan Harga Nasional"
        description="Rata-rata harga per komoditas di seluruh Indonesia"
        icon={<TrendingUp className="h-4 w-4" />}
        headerAction={
          <Link href="/prices/compare" className="text-xs font-semibold text-primary hover:underline">Bandingkan →</Link>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {latestPrices.slice(0, 10).map(p => (
            <div key={p.commodityId} className="rounded-xl border border-border p-3 text-center hover:shadow-sm transition-all">
              <span className="text-2xl">{p.commodityIcon}</span>
              <div className="text-xs font-semibold text-foreground mt-1">{p.commodityName}</div>
              <div className="text-sm font-bold text-primary mt-0.5">{formatCurrency(p.price)}</div>
              <Badge variant={p.trend === 'up' ? 'danger' : p.trend === 'down' ? 'success' : 'neutral'} dot>
                {(p.change ?? 0) > 0 ? '+' : ''}{p.change ?? 0}%
              </Badge>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* AI Predictions + Marketplace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title="Prediksi Harga AI" description="Prediksi perubahan harga 7 hari ke depan" icon={<Brain className="h-4 w-4" />}>
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
                  <div className="h-1 w-16 rounded-full bg-gray-100 overflow-hidden mt-1">
                    <div className="h-full rounded-full bg-blue-500" style={{ width: `${p.confidence}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard
          title="Produk Marketplace Terbaru"
          description="Komoditas dari petani terverifikasi"
          icon={<ShoppingCart className="h-4 w-4" />}
          headerAction={<Link href="/marketplace" className="text-xs font-semibold text-primary hover:underline">Lihat Semua →</Link>}
        >
          <div className="space-y-3">
            {mockListings.slice(0, 4).map(l => (
              <div key={l.id} className="flex items-center justify-between rounded-xl border border-border p-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{l.commodityIcon}</span>
                  <div>
                    <div className="text-xs font-semibold text-foreground">{l.commodityName}</div>
                    <div className="text-[10px] text-muted">{l.sellerName} • {l.sellerRegion}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-primary">{formatCurrency(l.pricePerUnit)}/{l.unit}</div>
                  <div className="flex items-center gap-1 justify-end">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-semibold text-foreground">{l.sellerRating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
