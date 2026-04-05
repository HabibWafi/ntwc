'use client';
import { useState } from 'react';
import { Users, Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { mockUsers } from '@/mock/data/users';
import { ROLE_LABELS } from '@/lib/constants';
import { formatDate, getStatusColor } from '@/lib/utils';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');

  const filtered = mockUsers.filter(u =>
    !search || u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Manajemen Pengguna</h1>
        <p className="text-sm text-muted mt-1">{mockUsers.length} pengguna terdaftar</p>
      </div>

      <div className="max-w-sm">
        <Input placeholder="Cari nama atau email..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search className="h-4 w-4" />} />
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Pengguna</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Email</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Region</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Terdaftar</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 text-xs font-bold text-primary">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-foreground">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">{user.email}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={
                      user.role === 'superadmin' ? 'danger' :
                      user.role === 'gov_central' ? 'purple' :
                      user.role === 'gov_regional' ? 'info' :
                      user.role === 'bulog' ? 'warning' :
                      user.role === 'farmer' ? 'success' : 'neutral'
                    }>
                      {ROLE_LABELS[user.role]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">{user.regionName || '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={getStatusColor(user.status) as 'success' | 'warning' | 'danger'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted">{formatDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted">
            <Users className="h-8 w-8 mb-2" />
            <p className="text-sm">Pengguna tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
