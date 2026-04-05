'use client';
import { useState } from 'react';
import { FileText, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { mockAuditLog } from '@/mock/data/audit-log';
import { ROLE_LABELS } from '@/lib/constants';
import { formatDate } from '@/lib/utils';

export default function AuditLogPage() {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('all');

  const filtered = mockAuditLog.filter(log => {
    const matchSearch = !search || log.userName.toLowerCase().includes(search.toLowerCase()) ||
      log.description.toLowerCase().includes(search.toLowerCase());
    const matchAction = actionFilter === 'all' || log.action === actionFilter;
    return matchSearch && matchAction;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Audit Log</h1>
        <p className="text-sm text-muted mt-1">{mockAuditLog.length} entri tercatat</p>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[200px] max-w-sm">
          <Input placeholder="Cari user atau deskripsi..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search className="h-4 w-4" />} />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted" />
          {['all', 'CREATE', 'UPDATE', 'DELETE'].map(a => (
            <button key={a} onClick={() => setActionFilter(a)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${actionFilter === a ? 'bg-primary text-white' : 'bg-surface text-muted hover:bg-gray-100'}`}>
              {a === 'all' ? 'Semua' : a}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Waktu</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">User</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">Action</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Entity</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Deskripsi</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">IP</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(log => (
                <tr key={log.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-muted whitespace-nowrap">{formatDate(log.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs font-semibold text-foreground">{log.userName}</div>
                    <div className="text-[10px] text-muted">
                      {ROLE_LABELS[log.userRole as keyof typeof ROLE_LABELS] || log.userRole}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={log.action === 'CREATE' ? 'success' : log.action === 'UPDATE' ? 'info' : 'danger'}>
                      {log.action}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted font-mono">{log.entityType}</td>
                  <td className="px-4 py-3 text-xs text-foreground max-w-[300px] truncate">{log.description}</td>
                  <td className="px-4 py-3 text-xs text-muted font-mono">{log.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted">
            <FileText className="h-8 w-8 mb-2" />
            <p className="text-sm">Tidak ada log ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
