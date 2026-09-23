import React from 'react';

interface AlpsIconProps {
  className?: string;
  size?: number;
  color?: string;
}

/**
 * Biểu tượng Ngọn Núi Nhọn ALPS nguyên bản (Sharp Mountain Peak):
 * - Đỉnh núi nhọn hình tam giác thanh khiết biểu trưng đỉnh Matterhorn / dãy Alps hùng vĩ
 * - Tạo hình chữ 'A' cách điệu - chữ cái đại diện của thương hiệu ALPS
 * - Vạch tuyết vĩnh cửu băng hà cắt ngang tạo thành thanh ngang chữ 'A'
 * - Đường sống núi (summit ridge) thẳng đứng sắc nét từ đỉnh
 * - Phong cách Quiet Luxury tối giản, sang trọng và chuẩn mực
 */
export const AlpsIcon: React.FC<AlpsIconProps> = ({
  className = 'w-7 h-7',
  size,
  color = '#74584d',
}) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      {/* Ngọn núi nhọn chính - Khối tam giác sắc nét tạo chữ 'A' */}
      <path
        d="M24 5L43 41H5L24 5Z"
        stroke={color}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Vạch nẹp tuyết vĩnh cửu băng hà (thanh ngang chữ 'A') */}
      <path
        d="M14 27L24 22L34 27"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Sống núi nhọn thẳng đứng phân cách sườn tuyết */}
      <path
        d="M24 5V22"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  );
};

interface AlpsLogoProps {
  variant?: 'full' | 'icon' | 'stacked';
  className?: string;
  textColor?: string;
  iconColor?: string;
  subtitle?: string;
}

export const AlpsLogo: React.FC<AlpsLogoProps> = ({
  variant = 'full',
  className = '',
  textColor = 'text-[#1c1c19]',
  iconColor = '#74584d',
  subtitle = 'PURE ESSENCE',
}) => {
  if (variant === 'icon') {
    return <AlpsIcon className={className || 'w-7 h-7'} color={iconColor} />;
  }

  return (
    <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
      {/* Biểu tượng ngọn núi nhọn chữ 'A' */}
      <AlpsIcon
        className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-105"
        color={iconColor}
      />

      {/* Tên thương hiệu ALPS sang trọng */}
      <div className={`font-serif text-xl sm:text-2xl font-normal tracking-[0.28em] ${textColor} leading-tight mt-1 pl-1`}>
        ALPS
      </div>

      {subtitle && (
        <span className="text-[8px] sm:text-[9px] tracking-[0.26em] text-[#74584d] font-semibold uppercase mt-0.5">
          {subtitle}
        </span>
      )}
    </div>
  );
};
