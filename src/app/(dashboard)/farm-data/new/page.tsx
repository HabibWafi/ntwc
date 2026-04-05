'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { InfoCard } from '@/components/ui/Card';
import { mockCommodities } from '@/mock/data/commodities';
import { mockAllRegions } from '@/mock/data/regions';
import Link from 'next/link';

export default function NewFarmDataPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    commodityId: '',
    regionId: '',
    landArea: '',
    estimatedHarvest: '',
    plantingDate: '',
    estimatedHarvestDate: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    router.push('/farm-data');
  };

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

  const provinces = mockAllRegions.filter(r => r.level === 'province');
  const commodityOptions = mockCommodities.map(c => ({ value: c.id, label: c.name }));
  const regionOptions = provinces.map(r => ({ value: r.id, label: r.name }));

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/farm-data">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>Kembali</Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Tambah Data Lahan</h1>
          <p className="text-sm text-muted mt-1">Catat data pertanian baru</p>
        </div>
      </div>

      <InfoCard title="Informasi Lahan">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Komoditas"
            value={form.commodityId}
            onChange={(e) => update('commodityId', e.target.value)}
            options={[{ value: '', label: 'Pilih komoditas...' }, ...commodityOptions]}
            required
          />
          <Select
            label="Provinsi"
            value={form.regionId}
            onChange={(e) => update('regionId', e.target.value)}
            options={[{ value: '', label: 'Pilih provinsi...' }, ...regionOptions]}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Luas Lahan (ha)"
              type="number"
              step="0.1"
              value={form.landArea}
              onChange={(e) => update('landArea', e.target.value)}
              placeholder="0.0"
              required
            />
            <Input
              label="Estimasi Panen (ton)"
              type="number"
              step="0.1"
              value={form.estimatedHarvest}
              onChange={(e) => update('estimatedHarvest', e.target.value)}
              placeholder="0.0"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Tanggal Tanam"
              type="date"
              value={form.plantingDate}
              onChange={(e) => update('plantingDate', e.target.value)}
              required
            />
            <Input
              label="Estimasi Tanggal Panen"
              type="date"
              value={form.estimatedHarvestDate}
              onChange={(e) => update('estimatedHarvestDate', e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Catatan</label>
            <textarea
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              rows={3}
              value={form.notes}
              onChange={(e) => update('notes', e.target.value)}
              placeholder="Catatan tambahan (opsional)"
            />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" loading={loading} icon={<Save className="h-4 w-4" />}>
              Simpan Data
            </Button>
            <Link href="/farm-data">
              <Button variant="outline">Batal</Button>
            </Link>
          </div>
        </form>
      </InfoCard>
    </div>
  );
}
