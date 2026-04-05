'use client';
import { Shield, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2, BarChart3 } from 'lucide-react';
import { StatCard, InfoCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SimpleBarChart } from '@/components/charts/SimpleBarChart';
import { DonutChart } from '@/components/charts/DonutChart';

interface ProvinceScore {
  name: string;
  score: number;
  status: 'aman' | 'waspada' | 'kritis';
  production: number;
  consumption: number;
  stockDays: number;
}

const provinceScores: ProvinceScore[] = [
  { name: 'Jawa Barat', score: 82, status: 'aman', production: 12500, consumption: 11000, stockDays: 45 },
  { name: 'Jawa Tengah', score: 88, status: 'aman', production: 11800, consumption: 9500, stockDays: 52 },
  { name: 'Jawa Timur', score: 85, status: 'aman', production: 13200, consumption: 11500, stockDays: 48 },
  { name: 'Sulawesi Selatan', score: 78, status: 'aman', production: 5600, consumption: 4200, stockDays: 38 },
  { name: 'Sumatera Utara', score: 52, status: 'waspada', production: 4200, consumption: 5800, stockDays: 15 },
  { name: 'DKI Jakarta', score: 45, status: 'kritis', production: 0, consumption: 8500, stockDays: 12 },
  { name: 'Lampung', score: 75, status: 'aman', production: 3800, consumption: 3200, stockDays: 35 },
  { name: 'NTB', score: 72, status: 'aman', production: 2100, consumption: 1800, stockDays: 32 },
  { name: 'Bali', score: 58, status: 'waspada', production: 900, consumption: 2200, stockDays: 18 },
  { name: 'Kalimantan Selatan', score: 68, status: 'waspada', production: 2800, consumption: 2500, stockDays: 25 },
];

const commodityIndex = [
  { commodity: 'Beras', icon: '🌾', ratio: 1.12, status: 'surplus', recommendation: 'Potensi ekspor ke ASEAN' },
  { commodity: 'Jagung', icon: '🌽', ratio: 1.08, status: 'surplus', recommendation: 'Stok memadai untuk industri pakan' },
  { commodity: 'Kedelai', icon: '🫘', ratio: 0.65, status: 'defisit', recommendation: 'Impor 400 ribu ton diperlukan' },
  { commodity: 'Cabai', icon: '🌶️', ratio: 0.95, status: 'balanced', recommendation: 'Antisipasi penurunan produksi musim hujan' },
  { commodity: 'Bawang Merah', icon: '🧅', ratio: 1.05, status: 'surplus', recommendation: 'Stabilkan harga di daerah defisit' },
  { commodity: 'Gula', icon: '🍬', ratio: 0.82, status: 'defisit', recommendation: 'Operasi pasar dan impor tambahan' },
  { commodity: 'Minyak Goreng', icon: '🫗', ratio: 0.92, status: 'balanced', recommendation: 'Monitor harga CPO internasional' },
];

