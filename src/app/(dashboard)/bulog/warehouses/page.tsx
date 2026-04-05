'use client';
import { useState } from 'react';
import { Warehouse, Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { mockWarehouses } from '@/mock/data/bulog-warehouses';
import { mockBulogStock } from '@/mock/data/bulog-stock';
import { formatNumber } from '@/lib/utils';
import Link from 'next/link';

export default function WarehousesPage() {
  const [search, setSearch] = useState('');

  const enriched = mockWarehouses.map(w => {
    const stocks = mockBulogStock.filter(s => s.warehouseId === w.id);
    const totalStock = stocks.reduce((sum, s) => sum + s.currentStock, 0);
    const avgCapacity = stocks.length > 0 ? Math.round(stocks.reduce((sum, s) => sum + s.capacityPct, 0) / stocks.length) : 0;
    return { ...w, stocks, totalStock, avgCapacity };
  });

  const filtered = enriched.filter(w =>
    !search || w.name.toLowerCase().includes(search.toLowerCase()) || w.regionName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Gudang Bulog</h1>
        <p className="text-sm text-muted mt-1">{mockWarehouses.length} gudang di seluruh Indonesia</p>
      </div>

      <div className="max-w-sm">
        <Input placeholder="Cari gudang, region..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search className="h-4 w-4" />} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(w => (
          <Link key={w.id} href={`/bulog/warehouses/${w.id}`}>
            <div className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary-light/10">
                    <Warehouse className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-foreground">{w.name}</div>
                    <div className="flex items-center gap-1 text-[10px] text-muted">
                      <MapPin className="h-3 w-3" />
                      {w.regionName}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Kapasitas</span>
                  <span className="font-semibold text-foreground">{formatNumber(w.capacity)} ton</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Stok Saat Ini</span>
                  <span className="font-semibold text-foreground">{formatNumber(w.totalStock)} ton</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${w.avgCapacity > 70 ? 'bg-emerald-500' : w.avgCapacity > 30 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(w.avgCapacity, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-muted">
                  <span>{w.stocks.length} komoditas</span>
                  <span>{w.avgCapacity}% terisi</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-muted">
          <Warehouse className="h-8 w-8 mb-2" />
          <p className="text-sm">Gudang tidak ditemukan</p>
        </div>
      )}
    </div>
  );
}
