'use client';
import { Shield, Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { ROLE_PERMISSIONS } from '@/config/roles';
import { ROLE_LABELS } from '@/lib/constants';
import type { Role } from '@/types/auth';

const ROLES: Role[] = ['superadmin', 'gov_central', 'gov_regional', 'bulog', 'farmer', 'distributor', 'consumer'];

const ALL_PERMISSIONS = [
  'dashboard:view', 'map:view',
  'farm_data:view', 'farm_data:create', 'farm_data:edit',
  'harvest:view', 'harvest:verify',
  'price:view', 'price:input',
  'bulog:view', 'bulog:manage',
  'marketplace:view', 'marketplace:sell', 'marketplace:buy',
  'admin:users', 'admin:roles', 'admin:regions', 'admin:commodities', 'admin:audit',
  'reports:view', 'reports:generate',
];

export default function AdminRolesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Permissions Matrix</h1>
        <p className="text-sm text-muted mt-1">Hak akses per role</p>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase sticky left-0 bg-surface z-10">Permission</th>
                {ROLES.map(role => (
                  <th key={role} className="px-3 py-3 text-center text-xs font-semibold text-muted uppercase whitespace-nowrap">
                    {ROLE_LABELS[role]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_PERMISSIONS.map(perm => (
                <tr key={perm} className="border-b border-border last:border-0 hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-2.5 text-xs font-mono text-foreground sticky left-0 bg-card z-10">{perm}</td>
                  {ROLES.map(role => {
                    const has = ROLE_PERMISSIONS[role]?.includes(perm) || ROLE_PERMISSIONS[role]?.includes('*');
                    return (
                      <td key={role} className="px-3 py-2.5 text-center">
                        {has ? (
                          <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="h-4 w-4 text-gray-300 mx-auto" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs text-muted">
        <div className="flex items-center gap-1"><Shield className="h-3.5 w-3.5" /> {ROLES.length} roles</div>
        <div>{ALL_PERMISSIONS.length} permissions</div>
      </div>
    </div>
  );
}
