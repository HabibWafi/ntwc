'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowLeftRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import { InfoCard } from '@/components/ui/Card';
import { mockCurrentPrices } from '@/mock/data/price-data';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

const REGIONS = Array.from(new Set(mockCurrentPrices.map(p => p.regionName)));

export default function PriceComparePage() {
  const [regionA, setRegionA] = useState(REGIONS[0]);
  const [regionB, setRegionB] = useState(REGIONS[REGIONS.length - 1]);

  const pricesA = mockCurrentPrices.filter(p => p.regionName === regionA);
  const pricesB = mockCurrentPrices.filter(p => p.regionName === regionB);

  const regionOptions = REGIONS.map(r => ({ value: r, label: r }));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/prices">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>Kembali</Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Bandingkan Harga</h1>
          <p className="text-sm text-muted mt-1">Perbandingan harga antar provinsi</p>
        </div>
      </div>

      {/* Region Selectors */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[180px]">
          <Select label="Provinsi A" value={regionA} onChange={(e) => setRegionA(e.target.value)} options={regionOptions} />
        </div>
        <ArrowLeftRight className="h-5 w-5 text-muted mt-5 shrink-0" />
        <div className="flex-1 min-w-[180px]">
          <Select label="Provinsi B" value={regionB} onChange={(e) => setRegionB(e.target.value)} options={regionOptions} />
        </div>
      </div>

      {/* Comparison Table */}
      <InfoCard title="Perbandingan Harga" description={`${regionA} vs ${regionB}`} icon={<ArrowLeftRight className="h-4 w-4" />}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Komoditas</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">{regionA}</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">{regionB}</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Selisih</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">Lebih Murah</th>
              </tr>
            </thead>
            <tbody>
              {pricesA.map(pA => {
                const pB = pricesB.find(p => p.commodityId === pA.commodityId);
                if (!pB) return null;
                const diff = pA.price - pB.price;
                const diffPct = ((diff / pB.price) * 100).toFixed(1);
                return (
                  <tr key={pA.commodityId} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span>{pA.commodityIcon}</span>
                        <span className="text-xs font-semibold text-foreground">{pA.commodityName}</span>
                      </div>
                    </td>
                    <td className={`px-4 py-3 text-xs font-bold text-right ${diff < 0 ? 'text-emerald-600' : 'text-foreground'}`}>
                      {formatCurrency(pA.price)}
                    </td>
                    <td className={`px-4 py-3 text-xs font-bold text-right ${diff > 0 ? 'text-emerald-600' : 'text-foreground'}`}>
                      {formatCurrency(pB.price)}
                    </td>
                    <td className="px-4 py-3 text-xs text-right">
                      <Badge variant={diff > 0 ? 'danger' : diff < 0 ? 'success' : 'neutral'}>
                        {diff > 0 ? '+' : ''}{formatCurrency(Math.abs(diff)).replace('Rp ', '')} ({diffPct}%)
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-semibold text-foreground">
                        {diff > 0 ? regionB : diff < 0 ? regionA : 'Sama'}
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
