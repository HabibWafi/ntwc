import type { Role } from '@/types/auth';

export const ROLE_PERMISSIONS: Record<Role, string[]> = {
  superadmin: ['*'],
  gov_central: ['dashboard.national', 'dashboard.map', 'prices.view', 'prices.alerts', 'bulog.view', 'analytics', 'reports', 'admin.commodities', 'admin.audit'],
  gov_regional: ['dashboard.regional', 'dashboard.map', 'farm-data.manage', 'harvest.manage', 'prices.view', 'prices.input', 'prices.alerts', 'reports'],
  bulog: ['dashboard.bulog', 'dashboard.map', 'bulog.warehouses', 'bulog.stock', 'bulog.distributions', 'prices.view'],
  farmer: ['dashboard.farmer', 'farm-data.own', 'harvest.own', 'prices.view', 'marketplace.sell', 'orders.own'],
  distributor: ['dashboard.distributor', 'prices.view', 'marketplace.buy', 'orders.own'],
  consumer: ['dashboard.consumer', 'prices.view', 'marketplace.buy', 'orders.own'],
};

export function hasPermission(role: Role, permission: string): boolean {
  const perms = ROLE_PERMISSIONS[role];
  if (perms.includes('*')) return true;
  return perms.some(p => permission.startsWith(p));
}
