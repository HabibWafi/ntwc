export interface AuditLogEntry {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  entityType: string;
  entityId: string;
  description: string;
  ipAddress: string;
  createdAt: string;
}

export const mockAuditLog: AuditLogEntry[] = [
  { id: 'log-001', userId: 'usr-005', userName: 'Pak Suryanto', userRole: 'farmer', action: 'CREATE', entityType: 'farm_data', entityId: 'fd-003', description: 'Menambah data pertanian: Beras Premium, 4.0 ha', ipAddress: '103.28.12.45', createdAt: '2026-03-01T08:15:00' },
  { id: 'log-002', userId: 'usr-003', userName: 'Hj. Siti Aminah', userRole: 'gov_regional', action: 'UPDATE', entityType: 'price_data', entityId: 'price-012', description: 'Update harga Cabai Merah Keriting: Rp 45.000/kg', ipAddress: '182.253.67.12', createdAt: '2026-03-28T09:30:00' },
  { id: 'log-003', userId: 'usr-004', userName: 'Ir. Rahman Hakim', userRole: 'bulog', action: 'CREATE', entityType: 'distribution', entityId: 'dist-001', description: 'Distribusi Beras Premium 5.000 ton ke Bali', ipAddress: '36.72.89.156', createdAt: '2026-03-25T08:00:00' },
  { id: 'log-004', userId: 'usr-001', userName: 'Admin Sistem', userRole: 'superadmin', action: 'UPDATE', entityType: 'user', entityId: 'usr-005', description: 'Verifikasi akun Pak Suryanto', ipAddress: '10.0.0.1', createdAt: '2026-02-01T10:00:00' },
  { id: 'log-005', userId: 'usr-003', userName: 'Hj. Siti Aminah', userRole: 'gov_regional', action: 'UPDATE', entityType: 'harvest_record', entityId: 'hr-001', description: 'Verifikasi hasil panen fd-001: 19.5 ton', ipAddress: '182.253.67.12', createdAt: '2026-02-15T14:00:00' },
  { id: 'log-006', userId: 'usr-004', userName: 'Ir. Rahman Hakim', userRole: 'bulog', action: 'UPDATE', entityType: 'bulog_stock', entityId: 'bs-005', description: 'Update stok Gudang Surabaya: +5.000 ton beras', ipAddress: '36.72.89.156', createdAt: '2026-03-14T13:30:00' },
  { id: 'log-007', userId: 'usr-002', userName: 'Dr. Ir. Budi Santoso', userRole: 'gov_central', action: 'CREATE', entityType: 'report', entityId: 'rpt-001', description: 'Generate laporan ketahanan pangan nasional Q1 2026', ipAddress: '114.4.35.78', createdAt: '2026-03-20T16:00:00' },
  { id: 'log-008', userId: 'usr-001', userName: 'Admin Sistem', userRole: 'superadmin', action: 'CREATE', entityType: 'commodity', entityId: 'com-010', description: 'Menambah komoditas: Minyak Goreng', ipAddress: '10.0.0.1', createdAt: '2026-01-15T11:00:00' },
  { id: 'log-009', userId: 'f2', userName: 'Bu Wati Rahayu', userRole: 'farmer', action: 'CREATE', entityType: 'farm_data', entityId: 'fd-005', description: 'Menambah data pertanian: Cabai Merah, 2.0 ha', ipAddress: '103.28.56.78', createdAt: '2026-02-01T08:00:00' },
  { id: 'log-010', userId: 'usr-003', userName: 'Hj. Siti Aminah', userRole: 'gov_regional', action: 'CREATE', entityType: 'price_data', entityId: 'price-089', description: 'Input harga harian untuk 10 komoditas di Jawa Barat', ipAddress: '182.253.67.12', createdAt: '2026-03-27T08:00:00' },
];
