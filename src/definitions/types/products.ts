export interface AppProduct {
  id: string;
  name: string;
  link: string | null;
  description: string;
  features: Feature[];
  platforms: string[];
  primaryColor: string;
  icon: string;
  images: string[];
}

export interface Feature {
  name: string;
  description: string;
}

export type ProductsData = AppProduct[]; 