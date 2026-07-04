import React from 'react';
import { motion } from 'motion/react';
import { Star, Award, DollarSign } from 'lucide-react';

interface ScarcityProps {
  currentCount: number; // dynamically computed
}

export default function Scarcity({ currentCount }: ScarcityProps) {
  return (
    <section className="py-24 relative bg-[#091b35] text-white overflow-hidden">
      {/* Repeating radial dot background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, #ffffff 1.5px, transparent 0)', 
            backgroundSize: '40px 40px' 
          }} 
        />
      </div>

      {/* Decorative colored ambient glow orbs */}
      <div className="absolute top-1/4 -left-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Cơ hội trở thành 10 Host đầu tiên của dự án
          </h2>
          <div className="w-16 h-1 bg-[#e08400] mx-auto rounded-full" />
        </motion.div>

        {/* Glassmorphic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card p-8 rounded-2xl border-white/10 hover:border-[#e08400]/40 hover:bg-white/[0.12] transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-[#e08400]/20 text-[#e08400] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star size={24} className="fill-[#e08400]" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-white mb-3">
                100% Miễn phí
              </h4>
              <p className="text-gray-300/95 text-sm leading-relaxed font-sans font-light">
                Được đào tạo kỹ năng Host bài bản hoàn toàn không thu phí cho khóa đầu.
              </p>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl border-white/10 hover:border-[#e08400]/40 hover:bg-white/[0.12] transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-[#e08400]/20 text-[#e08400] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Award size={24} className="text-[#e08400]" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-white mb-3">
                Certificate
              </h4>
              <p className="text-gray-300/95 text-sm leading-relaxed font-sans font-light">
                Nhận chứng nhận Official Kid Leader Host sau khi hoàn thành khóa huấn luyện.
              </p>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-8 rounded-2xl border-white/10 hover:border-[#e08400]/40 hover:bg-white/[0.12] transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-[#e08400]/20 text-[#e08400] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <DollarSign size={24} className="text-[#e08400]" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-white mb-3">
                Income
              </h4>
              <p className="text-gray-300/95 text-sm leading-relaxed font-sans font-light">
                Cơ hội tạo ra thu nhập từ các dự án cộng đồng và trợ giảng sau này.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
