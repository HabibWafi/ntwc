'use client';
import { ArrowLeft, BarChart3, CheckCircle, AlertTriangle, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { InfoCard } from '@/components/ui/Card';
import { mockHarvestRecords } from '@/mock/data/harvest-records';
import { mockFarmData } from '@/mock/data/farm-data';
import { formatNumber, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function HarvestDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const harvest = mockHarvestRecords.find(h => h.id === id);
  const farm = harvest ? mockFarmData.find(f => f.id === harvest.farmDataId) : null;

  if (!harvest) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <BarChart3 className="h-12 w-12 text-muted mb-4" />
        <h2 className="text-lg font-bold text-foreground mb-2">Data Panen Tidak Ditemukan</h2>
        <Link href="/harvest"><Button variant="outline" size="sm">Kembali</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/harvest">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>Kembali</Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold text-foreground">Detail Panen</h1>
          <p className="text-sm text-muted mt-1">{farm?.commodityName} — {farm?.userName}</p>
        </div>
        {harvest.flagged ? (
          <Badge variant="danger">Flagged</Badge>
        ) : harvest.verifiedByName ? (
          <Badge variant="success">Verified</Badge>
        ) : (
          <Badge variant="neutral">Pending</Badge>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border bg-card p-5 text-center">
          <div className="text-xs text-muted uppercase font-semibold mb-1">Estimasi</div>
          <div className="text-2xl font-extrabold text-foreground">{formatNumber(farm?.estimatedHarvest || 0)}</div>
          <div className="text-xs text-muted">ton</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 text-center">
          <div className="text-xs text-muted uppercase font-semibold mb-1">Aktual</div>
          <div className="text-2xl font-extrabold text-foreground">{formatNumber(harvest.actualHarvest)}</div>
          <div className="text-xs text-muted">ton</div>
        </div>
        <div className={`rounded-2xl border p-5 text-center ${harvest.flagged ? 'border-red-200 bg-red-50' : 'border-border bg-card'}`}>
          <div className="text-xs text-muted uppercase font-semibold mb-1">Deviasi</div>
          <div className={`text-2xl font-extrabold ${harvest.flagged ? 'text-red-600' : 'text-foreground'}`}>
            {harvest.deviationPct > 0 ? '+' : ''}{harvest.deviationPct}%
          </div>
          <div className="text-xs text-muted">{harvest.flagged ? 'Di atas threshold' : 'Normal'}</div>
        </div>
      </div>

      <InfoCard title="Detail" icon={<BarChart3 className="h-4 w-4" />}>
        <dl className="space-y-3">
          <div className="flex justify-between">
            <dt className="text-xs text-muted">Tanggal Panen</dt>
            <dd className="text-xs font-semibold text-foreground">{harvest.harvestDate ? formatDate(harvest.harvestDate) : '-'}</dd>
          </div>
          {harvest.verifiedByName && (
            <div className="flex justify-between">
              <dt className="text-xs text-muted flex items-center gap-1"><CheckCircle className="h-3 w-3" /> Diverifikasi</dt>
              <dd className="text-xs font-semibold text-foreground">{harvest.verifiedByName}</dd>
            </div>
          )}
          {harvest.notes && (
            <div className="pt-2 border-t border-border">
              <dt className="text-xs text-muted mb-1">Catatan</dt>
              <dd className="text-xs text-foreground bg-surface rounded-lg p-3">{harvest.notes}</dd>
            </div>
          )}
        </dl>
      </InfoCard>

      {farm && (
        <InfoCard title="Data Lahan Terkait" icon={<User className="h-4 w-4" />}>
          <dl className="space-y-3">
            {[
              ['Petani', farm.userName],
              ['Komoditas', farm.commodityName],
              ['Region', farm.regionName],
              ['Luas Lahan', `${formatNumber(farm.landArea)} ha`],
              ['Tanggal Tanam', formatDate(farm.plantingDate)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="text-xs font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
          <Link href={`/farm-data/${farm.id}`} className="mt-3 inline-block text-xs font-semibold text-primary hover:underline">
            Lihat Detail Lahan →
          </Link>
        </InfoCard>
      )}
    </div>
  );
}
