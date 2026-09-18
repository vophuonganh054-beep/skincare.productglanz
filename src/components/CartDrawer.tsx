import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Check, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckoutSuccess: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 500000;
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 30000;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const amountNeededForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShipPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GLANZ2025') {
      setDiscountPercent(10);
      setPromoMessage({ text: 'Áp dụng thành công mã GLANZ2025 (-10%)', isError: false });
    } else {
      setPromoMessage({ text: 'Mã giảm giá không hợp lệ. Thử: GLANZ2025', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#fcf9f4] shadow-2xl h-full flex flex-col z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#202022]/10 flex items-center justify-between bg-white">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5 text-[#1c1c19]" />
            <h3 className="font-serif text-lg font-normal text-[#1c1c19]">
              Giỏ Hàng ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#77767b] hover:text-[#1c1c19] rounded-full hover:bg-[#f0ede9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="p-3.5 bg-[#f6f3ee] border-b border-[#202022]/6 text-xs">
          {amountNeededForFreeShip > 0 ? (
            <p className="text-[#46464a]">
              Mua thêm <span className="font-semibold text-[#74584d]">{amountNeededForFreeShip.toLocaleString('vi-VN')}₫</span> để được <span className="font-semibold text-[#1c1c19]">Miễn Phí Vận Chuyển</span>
            </p>
          ) : (
            <p className="text-[#8a9a86] font-medium flex items-center space-x-1">
              <Check className="w-3.5 h-3.5" />
              <span>Chúc mừng! Bạn đã nhận đặc quyền Miễn Phí Vận Chuyển.</span>
            </p>
          )}
          <div className="w-full bg-[#ebe8e3] h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#74584d] h-full rounded-full transition-all duration-300"
              style={{ width: `${freeShipPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-grow overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#f0ede9] flex items-center justify-center text-[#77767b] mb-3">
                <ShoppingBag className="w-7 h-7 stroke-[1.25]" />
              </div>
              <p className="font-serif text-base text-[#1c1c19]">Giỏ hàng của bạn đang trống</p>
              <p className="text-xs text-[#77767b] mt-1 max-w-xs">
                Khám phá các sản phẩm trong bộ sưu tập Pure Radiance 2025 để bắt đầu nghi thức dưỡng da.
              </p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="bg-white rounded-2xl p-3 border border-[#202022]/6 flex space-x-3 items-center"
              >
                <div className="w-16 h-16 rounded-xl bg-[#f6f3ee] overflow-hidden shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.product.fallbackImage;
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <h4 className="font-serif text-xs sm:text-sm font-medium text-[#1c1c19] truncate">
                    {item.product.name}
                  </h4>
                  <div className="text-[10px] text-[#77767b] uppercase tracking-wider">
                    {item.product.capacity}
                  </div>
                  <div className="text-xs font-semibold text-[#1c1c19] mt-1">
                    {item.product.price.toLocaleString('vi-VN')}₫
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-[#77767b] hover:text-[#ba1a1a] p-1 transition-colors"
                    title="Xóa"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center space-x-2 bg-[#f6f3ee] rounded-full px-2 py-0.5 border border-[#ebe8e3]">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                      className="text-xs text-[#46464a] px-1 hover:text-[#1c1c19]"
                    >
                      -
                    </button>
                    <span className="text-[11px] font-medium w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      className="text-xs text-[#46464a] px-1 hover:text-[#1c1c19]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#202022]/10 space-y-3">
            {/* Promo code */}
            <form onSubmit={applyPromo} className="flex space-x-2">
              <div className="relative flex-grow">
                <Tag className="w-3.5 h-3.5 text-[#77767b] absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Mã ưu đãi (thử GLANZ2025)"
                  className="w-full text-xs pl-8 pr-3 py-2 bg-[#f6f3ee] rounded-xl border border-[#ebe8e3] uppercase focus:outline-none focus:ring-1 focus:ring-[#74584d]"
                />
              </div>
              <button
                type="submit"
                className="bg-[#202022] hover:bg-[#08080a] text-white text-xs px-3.5 py-2 rounded-xl font-medium tracking-wider"
              >
                Áp dụng
              </button>
            </form>

            {promoMessage && (
              <p
                className={`text-[11px] ${
                  promoMessage.isError ? 'text-[#ba1a1a]' : 'text-[#8a9a86]'
                }`}
              >
                {promoMessage.text}
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#46464a] pt-2 border-t border-[#f0ede9]">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span className="font-medium text-[#1c1c19]">{subtotal.toLocaleString('vi-VN')}₫</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#74584d]">
                  <span>Ưu đãi (10%)</span>
                  <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Vận chuyển</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-[#8a9a86] font-medium">Miễn phí</span>
                  ) : (
                    `${shippingFee.toLocaleString('vi-VN')}₫`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm sm:text-base font-serif font-semibold text-[#1c1c19] pt-1.5 border-t border-[#f0ede9]">
                <span>Tổng thanh toán</span>
                <span>{total.toLocaleString('vi-VN')}₫</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="cart-checkout-btn"
              onClick={onCheckoutSuccess}
              className="w-full py-3 bg-[#202022] hover:bg-[#08080a] text-white rounded-full text-xs font-semibold tracking-wider flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98"
            >
              <span>TIẾN HÀNH ĐẶT HÀNG</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
