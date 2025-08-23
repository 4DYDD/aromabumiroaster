export interface Product {
  id: string;
  name: string;
  price: number;
  origin: string;
  description?: string; // Optional description property
  image?: string; // Optional image property
}
