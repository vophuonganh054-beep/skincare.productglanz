import React from 'react';
import { ArrowRight, ShieldCheck, Award, HeartHandshake } from 'lucide-react';

interface FooterProps {
  isMobileFrame?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isMobileFrame = false }) => {
  return (
    <footer className={`bg-[#202022] text-[#fcf9f4] border-t border-[#31302d] ${isMobileFrame ? 'pb-24 pt-8 px-4' : 'pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6'}`}>
      <div className={`${isMobileFrame ? 'w-full' : 'max-w-7xl mx-auto'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#31302d]">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-1.5">
              <span className="text-sm text-[#fed8c9]">✦</span>
              <span className="font-serif text-xl tracking-[0.25em] text-white">GLANZ</span>
            </div>
            <div className="text-[9px] uppercase tracking-[0.25em] text-[#898789]">
              SKINCARE • PURE ESSENCE
            </div>
            <p className="text-xs text-[#c7c6ca] font-light leading-relaxed">
              Thương hiệu dược mỹ phẩm thuần chay tiên phong chưng cất tại Zurich, Thụy Sĩ. Đánh thức vẻ rạng ngời thuần khiết của làn da.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-[#fed8c9] uppercase">
              BỘ SƯU TẬP
            </h4>
            <ul className="space-y-2 text-xs text-[#c7c6ca]">
              <li className="hover:text-white cursor-pointer transition-colors">GLANZ Gentle Purifying Cleanser (120ml)</li>
              <li className="hover:text-white cursor-pointer transition-colors">GLANZ Botanical Balancing Toner (100ml)</li>
              <li className="hover:text-white cursor-pointer transition-colors">GLANZ Radiance Glow Serum (30ml)</li>
              <li className="hover:text-white cursor-pointer transition-colors">GLANZ Regenerating Face Cream (50g)</li>
              <li className="hover:text-white cursor-pointer transition-colors">GLANZ Hydro-Lifting Sheet Mask (5x29g)</li>
            </ul>
          </div>

          {/* Care & Ethics */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-[#fed8c9] uppercase">
              CAM KẾT THỤY SĨ
            </h4>
            <ul className="space-y-2 text-xs text-[#c7c6ca]">
              <li className="hover:text-white cursor-pointer transition-colors">100% Thuần Chay (Vegan Certified)</li>
              <li className="hover:text-white cursor-pointer transition-colors">Kiểm nghiệm chuẩn Viện Da Liễu Zurich</li>
              <li className="hover:text-white cursor-pointer transition-colors">Không cồn khô, paraben & hương liệu</li>
              <li className="hover:text-white cursor-pointer transition-colors">Đổi trả miễn phí 30 ngày</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-[#fed8c9] uppercase">
              ĐẶC QUYỀN THÀNH VIÊN
            </h4>
            <p className="text-xs text-[#c7c6ca]">
              Đăng ký để nhận ưu đãi 10% cho đơn hàng đầu tiên và cẩm nang dưỡng da cá nhân hóa.
            </p>
            <div className="flex rounded-full overflow-hidden bg-[#31302d] p-1 border border-[#46464a]">
              <input
                type="email"
                placeholder="Email của bạn..."
                className="bg-transparent text-xs text-white px-3 py-1.5 focus:outline-none flex-grow min-w-0"
              />
              <button
                className="bg-white hover:bg-[#fed8c9] text-[#1c1c19] px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center shrink-0"
                title="Đăng ký"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#898789] gap-3 text-center sm:text-left">
          <p>© 2025 GLANZ Pure Essence. All rights reserved.</p>
          <div className="flex items-center space-x-4 text-[11px]">
            <span className="hover:text-white cursor-pointer">Bảo mật</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Điều khoản</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Liên hệ: contact@glanz-skincare.ch</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
