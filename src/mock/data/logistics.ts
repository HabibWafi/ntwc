export interface LogisticsRoute {
  id: string;
  from: string;
  to: string;
  commodity: string;
  volume: number;
  distance: number;
  estimatedTime: string;
  status: 'in-transit' | 'delivered' | 'pending' | 'delayed';
  driver: string;
  costSaved: number;
}

export const logisticsRoutes: LogisticsRoute[] = [
  { id: 'LG-001', from: 'Subang, Jawa Barat', to: 'Jakarta Pusat', commodity: 'Beras', volume: 5000, distance: 120, estimatedTime: '4 jam', status: 'in-transit', driver: 'Supardi', costSaved: 450000 },
  { id: 'LG-002', from: 'Malang, Jawa Timur', to: 'Surabaya', commodity: 'Cabai Merah', volume: 2000, distance: 95, estimatedTime: '3 jam', status: 'delivered', driver: 'Rudi Hartono', costSaved: 320000 },
  { id: 'LG-003', from: 'Klaten, Jawa Tengah', to: 'Semarang', commodity: 'Jagung', volume: 3000, distance: 110, estimatedTime: '3.5 jam', status: 'in-transit', driver: 'Dedi Prasetyo', costSaved: 280000 },
  { id: 'LG-004', from: 'Bone, Sulsel', to: 'Makassar', commodity: 'Kedelai', volume: 1500, distance: 175, estimatedTime: '6 jam', status: 'pending', driver: 'Andi Mappesona', costSaved: 0 },
  { id: 'LG-005', from: 'Lombok, NTB', to: 'Denpasar, Bali', commodity: 'Bawang Merah', volume: 1000, distance: 200, estimatedTime: '8 jam', status: 'delayed', driver: 'I Made Surya', costSaved: 150000 },
  { id: 'LG-006', from: 'Lampung', to: 'Palembang', commodity: 'Jagung', volume: 4000, distance: 280, estimatedTime: '7 jam', status: 'in-transit', driver: 'Hengki Irawan', costSaved: 520000 },
];
