import React from 'react';
import { motion } from 'motion/react';
import { Award, ArrowUpRight } from 'lucide-react';

interface FinalCTAProps {
  onRegisterClick: () => void;
}

export default function FinalCTA({ onRegisterClick }: FinalCTAProps) {
  return (
    <section className="py-24 bg-[#0f2d59] text-white text-center relative overflow-hidden">
      {/* Dynamic light rays */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-4xl mx-auto px-6 space-y-8 relative z-10 font-sans">
        
        {/* Animated Trophy Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="mx-auto w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 text-[#e08400] mb-2"
        >
          <Award size={36} className="animate-bounce" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
        >
          Con bạn có thể là một trong 10 Kid Leaders đầu tiên
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-xl text-gray-100 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Đừng bỏ lỡ cơ hội giúp con dẫn đầu trong tương lai số. Hiện tại chỉ còn 3 vị trí trống cuối cùng cho Founding Host.
        </motion.p>

        {/* Action Button & Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-4 pt-4"
        >
          <button
            onClick={onRegisterClick}
            className="group flex items-center gap-2 bg-[#e08400] text-white px-12 py-5 rounded-2xl font-bold hover:scale-105 hover:bg-[#c27200] active:scale-95 transition-all text-lg shadow-xl border border-[#e08400]"
          >
            Đăng ký ứng tuyển ngay
            <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
          
          <p className="text-white/50 text-xs sm:text-sm italic tracking-wide font-light">
            * Hạn chót nhận hồ sơ sẽ kết thúc khi đủ số lượng
          </p>
        </motion.div>

      </div>
    </section>
  );
}
