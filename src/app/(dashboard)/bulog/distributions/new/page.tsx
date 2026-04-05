'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { InfoCard } from '@/components/ui/Card';
import { mockWarehouses } from '@/mock/data/bulog-warehouses';
import { mockCommodities } from '@/mock/data/commodities';
import { mockAllRegions } from '@/mock/data/regions';
import Link from 'next/link';

export default function NewDistributionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    warehouseId: '',
    commodityId: '',
    volume: '',
    direction: 'out',
    destinationRegionId: '',
    recipient: '',
    documentRef: '',
    distributionDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    router.push('/bulog/distributions');
  };

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const warehouseOptions = mockWarehouses.map(w => ({ value: w.id, label: w.name }));
  const commodityOptions = mockCommodities.map(c => ({ value: c.id, label: c.name }));
  const provinces = mockAllRegions.filter(r => r.level === 'province').map(r => ({ value: r.id, label: r.name }));

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/bulog/distributions">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>Kembali</Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Catat Distribusi</h1>
          <p className="text-sm text-muted mt-1">Input data distribusi komoditas</p>
        </div>
      </div>

      <InfoCard title="Detail Distribusi">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Gudang"
            value={form.warehouseId}
            onChange={(e) => update('warehouseId', e.target.value)}
            options={[{ value: '', label: 'Pilih gudang...' }, ...warehouseOptions]}
            required
          />
          <Select
            label="Komoditas"
            value={form.commodityId}
            onChange={(e) => update('commodityId', e.target.value)}
            options={[{ value: '', label: 'Pilih komoditas...' }, ...commodityOptions]}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Volume (ton)"
              type="number"
              value={form.volume}
              onChange={(e) => update('volume', e.target.value)}
              placeholder="0"
              required
            />
            <Select
              label="Arah"
              value={form.direction}
              onChange={(e) => update('direction', e.target.value)}
              options={[{ value: 'out', label: 'Keluar (Distribusi)' }, { value: 'in', label: 'Masuk (Pengadaan)' }]}
              required
            />
          </div>
          {form.direction === 'out' && (
            <Select
              label="Region Tujuan"
              value={form.destinationRegionId}
              onChange={(e) => update('destinationRegionId', e.target.value)}
              options={[{ value: '', label: 'Pilih tujuan...' }, ...provinces]}
            />
          )}
          <Input
            label="Penerima / Sumber"
            value={form.recipient}
            onChange={(e) => update('recipient', e.target.value)}
            placeholder="Nama penerima atau sumber"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="No. Dokumen"
              value={form.documentRef}
              onChange={(e) => update('documentRef', e.target.value)}
              placeholder="DO/2026/..."
              required
            />
            <Input
              label="Tanggal"
              type="date"
              value={form.distributionDate}
              onChange={(e) => update('distributionDate', e.target.value)}
              required
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" loading={loading} icon={<Save className="h-4 w-4" />}>Simpan</Button>
            <Link href="/bulog/distributions"><Button variant="outline">Batal</Button></Link>
          </div>
        </form>
      </InfoCard>
    </div>
  );
}
