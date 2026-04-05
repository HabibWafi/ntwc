export interface DashboardStats {
  totalFarmers: number;
  activeFarmers: number;
  totalTransactions: number;
  transactionGrowth: number;
  avgCommodityPrice: number;
  priceChange: number;
  supplyDemandBalance: number;
  logisticsEfficiency: number;
  totalRegions: number;
  alertsToday: number;
  predictionAccuracy: number;
  wasteReduction: number;
}

export interface PricePrediction {
  commodity: string;
  icon: string;
  currentPrice: number;
  predicted7d: number;
  predicted30d: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}

export const dashboardStats: DashboardStats = {
  totalFarmers: 26500,
  activeFarmers: 18200,
  totalTransactions: 12450,
  transactionGrowth: 23.5,
  avgCommodityPrice: 18375,
  priceChange: 4.2,
  supplyDemandBalance: 72,
  logisticsEfficiency: 84.5,
  totalRegions: 34,
  alertsToday: 5,
  predictionAccuracy: 83.2,
  wasteReduction: 18.7,
};

export const pricePredictions: PricePrediction[] = [
  { commodity: 'Beras', icon: '🌾', currentPrice: 14500, predicted7d: 14800, predicted30d: 15200, confidence: 85, trend: 'up' },
  { commodity: 'Cabai Merah', icon: '🌶️', currentPrice: 45000, predicted7d: 48000, predicted30d: 42000, confidence: 72, trend: 'up' },
  { commodity: 'Bawang Merah', icon: '🧅', currentPrice: 32000, predicted7d: 30000, predicted30d: 28000, confidence: 79, trend: 'down' },
  { commodity: 'Jagung', icon: '🌽', currentPrice: 6200, predicted7d: 6100, predicted30d: 5900, confidence: 88, trend: 'down' },
  { commodity: 'Kedelai', icon: '🫘', currentPrice: 11800, predicted7d: 12000, predicted30d: 12500, confidence: 82, trend: 'up' },
];
