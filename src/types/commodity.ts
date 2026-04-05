export type CommodityCategory = 'grain' | 'vegetable' | 'fruit' | 'spice' | 'other';

export interface Commodity {
  id: string;
  name: string;
  icon: string;
  category: CommodityCategory;
  unit: string;
  het: number; // Harga Eceran Tertinggi
}
