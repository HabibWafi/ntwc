import type { BulogWarehouse } from '@/types/bulog';

export const mockWarehouses: BulogWarehouse[] = [
  { id: 'wh-001', name: 'Gudang Bulog Subang', regionId: 'reg-3211', regionName: 'Kab. Subang', capacity: 25000, location: { lat: -6.57, lng: 107.75 }, address: 'Jl. Raya Subang No. 15' },
  { id: 'wh-002', name: 'Gudang Bulog Karawang', regionId: 'reg-3213', regionName: 'Kab. Karawang', capacity: 30000, location: { lat: -6.32, lng: 107.34 }, address: 'Jl. Industri Karawang' },
  { id: 'wh-003', name: 'Gudang Bulog Indramayu', regionId: 'reg-3215', regionName: 'Kab. Indramayu', capacity: 20000, location: { lat: -6.33, lng: 108.32 }, address: 'Jl. Raya Indramayu' },
  { id: 'wh-004', name: 'Gudang Bulog Cirebon', regionId: 'reg-3209', regionName: 'Kab. Cirebon', capacity: 35000, location: { lat: -6.71, lng: 108.55 }, address: 'Jl. Bypass Cirebon' },
  { id: 'wh-005', name: 'Gudang Bulog Surabaya', regionId: 'prov-35', regionName: 'Jawa Timur', capacity: 50000, location: { lat: -7.25, lng: 112.75 }, address: 'Jl. Perak Barat, Surabaya' },
  { id: 'wh-006', name: 'Gudang Bulog Malang', regionId: 'reg-3501', regionName: 'Kab. Malang', capacity: 20000, location: { lat: -7.98, lng: 112.63 }, address: 'Jl. Raya Malang' },
  { id: 'wh-007', name: 'Gudang Bulog Semarang', regionId: 'prov-33', regionName: 'Jawa Tengah', capacity: 40000, location: { lat: -6.97, lng: 110.42 }, address: 'Jl. Pelabuhan Semarang' },
  { id: 'wh-008', name: 'Gudang Bulog Klaten', regionId: 'reg-3301', regionName: 'Kab. Klaten', capacity: 15000, location: { lat: -7.70, lng: 110.60 }, address: 'Jl. Raya Solo-Jogja' },
  { id: 'wh-009', name: 'Gudang Bulog Makassar', regionId: 'prov-73', regionName: 'Sulawesi Selatan', capacity: 30000, location: { lat: -5.14, lng: 119.42 }, address: 'Jl. Pelabuhan Makassar' },
  { id: 'wh-010', name: 'Gudang Bulog Medan', regionId: 'prov-12', regionName: 'Sumatera Utara', capacity: 35000, location: { lat: 3.59, lng: 98.67 }, address: 'Jl. Gatot Subroto, Medan' },
  { id: 'wh-011', name: 'Gudang Bulog Lampung', regionId: 'prov-18', regionName: 'Lampung', capacity: 25000, location: { lat: -5.45, lng: 105.26 }, address: 'Jl. Raden Intan, Bandar Lampung' },
  { id: 'wh-012', name: 'Gudang Bulog Jakarta', regionId: 'prov-31', regionName: 'DKI Jakarta', capacity: 45000, location: { lat: -6.12, lng: 106.88 }, address: 'Jl. Tanjung Priok, Jakarta Utara' },
  { id: 'wh-013', name: 'Gudang Bulog Bandung', regionId: 'reg-3204', regionName: 'Kab. Bandung', capacity: 20000, location: { lat: -6.91, lng: 107.61 }, address: 'Jl. Asia Afrika, Bandung' },
  { id: 'wh-014', name: 'Gudang Bulog Denpasar', regionId: 'prov-51', regionName: 'Bali', capacity: 15000, location: { lat: -8.65, lng: 115.22 }, address: 'Jl. Cargo, Denpasar' },
  { id: 'wh-015', name: 'Gudang Bulog Mataram', regionId: 'prov-52', regionName: 'NTB', capacity: 12000, location: { lat: -8.58, lng: 116.10 }, address: 'Jl. Adi Sucipto, Mataram' },
];
