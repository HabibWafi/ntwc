export type RegionLevel = 'province' | 'regency' | 'district' | 'village';

export interface Region {
  id: string;
  name: string;
  level: RegionLevel;
  parentId: string | null;
  code: string;
  centroid: { lat: number; lng: number };
  children?: Region[];
}
