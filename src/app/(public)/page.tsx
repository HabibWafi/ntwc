'use client';
import Link from 'next/link';
import { Wheat, Shield, BarChart3, ShoppingCart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const features = [
  { icon: BarChart3, title: 'Dashboard Nasional', desc: 'Visualisasi data pangan real-time dengan peta interaktif dan grafik komprehensif.' },
  { icon: Shield, title: 'Blockchain Transparan', desc: 'Setiap transaksi tercatat on-chain, tidak bisa dimanipulasi, dan bisa diaudit.' },
  { icon: Wheat, title: 'AI Analytics', desc: 'Prediksi harga, deteksi anomali, dan rekomendasi kebijakan berbasis kecerdasan buatan.' },
  { icon: ShoppingCart, title: 'Marketplace', desc: 'Platform transaksi langsung dari petani ke konsumen tanpa perantara berlebih.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-dark to-primary">
            <Wheat className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-foreground">Nusantara TwinChain</div>
            <div className="text-[10px] text-muted">Platform Komoditas Pertanian</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="outline" size="sm">Masuk</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Daftar</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary-bg border border-primary-lighter/30 px-4 py-1.5 mb-6">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-semibold text-primary">Platform Nasional Berbasis AI & Blockchain</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-4">
            Ekosistem Data Pangan yang{' '}
            <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Transparan & Akuntabel
            </span>
          </h1>
          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            Dari hulu ke hilir — tracking, analisis, dan transaksi komoditas pertanian Indonesia dalam satu platform terintegrasi.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" icon={<ArrowRight className="h-5 w-5" />}>
                Mulai Sekarang
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">Lihat Demo</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="rounded-2xl border border-border bg-card p-6 hover:shadow-md transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-primary-light/10 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-6 text-center text-xs text-muted">
        &copy; 2026 Nusantara TwinChain. Platform Nasional Komoditas Pertanian Indonesia.
      </footer>
    </div>
  );
}
