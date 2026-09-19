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

export interface OrderItem {
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'processing' | 'shipping' | 'delivered' | 'completed';
  statusLabel: string;
  buyerName?: string;
  phone?: string;
  shippingAddress?: string;
  paymentMethod?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  tier: string;
  points: number;
  avatarInitials: string;
  isLoggedIn: boolean;
}
