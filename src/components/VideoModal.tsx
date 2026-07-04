import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Info } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-black w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-white/10 z-10 flex flex-col"
          >
            {/* Header / Info bar */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white border border-white/10 text-xs">
              <Play size={12} className="text-[#e08400] fill-current" />
              <span className="font-semibold tracking-wide uppercase">Giới thiệu: Global Kids Leaders</span>
            </div>

            {/* Absolute Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/10 hover:border-white/35 transition-all shadow-md"
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
