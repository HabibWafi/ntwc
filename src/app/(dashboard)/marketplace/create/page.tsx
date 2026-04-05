'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { InfoCard } from '@/components/ui/Card';
import { mockCommodities } from '@/mock/data/commodities';
import Link from 'next/link';

export default function CreateListingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    commodityId: '', quantity: '', pricePerUnit: '', minOrder: '',
    grade: 'A', organic: 'false', description: '', harvestDate: '', availableUntil: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    router.push('/marketplace');
  };

  const update = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));
  const commodityOptions = mockCommodities.map(c => ({ value: c.id, label: `${c.icon} ${c.name}` }));

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/marketplace">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>Marketplace</Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Buat Listing Baru</h1>
          <p className="text-sm text-muted mt-1">Jual komoditas langsung ke pembeli</p>
        </div>
      </div>

      <InfoCard title="Detail Komoditas">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select label="Komoditas" value={form.commodityId} onChange={(e) => update('commodityId', e.target.value)}
            options={[{ value: '', label: 'Pilih komoditas...' }, ...commodityOptions]} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Kuantitas (kg)" type="number" value={form.quantity} onChange={(e) => update('quantity', e.target.value)} placeholder="0" required />
            <Input label="Harga per kg (Rp)" type="number" value={form.pricePerUnit} onChange={(e) => update('pricePerUnit', e.target.value)} placeholder="0" required />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input label="Min. Order (kg)" type="number" value={form.minOrder} onChange={(e) => update('minOrder', e.target.value)} placeholder="10" required />
            <Select label="Grade" value={form.grade} onChange={(e) => update('grade', e.target.value)}
              options={[{ value: 'A', label: 'Grade A' }, { value: 'B', label: 'Grade B' }, { value: 'C', label: 'Grade C' }]} />
            <Select label="Organik" value={form.organic} onChange={(e) => update('organic', e.target.value)}
              options={[{ value: 'false', label: 'Tidak' }, { value: 'true', label: 'Ya' }]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Tanggal Panen" type="date" value={form.harvestDate} onChange={(e) => update('harvestDate', e.target.value)} required />
            <Input label="Tersedia Sampai" type="date" value={form.availableUntil} onChange={(e) => update('availableUntil', e.target.value)} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground mb-1.5">Deskripsi</label>
            <textarea
              className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-light focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              rows={4} value={form.description} onChange={(e) => update('description', e.target.value)}
              placeholder="Deskripsikan komoditas Anda (varietas, kualitas, kondisi penyimpanan, dll)" required />
          </div>

          <div className="rounded-xl bg-violet-50 border border-violet-200 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-violet-700">
              <Shield className="h-4 w-4" /> Listing akan tercatat di blockchain
            </div>
            <p className="text-[10px] text-violet-600 mt-1">
              Setelah listing dipublikasikan, data akan dicatat secara immutable untuk transparansi dan verifikasi.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button type="submit" loading={loading} icon={<Save className="h-4 w-4" />}>Publikasikan Listing</Button>
            <Link href="/marketplace"><Button variant="outline">Batal</Button></Link>
          </div>
        </form>
      </InfoCard>
    </div>
  );
}
