'use client';
import { useState } from 'react';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/Card';
import { PriceLineChart } from '@/components/charts/PriceLineChart';
import { mockPriceHistory } from '@/mock/data/price-data';
import Link from 'next/link';

const ALL_LINES = [
  { key: 'beras', name: 'Beras', color: '#047857' },
  { key: 'jagung', name: 'Jagung', color: '#F59E0B' },
  { key: 'kedelai', name: 'Kedelai', color: '#8B5CF6' },
  { key: 'cabai', name: 'Cabai', color: '#EF4444' },
  { key: 'bawang', name: 'Bawang', color: '#3B82F6' },
  { key: 'gula', name: 'Gula', color: '#EC4899' },
  { key: 'minyak', name: 'Minyak Goreng', color: '#06B6D4' },
];

export default function PriceHistoryPage() {
  const [selected, setSelected] = useState<string[]>(['beras', 'cabai', 'bawang']);

  const toggleLine = (key: string) => {
    setSelected(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]);
  };

  const activeLines = ALL_LINES.filter(l => selected.includes(l.key));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/prices">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>Kembali</Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Riwayat Harga</h1>
          <p className="text-sm text-muted mt-1">Tren harga 6 bulan terakhir</p>
        </div>
      </div>

      {/* Commodity Toggles */}
      <div className="flex items-center gap-2 flex-wrap">
        {ALL_LINES.map(line => (
          <button
            key={line.key}
            onClick={() => toggleLine(line.key)}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all border ${
              selected.includes(line.key)
                ? 'border-transparent text-white'
                : 'border-border text-muted bg-white hover:bg-gray-50'
            }`}
            style={selected.includes(line.key) ? { background: line.color } : {}}
          >
            <div className="h-2 w-2 rounded-full" style={{ background: line.color }} />
            {line.name}
          </button>
        ))}
      </div>

      <InfoCard title="Grafik Tren Harga" description="Rata-rata nasional per komoditas" icon={<BarChart3 className="h-4 w-4" />}>
        {activeLines.length > 0 ? (
          <PriceLineChart data={mockPriceHistory} lines={activeLines} height={400} />
        ) : (
          <div className="flex items-center justify-center py-16 text-sm text-muted">
            Pilih minimal satu komoditas untuk melihat grafik
          </div>
        )}
      </InfoCard>

      {/* Data Table */}
      <InfoCard title="Data Tabel" description="Harga bulanan (Rp/kg)">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-3 py-2 text-left text-xs font-semibold text-muted">Bulan</th>
                {activeLines.map(l => (
                  <th key={l.key} className="px-3 py-2 text-right text-xs font-semibold" style={{ color: l.color }}>{l.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockPriceHistory.map(row => (
                <tr key={row.date} className="border-b border-border last:border-0">
                  <td className="px-3 py-2 text-xs font-semibold text-foreground">{row.date}</td>
                  {activeLines.map(l => (
                    <td key={l.key} className="px-3 py-2 text-xs text-foreground text-right">
                      {(row[l.key as keyof typeof row] as number)?.toLocaleString('id-ID') || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InfoCard>
    </div>
  );
}
