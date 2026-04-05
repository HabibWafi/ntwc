'use client';
import { useState } from 'react';
import { Bell, Check, Filter, AlertTriangle, TrendingUp, Package, ShoppingCart, Info } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatTimeAgo } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'price_alert' | 'stock_alert' | 'order' | 'harvest' | 'system';
  title: string;
  description: string;
  read: boolean;
  timestamp: string;
}

const mockNotifications: Notification[] = [
  { id: 'n-001', type: 'price_alert', title: 'Harga Cabai Merah Naik 18%', description: 'Harga cabai merah di Jawa Barat melonjak 18.4% dalam seminggu terakhir. Melebihi threshold alert.', read: false, timestamp: '2026-03-28T06:30:00' },
  { id: 'n-002', type: 'stock_alert', title: 'Stok Beras Kritis di Medan', description: 'Gudang Bulog Medan hanya memiliki 4.500 ton beras, di bawah minimum threshold 8.000 ton.', read: false, timestamp: '2026-03-28T06:00:00' },
  { id: 'n-003', type: 'order', title: 'Pesanan Baru Diterima', description: 'CV Maju Bersama memesan 500 kg Beras Premium. Total: Rp 6.750.000.', read: false, timestamp: '2026-03-27T10:00:00' },
  { id: 'n-004', type: 'harvest', title: 'Pengingat Jadwal Panen', description: 'Lahan Beras Premium (4.0 ha) di Subang memasuki estimasi waktu panen pada 1 Juli 2026.', read: true, timestamp: '2026-03-27T08:00:00' },
  { id: 'n-005', type: 'price_alert', title: 'Harga Beras Melebihi HET', description: 'Harga beras premium di DKI Jakarta mencapai Rp 16.200/kg, melebihi HET Rp 15.800/kg.', read: true, timestamp: '2026-03-26T12:00:00' },
  { id: 'n-006', type: 'system', title: 'Update Platform v2.1', description: 'Fitur AI Analytics kini tersedia dalam versi Beta. Coba prediksi harga dan deteksi anomali.', read: true, timestamp: '2026-03-25T09:00:00' },
  { id: 'n-007', type: 'stock_alert', title: 'Stok Gula Rendah di Jakarta', description: 'Stok gula pasir di Gudang Jakarta hanya 2.500 ton, di bawah threshold 5.000 ton.', read: true, timestamp: '2026-03-25T07:00:00' },
  { id: 'n-008', type: 'order', title: 'Pesanan Selesai', description: 'Pesanan #ord-001 dari CV Maju Bersama telah dikonfirmasi selesai. Rating: 5/5.', read: true, timestamp: '2026-03-25T14:00:00' },
  { id: 'n-009', type: 'harvest', title: 'Data Panen Flagged', description: 'Hasil panen Cabai Merah di Kab. Malang menunjukkan deviasi -29.2% dari estimasi. Perlu review.', read: true, timestamp: '2026-03-20T10:00:00' },
  { id: 'n-010', type: 'system', title: 'Maintenance Terjadwal', description: 'Sistem akan mengalami maintenance pada 5 April 2026 pukul 02:00-04:00 WIB.', read: true, timestamp: '2026-03-18T10:00:00' },
];

const ICONS: Record<string, React.ReactNode> = {
  price_alert: <TrendingUp className="h-4 w-4" />,
  stock_alert: <Package className="h-4 w-4" />,
  order: <ShoppingCart className="h-4 w-4" />,
  harvest: <AlertTriangle className="h-4 w-4" />,
  system: <Info className="h-4 w-4" />,
};

const COLORS: Record<string, string> = {
  price_alert: 'bg-red-100 text-red-600',
  stock_alert: 'bg-amber-100 text-amber-600',
  order: 'bg-blue-100 text-blue-600',
  harvest: 'bg-emerald-100 text-emerald-600',
  system: 'bg-violet-100 text-violet-600',
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [typeFilter, setTypeFilter] = useState('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const filtered = notifications.filter(n => typeFilter === 'all' || n.type === typeFilter);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Notifikasi</h1>
          <p className="text-sm text-muted mt-1">{unreadCount} belum dibaca</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" icon={<Check className="h-4 w-4" />} onClick={markAllRead}>
            Tandai Semua Dibaca
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto">
        <Filter className="h-4 w-4 text-muted shrink-0" />
        {[
          { key: 'all', label: 'Semua' },
          { key: 'price_alert', label: 'Harga' },
          { key: 'stock_alert', label: 'Stok' },
          { key: 'order', label: 'Order' },
          { key: 'harvest', label: 'Panen' },
          { key: 'system', label: 'Sistem' },
        ].map(f => (
          <button key={f.key} onClick={() => setTypeFilter(f.key)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${typeFilter === f.key ? 'bg-primary text-white' : 'bg-surface text-muted hover:bg-gray-100'}`}>
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(n => (
          <div key={n.id}
            className={`flex items-start gap-3 rounded-2xl border p-4 transition-all cursor-pointer hover:shadow-sm ${
              n.read ? 'border-border bg-card' : 'border-primary/30 bg-primary-bg/30'
            }`}
            onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${COLORS[n.type]}`}>
              {ICONS[n.type]}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-foreground">{n.title}</span>
                {!n.read && <div className="h-2 w-2 rounded-full bg-primary shrink-0" />}
              </div>
              <p className="text-xs text-muted line-clamp-2">{n.description}</p>
              <span className="text-[10px] text-muted mt-1 block">{formatTimeAgo(n.timestamp)}</span>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-muted">
            <Bell className="h-10 w-10 mb-3" />
            <p className="text-sm font-semibold">Tidak ada notifikasi</p>
          </div>
        )}
      </div>
    </div>
  );
}
