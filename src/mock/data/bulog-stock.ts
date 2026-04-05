import type { BulogStock } from '@/types/bulog';

export const mockBulogStock: BulogStock[] = [
  { id: 'bs-001', warehouseId: 'wh-001', warehouseName: 'Gudang Bulog Subang', commodityId: 'com-001', commodityName: 'Beras Premium', currentStock: 18000, minThreshold: 5000, capacityPct: 72, lastUpdated: '2026-03-28T10:00:00' },
  { id: 'bs-002', warehouseId: 'wh-001', warehouseName: 'Gudang Bulog Subang', commodityId: 'com-003', commodityName: 'Jagung', currentStock: 3500, minThreshold: 2000, capacityPct: 14, lastUpdated: '2026-03-28T10:00:00' },
  { id: 'bs-003', warehouseId: 'wh-002', warehouseName: 'Gudang Bulog Karawang', commodityId: 'com-001', commodityName: 'Beras Premium', currentStock: 22000, minThreshold: 8000, capacityPct: 73, lastUpdated: '2026-03-27T14:00:00' },
  { id: 'bs-004', warehouseId: 'wh-002', warehouseName: 'Gudang Bulog Karawang', commodityId: 'com-002', commodityName: 'Beras Medium', currentStock: 5000, minThreshold: 3000, capacityPct: 17, lastUpdated: '2026-03-27T14:00:00' },
  { id: 'bs-005', warehouseId: 'wh-005', warehouseName: 'Gudang Bulog Surabaya', commodityId: 'com-001', commodityName: 'Beras Premium', currentStock: 35000, minThreshold: 10000, capacityPct: 70, lastUpdated: '2026-03-28T08:00:00' },
  { id: 'bs-006', warehouseId: 'wh-005', warehouseName: 'Gudang Bulog Surabaya', commodityId: 'com-003', commodityName: 'Jagung', currentStock: 8000, minThreshold: 5000, capacityPct: 16, lastUpdated: '2026-03-28T08:00:00' },
  { id: 'bs-007', warehouseId: 'wh-007', warehouseName: 'Gudang Bulog Semarang', commodityId: 'com-001', commodityName: 'Beras Premium', currentStock: 28000, minThreshold: 8000, capacityPct: 70, lastUpdated: '2026-03-27T16:00:00' },
  { id: 'bs-008', warehouseId: 'wh-009', warehouseName: 'Gudang Bulog Makassar', commodityId: 'com-003', commodityName: 'Jagung', currentStock: 15000, minThreshold: 5000, capacityPct: 50, lastUpdated: '2026-03-26T12:00:00' },
  { id: 'bs-009', warehouseId: 'wh-010', warehouseName: 'Gudang Bulog Medan', commodityId: 'com-001', commodityName: 'Beras Premium', currentStock: 4500, minThreshold: 8000, capacityPct: 13, lastUpdated: '2026-03-28T06:00:00' },
  { id: 'bs-010', warehouseId: 'wh-011', warehouseName: 'Gudang Bulog Lampung', commodityId: 'com-003', commodityName: 'Jagung', currentStock: 12000, minThreshold: 5000, capacityPct: 48, lastUpdated: '2026-03-27T10:00:00' },
  { id: 'bs-011', warehouseId: 'wh-012', warehouseName: 'Gudang Bulog Jakarta', commodityId: 'com-001', commodityName: 'Beras Premium', currentStock: 30000, minThreshold: 15000, capacityPct: 67, lastUpdated: '2026-03-28T12:00:00' },
  { id: 'bs-012', warehouseId: 'wh-012', warehouseName: 'Gudang Bulog Jakarta', commodityId: 'com-009', commodityName: 'Gula Pasir', currentStock: 2500, minThreshold: 5000, capacityPct: 6, lastUpdated: '2026-03-28T12:00:00' },
  { id: 'bs-013', warehouseId: 'wh-014', warehouseName: 'Gudang Bulog Denpasar', commodityId: 'com-001', commodityName: 'Beras Premium', currentStock: 3000, minThreshold: 4000, capacityPct: 20, lastUpdated: '2026-03-26T09:00:00' },
  { id: 'bs-014', warehouseId: 'wh-015', warehouseName: 'Gudang Bulog Mataram', commodityId: 'com-007', commodityName: 'Bawang Merah', currentStock: 6000, minThreshold: 2000, capacityPct: 50, lastUpdated: '2026-03-27T11:00:00' },
];

export function getLowStockItems() {
  return mockBulogStock.filter(s => s.currentStock < s.minThreshold);
}
