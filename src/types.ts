export interface Product {
  id: string;
  name: string;
  shortName: string;
  capacity: string;
  category: 'all' | 'serum' | 'cream' | 'toner' | 'mask' | 'cleanser';
  categoryLabel: string;
  tag: string;
  tagType: 'bestseller' | 'regen' | 'hydrate' | 'mask' | 'cleanser' | 'default';
  subtitle: string;
  description: string;
  rating: number;
  reviewCount: number;
  soldCount: string;
  price: number;
  originalPrice?: number;
  note?: string;
  image: string; // Links to uploaded image (e.g. 'Image 6.jpeg')
  fallbackImage: string; // Resilient fallback high-res aesthetic photography
  keyIngredients: string[];
  benefits: string[];
  usage: string;
  routineStepNumber: number;
  routineStepTitle: string;
  inStock: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export type ActiveTab = 'home' | 'catalog' | 'wishlist' | 'cart' | 'account' | 'routine';
export type ViewMode = 'desktop' | 'mobile' | 'responsive';