export default function FoodSecurityPage() {
  const nationalScore = Math.round(provinceScores.reduce((s, p) => s + p.score, 0) / provinceScores.length);
  const amanCount = provinceScores.filter(p => p.status === 'aman').length;
  const waspadaCount = provinceScores.filter(p => p.status === 'waspada').length;
  const kritisCount = provinceScores.filter(p => p.status === 'kritis').length;

  const statusDonut = [
    { name: 'Aman', value: amanCount, color: '#047857' },
    { name: 'Waspada', value: waspadaCount, color: '#F59E0B' },
    { name: 'Kritis', value: kritisCount, color: '#EF4444' },
  ];

  const scoreBarData = provinceScores
    .sort((a, b) => b.score - a.score)
    .map(p => ({
      name: p.name,
      value: p.score,
      fill: p.status === 'aman' ? '#047857' : p.status === 'waspada' ? '#F59E0B' : '#EF4444',
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-foreground">Skor Ketahanan Pangan</h1>
        <p className="text-sm text-muted mt-1">Evaluasi ketahanan pangan nasional berdasarkan produksi, konsumsi, dan stok</p>
      </div>

      {/* National Score */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-border bg-card p-6 text-center col-span-1">
          <div className="text-xs text-muted uppercase font-semibold mb-2">Skor Nasional</div>
          <div className={`text-5xl font-extrabold ${nationalScore >= 70 ? 'text-emerald-600' : nationalScore >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
            {nationalScore}
          </div>
          <div className="text-xs text-muted mt-1">dari 100</div>
          <Badge variant={nationalScore >= 70 ? 'success' : nationalScore >= 50 ? 'warning' : 'danger'} className="mt-2">
            {nationalScore >= 70 ? 'AMAN' : nationalScore >= 50 ? 'WASPADA' : 'KRITIS'}
          </Badge>
        </div>
        <StatCard title="Provinsi Aman" value={amanCount} icon={<CheckCircle2 className="h-5 w-5" />} subtitle="Skor > 70" gradient="from-emerald-500 to-emerald-400" />
        <StatCard title="Provinsi Waspada" value={waspadaCount} icon={<AlertTriangle className="h-5 w-5" />} subtitle="Skor 50-70" gradient="from-amber-500 to-amber-400" />
        <StatCard title="Provinsi Kritis" value={kritisCount} icon={<AlertTriangle className="h-5 w-5" />} subtitle="Skor < 50" gradient="from-red-500 to-red-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard title="Skor per Provinsi" description="Peringkat ketahanan pangan" icon={<BarChart3 className="h-4 w-4" />} className="lg:col-span-2">
          <SimpleBarChart data={scoreBarData} height={320} layout="vertical" />
        </InfoCard>

        <InfoCard title="Distribusi Status" icon={<Shield className="h-4 w-4" />}>
          <DonutChart data={statusDonut} height={200} innerLabel="Provinsi" />
          <div className="mt-3 space-y-2">
            {statusDonut.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-muted">{s.name}</span>
                </div>
                <span className="font-semibold text-foreground">{s.value} provinsi</span>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* Commodity Index */}
      <InfoCard title="Indeks Ketahanan per Komoditas" description="Rasio produksi vs konsumsi nasional" icon={<TrendingUp className="h-4 w-4" />}>
        <div className="space-y-3">
          {commodityIndex.map(c => (
            <div key={c.commodity} className="flex items-center justify-between rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{c.icon}</span>
                <div>
                  <div className="text-sm font-bold text-foreground">{c.commodity}</div>
                  <p className="text-xs text-muted">{c.recommendation}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="flex items-center gap-1.5 justify-end">
                  {c.ratio >= 1 ? <TrendingUp className="h-4 w-4 text-emerald-500" /> : c.ratio >= 0.9 ? <Minus className="h-4 w-4 text-amber-500" /> : <TrendingDown className="h-4 w-4 text-red-500" />}
                  <span className="text-lg font-extrabold text-foreground">{c.ratio.toFixed(2)}</span>
                </div>
                <Badge variant={c.status === 'surplus' ? 'success' : c.status === 'defisit' ? 'danger' : 'warning'}>
                  {c.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Province Details */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-bold text-foreground">Detail per Provinsi</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase">Provinsi</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">Skor</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Produksi</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Konsumsi</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted uppercase">Stok (hari)</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {provinceScores.sort((a, b) => b.score - a.score).map(p => (
                <tr key={p.name} className="border-b border-border last:border-0 hover:bg-surface/50">
                  <td className="px-4 py-3 text-xs font-semibold text-foreground">{p.name}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`text-sm font-extrabold ${p.score >= 70 ? 'text-emerald-600' : p.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                      {p.score}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-foreground text-right">{p.production.toLocaleString()} ton</td>
                  <td className="px-4 py-3 text-xs text-foreground text-right">{p.consumption.toLocaleString()} ton</td>
                  <td className="px-4 py-3 text-xs text-foreground text-right">{p.stockDays} hari</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={p.status === 'aman' ? 'success' : p.status === 'waspada' ? 'warning' : 'danger'}>
                      {p.status.toUpperCase()}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
