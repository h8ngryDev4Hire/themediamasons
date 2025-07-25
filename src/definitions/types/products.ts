export interface AppProduct {
  id: string;
  name: string;
  description: string;
  features: string[];
  platforms: string[];
  primaryColor: string;
  icon: string;
  images: string[];
}

export type ProductsData = AppProduct[]; 