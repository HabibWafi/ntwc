export interface SupplyDemandRegion {
  province: string;
  lat: number;
  lng: number;
  supply: number;
  demand: number;
  balance: number;
  status: 'surplus' | 'deficit' | 'balanced';
  topCommodity: string;
}

export interface MatchingRecommendation {
  id: string;
  from: string;
  to: string;
  commodity: string;
  volume: number;
  potentialSaving: string;
  confidence: number;
  priority: 'high' | 'medium';
}

export const supplyDemandRegions: SupplyDemandRegion[] = [
  { province: 'Jawa Barat', lat: -6.9, lng: 107.6, supply: 8500, demand: 12000, balance: -3500, status: 'deficit', topCommodity: 'Beras' },
  { province: 'Jawa Timur', lat: -7.5, lng: 112.7, supply: 15000, demand: 11000, balance: 4000, status: 'surplus', topCommodity: 'Jagung' },
  { province: 'Jawa Tengah', lat: -7.15, lng: 110.4, supply: 12000, demand: 11500, balance: 500, status: 'balanced', topCommodity: 'Beras' },
  { province: 'Sulawesi Selatan', lat: -3.67, lng: 119.97, supply: 9000, demand: 5000, balance: 4000, status: 'surplus', topCommodity: 'Jagung' },
  { province: 'Sumatera Utara', lat: 2.59, lng: 98.7, supply: 6000, demand: 8500, balance: -2500, status: 'deficit', topCommodity: 'Beras' },
  { province: 'NTB', lat: -8.65, lng: 117.36, supply: 4500, demand: 3000, balance: 1500, status: 'surplus', topCommodity: 'Bawang Merah' },
  { province: 'Bali', lat: -8.41, lng: 115.19, supply: 2000, demand: 3500, balance: -1500, status: 'deficit', topCommodity: 'Beras' },
  { province: 'Kalimantan Selatan', lat: -3.09, lng: 115.28, supply: 3500, demand: 4000, balance: -500, status: 'deficit', topCommodity: 'Beras' },
  { province: 'Lampung', lat: -4.27, lng: 104.73, supply: 7000, demand: 5500, balance: 1500, status: 'surplus', topCommodity: 'Jagung' },
  { province: 'Sumatera Barat', lat: -0.95, lng: 100.35, supply: 4000, demand: 4200, balance: -200, status: 'balanced', topCommodity: 'Beras' },
];

export const matchingRecommendations: MatchingRecommendation[] = [
  { id: 'm1', from: 'Jawa Timur', to: 'Jawa Barat', commodity: 'Beras', volume: 3500, potentialSaving: 'Rp 2.1M', confidence: 92, priority: 'high' },
  { id: 'm2', from: 'Sulawesi Selatan', to: 'Sumatera Utara', commodity: 'Jagung', volume: 2000, potentialSaving: 'Rp 1.8M', confidence: 87, priority: 'high' },
  { id: 'm3', from: 'NTB', to: 'Bali', commodity: 'Bawang Merah', volume: 1000, potentialSaving: 'Rp 850K', confidence: 78, priority: 'medium' },
  { id: 'm4', from: 'Lampung', to: 'Kalimantan Selatan', commodity: 'Jagung', volume: 1500, potentialSaving: 'Rp 1.2M', confidence: 81, priority: 'medium' },
];
