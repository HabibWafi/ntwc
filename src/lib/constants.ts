import type { Role } from '@/types/auth';
import type { CommodityCategory } from '@/types/commodity';

export const ROLES: { value: Role; label: string; description: string }[] = [
  { value: 'superadmin', label: 'Super Admin', description: 'Full system access' },
  { value: 'gov_central', label: 'Pemerintah Pusat', description: 'Kementan, Bapanas' },
  { value: 'gov_regional', label: 'Dinas Pertanian Daerah', description: 'Dinas tingkat provinsi/kabupaten' },
  { value: 'bulog', label: 'Bulog', description: 'Pengelola stok & distribusi' },
  { value: 'farmer', label: 'Petani', description: 'Pencatatan lahan & penjualan' },
  { value: 'distributor', label: 'Distributor', description: 'Pembelian & distribusi' },
  { value: 'consumer', label: 'Konsumen', description: 'Monitoring harga & pembelian' },
];

export const ROLE_LABELS: Record<Role, string> = {
  superadmin: 'Super Admin',
  gov_central: 'Pemerintah Pusat',
  gov_regional: 'Dinas Daerah',
  bulog: 'Bulog',
  farmer: 'Petani',
  distributor: 'Distributor',
  consumer: 'Konsumen',
};

export const COMMODITY_CATEGORIES: { value: CommodityCategory; label: string }[] = [
  { value: 'grain', label: 'Biji-bijian' },
  { value: 'vegetable', label: 'Sayuran' },
  { value: 'fruit', label: 'Buah-buahan' },
  { value: 'spice', label: 'Rempah' },
  { value: 'other', label: 'Lainnya' },
];

export const FARM_STATUS_OPTIONS = [
  { value: 'planted', label: 'Ditanam' },
  { value: 'growing', label: 'Bertumbuh' },
  { value: 'harvested', label: 'Dipanen' },
  { value: 'reported', label: 'Dilaporkan' },
];

export const ITEMS_PER_PAGE = 20;
export const AUTO_REFRESH_INTERVAL = 900000; // 15 minutes in ms
