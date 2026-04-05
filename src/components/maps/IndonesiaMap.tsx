'use client';
import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { mockProvinces } from '@/mock/data/regions';

interface ProvinceData {
  production: number;
  price: number;
  stock: number;
}

interface MapProps {
  dataKey?: 'production' | 'price' | 'stock';
  height?: string;
  onProvinceClick?: (provinceId: string, provinceName: string) => void;
}

// Comprehensive province-level data for all 34 provinces
const PROVINCE_DATA: Record<string, ProvinceData> = {
  'Aceh':                   { production: 2100, price: 14800, stock: 3200 },
  'Sumatera Utara':         { production: 4200, price: 14600, stock: 4500 },
  'Sumatera Barat':         { production: 2800, price: 14300, stock: 3800 },
  'Riau':                   { production: 1500, price: 14900, stock: 2100 },
  'Jambi':                  { production: 1200, price: 14500, stock: 1800 },
  'Sumatera Selatan':       { production: 3100, price: 14200, stock: 5200 },
  'Bengkulu':               { production: 800,  price: 14700, stock: 1200 },
  'Lampung':                { production: 3800, price: 13900, stock: 12000 },
  'Kep. Bangka Belitung':   { production: 400,  price: 15100, stock: 600 },
  'Kep. Riau':              { production: 200,  price: 15400, stock: 400 },
  'DKI Jakarta':            { production: 0,    price: 15200, stock: 32500 },
  'Jawa Barat':             { production: 12500, price: 14200, stock: 65000 },
  'Jawa Tengah':            { production: 11800, price: 13800, stock: 38000 },
  'DI Yogyakarta':          { production: 1200, price: 14000, stock: 2800 },
  'Jawa Timur':             { production: 13200, price: 13500, stock: 43000 },
  'Banten':                 { production: 2200, price: 14600, stock: 5500 },
  'Bali':                   { production: 900,  price: 14500, stock: 3000 },
  'Nusa Tenggara Barat':    { production: 2100, price: 14100, stock: 6000 },
  'Nusa Tenggara Timur':    { production: 1400, price: 14800, stock: 2200 },
  'Kalimantan Barat':       { production: 1800, price: 14300, stock: 3200 },
  'Kalimantan Tengah':      { production: 1200, price: 14500, stock: 2000 },
  'Kalimantan Selatan':     { production: 2800, price: 14000, stock: 5000 },
  'Kalimantan Timur':       { production: 1600, price: 14700, stock: 2800 },
  'Kalimantan Utara':       { production: 600,  price: 15000, stock: 900 },
  'Sulawesi Utara':         { production: 1400, price: 14400, stock: 2400 },
  'Sulawesi Tengah':        { production: 1800, price: 14200, stock: 3000 },
  'Sulawesi Selatan':       { production: 5600, price: 13200, stock: 15000 },
  'Sulawesi Tenggara':      { production: 1100, price: 14600, stock: 1800 },
  'Gorontalo':              { production: 900,  price: 14500, stock: 1400 },
  'Sulawesi Barat':         { production: 700,  price: 14700, stock: 1100 },
  'Maluku':                 { production: 500,  price: 15200, stock: 800 },
  'Maluku Utara':           { production: 400,  price: 15300, stock: 600 },
  'Papua':                  { production: 600,  price: 15500, stock: 1000 },
  'Papua Barat':            { production: 300,  price: 15600, stock: 500 },
};

// Color scales: light (low) → dark (high) per layer
const COLOR_SCALES: Record<string, string[]> = {
  production: ['#DCFCE7', '#86EFAC', '#4ADE80', '#22C55E', '#16A34A', '#15803D', '#14532D'],
  price:      ['#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#991B1B'],
  stock:      ['#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1E3A8A'],
};

function getColor(value: number, min: number, max: number, layer: string): string {
  const scale = COLOR_SCALES[layer] || COLOR_SCALES.production;
  if (max === min) return scale[3];
  const ratio = (value - min) / (max - min);
  const idx = Math.min(Math.floor(ratio * scale.length), scale.length - 1);
  return scale[idx];
}

function getRadius(value: number, min: number, max: number): number {
  if (max === min) return 12;
  const ratio = (value - min) / (max - min);
  return 6 + ratio * 20; // 6px to 26px
}

const LAYER_LABELS: Record<string, { label: string; unit: string }> = {
  production: { label: 'Produksi', unit: 'ton' },
  price:      { label: 'Harga Beras', unit: 'Rp/kg' },
  stock:      { label: 'Stok', unit: 'ton' },
};

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 5);
  }, [map, center]);
  return null;
}

export default function IndonesiaMap({ dataKey = 'production', height = '500px', onProvinceClick }: MapProps) {
  const layerInfo = LAYER_LABELS[dataKey];

  // Compute min/max for current layer
  const values = Object.values(PROVINCE_DATA).map(d => d[dataKey]).filter(v => v > 0);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  return (
    <div style={{ height }} className="rounded-xl overflow-hidden border border-border">
      <MapContainer
        center={[-2.5, 118]}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <MapController center={[-2.5, 118]} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mockProvinces.map(prov => {
          const data = PROVINCE_DATA[prov.name];
          if (!data || !prov.centroid) return null;
          const value = data[dataKey];
          if (value === 0 && dataKey === 'production') return null;
          const color = getColor(value, minVal, maxVal, dataKey);
          const radius = getRadius(value, minVal, maxVal);

          return (
            <CircleMarker
              key={prov.id}
              center={[prov.centroid.lat, prov.centroid.lng]}
              radius={radius}
              pathOptions={{
                fillColor: color,
                color: '#fff',
                weight: 2,
                opacity: 0.9,
                fillOpacity: 0.85,
              }}
              eventHandlers={{
                click: () => {
                  if (onProvinceClick) onProvinceClick(prov.id, prov.name);
                },
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                <div style={{ minWidth: 140 }}>
                  <strong>{prov.name}</strong>
                  <br />
                  {layerInfo.label}: {value.toLocaleString('id-ID')} {layerInfo.unit}
                  <br />
                  <span style={{ fontSize: '0.8em', color: '#666' }}>
                    Produksi: {data.production.toLocaleString('id-ID')} ton
                    <br />
                    Harga: Rp {data.price.toLocaleString('id-ID')}/kg
                    <br />
                    Stok: {data.stock.toLocaleString('id-ID')} ton
                  </span>
                </div>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
