import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import collectionBannerImg from '../assets/images/glanz_collection_banner_1789749836277.jpg';

interface HeroBannerProps {
  onExploreClick: () => void;
  isMobileFrame?: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick, isMobileFrame = false }) => {
  return (
    <div className={`w-full ${isMobileFrame ? 'px-3 pt-2' : 'max-w-7xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6'}`}>
      <div className="relative overflow-hidden rounded-[2rem] shadow-sm bg-[#1c1c19] text-[#fcf9f4] aspect-[4/3] sm:aspect-[21/9] md:aspect-[2.4/1]">
        {/* Background Image: GLANZ Collection Banner */}
        <div className="absolute inset-0">
          <img
            src={collectionBannerImg}
            alt="GLANZ Pure Radiance Essence Collection"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/glanz_banner.jpg';
            }}
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Subtle gradient overlays to ensure high contrast text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent hidden md:block" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col justify-end p-5 sm:p-8 md:p-12">
          {/* Badge */}
          <div className="inline-flex items-center space-x-1.5 bg-[#ffffff]/90 backdrop-blur-md text-[#1c1c19] px-3.5 py-1 rounded-full text-[11px] font-medium tracking-wider uppercase mb-2 sm:mb-3 self-start shadow-xs">
            <Sparkles className="w-3 h-3 text-[#74584d]" />
            <span>BỘ SƯU TẬP MỚI 2025</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight leading-tight max-w-xl">
            Pure Radiance Essence
          </h1>

          {/* Subtitle */}
          <p className="text-white/85 text-xs sm:text-sm md:text-base font-light mt-1.5 sm:mt-2 max-w-lg leading-relaxed line-clamp-2 sm:line-clamp-none">
            Tinh hoa phục hồi ánh sáng làn da tự nhiên từ ngọc trai & thảo mộc Thụy Sĩ.
          </p>

          {/* Bottom Action Bar */}
          <div className="mt-4 sm:mt-6 flex items-center justify-between">
            <button
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="group inline-flex items-center space-x-2 bg-white text-[#1c1c19] hover:bg-[#fcf9f4] px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider transition-all transform active:scale-98 shadow-md"
            >
              <span>KHÁM PHÁ NGAY</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Right Info & Carousel indicators (as in Image 1) */}
            <div className="flex items-center space-x-3 text-right">
              <span className="text-white/80 text-[11px] sm:text-xs italic font-serif tracking-wide hidden xs:inline">
                Limited Edition
              </span>
              <div className="flex items-center space-x-1.5">
                <span className="w-6 sm:w-8 h-1.5 bg-white rounded-full transition-all" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
                <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
