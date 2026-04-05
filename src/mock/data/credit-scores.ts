export interface CreditScore {
  farmerId: string;
  farmerName: string;
  score: number;
  risk: 'low' | 'medium' | 'high';
  factors: { name: string; impact: 'positive' | 'negative' | 'neutral'; value: string }[];
  recommendation: string;
  maxLoan: number;
}

export interface SubsidyData {
  totalBudget: number;
  distributed: number;
  beneficiaries: number;
  targetAccuracy: number;
  regions: { name: string; allocated: number; distributed: number; farmers: number }[];
}

export const creditScores: CreditScore[] = [
  {
    farmerId: 'usr-005', farmerName: 'Pak Suryanto', score: 82, risk: 'low',
    factors: [
      { name: 'Riwayat Panen', impact: 'positive', value: '3 tahun konsisten' },
      { name: 'Volume Transaksi', impact: 'positive', value: '156 transaksi' },
      { name: 'Cuaca Regional', impact: 'neutral', value: 'Normal' },
      { name: 'Diversifikasi', impact: 'positive', value: '2 komoditas' },
    ],
    recommendation: 'Layak untuk kredit hingga Rp 50 juta', maxLoan: 50000000,
  },
  {
    farmerId: 'f2', farmerName: 'Bu Wati Rahayu', score: 88, risk: 'low',
    factors: [
      { name: 'Riwayat Panen', impact: 'positive', value: '5 tahun konsisten' },
      { name: 'Volume Transaksi', impact: 'positive', value: '203 transaksi' },
      { name: 'Sertifikasi Organik', impact: 'positive', value: 'Tersertifikasi' },
      { name: 'Rating Pembeli', impact: 'positive', value: '4.9/5.0' },
    ],
    recommendation: 'Layak untuk kredit hingga Rp 75 juta', maxLoan: 75000000,
  },
  {
    farmerId: 'f3', farmerName: 'Pak Ahmad Fauzi', score: 75, risk: 'medium',
    factors: [
      { name: 'Riwayat Panen', impact: 'positive', value: '2 tahun' },
      { name: 'Volume Transaksi', impact: 'neutral', value: '89 transaksi' },
      { name: 'Cuaca Regional', impact: 'negative', value: 'Rawan kekeringan' },
      { name: 'Luas Lahan', impact: 'positive', value: '2.5 hektar' },
    ],
    recommendation: 'Layak untuk kredit hingga Rp 30 juta dengan jaminan', maxLoan: 30000000,
  },
  {
    farmerId: 'f4', farmerName: 'Ibu Sari Dewi', score: 68, risk: 'medium',
    factors: [
      { name: 'Riwayat Panen', impact: 'neutral', value: '1.5 tahun' },
      { name: 'Volume Transaksi', impact: 'negative', value: '45 transaksi' },
      { name: 'Verifikasi', impact: 'negative', value: 'Belum terverifikasi' },
      { name: 'Rating Pembeli', impact: 'positive', value: '4.3/5.0' },
    ],
    recommendation: 'Perlu verifikasi lebih lanjut sebelum kredit', maxLoan: 15000000,
  },
];

export const subsidyData: SubsidyData = {
  totalBudget: 15000000000,
  distributed: 8700000000,
  beneficiaries: 12500,
  targetAccuracy: 78,
  regions: [
    { name: 'Jawa Barat', allocated: 2500000000, distributed: 1800000000, farmers: 3200 },
    { name: 'Jawa Timur', allocated: 3000000000, distributed: 2100000000, farmers: 3800 },
    { name: 'Jawa Tengah', allocated: 2800000000, distributed: 2000000000, farmers: 3500 },
    { name: 'Sulawesi Selatan', allocated: 1500000000, distributed: 900000000, farmers: 1200 },
    { name: 'Sumatera Utara', allocated: 1200000000, distributed: 700000000, farmers: 800 },
  ],
};
