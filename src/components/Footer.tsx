import React from 'react';
import { Facebook, Youtube, Mail, Globe, Settings } from 'lucide-react';

interface FooterProps {
  onAdminClick: () => void;
  showAdminBtn: boolean;
}

export default function Footer({ onAdminClick, showAdminBtn }: FooterProps) {
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        
        {/* Col 1: Brand details (Spans 5) */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-2.5">
            <img
              alt="Global Kids Leaders"
              className="h-10 w-auto"
              src="https://i.postimg.cc/jSpv5SVf/cf997133-5395-4aba-83df-dbf657d38ac2.png"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col select-none">
              <span className="font-black text-[13px] sm:text-[14px] text-[#0f2d59] leading-none tracking-[0.05em] uppercase">
                GLOBAL
              </span>
              <span className="font-black text-[11px] sm:text-[12px] text-[#e08400] leading-none tracking-[0.02em] uppercase mt-0.5">
                KIDS LEADERS
              </span>
              <span className="text-[6.5px] sm:text-[7px] font-bold text-[#0f2d59]/80 leading-none tracking-[0.02em] mt-0.5 font-sans">
                Lead Today - Inspire Tomorrow
              </span>
            </div>
          </div>
          
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            Ươm tạo thế hệ trẻ tự tin, biết lãnh đạo, thuyết trình và ứng dụng công nghệ trong kỷ nguyên trí tuệ nhân tạo.
          </p>
          
          <p className="text-[#e08400] font-serif italic text-sm font-semibold">
            Learn. Lead. Inspire.
          </p>
          
          {/* Social Icons */}
          <div className="flex gap-3">
            <a
              href="https://www.facebook.com/nguyen.ly.254892/"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#0f2d59] hover:bg-[#0f2d59] hover:text-white hover:border-[#0f2d59] hover:scale-105 transition-all"
              title="Facebook Ms Lý AI"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://www.facebook.com/tranthilam.thpt"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#0f2d59] hover:bg-[#0f2d59] hover:text-white hover:border-[#0f2d59] hover:scale-105 transition-all"
              title="Facebook Ms Lâm Trần"
            >
              <Facebook size={18} className="text-blue-950" />
            </a>
            <a
              href="https://zalo.me/g/i1t0wop2coffdsqqzun0"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[#0f2d59] hover:bg-[#0f2d59] hover:text-white hover:border-[#0f2d59] hover:scale-105 transition-all"
              title="Nhóm Zalo"
            >
              <Globe size={18} />
            </a>
          </div>
        </div>

        {/* Col 2: Contact info (Spans 4) */}
        <div className="md:col-span-4 space-y-6">
          <h4 className="font-serif text-lg font-bold text-[#0f2d59] tracking-wide">
            Liên hệ & Hỗ trợ
          </h4>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="space-y-2">
              <p className="font-semibold text-gray-800">Ms Lý AI</p>
              <div className="flex flex-col gap-1.5 pl-1">
                <a 
                  href="https://www.facebook.com/nguyen.ly.254892/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#0f2d59] transition-colors"
                >
                  <Facebook size={14} className="text-[#0f2d59]" />
                  <span>Facebook Ms Lý AI</span>
                </a>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="font-semibold text-[#e08400] text-[10px] px-1.5 py-0.5 bg-amber-50 border border-amber-100 rounded">Zalo / SĐT</span>
                  <a href="tel:0962859488" className="hover:text-[#0f2d59] transition-colors">0962859488</a>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              <p className="font-semibold text-gray-800">Ms Lâm Trần</p>
              <div className="flex flex-col gap-1.5 pl-1">
                <a 
                  href="https://www.facebook.com/tranthilam.thpt" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#0f2d59] transition-colors"
                >
                  <Facebook size={14} className="text-[#0f2d59]" />
                  <span>Facebook Ms Lâm Trần</span>
                </a>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              <p className="font-semibold text-gray-800">Cộng đồng & Dự án</p>
              <div className="flex flex-col gap-1.5 pl-1">
                <a 
                  href="https://zalo.me/g/i1t0wop2coffdsqqzun0" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 text-gray-600 hover:text-[#0f2d59] transition-colors"
                >
                  <span className="text-[10px] bg-[#e08400] text-white px-1.5 py-0.5 rounded font-medium shadow-sm">Nhóm Zalo</span>
                  <span className="underline font-medium">Cộng đồng học thuật</span>
                </a>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={14} className="text-[#0f2d59]" />
                  <a href="mailto:contact@globalkidsleaders.edu.vn" className="hover:text-[#0f2d59] transition-colors text-xs">
                    contact@globalkidsleaders.edu.vn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Hashtags (Spans 3) */}
        <div className="md:col-span-3 space-y-6">
          <h4 className="font-serif text-lg font-bold text-[#0f2d59] tracking-wide">
            Hashtags
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              '#GlobalKidsLeaders',
              '#MsLyAI',
              '#MsLamTran',
              '#KidLeaders',
              '#FutureReady',
              '#AIforDesign',
              '#EnglishSpeaking',
            ].map((tag, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 bg-white border border-gray-100 rounded-full text-xs text-gray-500 hover:text-[#0f2d59] hover:border-[#e08400] transition-colors font-medium shadow-sm cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Footer Bottom Row */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400 text-xs font-light">
        <div className="flex items-center gap-2">
          <span>© 2026 Global Kids Leaders. All rights reserved.</span>
          {showAdminBtn && (
            <button
              onClick={onAdminClick}
              className="inline-flex items-center gap-1 text-[#0f2d59] hover:underline hover:text-[#0a2142] font-semibold"
            >
              <Settings size={12} />
              Quản trị viên
            </button>
          )}
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-[#0f2d59] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#0f2d59] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
