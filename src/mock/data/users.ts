import type { User } from '@/types/auth';

export const mockUsers: User[] = [
  {
    id: 'usr-001', nik: '3200000000000001', name: 'Admin Sistem', email: 'superadmin@ntwc.go.id',
    phone: '081200000001', status: 'active', role: 'superadmin', permissions: ['*'],
    createdAt: '2026-01-01T00:00:00', updatedAt: '2026-01-01T00:00:00',
  },
  {
    id: 'usr-002', nik: '3200000000000002', name: 'Dr. Ir. Budi Santoso', email: 'pusat@kementan.go.id',
    phone: '081200000002', status: 'active', role: 'gov_central', permissions: ['dashboard.national', 'reports', 'analytics', 'admin.commodities'],
    createdAt: '2026-01-05T00:00:00', updatedAt: '2026-01-05T00:00:00',
  },
  {
    id: 'usr-003', nik: '3200000000000003', name: 'Hj. Siti Aminah', email: 'dinas@jabar.go.id',
    phone: '081200000003', status: 'active', role: 'gov_regional', regionId: 'prov-32', regionName: 'Jawa Barat',
    permissions: ['dashboard.regional', 'farm-data', 'prices.input', 'reports'],
    createdAt: '2026-01-10T00:00:00', updatedAt: '2026-01-10T00:00:00',
  },
  {
    id: 'usr-004', nik: '3200000000000004', name: 'Ir. Rahman Hakim', email: 'bulog@bulog.co.id',
    phone: '081200000004', status: 'active', role: 'bulog', permissions: ['bulog.warehouses', 'bulog.stock', 'bulog.distributions'],
    createdAt: '2026-01-15T00:00:00', updatedAt: '2026-01-15T00:00:00',
  },
  {
    id: 'usr-005', nik: '3204112504680001', name: 'Pak Suryanto', email: 'suryanto@petani.id',
    phone: '081200000005', status: 'active', role: 'farmer', regionId: 'reg-3211', regionName: 'Kab. Subang, Jawa Barat',
    permissions: ['farm-data.own', 'marketplace.sell', 'prices.view'],
    createdAt: '2026-02-01T00:00:00', updatedAt: '2026-02-01T00:00:00',
  },
  {
    id: 'usr-006', nik: '3200000000000006', name: 'PT Agri Nusantara', email: 'distribusi@agri.co.id',
    phone: '081200000006', status: 'active', role: 'distributor', permissions: ['marketplace.buy', 'orders', 'prices.view'],
    createdAt: '2026-02-10T00:00:00', updatedAt: '2026-02-10T00:00:00',
  },
  {
    id: 'usr-007', nik: '3200000000000007', name: 'Rina Puspita', email: 'konsumen@email.com',
    phone: '081200000007', status: 'active', role: 'consumer', permissions: ['marketplace.buy', 'prices.view'],
    createdAt: '2026-03-01T00:00:00', updatedAt: '2026-03-01T00:00:00',
  },
];

export const DEMO_PASSWORD = 'demo123';
