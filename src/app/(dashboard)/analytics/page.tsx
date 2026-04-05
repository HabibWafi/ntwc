'use client';
import { Brain, TrendingUp, AlertTriangle, Target, BarChart3, Zap, RefreshCw } from 'lucide-react';
import { StatCard, InfoCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PriceLineChart } from '@/components/charts/PriceLineChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { SimpleBarChart } from '@/components/charts/SimpleBarChart';
import { mockPriceHistory } from '@/mock/data/price-data';

// Predicted data extends actual data
const predictionData = [
  ...mockPriceHistory,
  { date: 'Apr 2026', beras: 14800, jagung: 6400, kedelai: 12000, cabai: 38000, bawang: 30000, gula: 17800, minyak: 18200 },
  { date: 'Mei 2026', beras: 15100, jagung: 6600, kedelai: 12200, cabai: 35000, bawang: 29000, gula: 17600, minyak: 18500 },
  { date: 'Jun 2026', beras: 14900, jagung: 6500, kedelai: 12100, cabai: 33000, bawang: 28000, gula: 17500, minyak: 18300 },
];

const anomalies = [
  { id: 1, type: 'Penimbunan', region: 'DKI Jakarta', commodity: 'Gula Pasir', confidence: 87, severity: 'high', description: 'Penurunan stok tidak wajar tanpa distribusi tercatat. Potensi penimbunan oleh distributor.' },
  { id: 2, type: 'Lonjakan Harga', region: 'Jawa Barat', commodity: 'Cabai Merah', confidence: 92, severity: 'high', description: 'Kenaikan harga 18% dalam seminggu. AI memprediksi berlanjut 2-3 minggu akibat cuaca.' },
  { id: 3, type: 'Data Mismatch', region: 'Kab. Demak', commodity: 'Beras Medium', confidence: 78, severity: 'medium', description: 'Deviasi panen -33.3% dari estimasi. Sudah terverifikasi disebabkan banjir rob.' },
  { id: 4, type: 'Supply Shortage', region: 'Sumatera Utara', commodity: 'Beras Premium', confidence: 85, severity: 'high', description: 'Stok gudang Medan kritis (4.500/8.000 ton). AI merekomendasikan transfer dari Lampung.' },
];

const recommendations = [
  { id: 1, title: 'Transfer Beras ke Medan', priority: 'Urgent', desc: 'Transfer 3.500 ton dari Gudang Lampung ke Medan untuk mengatasi defisit stok.', impact: 'Mencegah kelangkaan di Sumatera Utara' },
  { id: 2, title: 'Operasi Pasar Gula Jakarta', priority: 'High', desc: 'Operasi pasar gula pasir untuk menstabilkan harga yang naik 12% bulan ini.', impact: 'Stabilisasi harga gula di DKI Jakarta' },
  { id: 3, title: 'Antisipasi Panen Raya April', priority: 'Medium', desc: 'Siapkan kapasitas gudang tambahan untuk panen raya beras April-Mei 2026.', impact: 'Menyerap produksi panen raya tanpa penurunan harga' },
];

