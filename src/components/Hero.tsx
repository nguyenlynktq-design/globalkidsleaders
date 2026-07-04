import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeroProps {
  onRegisterClick: () => void;
}

export default function Hero({ onRegisterClick }: HeroProps) {
  return (
    <header className="relative pt-24 pb-16 bg-gradient-to-b from-white to-[#f5f8fc] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        
        {/* Combined Billboard Structure */}
        <div className="w-full bg-white rounded-[32px] overflow-hidden shadow-xl border border-blue-100/50 flex flex-col">
          
          {/* Top Section: Clear Banner Image with Elegant Text Overlay */}
          <div className="w-full relative bg-[#fcfdfd] overflow-hidden">
            <img
              alt="Global Kids Leaders Banner"
              className="w-full h-auto object-contain max-h-[600px] mx-auto"
              src="https://i.postimg.cc/K8LdGVkx/6c247589-865b-4c8c-b6a2-003865f128ca.png"
              referrerPolicy="no-referrer"
            />
            {/* Elegant dark gradient backing overlay directly on the image to make the text pop perfectly */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6 sm:p-8 md:p-12 text-center">
              <div className="max-w-4xl mx-auto space-y-4">
                {/* Tagline Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 bg-[#e08400] text-white px-4 py-1.5 sm:py-2 rounded-full font-sans text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-lg"
                >
                  <Sparkles size={14} className="animate-pulse text-white shrink-0" />
                  <span className="text-center">
                    Tuyển chọn duy nhất <span className="whitespace-nowrap">10 Founding Kid Leaders đầu tiên</span>
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-serif text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight font-bold drop-shadow-md"
                >
                  Chính thức khởi động dự án{' '}
                  <span className="text-[#e08400] relative inline-block">
                    Global Kids Leaders
                    <span className="absolute left-0 bottom-1 w-full h-[2px] sm:h-[3px] bg-[#e08400] rounded-full opacity-60" />
                  </span>
                </motion.h1>
              </div>
            </div>
          </div>

          {/* Bottom Section (Footer of the Image): Elegant Subtitle & Actions Content */}
          <div className="w-full px-6 py-8 sm:py-10 bg-gradient-to-b from-[#fafefe] to-[#f5f8fc] border-t border-blue-50 text-center space-y-6">
            
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-sans text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto font-light"
            >
              Ươm tạo thế hệ Kid Leaders tự tin giao tiếp tiếng Anh, biết lãnh đạo, thuyết trình và ứng dụng AI trong học tập, sáng tạo.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
            >
              <button
                onClick={onRegisterClick}
                className="group flex items-center justify-center gap-2 bg-[#0f2d59] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#0a2142] hover:scale-105 active:scale-95 transition-all text-base shadow-lg shadow-blue-950/10 cursor-pointer"
              >
                Đăng ký ứng tuyển ngay
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#program"
                className="flex items-center justify-center bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 active:scale-95 transition-all text-base shadow-sm"
              >
                Khám phá hành trình
              </a>
            </motion.div>
          </div>

        </div>
      </div>
    </header>
  );
}
