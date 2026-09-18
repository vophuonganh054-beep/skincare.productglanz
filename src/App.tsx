import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { Product, CartItem, ActiveTab, ViewMode } from './types';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { RitualCallout } from './components/RitualCallout';
import { CatalogSection } from './components/CatalogSection';
import { BrandPhilosophy } from './components/BrandPhilosophy';
import { BottomNav } from './components/BottomNav';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { RitualModal } from './components/RitualModal';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
import { AccountDrawer } from './components/AccountDrawer';
import { Footer } from './components/Footer';
import { Smartphone, Monitor, Sparkles, Check } from 'lucide-react';

export default function App() {
  // Device view mode: 'desktop' | 'mobile' | 'responsive'
  const [viewMode, setViewMode] = useState<ViewMode>('responsive');

  // Navigation tab
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (initialize with 2 items to match the '2' badge in user screenshot Image 1)
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // GLANZ Radiance Glow Serum
      quantity: 1,
    },
    {
      product: PRODUCTS[1], // GLANZ Regenerating Face Cream
      quantity: 1,
    },
  ]);

  // Wishlist State (initialize with serum and face cream saved)
  const [wishlistIds, setWishlistIds] = useState<Set<string>>(
    new Set(['serum-radiance', 'cream-regenerating'])
  );

  // Modals and Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toast notification helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart Actions
  const handleAddToCart = (product: Product, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleAddFullSetToCart = () => {
    PRODUCTS.forEach((product) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { product, quantity: 1 }];
      });
    });
    setIsCartOpen(true);
    showToast('Đã thêm trọn bộ Nghi thức 4 bước vào giỏ hàng!');
  };

  const handleCheckoutSuccess = () => {
    setCart([]);
    setIsCartOpen(false);
    setIsCheckoutSuccessOpen(true);
  };

  // Wishlist Actions
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlistIds((prev) => {
      const next = new Set(prev);
      if (next.has(product.id)) {
        next.delete(product.id);
        showToast(`Đã xóa ${product.name} khỏi yêu thích`);
      } else {
        next.add(product.id);
        showToast(`Đã lưu ${product.name} vào yêu thích`);
      }
      return next;
    });
  };

  // Tab switcher
  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);
    if (tab === 'cart') {
      setIsCartOpen(true);
    } else if (tab === 'wishlist') {
      setIsWishlistOpen(true);
    } else if (tab === 'account') {
      setIsAccountOpen(true);
    } else if (tab === 'routine') {
      setIsRitualModalOpen(true);
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.has(p.id));

  // Determine if we should wrap in simulated phone frame
  const isMobileSimulation = viewMode === 'mobile';

  return (
    <div className="min-h-screen bg-[#fcf9f4] text-[#1c1c19] flex flex-col font-sans">
      {/* Top Device Mode Toolbar for testing desktop vs phone views */}
      <div className="bg-[#1c1c19] text-[#fcf9f4] text-xs py-2 px-4 border-b border-[#31302d] flex items-center justify-between shadow-xs sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <span className="text-[#fed8c9]">✦</span>
          <span className="font-medium tracking-wide">
            GLANZ Skincare • Đa Màn Hình
          </span>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <span className="text-[#77767b] text-[11px] hidden sm:inline mr-1">Chuyển chế độ xem:</span>
          <button
            id="view-mode-responsive-btn"
            onClick={() => setViewMode('responsive')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all ${
              viewMode === 'responsive'
                ? 'bg-[#ffffff] text-[#1c1c19] shadow-xs'
                : 'text-[#c7c6ca] hover:text-white bg-[#31302d]/60'
            }`}
          >
            Tự Động (Responsive)
          </button>
          <button
            id="view-mode-desktop-btn"
            onClick={() => setViewMode('desktop')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all flex items-center space-x-1 ${
              viewMode === 'desktop'
                ? 'bg-[#ffffff] text-[#1c1c19] shadow-xs'
                : 'text-[#c7c6ca] hover:text-white bg-[#31302d]/60'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Máy Tính</span>
          </button>
          <button
            id="view-mode-mobile-btn"
            onClick={() => setViewMode('mobile')}
            className={`px-3 py-1 rounded-full text-[11px] font-medium transition-all flex items-center space-x-1 ${
              viewMode === 'mobile'
                ? 'bg-[#ffffff] text-[#1c1c19] shadow-xs'
                : 'text-[#c7c6ca] hover:text-white bg-[#31302d]/60'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Màn Hình Điện Thoại</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isMobileSimulation ? (
        /* Mobile Simulator Container matching Image 1 exactly */
        <div className="flex-grow py-6 px-3 flex items-center justify-center bg-[#f0ede9]">
          <div className="w-full max-w-[420px] bg-[#fcf9f4] rounded-[2.5rem] shadow-2xl border-[10px] border-[#1c1c19] overflow-hidden flex flex-col relative min-h-[840px] max-h-[920px]">
            {/* Phone Speaker & Camera Notch */}
            <div className="bg-[#1c1c19] pt-2 pb-1 flex justify-center items-center z-50">
              <div className="w-20 h-4 bg-black rounded-full flex items-center justify-end px-3">
                <div className="w-2 h-2 rounded-full bg-[#31302d]" />
              </div>
            </div>

            {/* Simulated Phone Content Scroll Area */}
            <div className="overflow-y-auto flex-grow relative pb-20 scrollbar-none">
              <Header
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                cartCount={totalCartCount}
                wishlistCount={wishlistIds.size}
                onOpenCart={() => setIsCartOpen(true)}
                onOpenWishlist={() => setIsWishlistOpen(true)}
                activeTab={activeTab}
                onSelectTab={handleSelectTab}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                isMobileFrame={true}
              />

              <HeroBanner
                onExploreClick={() => {
                  const el = document.getElementById('catalog-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                isMobileFrame={true}
              />

              <RitualCallout
                onOpenRitual={() => setIsRitualModalOpen(true)}
                isMobileFrame={true}
              />

              <div id="catalog-section">
                <CatalogSection
                  products={PRODUCTS}
                  onSelectProduct={setSelectedProduct}
                  onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
                  onToggleWishlist={handleToggleWishlist}
                  wishlistIds={wishlistIds}
                  searchQuery={searchQuery}
                  isMobileFrame={true}
                />
              </div>

              <BrandPhilosophy isMobileFrame={true} />

              <Footer isMobileFrame={true} />
            </div>

            {/* Bottom Nav inside Phone Frame */}
            <div className="absolute bottom-0 left-0 right-0 z-40">
              <BottomNav
                activeTab={activeTab}
                onSelectTab={handleSelectTab}
                cartCount={totalCartCount}
                wishlistCount={wishlistIds.size}
                onOpenCart={() => setIsCartOpen(true)}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Full Layout (Desktop & Fluid Responsive Mode) */
        <div className="flex-grow flex flex-col">
          <Header
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            cartCount={totalCartCount}
            wishlistCount={wishlistIds.size}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isMobileFrame={false}
          />

          <main className="flex-grow pb-16 sm:pb-0">
            <HeroBanner
              onExploreClick={() => {
                const el = document.getElementById('desktop-catalog');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              isMobileFrame={false}
            />

            <RitualCallout
              onOpenRitual={() => setIsRitualModalOpen(true)}
              isMobileFrame={false}
            />

            <div id="desktop-catalog">
              <CatalogSection
                products={PRODUCTS}
                onSelectProduct={setSelectedProduct}
                onAddToCart={(p, e) => handleAddToCart(p, 1, e)}
                onToggleWishlist={handleToggleWishlist}
                wishlistIds={wishlistIds}
                searchQuery={searchQuery}
                isMobileFrame={false}
              />
            </div>

            <BrandPhilosophy isMobileFrame={false} />
          </main>

          <Footer isMobileFrame={false} />

          {/* Bottom Nav appears on small screens when in responsive mode */}
          <div className="block sm:hidden">
            <BottomNav
              activeTab={activeTab}
              onSelectTab={handleSelectTab}
              cartCount={totalCartCount}
              wishlistCount={wishlistIds.size}
              onOpenCart={() => setIsCartOpen(true)}
            />
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, qty) => handleAddToCart(p, qty)}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onSelectProduct={setSelectedProduct}
      />

      {/* Ritual 4-Step Modal */}
      <RitualModal
        isOpen={isRitualModalOpen}
        onClose={() => setIsRitualModalOpen(false)}
        onSelectProduct={setSelectedProduct}
        onAddFullSetToCart={handleAddFullSetToCart}
      />

      {/* Account Profile Drawer */}
      <AccountDrawer
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      {/* Order Confirmation Modal */}
      <CheckoutSuccessModal
        isOpen={isCheckoutSuccessOpen}
        onClose={() => setIsCheckoutSuccessOpen(false)}
        orderNumber="GLANZ-89421"
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#202022] text-white text-xs px-4 py-2.5 rounded-full shadow-lg flex items-center space-x-2 animate-fade-in border border-[#46464a]">
          <Sparkles className="w-3.5 h-3.5 text-[#fed8c9]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
