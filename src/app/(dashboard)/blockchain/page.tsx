'use client';
import { Shield, Search, ExternalLink, Hash, Clock, CheckCircle2, Link2, Blocks } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { InfoCard, StatCard } from '@/components/ui/Card';

interface BlockchainRecord {
  id: string;
  txHash: string;
  type: 'listing' | 'transaction' | 'distribution' | 'harvest';
  description: string;
  from: string;
  to: string;
  data: string;
  blockNumber: number;
  timestamp: string;
  status: 'confirmed' | 'pending';
}

const mockRecords: BlockchainRecord[] = [
  { id: 'bc-001', txHash: '0xa1b2c3d4e5f67890abcdef1234567890abcdef12', type: 'transaction', description: 'Penjualan Beras Premium 500 kg', from: 'Pak Suryanto', to: 'CV Maju Bersama', data: '500 kg @ Rp 13.500', blockNumber: 1847291, timestamp: '2026-03-20T10:15:00', status: 'confirmed' },
  { id: 'bc-002', txHash: '0x9c1d4f7a8b2e3c5d6f7a8b9c0d1e2f3a4b5c6d7e', type: 'listing', description: 'Listing Bawang Merah 3.000 kg', from: 'Pak Ahmad Fauzi', to: 'Marketplace', data: '3.000 kg @ Rp 30.000', blockNumber: 1847285, timestamp: '2026-02-15T08:30:00', status: 'confirmed' },
  { id: 'bc-003', txHash: '0x2e8f1c3d4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d', type: 'listing', description: 'Listing Beras Premium 10.000 kg', from: 'Pak Bambang Sutejo', to: 'Marketplace', data: '10.000 kg @ Rp 13.200', blockNumber: 1847280, timestamp: '2026-02-10T08:00:00', status: 'confirmed' },
  { id: 'bc-004', txHash: '0xf4e5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3', type: 'transaction', description: 'Penjualan Beras Premium 2.000 kg', from: 'Pak Bambang Sutejo', to: 'UD Sejahtera', data: '2.000 kg @ Rp 13.200', blockNumber: 1847320, timestamp: '2026-03-28T09:30:00', status: 'confirmed' },
  { id: 'bc-005', txHash: '0x8c9d2e1f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d', type: 'transaction', description: 'Penjualan Beras Premium 1.000 kg (Sengketa)', from: 'Pak Suryanto', to: 'Toko Beras Murah', data: '1.000 kg @ Rp 13.500', blockNumber: 1847250, timestamp: '2026-03-15T08:45:00', status: 'confirmed' },
  { id: 'bc-006', txHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b', type: 'distribution', description: 'Distribusi Bulog: Beras Premium ke Bali', from: 'Gudang Bulog Surabaya', to: 'Bulog Divre Bali', data: '5.000 ton', blockNumber: 1847310, timestamp: '2026-03-25T08:00:00', status: 'confirmed' },
  { id: 'bc-007', txHash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f', type: 'harvest', description: 'Verifikasi Panen Beras Premium', from: 'Pak Suryanto', to: 'Dinas Pertanian Jabar', data: 'Aktual: 19.5 ton, Deviasi: -7.1%', blockNumber: 1847260, timestamp: '2026-02-14T12:00:00', status: 'confirmed' },
  { id: 'bc-008', txHash: '0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b', type: 'harvest', description: 'Verifikasi Panen Bawang Merah', from: 'Pak Ahmad Fauzi', to: 'Dinas Pertanian NTB', data: 'Aktual: 33.0 ton, Deviasi: +10%', blockNumber: 1847265, timestamp: '2026-02-12T14:00:00', status: 'confirmed' },
];

const TYPE_COLORS: Record<string, string> = {
  listing: 'bg-blue-100 text-blue-700',
  transaction: 'bg-emerald-100 text-emerald-700',
  distribution: 'bg-amber-100 text-amber-700',
  harvest: 'bg-violet-100 text-violet-700',
};

const TYPE_LABELS: Record<string, string> = {
  listing: 'Listing', transaction: 'Transaksi', distribution: 'Distribusi', harvest: 'Panen',
};

export default function BlockchainPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = mockRecords.filter(r => {
    const matchSearch = !search || r.txHash.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) || r.from.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || r.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-foreground">Blockchain Explorer</h1>
          <Badge variant="purple">On-Chain</Badge>
        </div>
        <p className="text-sm text-muted mt-1">Verifikasi dan audit transaksi yang tercatat di blockchain</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Transaksi" value={mockRecords.length} icon={<Blocks className="h-5 w-5" />} subtitle="On-chain records" gradient="from-violet-500 to-violet-400" />
        <StatCard title="Block Terakhir" value="#1,847,320" icon={<Hash className="h-5 w-5" />} subtitle="28 Mar 2026" gradient="from-primary to-primary-light" />
        <StatCard title="Confirmed" value={mockRecords.filter(r => r.status === 'confirmed').length} icon={<CheckCircle2 className="h-5 w-5" />} subtitle="100% verified" gradient="from-emerald-500 to-emerald-400" />
        <StatCard title="Marketplace Tx" value={mockRecords.filter(r => r.type === 'transaction').length} icon={<Link2 className="h-5 w-5" />} subtitle="Escrow records" gradient="from-blue-500 to-blue-400" />
      </div>

      {/* Search + Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[250px] max-w-lg">
          <Input placeholder="Cari hash transaksi, deskripsi, nama..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search className="h-4 w-4" />} />
        </div>
        <div className="flex items-center gap-1">
          {['all', 'transaction', 'listing', 'distribution', 'harvest'].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${typeFilter === t ? 'bg-primary text-white' : 'bg-surface text-muted hover:bg-gray-100'}`}>
              {t === 'all' ? 'Semua' : TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Records */}
      <div className="space-y-3">
        {filtered.map(record => (
          <div key={record.id} className="rounded-2xl border border-border bg-card p-5 hover:shadow-sm transition-all">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                  <Shield className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">{record.description}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant="neutral" className={TYPE_COLORS[record.type]}>{TYPE_LABELS[record.type]}</Badge>
                    <span className="text-[10px] text-muted">Block #{record.blockNumber.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-[10px] font-semibold text-emerald-600">Confirmed</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="rounded-lg bg-surface p-2.5">
                <div className="text-[9px] text-muted uppercase font-semibold">From</div>
                <div className="text-xs font-semibold text-foreground">{record.from}</div>
              </div>
              <div className="rounded-lg bg-surface p-2.5">
                <div className="text-[9px] text-muted uppercase font-semibold">To</div>
                <div className="text-xs font-semibold text-foreground">{record.to}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-muted font-mono">
                <Hash className="h-3 w-3" />
                <span className="truncate max-w-[200px] sm:max-w-[350px]">{record.txHash}</span>
              </div>
              <div className="flex items-center gap-1 text-muted shrink-0">
                <Clock className="h-3 w-3" />
                <span>{new Date(record.timestamp).toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted">
            <Shield className="h-10 w-10 mb-3" />
            <p className="text-sm font-semibold">Tidak ada record ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
