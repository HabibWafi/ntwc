'use client';
import { ArrowLeft, MapPin, Calendar, Wheat, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { InfoCard } from '@/components/ui/Card';
import { mockFarmData } from '@/mock/data/farm-data';
import { mockHarvestRecords } from '@/mock/data/harvest-records';
import { formatNumber, formatDate, getStatusColor } from '@/lib/utils';
import Link from 'next/link';

export default function FarmDataDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const farm = mockFarmData.find(f => f.id === id);
  const harvest = mockHarvestRecords.find(h => h.farmDataId === id);

  if (!farm) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Wheat className="h-12 w-12 text-muted mb-4" />
        <h2 className="text-lg font-bold text-foreground mb-2">Data Tidak Ditemukan</h2>
        <Link href="/farm-data"><Button variant="outline" size="sm">Kembali</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/farm-data">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>Kembali</Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold text-foreground">{farm.commodityName}</h1>
          <p className="text-sm text-muted mt-1">{farm.userName} — {farm.regionName}</p>
        </div>
        <Badge variant={getStatusColor(farm.status) as 'success' | 'warning' | 'info' | 'neutral'}>
          {farm.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Informasi Lahan" icon={<Wheat className="h-4 w-4" />}>
          <dl className="space-y-3">
            {[
              ['Petani', farm.userName],
              ['Komoditas', farm.commodityName],
              ['Region', farm.regionName],
              ['Luas Lahan', `${formatNumber(farm.landArea)} ha`],
              ['Estimasi Panen', `${formatNumber(farm.estimatedHarvest)} ton`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="text-xs font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </InfoCard>

        <InfoCard title="Jadwal" icon={<Calendar className="h-4 w-4" />}>
          <dl className="space-y-3">
            {[
              ['Tanggal Tanam', formatDate(farm.plantingDate)],
              ['Est. Tanggal Panen', formatDate(farm.estimatedHarvestDate)],
              ['Dicatat', formatDate(farm.createdAt)],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="text-xs font-semibold text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
          {farm.location && (
            <div className="mt-4 flex items-center gap-2 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5" />
              <span>{farm.location.lat}, {farm.location.lng}</span>
            </div>
          )}
        </InfoCard>
      </div>

      {harvest && harvest.actualHarvest > 0 && (
        <InfoCard title="Data Panen" icon={<BarChart3 className="h-4 w-4" />}>
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-xs text-muted">Hasil Aktual</dt>
              <dd className="text-xs font-semibold text-foreground">{formatNumber(harvest.actualHarvest)} ton</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-xs text-muted">Deviasi</dt>
              <dd className={`text-xs font-semibold ${harvest.flagged ? 'text-red-600' : 'text-foreground'}`}>
                {harvest.deviationPct > 0 ? '+' : ''}{harvest.deviationPct}%
                {harvest.flagged && <Badge variant="danger" className="ml-2">Flagged</Badge>}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-xs text-muted">Tanggal Panen</dt>
              <dd className="text-xs font-semibold text-foreground">{formatDate(harvest.harvestDate)}</dd>
            </div>
            {harvest.verifiedByName && (
              <div className="flex justify-between">
                <dt className="text-xs text-muted">Diverifikasi Oleh</dt>
                <dd className="text-xs font-semibold text-foreground">{harvest.verifiedByName}</dd>
              </div>
            )}
            {harvest.notes && (
              <div className="pt-2 border-t border-border">
                <dt className="text-xs text-muted mb-1">Catatan</dt>
                <dd className="text-xs text-foreground">{harvest.notes}</dd>
              </div>
            )}
          </dl>
        </InfoCard>
      )}
    </div>
  );
}
