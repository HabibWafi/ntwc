'use client';
import { useState } from 'react';
import { BarChart3, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { mockHarvestRecords } from '@/mock/data/harvest-records';
import { mockFarmData } from '@/mock/data/farm-data';
import { formatNumber, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function HarvestPage() {
  const [search, setSearch] = useState('');
  const [flagFilter, setFlagFilter] = useState<'all' | 'flagged' | 'normal'>('all');

  const enriched = mockHarvestRecords
    .filter(h => h.actualHarvest > 0)
    .map(h => {
      const farm = mockFarmData.find(f => f.id === h.farmDataId);
      return { ...h, farm };
    });

  const filtered = enriched.filter(h => {
    const matchSearch = !search || (h.farm?.userName.toLowerCase().includes(search.toLowerCase()) ||
      h.farm?.commodityName.toLowerCase().includes(search.toLowerCase()));
    const matchFlag = flagFilter === 'all' || (flagFilter === 'flagged' ? h.flagged : !h.flagged);
    return matchSearch && matchFlag;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Data Panen</h1>
        <p className="text-sm text-muted mt-1">{enriched.length} record panen tercatat</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] max-w-sm">
          <Input
            placeholder="Cari petani, komoditas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted" />
          {(['all', 'flagged', 'normal'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFlagFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                flagFilter === f ? 'bg-primary text-white' : 'bg-surface text-muted hover:bg-gray-100'
              }`}
            >
              {f === 'all' ? 'Semua' : f === 'flagged' ? 'Bermasalah' : 'Normal'}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Petani</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Komoditas</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Estimasi</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Aktual</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Deviasi</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Tgl Panen</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">Status</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(h => (
                <tr key={h.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-3 text-xs font-semibold text-foreground">{h.farm?.userName || '-'}</td>
                  <td className="px-4 py-3 text-xs text-foreground">{h.farm?.commodityName || '-'}</td>
                  <td className="px-4 py-3 text-xs text-muted text-right">{formatNumber(h.farm?.estimatedHarvest || 0)} ton</td>
                  <td className="px-4 py-3 text-xs text-foreground text-right font-semibold">{formatNumber(h.actualHarvest)} ton</td>
                  <td className={`px-4 py-3 text-xs text-right font-semibold ${h.flagged ? 'text-red-600' : 'text-foreground'}`}>
                    {h.deviationPct > 0 ? '+' : ''}{h.deviationPct}%
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">{h.harvestDate ? formatDate(h.harvestDate) : '-'}</td>
                  <td className="px-4 py-3 text-center">
                    {h.flagged ? (
                      <Badge variant="danger">Flagged</Badge>
                    ) : h.verifiedByName ? (
                      <Badge variant="success">Verified</Badge>
                    ) : (
                      <Badge variant="neutral">Pending</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link href={`/harvest/${h.id}`} className="text-xs font-semibold text-primary hover:underline">
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
            <BarChart3 className="h-8 w-8 mb-2" />
            <p className="text-sm">Tidak ada data panen ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
