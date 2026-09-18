import React from 'react';
import { X, User, Award, Package, Clock, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';

interface AccountDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export const AccountDrawer: React.FC<AccountDrawerProps> = ({
  isOpen,
  onClose,
  userEmail = 'vophuonganh054@gmail.com',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#fcf9f4] shadow-2xl h-full flex flex-col z-10">
        <div className="p-4 sm:p-5 border-b border-[#202022]/10 flex items-center justify-between bg-white">
          <h3 className="font-serif text-lg font-normal text-[#1c1c19]">
            Hồ Sơ Khách Hàng GLANZ
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-[#77767b] hover:text-[#1c1c19] rounded-full hover:bg-[#f0ede9] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* User Profile Card */}
          <div className="bg-white rounded-3xl p-4 border border-[#202022]/6 flex items-center space-x-3 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-[#f6f3ee] flex items-center justify-center text-[#74584d] font-serif text-lg border border-[#ebe8e3]">
              PA
            </div>
            <div className="min-w-0 flex-grow">
              <h4 className="font-serif text-base font-normal text-[#1c1c19] truncate">
                Phương Anh
              </h4>
              <p className="text-xs text-[#77767b] truncate">{userEmail}</p>
              <div className="inline-flex items-center space-x-1 mt-1 text-[10px] text-[#74584d] bg-[#fed8c9]/40 px-2 py-0.5 rounded-full font-medium">
                <Award className="w-3 h-3" />
                <span>Hội Viên GLANZ Pure Privileges</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-3 border border-[#202022]/6 text-center">
              <span className="text-[10px] text-[#77767b] uppercase tracking-wider block">ĐIỂM TÍCH LŨY</span>
              <span className="font-serif text-xl text-[#1c1c19] font-medium mt-0.5 block">1.250</span>
              <span className="text-[10px] text-[#8a9a86]">Đổi 125.000₫ ưu đãi</span>
            </div>
            <div className="bg-white rounded-2xl p-3 border border-[#202022]/6 text-center">
              <span className="text-[10px] text-[#77767b] uppercase tracking-wider block">HẠNG THÀNH VIÊN</span>
              <span className="font-serif text-xl text-[#74584d] font-medium mt-0.5 block">Luminous</span>
              <span className="text-[10px] text-[#77767b]">Free Ship mọi đơn</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-3xl p-2 border border-[#202022]/6 divide-y divide-[#f0ede9] text-xs">
            <button className="w-full p-3 flex items-center justify-between hover:bg-[#fcf9f4] rounded-xl transition-colors">
              <div className="flex items-center space-x-3 text-[#1c1c19]">
                <Package className="w-4 h-4 text-[#77767b]" />
                <span>Lịch sử đơn hàng của tôi</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#c7c6ca]" />
            </button>

            <button className="w-full p-3 flex items-center justify-between hover:bg-[#fcf9f4] rounded-xl transition-colors">
              <div className="flex items-center space-x-3 text-[#1c1c19]">
                <Clock className="w-4 h-4 text-[#77767b]" />
                <span>Theo dõi chu kỳ thay thế mỹ phẩm</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#c7c6ca]" />
            </button>

            <button className="w-full p-3 flex items-center justify-between hover:bg-[#fcf9f4] rounded-xl transition-colors">
              <div className="flex items-center space-x-3 text-[#1c1c19]">
                <ShieldCheck className="w-4 h-4 text-[#77767b]" />
                <span>Chính sách bảo hành & đổi trả Thụy Sĩ</span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#c7c6ca]" />
            </button>
          </div>

          {/* Swiss Guarantee note */}
          <div className="bg-[#f0ede9] rounded-2xl p-4 text-xs text-[#46464a] leading-relaxed border border-[#ebe8e3]">
            <p className="font-serif font-medium text-[#1c1c19] mb-1">
              Cam kết bảo chứng Thụy Sĩ:
            </p>
            Tất cả sản phẩm GLANZ đều được phân phối chính hãng kèm tem xác thực điện tử và bảo hành đổi trả trong 30 ngày nếu phát hiện kích ứng.
          </div>
        </div>
      </div>
    </div>
  );
};
