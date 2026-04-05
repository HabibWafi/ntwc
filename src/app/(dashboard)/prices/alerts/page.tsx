'use client';
import { useState } from 'react';
import { ArrowLeft, Bell, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockAlerts } from '@/mock/data/alerts';
import { formatTimeAgo, getStatusColor } from '@/lib/utils';
import Link from 'next/link';

export default function PriceAlertsPage() {
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = mockAlerts.filter(a => {
    const matchSeverity = severityFilter === 'all' || a.severity === severityFilter;
    const matchStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchSeverity && matchStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/prices">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>Kembali</Button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Alert & Peringatan</h1>
          <p className="text-sm text-muted mt-1">{mockAlerts.length} alert tercatat</p>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted" />
          <span className="text-xs text-muted">Severity:</span>
          {['all', 'high', 'medium', 'low'].map(s => (
            <button key={s} onClick={() => setSeverityFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${severityFilter === s ? 'bg-primary text-white' : 'bg-surface text-muted hover:bg-gray-100'}`}>
              {s === 'all' ? 'Semua' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">Status:</span>
          {['all', 'open', 'investigating', 'resolved'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${statusFilter === s ? 'bg-primary text-white' : 'bg-surface text-muted hover:bg-gray-100'}`}>
              {s === 'all' ? 'Semua' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map(alert => (
          <div key={alert.id} className={`rounded-2xl border p-5 transition-all hover:shadow-sm ${
            alert.severity === 'high' ? 'border-red-200 bg-red-50/30' :
            alert.severity === 'medium' ? 'border-amber-200 bg-amber-50/30' :
            'border-border bg-card'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`mt-1 h-3 w-3 rounded-full shrink-0 ${
                alert.severity === 'high' ? 'bg-red-500' : alert.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="text-sm font-bold text-foreground">{alert.title}</h3>
                  <span className="text-[10px] text-muted shrink-0">{formatTimeAgo(alert.detectedAt)}</span>
                </div>
                <p className="text-xs text-muted mb-3">{alert.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant={getStatusColor(alert.severity) as 'danger' | 'warning' | 'info'}>{alert.severity}</Badge>
                  <Badge variant={getStatusColor(alert.status) as 'danger' | 'warning' | 'success' | 'neutral'}>{alert.status}</Badge>
                  <Badge variant="neutral">{alert.type.replace('_', ' ')}</Badge>
                  {alert.regionName && <span className="text-[10px] text-muted">📍 {alert.regionName}</span>}
                  {alert.commodityName && <span className="text-[10px] text-muted">🌾 {alert.commodityName}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted">
            <Bell className="h-8 w-8 mb-2" />
            <p className="text-sm">Tidak ada alert ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
