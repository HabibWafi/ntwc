export type DistributionDirection = 'in' | 'out';

export interface BulogWarehouse {
  id: string;
  name: string;
  regionId: string;
  regionName: string;
  capacity: number; // tons
  location: { lat: number; lng: number };
  address?: string;
}

export interface BulogStock {
  id: string;
  warehouseId: string;
  warehouseName: string;
  commodityId: string;
  commodityName: string;
  currentStock: number; // tons
  minThreshold: number;
  capacityPct: number;
  lastUpdated: string;
}

export interface BulogDistribution {
  id: string;
  warehouseId: string;
  warehouseName: string;
  commodityId: string;
  commodityName: string;
  volume: number; // tons
  direction: DistributionDirection;
  destinationRegionId?: string;
  destinationRegionName?: string;
  recipient?: string;
  documentRef: string;
  recordedBy: string;
  distributionDate: string;
}
