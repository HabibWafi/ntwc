'use client';
import { ArrowLeft, Warehouse, MapPin, Package, TrendingDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { InfoCard } from '@/components/ui/Card';
import { SimpleBarChart } from '@/components/charts/SimpleBarChart';
import { mockWarehouses } from '@/mock/data/bulog-warehouses';
import { mockBulogStock } from '@/mock/data/bulog-stock';
import { mockDistributions } from '@/mock/data/bulog-distributions';
import { formatNumber, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function WarehouseDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const warehouse = mockWarehouses.find(w => w.id === id);
  const stocks = mockBulogStock.filter(s => s.warehouseId === id);
  const distributions = mockDistributions.filter(d => d.warehouseId === id);

  if (!warehouse) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Warehouse className="h-12 w-12 text-muted mb-4" />
        <h2 className="text-lg font-bold text-foreground mb-2">Gudang Tidak Ditemukan</h2>
        <Link href="/bulog/warehouses"><Button variant="outline" size="sm">Kembali</Button></Link>
      </div>
    );
  }

  const totalStock = stocks.reduce((s, st) => s + st.currentStock, 0);
  const stockBarData = stocks.map(s => ({ name: s.commodityName, value: s.currentStock }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/bulog/warehouses">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>Kembali</Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">{warehouse.name}</h1>
          <div className="flex items-center gap-1 text-sm text-muted mt-1">
            <MapPin className="h-3.5 w-3.5" />
            {warehouse.address} — {warehouse.regionName}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 text-center">
          <div className="text-xs text-muted uppercase font-semibold mb-1">Kapasitas</div>
          <div className="text-2xl font-extrabold text-foreground">{formatNumber(warehouse.capacity)}</div>
          <div className="text-xs text-muted">ton</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 text-center">
          <div className="text-xs text-muted uppercase font-semibold mb-1">Stok Total</div>
          <div className="text-2xl font-extrabold text-foreground">{formatNumber(totalStock)}</div>
          <div className="text-xs text-muted">ton</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 text-center">
          <div className="text-xs text-muted uppercase font-semibold mb-1">Utilisasi</div>
          <div className="text-2xl font-extrabold text-foreground">{Math.round((totalStock / warehouse.capacity) * 100)}%</div>
          <div className="h-2 rounded-full bg-gray-100 mt-2 overflow-hidden">
            <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(Math.round((totalStock / warehouse.capacity) * 100), 100)}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock per Commodity */}
        <InfoCard title="Stok per Komoditas" icon={<Package className="h-4 w-4" />}>
          {stockBarData.length > 0 ? (
            <SimpleBarChart data={stockBarData} height={220} />
          ) : (
            <p className="text-sm text-muted text-center py-8">Belum ada data stok</p>
          )}
          <div className="mt-4 space-y-2">
            {stocks.map(s => (
              <div key={s.id} className="flex items-center justify-between text-xs">
                <span className="text-muted">{s.commodityName}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{formatNumber(s.currentStock)} ton</span>
                  {s.currentStock < s.minThreshold && <Badge variant="danger">Low</Badge>}
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

        {/* Distribution History */}
        <InfoCard title="Riwayat Distribusi" icon={<TrendingDown className="h-4 w-4" />}
          headerAction={
            <Link href="/bulog/distributions" className="text-xs font-semibold text-primary hover:underline">Semua →</Link>
          }
        >
          {distributions.length > 0 ? (
            <div className="space-y-3">
              {distributions.map(d => (
                <div key={d.id} className="flex items-center justify-between rounded-xl border border-border p-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold text-foreground truncate">
                      {d.commodityName} — {formatNumber(d.volume)} ton
                    </div>
                    <div className="text-[10px] text-muted">
                      {d.destinationRegionName ? `→ ${d.destinationRegionName}` : d.recipient} • {formatDate(d.distributionDate)}
                    </div>
                  </div>
                  <Badge variant={d.direction === 'out' ? 'warning' : 'info'}>
                    {d.direction === 'out' ? 'Keluar' : 'Masuk'}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted text-center py-8">Belum ada riwayat distribusi</p>
          )}
        </InfoCard>
      </div>
    </div>
  );
}
