'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Map, Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { InfoCard } from '@/components/ui/Card';

const IndonesiaMap = dynamic(() => import('@/components/maps/IndonesiaMap'), { ssr: false });

const DATA_LAYERS = [
  {
    key: 'production' as const,
    label: 'Produksi',
    description: 'Estimasi produksi komoditas (ton)',
    colors: ['#DCFCE7', '#86EFAC', '#4ADE80', '#22C55E', '#16A34A', '#15803D', '#14532D'],
  },
  {
    key: 'price' as const,
    label: 'Harga',
    description: 'Harga beras rata-rata (Rp/kg)',
    colors: ['#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#991B1B'],
  },
  {
    key: 'stock' as const,
    label: 'Stok',
    description: 'Stok gudang komoditas (ton)',
    colors: ['#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1E3A8A'],
  },
];

export default function MapPage() {
  const [activeLayer, setActiveLayer] = useState<'production' | 'price' | 'stock'>('production');
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const currentLayer = DATA_LAYERS.find(l => l.key === activeLayer)!;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Peta Interaktif</h1>
          <p className="text-sm text-muted mt-1">Visualisasi data komoditas per provinsi — klik lingkaran untuk detail</p>
        </div>
        <div className="flex items-center gap-2">
          {DATA_LAYERS.map(layer => (
            <Button
              key={layer.key}
              variant={activeLayer === layer.key ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setActiveLayer(layer.key)}
            >
              {layer.label}
            </Button>
          ))}
        </div>
      </div>

      <IndonesiaMap
        dataKey={activeLayer}
        height="calc(100vh - 260px)"
        onProvinceClick={(id, name) => setSelectedProvince(name)}
      />

      {/* Legend + Selected Province */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-foreground">
              Layer: {currentLayer.label}
            </span>
          </div>
          <p className="text-xs text-muted mb-3">{currentLayer.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Rendah</span>
            <div className="flex gap-0.5 flex-1">
              {currentLayer.colors.map((c, i) => (
                <div key={i} className="h-4 flex-1 first:rounded-l-md last:rounded-r-md" style={{ background: c }} />
              ))}
            </div>
            <span className="text-xs text-muted">Tinggi</span>
          </div>
          <p className="text-[10px] text-muted mt-2">
            Ukuran lingkaran menunjukkan besaran nilai. Warna terang = rendah, warna gelap = tinggi.
          </p>
        </div>

        {selectedProvince ? (
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Map className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-foreground">{selectedProvince}</span>
            </div>
            <p className="text-xs text-muted">
              Provinsi terpilih. Data detail produksi, harga, dan stok tersedia pada tooltip saat hover.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border bg-surface/50 p-4 flex items-center justify-center">
            <p className="text-xs text-muted text-center">Klik lingkaran provinsi pada peta untuk melihat detail</p>
          </div>
        )}
      </div>
    </div>
  );
}
