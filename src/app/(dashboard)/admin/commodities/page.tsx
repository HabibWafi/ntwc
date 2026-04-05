'use client';
import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { mockCommodities } from '@/mock/data/commodities';
import { formatCurrency } from '@/lib/utils';

export default function AdminCommoditiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Komoditas</h1>
        <p className="text-sm text-muted mt-1">{mockCommodities.length} komoditas terdaftar</p>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Komoditas</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Kategori</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Satuan</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">HET</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockCommodities.map(c => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{c.icon}</span>
                      <span className="text-xs font-semibold text-foreground">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted capitalize">{c.category}</td>
                  <td className="px-4 py-3 text-xs text-muted">{c.unit}</td>
                  <td className="px-4 py-3 text-xs font-bold text-foreground text-right">{formatCurrency(c.het)}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant="success">Aktif</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
