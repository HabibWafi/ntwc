'use client';
import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Shield, Leaf, ShoppingCart, Package, Eye, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { InfoCard } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { mockListings } from '@/mock/data/marketplace';
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const listing = mockListings.find(l => l.id === id);
  const [quantity, setQuantity] = useState('');

  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <ShoppingCart className="h-12 w-12 text-muted mb-4" />
        <h2 className="text-lg font-bold text-foreground mb-2">Listing Tidak Ditemukan</h2>
        <Link href="/marketplace"><Button variant="outline" size="sm">Kembali</Button></Link>
      </div>
    );
  }

  const total = Number(quantity) * listing.pricePerUnit;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/marketplace">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />}>Marketplace</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image + basic */}
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="relative h-56 sm:h-72 bg-gradient-to-br from-primary-bg to-surface flex items-center justify-center">
              <span className="text-8xl">{listing.commodityIcon}</span>
              <div className="absolute top-3 left-3 flex items-center gap-2">
                {listing.organic && (
                  <div className="flex items-center gap-1 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-bold text-white">
                    <Leaf className="h-3.5 w-3.5" /> Organik
                  </div>
                )}
                {listing.blockchainHash && (
                  <div className="flex items-center gap-1 rounded-full bg-violet-500 px-2.5 py-1 text-xs font-bold text-white">
                    <Shield className="h-3.5 w-3.5" /> On-Chain Verified
                  </div>
                )}
              </div>
              <Badge variant={listing.grade === 'A' ? 'success' : 'warning'} className="absolute top-3 right-3">
                Grade {listing.grade}
              </Badge>
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-extrabold text-foreground">{listing.commodityName}</h1>
              <div className="text-3xl font-extrabold text-primary mt-2">
                {formatCurrency(listing.pricePerUnit)}<span className="text-base font-normal text-muted">/{listing.unit}</span>
              </div>
              <p className="text-sm text-muted mt-3">{listing.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-border">
                <div className="text-center">
                  <Package className="h-4 w-4 mx-auto text-primary mb-1" />
                  <div className="text-xs font-bold text-foreground">{formatNumber(listing.quantity)} {listing.unit}</div>
                  <div className="text-[10px] text-muted">Stok Tersedia</div>
                </div>
                <div className="text-center">
                  <ShoppingCart className="h-4 w-4 mx-auto text-primary mb-1" />
                  <div className="text-xs font-bold text-foreground">{listing.minOrder} {listing.unit}</div>
                  <div className="text-[10px] text-muted">Min. Order</div>
                </div>
                <div className="text-center">
                  <Eye className="h-4 w-4 mx-auto text-primary mb-1" />
                  <div className="text-xs font-bold text-foreground">{listing.views}</div>
                  <div className="text-[10px] text-muted">Views</div>
                </div>
                <div className="text-center">
                  <Clock className="h-4 w-4 mx-auto text-primary mb-1" />
                  <div className="text-xs font-bold text-foreground">{formatDate(listing.harvestDate)}</div>
                  <div className="text-[10px] text-muted">Tgl Panen</div>
                </div>
              </div>
            </div>
          </div>

          {/* Seller Info */}
          <InfoCard title="Informasi Penjual" icon={<MapPin className="h-4 w-4" />}>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary-light/20 text-xl font-bold text-primary">
                {listing.sellerName.charAt(0)}
              </div>
              <div>
                <div className="text-base font-bold text-foreground">{listing.sellerName}</div>
                <div className="flex items-center gap-1 text-xs text-muted mt-0.5">
                  <MapPin className="h-3 w-3" /> {listing.sellerRegion}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-foreground">{listing.sellerRating}</span>
                  <span className="text-xs text-muted">• {listing.orders} transaksi</span>
                </div>
              </div>
            </div>
          </InfoCard>

          {/* Blockchain */}
          {listing.blockchainHash && (
            <InfoCard title="Verifikasi Blockchain" icon={<Shield className="h-4 w-4" />}>
              <div className="rounded-xl bg-violet-50 border border-violet-200 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-violet-600" />
                  <span className="text-xs font-bold text-violet-700">Tercatat di Blockchain</span>
                </div>
                <div className="text-xs text-violet-600 font-mono">Hash: {listing.blockchainHash}</div>
                <p className="text-[10px] text-violet-500 mt-1">Data listing ini telah diverifikasi dan tercatat secara immutable di blockchain.</p>
              </div>
            </InfoCard>
          )}
        </div>

        {/* Order Card */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 sticky top-24">
            <h3 className="text-sm font-bold text-foreground mb-4">Buat Pesanan</h3>
            <Input
              label={`Jumlah (${listing.unit})`}
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={`Min. ${listing.minOrder}`}
            />
            {Number(quantity) > 0 && (
              <div className="mt-3 rounded-xl bg-surface p-3">
                <div className="flex justify-between text-xs">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-bold text-foreground">{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-muted">Ongkir</span>
                  <span className="text-muted">Dihitung saat checkout</span>
                </div>
              </div>
            )}
            <Button className="w-full mt-4" icon={<ShoppingCart className="h-4 w-4" />}
              disabled={!quantity || Number(quantity) < listing.minOrder}>
              Pesan Sekarang
            </Button>
            <p className="text-[10px] text-muted text-center mt-2">
              Pembayaran via escrow — dana aman sampai barang diterima
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
