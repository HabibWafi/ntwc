'use client';
import { useState } from 'react';
import { TrendingUp, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { StatCard } from '@/components/ui/Card';
import { mockCurrentPrices, getLatestPricesByCommodity } from '@/mock/data/price-data';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export default function PricesPage() {
  const [search, setSearch] = useState('');
  const [commodityFilter, setCommodityFilter] = useState('all');
  const nationalAvg = getLatestPricesByCommodity();

  const filtered = mockCurrentPrices.filter(p => {
    const matchSearch = !search || p.commodityName.toLowerCase().includes(search.toLowerCase()) ||
      p.regionName.toLowerCase().includes(search.toLowerCase());
    const matchCommodity = commodityFilter === 'all' || p.commodityId === commodityFilter;
    return matchSearch && matchCommodity;
  });

  const commodities = Array.from(new Map(mockCurrentPrices.map(p => [p.commodityId, { id: p.commodityId, name: p.commodityName, icon: p.commodityIcon }])).values());

  // Top stats
  const hetBreaches = mockCurrentPrices.filter(p => p.exceedsHet).length;
  const priceUp = mockCurrentPrices.filter(p => p.trend === 'up').length;
  const priceDown = mockCurrentPrices.filter(p => p.trend === 'down').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Monitoring Harga</h1>
          <p className="text-sm text-muted mt-1">{mockCurrentPrices.length} data harga dari 10 provinsi</p>
        </div>
        <div className="flex gap-2">
          <Link href="/prices/history" className="text-xs font-semibold text-primary hover:underline px-3 py-1.5 rounded-lg border border-primary/30 hover:bg-primary-bg transition-all">
            Riwayat
          </Link>
          <Link href="/prices/compare" className="text-xs font-semibold text-primary hover:underline px-3 py-1.5 rounded-lg border border-primary/30 hover:bg-primary-bg transition-all">
            Bandingkan
          </Link>
          <Link href="/prices/alerts" className="text-xs font-semibold text-primary hover:underline px-3 py-1.5 rounded-lg border border-primary/30 hover:bg-primary-bg transition-all">
            Alert ({hetBreaches})
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Harga Naik" value={priceUp} icon={<TrendingUp className="h-5 w-5" />} subtitle="komoditas × region" gradient="from-red-500 to-red-400" />
        <StatCard title="Harga Turun" value={priceDown} icon={<TrendingUp className="h-5 w-5" />} subtitle="komoditas × region" gradient="from-emerald-500 to-emerald-400" />
        <StatCard title="Melebihi HET" value={hetBreaches} icon={<TrendingUp className="h-5 w-5" />} subtitle="perlu perhatian" gradient="from-amber-500 to-amber-400" />
      </div>

      {/* National Average Cards */}
      <div>
        <h2 className="text-sm font-bold text-foreground mb-3">Harga Rata-rata Nasional</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {nationalAvg.map(p => (
            <div key={p.commodityId} className="rounded-xl border border-border bg-card p-3 text-center hover:shadow-sm transition-all cursor-pointer"
              onClick={() => setCommodityFilter(commodityFilter === p.commodityId ? 'all' : p.commodityId)}
            >
              <span className="text-2xl">{p.commodityIcon}</span>
              <div className="text-xs font-semibold text-foreground mt-1">{p.commodityName}</div>
              <div className="text-sm font-bold text-primary mt-0.5">{formatCurrency(p.price)}</div>
              <Badge variant={p.trend === 'up' ? 'danger' : p.trend === 'down' ? 'success' : 'neutral'} dot>
                {(p.change ?? 0) > 0 ? '+' : ''}{p.change ?? 0}%
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Filter + Table */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] max-w-sm">
          <Input placeholder="Cari komoditas, region..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search className="h-4 w-4" />} />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto">
          <Filter className="h-4 w-4 text-muted shrink-0" />
          <button onClick={() => setCommodityFilter('all')} className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${commodityFilter === 'all' ? 'bg-primary text-white' : 'bg-surface text-muted hover:bg-gray-100'}`}>
            Semua
          </button>
          {commodities.slice(0, 6).map(c => (
            <button key={c.id} onClick={() => setCommodityFilter(c.id)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${commodityFilter === c.id ? 'bg-primary text-white' : 'bg-surface text-muted hover:bg-gray-100'}`}>
              {c.icon} {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Komoditas</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Provinsi</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Harga</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Harga Sblm</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Perubahan</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">HET</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 30).map(p => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span>{p.commodityIcon}</span>
                      <span className="text-xs font-semibold text-foreground">{p.commodityName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">{p.regionName}</td>
                  <td className="px-4 py-3 text-xs font-bold text-foreground text-right">{formatCurrency(p.price)}</td>
                  <td className="px-4 py-3 text-xs text-muted text-right">{formatCurrency(p.previousPrice ?? 0)}</td>
                  <td className="px-4 py-3 text-right">
                    <Badge variant={p.trend === 'up' ? 'danger' : p.trend === 'down' ? 'success' : 'neutral'} dot>
                      {(p.change ?? 0) > 0 ? '+' : ''}{p.change ?? 0}%
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {p.exceedsHet ? (
                      <Badge variant="danger">Melebihi</Badge>
                    ) : (
                      <Badge variant="success">Normal</Badge>
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
