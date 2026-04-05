'use client';
import { useState } from 'react';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { mockOrders } from '@/mock/data/marketplace';
import { formatCurrency, formatDate, getStatusColor } from '@/lib/utils';
import Link from 'next/link';

const STATUS_LABELS: Record<string, string> = {
  pending: 'Menunggu', confirmed: 'Dikonfirmasi', paid: 'Dibayar',
  shipped: 'Dikirim', delivered: 'Diterima', completed: 'Selesai',
  disputed: 'Sengketa', cancelled: 'Dibatalkan',
};

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = mockOrders.filter(o => {
    const matchSearch = !search || o.commodityName.toLowerCase().includes(search.toLowerCase()) ||
      o.sellerName.toLowerCase().includes(search.toLowerCase()) || o.buyerName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Pesanan</h1>
        <p className="text-sm text-muted mt-1">{mockOrders.length} pesanan tercatat</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] max-w-sm">
          <Input placeholder="Cari komoditas, penjual, pembeli..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search className="h-4 w-4" />} />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto">
          <Filter className="h-4 w-4 text-muted shrink-0" />
          {['all', 'pending', 'paid', 'shipped', 'delivered', 'completed', 'disputed'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${statusFilter === s ? 'bg-primary text-white' : 'bg-surface text-muted hover:bg-gray-100'}`}>
              {s === 'all' ? 'Semua' : STATUS_LABELS[s] || s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(order => (
          <Link key={order.id} href={`/orders/${order.id}`}>
            <div className="rounded-2xl border border-border bg-card p-5 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{order.commodityIcon}</span>
                  <div>
                    <div className="text-sm font-bold text-foreground">
                      {order.commodityName} — {order.quantity} {order.unit}
                    </div>
                    <div className="text-xs text-muted mt-0.5">
                      {order.sellerName} → {order.buyerName}
                    </div>
                    <div className="text-xs text-muted">Order #{order.id} • {formatDate(order.createdAt)}</div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-primary">{formatCurrency(order.totalPrice)}</div>
                  <Badge variant={getStatusColor(order.status) as 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple'} className="mt-1">
                    {STATUS_LABELS[order.status]}
                  </Badge>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-1 mt-4 pt-3 border-t border-border">
                {['pending', 'confirmed', 'paid', 'shipped', 'delivered', 'completed'].map((step, i) => {
                  const steps = ['pending', 'confirmed', 'paid', 'shipped', 'delivered', 'completed'];
                  const currentIdx = steps.indexOf(order.status);
                  const isCompleted = i <= currentIdx && order.status !== 'disputed' && order.status !== 'cancelled';
                  const isCurrent = step === order.status;
                  return (
                    <div key={step} className="flex-1 flex items-center gap-1">
                      <div className={`h-2 flex-1 rounded-full ${isCompleted ? 'bg-primary' : 'bg-gray-200'} ${isCurrent ? 'bg-primary animate-pulse' : ''}`} />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between text-[9px] text-muted mt-1">
                <span>Pesan</span><span>Konfirmasi</span><span>Bayar</span><span>Kirim</span><span>Terima</span><span>Selesai</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-muted">
          <ShoppingBag className="h-10 w-10 mb-3" />
          <p className="text-sm font-semibold">Tidak ada pesanan ditemukan</p>
        </div>
      )}
    </div>
  );
}
