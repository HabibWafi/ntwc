'use client';
import { ArrowLeft, ShoppingBag, MapPin, Shield, Star, Truck, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { InfoCard } from '@/components/ui/Card';
import { mockOrders } from '@/mock/data/marketplace';
import { formatCurrency, formatNumber, formatDate, getStatusColor } from '@/lib/utils';
import Link from 'next/link';

const STATUS_LABELS: Record<string, string> = {
  pending: 'Menunggu', confirmed: 'Dikonfirmasi', paid: 'Dibayar',
  shipped: 'Dikirim', delivered: 'Diterima', completed: 'Selesai',
  disputed: 'Sengketa', cancelled: 'Dibatalkan',
};

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const order = mockOrders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <ShoppingBag className="h-12 w-12 text-muted mb-4" />
        <h2 className="text-lg font-bold text-foreground mb-2">Pesanan Tidak Ditemukan</h2>
        <Link href="/orders"><Button variant="outline" size="sm">Kembali</Button></Link>
      </div>
    );
  }

  const steps = ['pending', 'confirmed', 'paid', 'shipped', 'delivered', 'completed'];
  const currentIdx = steps.indexOf(order.status);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link href="/orders">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>Pesanan</Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-extrabold text-foreground">Detail Pesanan</h1>
          <p className="text-sm text-muted mt-1">#{order.id}</p>
        </div>
        <Badge variant={getStatusColor(order.status) as 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'neutral'}>
          {STATUS_LABELS[order.status]}
        </Badge>
      </div>

      {/* Tracking Progress */}
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-sm font-bold text-foreground mb-4">Status Pesanan</h3>
        <div className="flex items-center gap-2 mb-2">
          {steps.map((step, i) => {
            const done = i <= currentIdx && order.status !== 'disputed' && order.status !== 'cancelled';
            const isCurrent = step === order.status;
            return (
              <div key={step} className="flex-1 flex flex-col items-center gap-1">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  done ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
                } ${isCurrent ? 'ring-4 ring-primary/20' : ''}`}>
                  {i + 1}
                </div>
                {i < steps.length - 1 && <div className="sr-only" />}
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          {steps.map((step, i) => (
            <div key={step} className="flex-1 text-center text-[9px] font-semibold text-muted capitalize">
              {STATUS_LABELS[step]}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Order Summary */}
        <InfoCard title="Ringkasan Pesanan" icon={<ShoppingBag className="h-4 w-4" />}>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl">{order.commodityIcon}</span>
            <div>
              <div className="text-base font-bold text-foreground">{order.commodityName}</div>
              <div className="text-xs text-muted">{formatNumber(order.quantity)} {order.unit} × {formatCurrency(order.pricePerUnit)}</div>
            </div>
          </div>
          <dl className="space-y-2 pt-3 border-t border-border">
            <div className="flex justify-between text-xs">
              <dt className="text-muted">Subtotal</dt>
              <dd className="font-bold text-foreground">{formatCurrency(order.totalPrice)}</dd>
            </div>
            <div className="flex justify-between text-xs">
              <dt className="text-muted">Metode Bayar</dt>
              <dd className="font-semibold text-foreground">{order.paymentMethod}</dd>
            </div>
            <div className="flex justify-between text-xs">
              <dt className="text-muted">Tanggal Pesan</dt>
              <dd className="font-semibold text-foreground">{formatDate(order.createdAt)}</dd>
            </div>
          </dl>
        </InfoCard>

        {/* Shipping */}
        <InfoCard title="Pengiriman" icon={<Truck className="h-4 w-4" />}>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-muted mb-0.5">Alamat Tujuan</dt>
              <dd className="text-xs font-semibold text-foreground">{order.shippingAddress}</dd>
            </div>
            {order.trackingNumber && (
              <div>
                <dt className="text-xs text-muted mb-0.5">No. Resi</dt>
                <dd className="text-xs font-mono font-bold text-primary">{order.trackingNumber}</dd>
              </div>
            )}
            <div className="flex justify-between text-xs">
              <dt className="text-muted">Penjual</dt>
              <dd className="font-semibold text-foreground">{order.sellerName}</dd>
            </div>
            <div className="flex justify-between text-xs">
              <dt className="text-muted">Pembeli</dt>
              <dd className="font-semibold text-foreground">{order.buyerName}</dd>
            </div>
          </dl>
        </InfoCard>
      </div>

      {/* Blockchain + Review */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {order.blockchainTxHash && (
          <InfoCard title="Blockchain Record" icon={<Shield className="h-4 w-4" />}>
            <div className="rounded-xl bg-violet-50 border border-violet-200 p-4">
              <div className="text-xs font-bold text-violet-700 mb-1">Transaksi On-Chain</div>
              <div className="text-xs font-mono text-violet-600">Tx: {order.blockchainTxHash}</div>
              <p className="text-[10px] text-violet-500 mt-2">
                Transaksi tercatat secara permanen di blockchain. Data tidak dapat diubah atau dihapus.
              </p>
            </div>
          </InfoCard>
        )}

        {order.rating && (
          <InfoCard title="Review" icon={<Star className="h-4 w-4" />}>
            <div className="flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map(s => (
                <Star key={s} className={`h-4 w-4 ${s <= order.rating! ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} />
              ))}
              <span className="text-xs font-bold text-foreground ml-1">{order.rating}/5</span>
            </div>
            {order.review && <p className="text-xs text-muted italic">&ldquo;{order.review}&rdquo;</p>}
          </InfoCard>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {order.status === 'delivered' && <Button size="sm">Konfirmasi Terima</Button>}
        {order.status === 'shipped' && <Button size="sm" variant="outline">Track Pengiriman</Button>}
        {order.status === 'pending' && <Button size="sm" variant="danger">Batalkan Pesanan</Button>}
      </div>
    </div>
  );
}
