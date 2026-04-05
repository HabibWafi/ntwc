'use client';
import { useState } from 'react';
import { ShoppingCart, Search, Filter, Star, MapPin, Shield, Leaf } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { mockListings } from '@/mock/data/marketplace';
import { formatCurrency, formatNumber } from '@/lib/utils';
import Link from 'next/link';

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = [
    { key: 'all', label: 'Semua' },
    { key: 'com-001', label: '🌾 Beras' },
    { key: 'com-003', label: '🌽 Jagung' },
    { key: 'com-005', label: '🌶️ Cabai' },
    { key: 'com-007', label: '🧅 Bawang' },
  ];

  const filtered = mockListings.filter(l => {
    const matchSearch = !search || l.commodityName.toLowerCase().includes(search.toLowerCase()) ||
      l.sellerName.toLowerCase().includes(search.toLowerCase()) || l.sellerRegion.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'all' || l.commodityId === categoryFilter || l.commodityId.startsWith(categoryFilter.slice(0, 5));
    return matchSearch && matchCat && l.status === 'active';
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">Marketplace</h1>
          <p className="text-sm text-muted mt-1">Beli langsung dari petani — transparan & tercatat on-chain</p>
        </div>
        <Link href="/marketplace/create">
          <Button size="sm" icon={<ShoppingCart className="h-4 w-4" />}>Buat Listing</Button>
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-w-[220px] max-w-md">
          <Input placeholder="Cari komoditas, petani, lokasi..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search className="h-4 w-4" />} />
        </div>
        <div className="flex items-center gap-1 overflow-x-auto">
          <Filter className="h-4 w-4 text-muted shrink-0" />
          {categories.map(c => (
            <button key={c.key} onClick={() => setCategoryFilter(c.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${categoryFilter === c.key ? 'bg-primary text-white' : 'bg-surface text-muted hover:bg-gray-100'}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Listing Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(listing => (
          <Link key={listing.id} href={`/marketplace/${listing.id}`}>
            <div className="rounded-2xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all group cursor-pointer">
              {/* Image placeholder */}
              <div className="relative h-40 bg-gradient-to-br from-primary-bg to-surface flex items-center justify-center">
                <span className="text-5xl group-hover:scale-110 transition-transform">{listing.commodityIcon}</span>
                {listing.organic && (
                  <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    <Leaf className="h-3 w-3" /> Organik
                  </div>
                )}
                {listing.blockchainHash && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-violet-500 px-2 py-0.5 text-[10px] font-bold text-white">
                    <Shield className="h-3 w-3" /> On-Chain
                  </div>
                )}
                <Badge variant={listing.grade === 'A' ? 'success' : listing.grade === 'B' ? 'warning' : 'neutral'} className="absolute bottom-2 right-2">
                  Grade {listing.grade}
                </Badge>
              </div>

              <div className="p-4">
                <div className="text-sm font-bold text-foreground">{listing.commodityName}</div>
                <div className="text-lg font-extrabold text-primary mt-0.5">
                  {formatCurrency(listing.pricePerUnit)}<span className="text-xs font-normal text-muted">/{listing.unit}</span>
                </div>
                <div className="text-xs text-muted mt-1">Stok: {formatNumber(listing.quantity)} {listing.unit} • Min: {listing.minOrder} {listing.unit}</div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                      {listing.sellerName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[10px] font-semibold text-foreground">{listing.sellerName}</div>
                      <div className="flex items-center gap-0.5 text-[9px] text-muted">
                        <MapPin className="h-2.5 w-2.5" /> {listing.sellerRegion.split(',')[0]}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-xs text-amber-500">
                    <Star className="h-3 w-3 fill-current" />
                    <span className="font-semibold">{listing.sellerRating}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-muted">
          <ShoppingCart className="h-10 w-10 mb-3" />
          <p className="text-sm font-semibold">Tidak ada listing ditemukan</p>
          <p className="text-xs mt-1">Coba ubah filter atau kata kunci pencarian</p>
        </div>
      )}
    </div>
  );
}
