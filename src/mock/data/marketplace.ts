export interface MarketplaceListing {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerRegion: string;
  sellerRating: number;
  commodityId: string;
  commodityName: string;
  commodityIcon: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  minOrder: number;
  description: string;
  images: string[];
  grade: 'A' | 'B' | 'C';
  organic: boolean;
  harvestDate: string;
  availableUntil: string;
  status: 'active' | 'sold' | 'expired' | 'reserved';
  views: number;
  orders: number;
  createdAt: string;
  blockchainHash?: string;
}

export const mockListings: MarketplaceListing[] = [
  {
    id: 'lst-001', sellerId: 'usr-005', sellerName: 'Pak Suryanto', sellerRegion: 'Kab. Subang, Jawa Barat',
    sellerRating: 4.8, commodityId: 'com-001', commodityName: 'Beras Premium', commodityIcon: '🌾',
    quantity: 5000, unit: 'kg', pricePerUnit: 13500, minOrder: 50, grade: 'A', organic: false,
    description: 'Beras premium varietas Ciherang dari sawah irigasi Subang. Panen Februari 2026, butir utuh >95%, kadar air 14%.',
    images: [], harvestDate: '2026-02-14', availableUntil: '2026-04-14', status: 'active',
    views: 342, orders: 8, createdAt: '2026-02-20T08:00:00',
    blockchainHash: '0x7a3f...8b2e',
  },
  {
    id: 'lst-002', sellerId: 'f2', sellerName: 'Bu Wati Rahayu', sellerRegion: 'Kab. Malang, Jawa Timur',
    sellerRating: 4.6, commodityId: 'com-005', commodityName: 'Cabai Merah Keriting', commodityIcon: '🌶️',
    quantity: 800, unit: 'kg', pricePerUnit: 42000, minOrder: 10, grade: 'A', organic: true,
    description: 'Cabai merah keriting organik, segar langsung dari kebun. Tanpa pestisida kimia. Cocok untuk resto & catering.',
    images: [], harvestDate: '2026-03-25', availableUntil: '2026-04-10', status: 'active',
    views: 567, orders: 15, createdAt: '2026-03-26T10:00:00',
  },
  {
    id: 'lst-003', sellerId: 'f3', sellerName: 'Pak Ahmad Fauzi', sellerRegion: 'NTB',
    sellerRating: 4.9, commodityId: 'com-007', commodityName: 'Bawang Merah', commodityIcon: '🧅',
    quantity: 3000, unit: 'kg', pricePerUnit: 30000, minOrder: 25, grade: 'A', organic: false,
    description: 'Bawang merah varietas Bima Brebes kualitas super. Umbi besar, kering sempurna, tahan simpan.',
    images: [], harvestDate: '2026-02-12', availableUntil: '2026-04-12', status: 'active',
    views: 289, orders: 12, createdAt: '2026-02-15T08:00:00',
    blockchainHash: '0x9c1d...4f7a',
  },
  {
    id: 'lst-004', sellerId: 'f5', sellerName: 'Pak Bambang Sutejo', sellerRegion: 'Kab. Klaten, Jawa Tengah',
    sellerRating: 4.7, commodityId: 'com-001', commodityName: 'Beras Premium', commodityIcon: '🌾',
    quantity: 10000, unit: 'kg', pricePerUnit: 13200, minOrder: 100, grade: 'A', organic: false,
    description: 'Beras premium kualitas ekspor dari sawah Klaten. Butir panjang, pulen, aroma khas.',
    images: [], harvestDate: '2026-02-08', availableUntil: '2026-05-08', status: 'active',
    views: 456, orders: 6, createdAt: '2026-02-10T08:00:00',
    blockchainHash: '0x2e8f...1c3d',
  },
  {
    id: 'lst-005', sellerId: 'f6', sellerName: 'Ibu Nurhaliza', sellerRegion: 'Sulawesi Selatan',
    sellerRating: 4.5, commodityId: 'com-003', commodityName: 'Jagung', commodityIcon: '🌽',
    quantity: 8000, unit: 'kg', pricePerUnit: 5800, minOrder: 100, grade: 'B', organic: false,
    description: 'Jagung pipilan kering kadar air <14%, cocok untuk pakan ternak dan industri pangan.',
    images: [], harvestDate: '2026-02-23', availableUntil: '2026-05-23', status: 'active',
    views: 178, orders: 3, createdAt: '2026-02-25T08:00:00',
  },
  {
    id: 'lst-006', sellerId: 'f9', sellerName: 'Pak Darto', sellerRegion: 'Kab. Brebes, Jawa Tengah',
    sellerRating: 4.3, commodityId: 'com-007', commodityName: 'Bawang Merah', commodityIcon: '🧅',
    quantity: 2000, unit: 'kg', pricePerUnit: 31000, minOrder: 20, grade: 'B', organic: false,
    description: 'Bawang merah Brebes sortir ukuran sedang. Cocok untuk kebutuhan rumah tangga dan warung.',
    images: [], harvestDate: '2026-03-08', availableUntil: '2026-04-30', status: 'active',
    views: 124, orders: 5, createdAt: '2026-03-10T08:00:00',
  },
  {
    id: 'lst-007', sellerId: 'f10', sellerName: 'Pak Agus', sellerRegion: 'Kab. Indramayu, Jawa Barat',
    sellerRating: 4.4, commodityId: 'com-002', commodityName: 'Beras Medium', commodityIcon: '🌾',
    quantity: 15000, unit: 'kg', pricePerUnit: 11800, minOrder: 200, grade: 'B', organic: false,
    description: 'Beras medium IR-64, harga terjangkau untuk kebutuhan besar (catering, warung, sosial).',
    images: [], harvestDate: '2026-01-30', availableUntil: '2026-04-30', status: 'active',
    views: 623, orders: 20, createdAt: '2026-02-01T08:00:00',
  },
  {
    id: 'lst-008', sellerId: 'f12', sellerName: 'Pak Ridwan', sellerRegion: 'Kab. Garut, Jawa Barat',
    sellerRating: 4.2, commodityId: 'com-006', commodityName: 'Cabai Rawit', commodityIcon: '🌶️',
    quantity: 500, unit: 'kg', pricePerUnit: 48000, minOrder: 5, grade: 'A', organic: true,
    description: 'Cabai rawit merah super pedas dari dataran tinggi Garut. Organik, petik pilih.',
    images: [], harvestDate: '2026-03-28', availableUntil: '2026-04-15', status: 'active',
    views: 892, orders: 28, createdAt: '2026-03-29T08:00:00',
  },
];

