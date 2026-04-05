'use client';
import { useState } from 'react';
import { Truck, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { mockDistributions } from '@/mock/data/bulog-distributions';
import { formatNumber, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function DistributionsPage() {
  const [search, setSearch] = useState('');
  const [dirFilter, setDirFilter] = useState<'all' | 'in' | 'out'>('all');

  const filtered = mockDistributions.filter(d => {
    const matchSearch = !search || d.warehouseName.toLowerCase().includes(search.toLowerCase()) ||
      d.commodityName.toLowerCase().includes(search.toLowerCase()) ||
      (d.destinationRegionName || '').toLowerCase().includes(search.toLowerCase());
    const matchDir = dirFilter === 'all' || d.direction === dirFilter;
    return matchSearch && matchDir;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Distribusi</h1>
          <p className="text-sm text-muted mt-1">{mockDistributions.length} record distribusi</p>
        </div>
        <Link href="/bulog/distributions/new">
          <Button size="sm" icon={<Plus className="h-4 w-4" />}>Catat Distribusi</Button>
        </Link>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] max-w-sm">
          <Input placeholder="Cari gudang, komoditas, tujuan..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search className="h-4 w-4" />} />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted" />
          {(['all', 'in', 'out'] as const).map(d => (
            <button key={d} onClick={() => setDirFilter(d)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${dirFilter === d ? 'bg-primary text-white' : 'bg-surface text-muted hover:bg-gray-100'}`}>
              {d === 'all' ? 'Semua' : d === 'in' ? 'Masuk' : 'Keluar'}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Tanggal</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Gudang</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Komoditas</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Volume</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">Arah</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Tujuan/Sumber</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Ref</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(d => (
                <tr key={d.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-muted">{formatDate(d.distributionDate)}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-foreground">{d.warehouseName}</td>
                  <td className="px-4 py-3 text-xs text-foreground">{d.commodityName}</td>
                  <td className="px-4 py-3 text-xs font-bold text-foreground text-right">{formatNumber(d.volume)} ton</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={d.direction === 'out' ? 'warning' : 'info'}>
                      {d.direction === 'out' ? 'Keluar' : 'Masuk'}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted truncate max-w-[200px]">
                    {d.destinationRegionName || d.recipient}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">{d.documentRef}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted">
            <Truck className="h-8 w-8 mb-2" />
            <p className="text-sm">Tidak ada distribusi ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
