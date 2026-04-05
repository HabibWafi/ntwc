export type FarmStatus = 'planted' | 'growing' | 'harvested' | 'reported';

export interface FarmData {
  id: string;
  userId: string;
  userName: string;
  regionId: string;
  regionName: string;
  commodityId: string;
  commodityName: string;
  landArea: number; // hectares
  estimatedHarvest: number; // tons
  plantingDate: string;
  estimatedHarvestDate: string;
  status: FarmStatus;
  location: { lat: number; lng: number };
  createdAt: string;
}

export interface HarvestRecord {
  id: string;
  farmDataId: string;
  farmData?: FarmData;
  actualHarvest: number; // tons
  deviationPct: number;
  flagged: boolean;
  notes: string;
  harvestDate: string;
  verifiedBy?: string;
  verifiedByName?: string;
}
