import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

export const registerSchema = z.object({
  nik: z.string().length(16, 'NIK harus 16 digit').regex(/^\d+$/, 'NIK hanya boleh angka'),
  name: z.string().min(3, 'Nama minimal 3 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
  confirmPassword: z.string(),
  role: z.enum(['farmer', 'distributor', 'consumer']),
  regionId: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Password tidak cocok',
  path: ['confirmPassword'],
});

export const otpSchema = z.object({
  otp: z.string().length(6, 'OTP harus 6 digit').regex(/^\d+$/, 'OTP hanya boleh angka'),
});

export const farmDataSchema = z.object({
  commodityId: z.string().min(1, 'Pilih komoditas'),
  regionId: z.string().min(1, 'Pilih wilayah'),
  landArea: z.number().positive('Luas lahan harus positif'),
  estimatedHarvest: z.number().positive('Estimasi panen harus positif'),
  plantingDate: z.string().min(1, 'Pilih tanggal tanam'),
  estimatedHarvestDate: z.string().min(1, 'Pilih estimasi tanggal panen'),
  lat: z.number().optional(),
  lng: z.number().optional(),
});

export const harvestSchema = z.object({
  farmDataId: z.string().min(1, 'Pilih data pertanian'),
  actualHarvest: z.number().positive('Hasil panen harus positif'),
  harvestDate: z.string().min(1, 'Pilih tanggal panen'),
  notes: z.string().optional(),
});

export const priceInputSchema = z.object({
  commodityId: z.string().min(1, 'Pilih komoditas'),
  regionId: z.string().min(1, 'Pilih wilayah'),
  price: z.number().positive('Harga harus positif'),
  recordedDate: z.string().min(1, 'Pilih tanggal'),
});

export const distributionSchema = z.object({
  warehouseId: z.string().min(1, 'Pilih gudang'),
  commodityId: z.string().min(1, 'Pilih komoditas'),
  volume: z.number().positive('Volume harus positif'),
  direction: z.enum(['in', 'out']),
  destinationRegionId: z.string().optional(),
  recipient: z.string().optional(),
  documentRef: z.string().min(1, 'Nomor dokumen wajib diisi'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
export type FarmDataFormData = z.infer<typeof farmDataSchema>;
export type HarvestFormData = z.infer<typeof harvestSchema>;
export type PriceInputFormData = z.infer<typeof priceInputSchema>;
export type DistributionFormData = z.infer<typeof distributionSchema>;
