import React from 'react';
import { CheckCircle2, Sparkles, X, Package } from 'lucide-react';

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
}

export const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  isOpen,
  onClose,
  orderNumber,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl p-6 sm:p-8 text-center z-10 border border-[#202022]/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#77767b] hover:text-[#1c1c19] p-1.5"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-16 h-16 rounded-full bg-[#8a9a86]/15 text-[#8a9a86] flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 stroke-[1.5]" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.2em] text-[#74584d] font-semibold block mb-1">
          ĐẶT HÀNG THÀNH CÔNG
        </span>

        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#1c1c19]">
          Cảm ơn bạn đã lựa chọn GLANZ
        </h3>

        <p className="text-xs text-[#46464a] mt-2 leading-relaxed">
          Đơn hàng <span className="font-semibold text-[#1c1c19]">#{orderNumber}</span> đã được chuyển đến bộ phận đóng gói theo tiêu chuẩn phòng sạch Zurich.
        </p>

        <div className="bg-[#fcf9f4] rounded-2xl p-4 mt-5 text-left border border-[#ebe8e3] text-xs space-y-2">
          <div className="flex items-center space-x-2 text-[#74584d] font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Đặc quyền gửi kèm đơn hàng:</span>
          </div>
          <ul className="text-[#46464a] space-y-1 pl-6 list-disc">
            <li>01 Túi vải nhung lót lụa GLANZ Pure Essence</li>
            <li>Bộ mẫu thử 3 ngày dòng Serum Tái Sinh Ngọc Trai</li>
            <li>Thư cảm ơn và chứng thư bảo chứng xuất xứ Zurich</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 bg-[#202022] hover:bg-black text-white text-xs font-semibold tracking-wider rounded-full shadow-md transition-all active:scale-98"
        >
          TIẾP TỤC TRẢI NGHIỆM
        </button>
      </div>
    </div>
  );
};
