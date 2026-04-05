'use client';
import { useState } from 'react';
import { Wheat, Plus, Upload, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { mockFarmData } from '@/mock/data/farm-data';
import { formatNumber, formatDate, getStatusColor } from '@/lib/utils';
import Link from 'next/link';

export default function FarmDataPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = mockFarmData.filter(f => {
    const matchSearch = f.userName.toLowerCase().includes(search.toLowerCase()) ||
      f.commodityName.toLowerCase().includes(search.toLowerCase()) ||
      f.regionName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || f.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Data Pertanian</h1>
          <p className="text-sm text-muted mt-1">{mockFarmData.length} lahan tercatat</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/farm-data/new">
            <Button size="sm" icon={<Plus className="h-4 w-4" />}>Tambah Data</Button>
          </Link>
          <Link href="/farm-data/upload">
            <Button variant="outline" size="sm" icon={<Upload className="h-4 w-4" />}>Upload CSV</Button>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] max-w-sm">
          <Input
            placeholder="Cari petani, komoditas, region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted" />
          {['all', 'planted', 'growing', 'harvested'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                statusFilter === s
                  ? 'bg-primary text-white'
                  : 'bg-surface text-muted hover:bg-gray-100'
              }`}
            >
              {s === 'all' ? 'Semua' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Petani</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Komoditas</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Region</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Luas (ha)</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Est. Panen</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Tgl Tanam</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(farm => (
                <tr key={farm.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-foreground text-xs">{farm.userName}</div>
                  </td>
                  <td className="px-4 py-3 text-xs text-foreground">{farm.commodityName}</td>
                  <td className="px-4 py-3 text-xs text-muted">{farm.regionName}</td>
                  <td className="px-4 py-3 text-xs text-foreground text-right">{formatNumber(farm.landArea)}</td>
                  <td className="px-4 py-3 text-xs text-foreground text-right">{formatNumber(farm.estimatedHarvest)} ton</td>
                  <td className="px-4 py-3 text-xs text-muted">{formatDate(farm.plantingDate)}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={getStatusColor(farm.status) as 'success' | 'warning' | 'info' | 'neutral'}>
                      {farm.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link href={`/farm-data/${farm.id}`} className="text-xs font-semibold text-primary hover:underline">
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted">
            <Wheat className="h-8 w-8 mb-2" />
            <p className="text-sm">Tidak ada data ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
