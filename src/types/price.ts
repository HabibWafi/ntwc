export type PriceSource = 'manual' | 'api_bps' | 'scraping';

export interface PriceData {
  id: string;
  commodityId: string;
  commodityName: string;
  commodityIcon: string;
  regionId: string;
  regionName: string;
  price: number;
  previousPrice?: number;
  change?: number;
  trend?: 'up' | 'down' | 'stable';
  recordedDate: string;
  recordedBy?: string;
  source: PriceSource;
  exceedsHet: boolean;
}

export interface PriceHistory {
  date: string;
  [commodityKey: string]: number | string;
}

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AlertStatus = 'open' | 'investigating' | 'resolved' | 'false_positive';
export type AlertType = 'price_spike' | 'hoarding' | 'data_mismatch' | 'het_breach' | 'stock_low' | 'weather';

export interface PriceAlert {
  id: string;
  type: AlertType;
  severity: AlertSeverity;
  status: AlertStatus;
  title: string;
  description: string;
  regionId: string;
  regionName: string;
  commodityId?: string;
  commodityName?: string;
  detectedAt: string;
  resolvedAt?: string;
}
