'use client';
import { Wheat, TrendingUp, Sprout, BarChart3, Plus, Upload, Brain, Target, CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
import { StatCard, InfoCard } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { PriceLineChart } from '@/components/charts/PriceLineChart';
import { Button } from '@/components/ui/Button';
import { mockFarmData } from '@/mock/data/farm-data';
import { mockHarvestRecords } from '@/mock/data/harvest-records';
import { mockPriceHistory, mockCurrentPrices } from '@/mock/data/price-data';
import { creditScores } from '@/mock/data/credit-scores';
import { pricePredictions } from '@/mock/data/dashboard-stats';
import { useAuthStore } from '@/stores/auth-store';
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function FarmerDashboard() {
  const { user } = useAuthStore();
  // Show farmer's own data (Pak Suryanto = usr-005)
  const myFarms = mockFarmData.filter(f => f.userId === (user?.id || 'usr-005'));
  const myHarvests = mockHarvestRecords.filter(h => myFarms.some(f => f.id === h.farmDataId));
  const activeFarms = myFarms.filter(f => f.status === 'growing' || f.status === 'planted');
  const totalArea = myFarms.reduce((sum, f) => sum + f.landArea, 0);
  const totalHarvest = myHarvests.reduce((sum, h) => sum + h.actualHarvest, 0);

  // Prices for Subang/Jawa Barat
  const localPrices = mockCurrentPrices.filter(p => p.regionName === 'Jawa Barat').slice(0, 4);

  const priceLines = [
    { key: 'beras', name: 'Beras', color: '#047857' },
    { key: 'jagung', name: 'Jagung', color: '#F59E0B' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Dashboard Petani</h1>
          <p className="text-sm text-muted mt-1">Selamat datang, {user?.name || 'Petani'}</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/farm-data/new">
            <Button size="sm" icon={<Plus className="h-4 w-4" />}>Catat Lahan Baru</Button>
          </Link>
          <Link href="/farm-data/upload">
            <Button variant="outline" size="sm" icon={<Upload className="h-4 w-4" />}>Upload Data</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Lahan Saya"
          value={myFarms.length}
          icon={<Wheat className="h-5 w-5" />}
          subtitle={`${activeFarms.length} aktif tanam`}
          gradient="from-primary to-primary-light"
        />
        <StatCard
          title="Luas Total"
          value={`${formatNumber(totalArea)} ha`}
          icon={<Sprout className="h-5 w-5" />}
          subtitle="Seluruh komoditas"
          gradient="from-blue-500 to-blue-400"
        />
        <StatCard
          title="Total Panen"
          value={`${formatNumber(totalHarvest)} ton`}
          icon={<BarChart3 className="h-5 w-5" />}
          subtitle="Musim ini"
          gradient="from-amber-500 to-amber-400"
        />
        <StatCard
          title="Harga Beras Lokal"
          value={formatCurrency(localPrices.find(p => p.commodityId === 'com-001')?.price || 14500)}
          change={2.1}
          trend="up"
          icon={<TrendingUp className="h-5 w-5" />}
          subtitle="Jawa Barat"
          gradient="from-violet-500 to-violet-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <InfoCard
          title="Tren Harga Komoditas"
          description="6 bulan terakhir"
          icon={<BarChart3 className="h-4 w-4" />}
          className="lg:col-span-2"
          headerAction={
            <Link href="/prices/history" className="text-xs font-semibold text-primary hover:underline">Detail →</Link>
          }
        >
          <PriceLineChart data={mockPriceHistory} lines={priceLines} height={280} />
        </InfoCard>

        <InfoCard
          title="Harga Lokal"
          description="Harga terkini di daerah Anda"
          icon={<TrendingUp className="h-4 w-4" />}
        >
          <div className="space-y-3">
            {localPrices.map(p => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">{p.commodityIcon}</span>
                  <span className="text-xs font-semibold text-foreground">{p.commodityName}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-foreground">{formatCurrency(p.price)}</div>
                  <Badge variant={p.trend === 'up' ? 'danger' : p.trend === 'down' ? 'success' : 'neutral'} dot>
                    {(p.change ?? 0) > 0 ? '+' : ''}{p.change ?? 0}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>

      {/* My Farm Data */}
      <InfoCard
        title="Data Lahan Saya"
        description={`${myFarms.length} lahan tercatat`}
        icon={<Wheat className="h-4 w-4" />}
        headerAction={
          <Link href="/farm-data" className="text-xs font-semibold text-primary hover:underline">Lihat Semua →</Link>
        }
      >
        <div className="space-y-3">
          {myFarms.map(farm => {
            const harvest = myHarvests.find(h => h.farmDataId === farm.id);
            return (
              <div key={farm.id} className="flex items-center justify-between rounded-xl border border-border p-4">
                <div>
                  <div className="text-sm font-semibold text-foreground">{farm.commodityName}</div>
                  <div className="text-xs text-muted mt-0.5">
                    {farm.landArea} ha • {farm.regionName} • Tanam: {formatDate(farm.plantingDate)}
                  </div>
                  {harvest && harvest.actualHarvest > 0 && (
                    <div className="text-xs text-muted mt-0.5">
                      Panen: {formatNumber(harvest.actualHarvest)} ton (deviasi: {harvest.deviationPct > 0 ? '+' : ''}{harvest.deviationPct}%)
                    </div>
                  )}
                </div>
                <Badge variant={
                  farm.status === 'harvested' ? 'success' :
                  farm.status === 'growing' ? 'warning' :
                  farm.status === 'planted' ? 'info' : 'neutral'
                }>
                  {farm.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </InfoCard>

      {/* Credit Score + AI Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard title="Skor Kredit AI" description="Kelayakan kredit berdasarkan data alternatif" icon={<Brain className="h-4 w-4" />}>
          {(() => {
            const myCreditScore = creditScores.find(c => c.farmerId === (user?.id || 'usr-005'));
            if (!myCreditScore) return <p className="text-sm text-muted text-center py-4">Skor kredit belum tersedia</p>;
            return (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white text-2xl font-extrabold shrink-0">
                    {myCreditScore.score}
                  </div>
                  <div>
                    <Badge variant={myCreditScore.risk === 'low' ? 'success' : 'warning'} dot>
                      Risiko {myCreditScore.risk === 'low' ? 'Rendah' : 'Menengah'}
                    </Badge>
                    <div className="text-xs text-muted mt-1">{myCreditScore.recommendation}</div>
                    <div className="text-lg font-extrabold text-primary mt-1">{formatCurrency(myCreditScore.maxLoan)}</div>
                  </div>
                </div>
                <div className="pt-3 border-t border-border space-y-2">
                  <div className="text-[10px] font-semibold text-muted uppercase">Faktor Penilaian</div>
                  {myCreditScore.factors.map((f, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {f.impact === 'positive' ? <CheckCircle2 className="h-3.5 w-3.5 text-green-500" /> :
                         f.impact === 'negative' ? <XCircle className="h-3.5 w-3.5 text-red-500" /> :
                         <MinusCircle className="h-3.5 w-3.5 text-gray-400" />}
                        <span className="text-foreground">{f.name}</span>
                      </div>
                      <span className="text-muted">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </InfoCard>

        <InfoCard title="Prediksi Harga AI" description="Prediksi 7 & 30 hari ke depan" icon={<Target className="h-4 w-4" />}>
          <div className="space-y-3">
            {pricePredictions.map(p => (
              <div key={p.commodity} className="rounded-xl border border-border p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{p.icon}</span>
                    <span className="text-xs font-semibold text-foreground">{p.commodity}</span>
                  </div>
                  <span className="text-xs font-bold text-foreground">{formatCurrency(p.currentPrice)}</span>
                </div>
                <div className="flex items-center gap-4 text-[10px]">
                  <div>
                    <span className="text-muted">7 Hari: </span>
                    <span className={`font-bold ${p.predicted7d > p.currentPrice ? 'text-red-500' : 'text-green-600'}`}>
                      {p.predicted7d > p.currentPrice ? '↑' : '↓'} {formatCurrency(p.predicted7d)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted">30 Hari: </span>
                    <span className={`font-bold ${p.predicted30d > p.currentPrice ? 'text-red-500' : 'text-green-600'}`}>
                      {p.predicted30d > p.currentPrice ? '↑' : '↓'} {formatCurrency(p.predicted30d)}
                    </span>
                  </div>
                  <span className="text-muted ml-auto">Confidence: {p.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
