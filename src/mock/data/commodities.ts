import type { Commodity } from '@/types/commodity';

export const mockCommodities: Commodity[] = [
  { id: 'com-001', name: 'Beras Premium', icon: '🌾', category: 'grain', unit: 'kg', het: 15800 },
  { id: 'com-002', name: 'Beras Medium', icon: '🌾', category: 'grain', unit: 'kg', het: 13500 },
  { id: 'com-003', name: 'Jagung', icon: '🌽', category: 'grain', unit: 'kg', het: 7000 },
  { id: 'com-004', name: 'Kedelai', icon: '🫘', category: 'grain', unit: 'kg', het: 13000 },
  { id: 'com-005', name: 'Cabai Merah Keriting', icon: '🌶️', category: 'vegetable', unit: 'kg', het: 55000 },
  { id: 'com-006', name: 'Cabai Rawit', icon: '🌶️', category: 'vegetable', unit: 'kg', het: 60000 },
  { id: 'com-007', name: 'Bawang Merah', icon: '🧅', category: 'spice', unit: 'kg', het: 38000 },
  { id: 'com-008', name: 'Bawang Putih', icon: '🧄', category: 'spice', unit: 'kg', het: 42000 },
  { id: 'com-009', name: 'Gula Pasir', icon: '🍬', category: 'other', unit: 'kg', het: 19500 },
  { id: 'com-010', name: 'Minyak Goreng', icon: '🫗', category: 'other', unit: 'liter', het: 20000 },
];

export function getCommodityById(id: string): Commodity | undefined {
  return mockCommodities.find(c => c.id === id);
}
