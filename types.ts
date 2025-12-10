export interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  features: string[];
  specifications: Record<string, string>;
  image: string; // Placeholder URL
  gallery: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: number;
  name: string;
  company: string;
  text: string;
  rating: number;
}
