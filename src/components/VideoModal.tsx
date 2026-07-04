import React from 'react';
import { X, Play, Info } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
      />

      {/* Modal Container */}
      <div
        className={`relative bg-black w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-white/10 z-10 flex flex-col transition-all duration-500 transform ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'
        }`}
      >
        {/* Header / Info bar */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white border border-white/10 text-xs">
          <Play size={12} className="text-[#e08400] fill-current" />
          <span className="font-semibold tracking-wide uppercase">Giới thiệu: Global Kids Leaders</span>
        </div>

        {/* Absolute Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 hover:border-white/35 transition-all shadow-md cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* 9:16 Video Aspect Wrapper */}
        <div className="relative aspect-[9/16] w-full bg-neutral-950">
          <iframe
            title="Global Kids Leaders Video Presentation"
            src="https://drive.google.com/file/d/1I3LR4omIiMzUG6dMvWMUU3rHg-OsLy_Y/preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        {/* Bottom Info bar */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 text-neutral-400 text-xs sm:text-sm font-light flex items-center gap-3">
          <Info size={16} className="text-[#e08400] shrink-0" />
          <p>
            Đây là mô hình lớp học kỹ năng thế hệ mới kết hợp rèn luyện tiếng Anh phản xạ, tư duy nói trước đám đông và khai phá AI ứng dụng.
          </p>
        </div>
      </div>
    </div>
  );
}
