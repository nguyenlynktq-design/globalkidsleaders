import React from 'react';
import { motion } from 'motion/react';
import { Globe, Users, Mic, Cpu } from 'lucide-react';

const cards = [
  {
    icon: Globe,
    title: 'English Communication',
    description: 'Sử dụng tiếng Anh như một công cụ tự nhiên để kết nối với thế giới bên ngoài.',
    color: 'text-[#0f2d59]',
    bgColor: 'bg-[#0f2d59]/10',
  },
  {
    icon: Users,
    title: 'Leadership',
    description: 'Phát triển tư duy quản lý, trách nhiệm và khả năng dẫn dắt đội nhóm xuất sắc.',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    icon: Mic,
    title: 'Public Speaking',
    description: 'Tự tin trình bày ý tưởng trước công chúng một cách lôi cuốn và thuyết phục.',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Cpu,
    title: 'AI & Digital Skills',
    description: 'Làm chủ các công cụ AI để tối ưu hóa việc học tập và thiết kế nội dung sáng tạo.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

export default function Vision() {
  return (
    <section id="vision" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0f2d59] font-bold"
          >
            Thế Giới Đang Thay Đổi
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-1 bg-[#e08400] mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-lg text-gray-600 leading-relaxed font-light"
          >
            Trong kỷ nguyên AI, kiến thức không còn là rào cản. Kỹ năng dẫn dắt, tư duy số và khả năng kết nối toàn cầu chính là chìa khóa mở ra tương lai.
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8, boxShadow: '0 10px 30px rgba(15, 45, 89, 0.08)' }}
                className="p-8 bg-gray-50/50 border border-gray-100 rounded-2xl transition-all duration-300 group hover:bg-white flex flex-col items-start"
              >
                {/* Icon wrapper */}
                <div className={`p-4 rounded-xl ${card.bgColor} ${card.color} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  <IconComponent size={28} />
                </div>
                
                <h3 className="font-serif text-xl font-bold text-gray-800 mb-4 tracking-tight">
                  {card.title}
                </h3>
                
                <p className="text-gray-600 text-sm leading-relaxed font-sans">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