export default function AnalyticsPage() {
  const priceLines = [
    { key: 'beras', name: 'Beras (Aktual + Prediksi)', color: '#047857' },
    { key: 'cabai', name: 'Cabai (Aktual + Prediksi)', color: '#EF4444' },
    { key: 'bawang', name: 'Bawang (Aktual + Prediksi)', color: '#8B5CF6' },
  ];

  const accuracyData = [
    { name: 'Akurat', value: 78, color: '#047857' },
    { name: 'Mendekati', value: 15, color: '#F59E0B' },
    { name: 'Meleset', value: 7, color: '#EF4444' },
  ];

  const surplusDeficit = [
    { name: 'Beras', value: 1200 },
    { name: 'Jagung', value: 800 },
    { name: 'Kedelai', value: -400 },
    { name: 'Gula', value: -200 },
    { name: 'Bawang', value: 500 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-foreground">AI Analytics</h1>
            <Badge variant="purple">BETA</Badge>
          </div>
          <p className="text-sm text-muted mt-1">Prediksi, deteksi anomali, dan rekomendasi kebijakan berbasis AI</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <RefreshCw className="h-3.5 w-3.5" />
          Model terakhir diupdate: 28 Mar 2026 08:00
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Akurasi Prediksi" value="78%" icon={<Target className="h-5 w-5" />} subtitle="30 hari terakhir" gradient="from-primary to-primary-light" />
        <StatCard title="Anomali Terdeteksi" value={anomalies.length} icon={<AlertTriangle className="h-5 w-5" />} subtitle={`${anomalies.filter(a => a.severity === 'high').length} high severity`} gradient="from-red-500 to-red-400" />
        <StatCard title="Rekomendasi Aktif" value={recommendations.length} icon={<Zap className="h-5 w-5" />} subtitle="Perlu tindakan" gradient="from-amber-500 to-amber-400" />
        <StatCard title="Data Points" value="12.4K" icon={<Brain className="h-5 w-5" />} subtitle="Training dataset" gradient="from-violet-500 to-violet-400" />
      </div>

      {/* Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard title="Prediksi Harga 3 Bulan" description="Garis putus-putus = prediksi AI" icon={<TrendingUp className="h-4 w-4" />} className="lg:col-span-2">
          <PriceLineChart data={predictionData} lines={priceLines} height={300} />
          <div className="mt-3 rounded-xl bg-blue-50 border border-blue-200 p-3">
            <div className="text-xs font-semibold text-blue-700">Insight AI</div>
            <p className="text-[10px] text-blue-600 mt-1">
              Harga beras diprediksi naik 2-4% menjelang Ramadhan. Cabai diprediksi stabil setelah puncak Maret.
              Bawang merah cenderung turun seiring panen raya di Brebes dan NTB.
            </p>
          </div>
        </InfoCard>

        <InfoCard title="Akurasi Model" description="Prediksi vs Aktual" icon={<Target className="h-4 w-4" />}>
          <DonutChart data={accuracyData} height={180} innerLabel="Akurasi" />
          <div className="mt-3 space-y-2">
            {accuracyData.map(a => (
              <div key={a.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ background: a.color }} />
                  <span className="text-muted">{a.name}</span>
                </div>
                <span className="font-semibold text-foreground">{a.value}%</span>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* Anomaly Detection */}
      <InfoCard title="Deteksi Anomali" description="AI mendeteksi pola mencurigakan" icon={<AlertTriangle className="h-4 w-4" />}>
        <div className="space-y-3">
          {anomalies.map(a => (
            <div key={a.id} className={`rounded-xl border p-4 ${a.severity === 'high' ? 'border-red-200 bg-red-50/30' : 'border-amber-200 bg-amber-50/30'}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-foreground">{a.type}</span>
                    <Badge variant={a.severity === 'high' ? 'danger' : 'warning'}>{a.severity}</Badge>
                    <span className="text-[10px] text-muted">{a.region} • {a.commodity}</span>
                  </div>
                  <p className="text-xs text-muted">{a.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-muted">Confidence</div>
                  <div className="text-sm font-extrabold text-foreground">{a.confidence}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </InfoCard>

      {/* Recommendations + Surplus/Deficit */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title="Rekomendasi Kebijakan AI" description="Saran tindakan berdasarkan analisis data" icon={<Zap className="h-4 w-4" />}>
          <div className="space-y-3">
            {recommendations.map(r => (
              <div key={r.id} className="rounded-xl border border-border p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-foreground">{r.title}</span>
                  <Badge variant={r.priority === 'Urgent' ? 'danger' : r.priority === 'High' ? 'warning' : 'info'}>
                    {r.priority}
                  </Badge>
                </div>
                <p className="text-xs text-muted">{r.desc}</p>
                <p className="text-[10px] text-primary font-semibold mt-1">Impact: {r.impact}</p>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard title="Surplus / Defisit" description="Estimasi per komoditas (ribu ton)" icon={<BarChart3 className="h-4 w-4" />}>
          <SimpleBarChart
            data={surplusDeficit.map(d => ({
              name: d.name,
              value: Math.abs(d.value),
              fill: d.value >= 0 ? '#047857' : '#EF4444',
            }))}
            height={260}
          />
          <div className="mt-3 flex items-center gap-4 text-xs text-muted">
            <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded-full bg-emerald-600" /> Surplus</div>
            <div className="flex items-center gap-1"><div className="h-2.5 w-2.5 rounded-full bg-red-500" /> Defisit</div>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
