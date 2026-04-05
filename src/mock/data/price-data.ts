import type { PriceData, PriceHistory } from '@/types/price';

const BASE_PRICES: Record<string, number> = {
  'com-001': 14500, 'com-002': 12500, 'com-003': 6200, 'com-004': 11800,
  'com-005': 45000, 'com-006': 52000, 'com-007': 32000, 'com-008': 35000,
  'com-009': 17500, 'com-010': 18000,
};

const COMMODITY_NAMES: Record<string, { name: string; icon: string; het: number }> = {
  'com-001': { name: 'Beras Premium', icon: '🌾', het: 15800 },
  'com-002': { name: 'Beras Medium', icon: '🌾', het: 13500 },
  'com-003': { name: 'Jagung', icon: '🌽', het: 7000 },
  'com-004': { name: 'Kedelai', icon: '🫘', het: 13000 },
  'com-005': { name: 'Cabai Merah Keriting', icon: '🌶️', het: 55000 },
  'com-006': { name: 'Cabai Rawit', icon: '🌶️', het: 60000 },
  'com-007': { name: 'Bawang Merah', icon: '🧅', het: 38000 },
  'com-008': { name: 'Bawang Putih', icon: '🧄', het: 42000 },
  'com-009': { name: 'Gula Pasir', icon: '🍬', het: 19500 },
  'com-010': { name: 'Minyak Goreng', icon: '🫗', het: 20000 },
};

const KEY_PROVINCES = [
  { id: 'prov-32', name: 'Jawa Barat' }, { id: 'prov-33', name: 'Jawa Tengah' },
  { id: 'prov-35', name: 'Jawa Timur' }, { id: 'prov-73', name: 'Sulawesi Selatan' },
  { id: 'prov-12', name: 'Sumatera Utara' }, { id: 'prov-18', name: 'Lampung' },
  { id: 'prov-52', name: 'NTB' }, { id: 'prov-51', name: 'Bali' },
  { id: 'prov-63', name: 'Kalimantan Selatan' }, { id: 'prov-31', name: 'DKI Jakarta' },
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate current price data per commodity per province
export const mockCurrentPrices: PriceData[] = [];
let priceId = 1;
for (const prov of KEY_PROVINCES) {
  for (const [comId, base] of Object.entries(BASE_PRICES)) {
    const info = COMMODITY_NAMES[comId];
    const variation = (seededRandom(priceId * 7) - 0.5) * 0.15 * base;
    const price = Math.round(base + variation);
    const prevVariation = (seededRandom(priceId * 13) - 0.5) * 0.1 * base;
    const prevPrice = Math.round(base + prevVariation);
    const change = ((price - prevPrice) / prevPrice) * 100;
    mockCurrentPrices.push({
      id: `price-${String(priceId).padStart(3, '0')}`,
      commodityId: comId,
      commodityName: info.name,
      commodityIcon: info.icon,
      regionId: prov.id,
      regionName: prov.name,
      price,
      previousPrice: prevPrice,
      change: Math.round(change * 100) / 100,
      trend: change > 1 ? 'up' : change < -1 ? 'down' : 'stable',
      recordedDate: '2026-03-28',
      source: 'manual',
      exceedsHet: price > info.het,
    });
    priceId++;
  }
}

// Monthly price history for charts
export const mockPriceHistory: PriceHistory[] = [
  { date: 'Okt 2025', beras: 13200, jagung: 5800, kedelai: 10800, cabai: 35000, bawang: 28000, gula: 16800, minyak: 17200 },
  { date: 'Nov 2025', beras: 13500, jagung: 5900, kedelai: 11000, cabai: 32000, bawang: 30000, gula: 17000, minyak: 17500 },
  { date: 'Des 2025', beras: 13800, jagung: 6100, kedelai: 11200, cabai: 38000, bawang: 35000, gula: 17200, minyak: 17800 },
  { date: 'Jan 2026', beras: 14000, jagung: 6400, kedelai: 11500, cabai: 42000, bawang: 33000, gula: 17400, minyak: 18000 },
  { date: 'Feb 2026', beras: 14200, jagung: 6300, kedelai: 11600, cabai: 40000, bawang: 34000, gula: 17300, minyak: 17800 },
  { date: 'Mar 2026', beras: 14500, jagung: 6200, kedelai: 11800, cabai: 45000, bawang: 32000, gula: 17500, minyak: 18000 },
];

// Get latest prices grouped by commodity (national average)
export function getLatestPricesByCommodity() {
  const grouped: Record<string, { prices: number[]; info: PriceData }> = {};
  for (const p of mockCurrentPrices) {
    if (!grouped[p.commodityId]) {
      grouped[p.commodityId] = { prices: [], info: p };
    }
    grouped[p.commodityId].prices.push(p.price);
  }
  return Object.entries(grouped).map(([, { prices, info }]) => ({
    ...info,
    price: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
    regionName: 'Nasional',
  }));
}
