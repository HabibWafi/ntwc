'use client';
import { useState } from 'react';
import {
  Landmark, Brain, Shield, Target, Wallet,
  CheckCircle2, XCircle, MinusCircle, ChevronRight, PieChart,
} from 'lucide-react';
import { InfoCard, StatCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DonutChart } from '@/components/charts/DonutChart';
import { creditScores, subsidyData } from '@/mock/data/credit-scores';
import { formatCurrency, formatNumber } from '@/lib/utils';

export default function PembiayaanPage() {
  const [selectedFarmer, setSelectedFarmer] = useState<string | null>(null);

  const riskDistribution = [
    { name: 'Risiko Rendah', value: creditScores.filter(c => c.risk === 'low').length, color: '#10B981' },
    { name: 'Risiko Menengah', value: creditScores.filter(c => c.risk === 'medium').length, color: '#F59E0B' },
    { name: 'Risiko Tinggi', value: creditScores.filter(c => c.risk === 'high').length, color: '#EF4444' },
  ];

  const subsidyProgress = (subsidyData.distributed / subsidyData.totalBudget) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-violet-600 uppercase tracking-widest mb-1">
          <Landmark className="h-3.5 w-3.5" />
          Pembiayaan & Subsidi
        </div>
        <h1 className="text-2xl font-extrabold text-foreground tracking-tight">AI Credit Scoring & Targeting Subsidi</h1>
        <p className="text-sm text-muted mt-1">Credit scoring berbasis data alternatif & penajaman sasaran subsidi</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Petani Terscoring" value={creditScores.length} icon={<Brain className="h-5 w-5" />} subtitle="AI credit scoring aktif" gradient="from-violet-500 to-violet-700" />
        <StatCard title="Avg Credit Score" value={Math.round(creditScores.reduce((s, c) => s + c.score, 0) / creditScores.length)} icon={<Target className="h-5 w-5" />} subtitle="Dari skala 100" gradient="from-blue-500 to-blue-400" />
        <StatCard title="Subsidi Tersalurkan" value={formatCurrency(subsidyData.distributed)} icon={<Wallet className="h-5 w-5" />} subtitle={`${subsidyProgress.toFixed(0)}% dari total anggaran`} gradient="from-primary to-primary-light" />
        <StatCard title="Akurasi Targeting" value={`${subsidyData.targetAccuracy}%`} change={5.2} trend="up" icon={<Shield className="h-5 w-5" />} subtitle="Ketepatan sasaran subsidi" gradient="from-amber-500 to-amber-400" />
      </div>

      {/* Credit Scoring + Risk/Subsidy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard title="AI Credit Scoring" description="Skor kredit berdasarkan data alternatif (riwayat panen, transaksi, cuaca)" icon={<Brain className="h-4 w-4" />} className="lg:col-span-2">
          <div className="space-y-3">
            {creditScores.map(cs => (
              <div
                key={cs.farmerId}
                className={`rounded-xl border p-4 cursor-pointer transition-all ${
                  selectedFarmer === cs.farmerId ? 'border-violet-500 bg-violet-50 shadow-sm' : 'border-border hover:bg-surface'
                }`}
                onClick={() => setSelectedFarmer(selectedFarmer === cs.farmerId ? null : cs.farmerId)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white text-sm font-bold">
                      {cs.score}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">{cs.farmerName}</div>
                      <div className="text-xs text-muted">ID: {cs.farmerId}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={cs.risk === 'low' ? 'success' : cs.risk === 'medium' ? 'warning' : 'danger'} dot>
                      Risiko {cs.risk === 'low' ? 'Rendah' : cs.risk === 'medium' ? 'Menengah' : 'Tinggi'}
                    </Badge>
                    <ChevronRight className={`h-4 w-4 text-muted transition-transform ${selectedFarmer === cs.farmerId ? 'rotate-90' : ''}`} />
                  </div>
                </div>

                {/* Score Bar */}
                <div className="h-2 rounded-full bg-gray-100 overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      cs.score >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                      cs.score >= 70 ? 'bg-gradient-to-r from-amber-400 to-amber-600' :
                      'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                    style={{ width: `${cs.score}%` }}
                  />
                </div>

                {/* Expanded Detail */}
                {selectedFarmer === cs.farmerId && (
                  <div className="mt-4 pt-4 border-t border-border/50 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-[10px] font-semibold text-muted uppercase mb-1">Rekomendasi</div>
                        <div className="text-xs text-foreground">{cs.recommendation}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold text-muted uppercase mb-1">Maks Kredit</div>
                        <div className="text-lg font-extrabold text-primary">{formatCurrency(cs.maxLoan)}</div>
                      </div>
                    </div>

                    <div className="text-[10px] font-semibold text-muted uppercase mb-2">Faktor Penilaian</div>
                    <div className="space-y-2">
                      {cs.factors.map((f, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            {f.impact === 'positive' ? (
                              <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                            ) : f.impact === 'negative' ? (
                              <XCircle className="h-3.5 w-3.5 text-red-500" />
                            ) : (
                              <MinusCircle className="h-3.5 w-3.5 text-gray-400" />
                            )}
                            <span className="text-foreground">{f.name}</span>
                          </div>
                          <span className="text-muted font-medium">{f.value}</span>
                        </div>
                      ))}
                    </div>

                    <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 py-2.5 text-sm font-semibold text-white hover:shadow-md transition-all">
                      Ajukan Pembiayaan
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </InfoCard>

        <div className="space-y-6">
          <InfoCard title="Distribusi Risiko" description="Berdasarkan AI scoring" icon={<PieChart className="h-4 w-4" />}>
            <DonutChart data={riskDistribution} height={200} innerLabel="Petani" />
            <div className="space-y-2 mt-4">
              {riskDistribution.map(r => (
                <div key={r.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full" style={{ background: r.color }} />
                    <span className="text-foreground">{r.name}</span>
                  </div>
                  <span className="font-semibold text-foreground">{r.value}</span>
                </div>
              ))}
            </div>
          </InfoCard>

          <InfoCard title="Subsidi Progress" description="Monitoring penyaluran" icon={<Wallet className="h-4 w-4" />}>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted">Tersalurkan</span>
                  <span className="font-bold text-foreground">{subsidyProgress.toFixed(0)}%</span>
                </div>
                <div className="h-3 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light" style={{ width: `${subsidyProgress}%` }} />
                </div>
                <div className="flex justify-between text-[10px] text-muted mt-1">
                  <span>{formatCurrency(subsidyData.distributed)}</span>
                  <span>{formatCurrency(subsidyData.totalBudget)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] font-semibold text-muted uppercase">Per Wilayah</div>
                {subsidyData.regions.map(r => {
                  const pct = (r.distributed / r.allocated) * 100;
                  return (
                    <div key={r.name}>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-foreground font-medium">{r.name}</span>
                        <span className="text-muted">{pct.toFixed(0)}% • {formatNumber(r.farmers)} petani</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full bg-primary/60" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}
