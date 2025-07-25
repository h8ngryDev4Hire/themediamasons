export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  url: string;
  imageUrl: string;
  description: string;
  technologies?: string[];
  testimonial: Testimonial;
}

export type PortfolioData = PortfolioItem[]; 