export interface MarketplaceOrder {
  id: string;
  listingId: string;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  commodityName: string;
  commodityIcon: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'paid' | 'shipped' | 'delivered' | 'completed' | 'disputed' | 'cancelled';
  paymentMethod: string;
  shippingAddress: string;
  trackingNumber?: string;
  blockchainTxHash?: string;
  rating?: number;
  review?: string;
  createdAt: string;
  updatedAt: string;
}

export const mockOrders: MarketplaceOrder[] = [
  {
    id: 'ord-001', listingId: 'lst-001', buyerId: 'usr-006', buyerName: 'CV Maju Bersama',
    sellerId: 'usr-005', sellerName: 'Pak Suryanto',
    commodityName: 'Beras Premium', commodityIcon: '🌾', quantity: 500, unit: 'kg',
    pricePerUnit: 13500, totalPrice: 6750000,
    status: 'completed', paymentMethod: 'Transfer Bank',
    shippingAddress: 'Jl. Raya Karawang No. 45, Jawa Barat',
    trackingNumber: 'JNE-2026032501', blockchainTxHash: '0xa1b2...c3d4',
    rating: 5, review: 'Beras kualitas sangat baik, pengiriman cepat.',
    createdAt: '2026-03-20T10:00:00', updatedAt: '2026-03-25T14:00:00',
  },
  {
    id: 'ord-002', listingId: 'lst-002', buyerId: 'usr-006', buyerName: 'CV Maju Bersama',
    sellerId: 'f2', sellerName: 'Bu Wati Rahayu',
    commodityName: 'Cabai Merah Keriting', commodityIcon: '🌶️', quantity: 50, unit: 'kg',
    pricePerUnit: 42000, totalPrice: 2100000,
    status: 'shipped', paymentMethod: 'Transfer Bank',
    shippingAddress: 'Jl. Raya Karawang No. 45, Jawa Barat',
    trackingNumber: 'SiCepat-20260328A',
    createdAt: '2026-03-27T08:00:00', updatedAt: '2026-03-28T16:00:00',
  },
  {
    id: 'ord-003', listingId: 'lst-003', buyerId: 'usr-007', buyerName: 'Ibu Ratna (Konsumen)',
    sellerId: 'f3', sellerName: 'Pak Ahmad Fauzi',
    commodityName: 'Bawang Merah', commodityIcon: '🧅', quantity: 25, unit: 'kg',
    pricePerUnit: 30000, totalPrice: 750000,
    status: 'delivered', paymentMethod: 'COD',
    shippingAddress: 'Jl. Sudirman No. 12, Jakarta Selatan',
    trackingNumber: 'J&T-2026032801',
    createdAt: '2026-03-26T12:00:00', updatedAt: '2026-03-29T10:00:00',
  },
  {
    id: 'ord-004', listingId: 'lst-004', buyerId: 'dist-01', buyerName: 'UD Sejahtera',
    sellerId: 'f5', sellerName: 'Pak Bambang Sutejo',
    commodityName: 'Beras Premium', commodityIcon: '🌾', quantity: 2000, unit: 'kg',
    pricePerUnit: 13200, totalPrice: 26400000,
    status: 'paid', paymentMethod: 'Escrow',
    shippingAddress: 'Gudang UD Sejahtera, Semarang',
    blockchainTxHash: '0xf4e5...a6b7',
    createdAt: '2026-03-28T09:00:00', updatedAt: '2026-03-28T14:00:00',
  },
  {
    id: 'ord-005', listingId: 'lst-005', buyerId: 'dist-02', buyerName: 'PT Pakan Nusantara',
    sellerId: 'f6', sellerName: 'Ibu Nurhaliza',
    commodityName: 'Jagung', commodityIcon: '🌽', quantity: 5000, unit: 'kg',
    pricePerUnit: 5800, totalPrice: 29000000,
    status: 'confirmed', paymentMethod: 'Transfer Bank',
    shippingAddress: 'Gudang PT Pakan Nusantara, Surabaya',
    createdAt: '2026-03-29T07:00:00', updatedAt: '2026-03-29T08:00:00',
  },
  {
    id: 'ord-006', listingId: 'lst-008', buyerId: 'usr-007', buyerName: 'Ibu Ratna (Konsumen)',
    sellerId: 'f12', sellerName: 'Pak Ridwan',
    commodityName: 'Cabai Rawit', commodityIcon: '🌶️', quantity: 10, unit: 'kg',
    pricePerUnit: 48000, totalPrice: 480000,
    status: 'pending', paymentMethod: 'Transfer Bank',
    shippingAddress: 'Jl. Sudirman No. 12, Jakarta Selatan',
    createdAt: '2026-03-30T10:00:00', updatedAt: '2026-03-30T10:00:00',
  },
  {
    id: 'ord-007', listingId: 'lst-001', buyerId: 'dist-03', buyerName: 'Toko Beras Murah',
    sellerId: 'usr-005', sellerName: 'Pak Suryanto',
    commodityName: 'Beras Premium', commodityIcon: '🌾', quantity: 1000, unit: 'kg',
    pricePerUnit: 13500, totalPrice: 13500000,
    status: 'disputed', paymentMethod: 'Escrow',
    shippingAddress: 'Jl. Pasar Baru No. 8, Bandung',
    blockchainTxHash: '0x8c9d...2e1f',
    createdAt: '2026-03-15T08:00:00', updatedAt: '2026-03-22T10:00:00',
  },
];
