import type { HarvestRecord } from '@/types/farm-data';

export const mockHarvestRecords: HarvestRecord[] = [
  { id: 'hr-001', farmDataId: 'fd-001', actualHarvest: 19.5, deviationPct: -7.1, flagged: false, notes: 'Panen normal, sedikit di bawah estimasi karena cuaca.', harvestDate: '2026-02-14', verifiedBy: 'usr-003', verifiedByName: 'Hj. Siti Aminah' },
  { id: 'hr-002', farmDataId: 'fd-002', actualHarvest: 13.2, deviationPct: -5.7, flagged: false, notes: 'Hasil cukup baik.', harvestDate: '2026-02-28', verifiedBy: 'usr-003', verifiedByName: 'Hj. Siti Aminah' },
  { id: 'hr-003', farmDataId: 'fd-004', actualHarvest: 8.5, deviationPct: -29.2, flagged: true, notes: 'Serangan hama ulat grayak menyebabkan penurunan hasil signifikan.', harvestDate: '2026-01-18', verifiedBy: undefined, verifiedByName: undefined },
  { id: 'hr-004', farmDataId: 'fd-006', actualHarvest: 33.0, deviationPct: 10.0, flagged: false, notes: 'Panen di atas estimasi, kondisi tanah sangat baik.', harvestDate: '2026-02-12', verifiedBy: 'usr-003', verifiedByName: 'Hj. Siti Aminah' },
  { id: 'hr-005', farmDataId: 'fd-008', actualHarvest: 28.5, deviationPct: -5.0, flagged: false, notes: 'Sedikit di bawah target, normal.', harvestDate: '2026-02-08', verifiedBy: 'usr-003', verifiedByName: 'Hj. Siti Aminah' },
  { id: 'hr-006', farmDataId: 'fd-009', actualHarvest: 6.8, deviationPct: -24.4, flagged: true, notes: 'Kekeringan di awal musim mempengaruhi pertumbuhan.', harvestDate: '2026-03-18' },
  { id: 'hr-007', farmDataId: 'fd-010', actualHarvest: 31.0, deviationPct: 10.7, flagged: false, notes: 'Hasil panen sangat baik, curah hujan optimal.', harvestDate: '2026-02-23' },
  { id: 'hr-008', farmDataId: 'fd-012', actualHarvest: 52.0, deviationPct: 8.3, flagged: false, notes: 'Panen di atas estimasi.', harvestDate: '2026-02-04', verifiedBy: 'usr-003', verifiedByName: 'Hj. Siti Aminah' },
  { id: 'hr-009', farmDataId: 'fd-013', actualHarvest: 35.0, deviationPct: -16.7, flagged: false, notes: 'Banjir di sebagian lahan menyebabkan gagal panen parsial.', harvestDate: '2026-03-08' },
  { id: 'hr-010', farmDataId: 'fd-014', actualHarvest: 28.0, deviationPct: -22.2, flagged: true, notes: 'Serangan penyakit moler pada bawang merah.', harvestDate: '2026-03-08' },
  { id: 'hr-011', farmDataId: 'fd-015', actualHarvest: 58.0, deviationPct: 5.5, flagged: false, notes: 'Produksi sesuai harapan.', harvestDate: '2026-01-30', verifiedBy: 'usr-003', verifiedByName: 'Hj. Siti Aminah' },
  { id: 'hr-012', farmDataId: 'fd-016', actualHarvest: 53.0, deviationPct: 8.2, flagged: false, notes: 'Cuaca mendukung pertumbuhan optimal.', harvestDate: '2026-03-03' },
  { id: 'hr-013', farmDataId: 'fd-020', actualHarvest: 22.0, deviationPct: -33.3, flagged: true, notes: 'Banjir rob merendam sawah selama 2 minggu.', harvestDate: '2026-02-18' },
  { id: 'hr-014', farmDataId: 'fd-003', actualHarvest: 0, deviationPct: 0, flagged: false, notes: 'Belum panen - masih dalam masa tanam.', harvestDate: '' },
];
