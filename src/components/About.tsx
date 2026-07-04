import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Play } from 'lucide-react';

interface AboutProps {
  onPlayClick: () => void;
}

export default function About({ onPlayClick }: AboutProps) {
  return (
    <section id="program" className="py-24 bg-[#f8f9ff] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#0f2d59] font-bold tracking-tight whitespace-nowrap">
                Global Kids Leaders là gì?
              </h2>
              <div className="w-20 h-1 bg-[#e08400] rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed font-light"
            >
              <p>
                <strong>Global Kids Leaders</strong> là một hệ sinh thái giáo dục dành cho trẻ em trong thời đại AI, được đồng sáng lập bởi <strong className="font-semibold text-gray-900">Ms Lý AI</strong> và CEO <strong className="font-semibold text-gray-900">Ms Lâm Trần</strong>.
              </p>
              <p>
                Chúng tôi tin rằng, lợi thế của một đứa trẻ trong tương lai không chỉ đến từ điểm số, mà còn từ khả năng giao tiếp, lãnh đạo, sáng tạo và ứng dụng công nghệ để tạo ra giá trị.
              </p>
              <p className="font-medium text-gray-900 text-sm sm:text-base tracking-wide uppercase">
                Vì vậy, Global Kids Leaders được xây dựng để giúp các em:
              </p>
            </motion.div>

            {/* List of features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {[
                { emoji: '🌍', text: 'Tự tin sử dụng tiếng Anh trong học tập và giao tiếp.' },
                { emoji: '🎤', text: 'Rèn luyện kỹ năng lãnh đạo thông qua các hoạt động thực hành và dự án cộng đồng.' },
                { emoji: '🤖', text: 'Ứng dụng AI để học tập, sáng tạo và phát triển tư duy công nghệ.' },
                { emoji: '🚀', text: 'Xây dựng sự tự tin, bản lĩnh và kỹ năng của một công dân toàn cầu.' },
                { emoji: '💡', text: 'Phát triển theo lộ trình Learner → Kid Leader → Host, từng bước tạo ra giá trị cho cộng đồng.' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3.5 group">
                  <span className="text-xl sm:text-2xl shrink-0 mt-0.5 transition-transform group-hover:scale-115 duration-200 select-none">
                    {item.emoji}
                  </span>
                  <span className="text-gray-700 font-sans text-sm sm:text-base leading-relaxed group-hover:text-gray-950 transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Video Thumbnail block */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[9/16] w-full max-w-[340px] rounded-3xl overflow-hidden shadow-2xl border border-gray-100 group cursor-pointer"
              onClick={onPlayClick}
            >
              <img
                alt="Digital Learning Scene"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://i.postimg.cc/zXSWRstp/2a-Obo-Qi44Qo-A9HXcfz-IGcv-Sx-YCeaxz-Nr3WMFpu-XA.jpg"
              />
              
              {/* Play Overlay */}
              <div className="absolute inset-0 bg-black/35 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/40 shadow-2xl transition-all"
                >
                  <Play size={36} className="fill-current text-white translate-x-0.5" />
                </motion.div>
              </div>

              {/* Subtitle tag */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-xs px-4 py-2 rounded-full font-medium tracking-wide whitespace-nowrap">
                Xem video giới thiệu dự án
              </div>
            </motion.div>
          </div>

        </div>

        {/* Founders / Leaders Section */}
        <div className="mt-20 pt-12 border-t border-gray-100">
          <div className="text-center max-w-4xl mx-auto mb-12 space-y-2">
            <h3 className="font-serif text-3xl text-[#0f2d59] font-bold tracking-tight">
              CEO & Đồng Sáng Lập
            </h3>
            <p className="text-sm text-gray-500 font-light font-sans">
              Đội ngũ sáng lập đầy tâm huyết, kết hợp giữa tư duy công nghệ đột phá và nền tảng sư phạm vững chắc.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Ms Lý AI */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col"
            >
              <div className="w-full bg-[#fffbf5] p-6 flex justify-center items-center h-[340px] overflow-hidden">
                <img
                  alt="Ms Lý AI"
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-sm"
                  src="https://i.postimg.cc/7hM2PKNq/68e7980f-bc76-4700-b4f9-73e8dc77dda3.png"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-gray-900">Ms Lý AI</h4>
                  <p className="text-[#e08400] text-sm font-semibold tracking-wider uppercase mt-1">Sáng lập dự án</p>
                  
                  <ul className="mt-5 space-y-3.5 text-gray-600 text-sm leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#e08400] font-bold text-lg leading-none mt-0.5">•</span>
                      <span>Chuyên đào tạo AI ứng dụng thực chiến.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#e08400] font-bold text-lg leading-none mt-0.5">•</span>
                      <span>Giáo viên Tiếng Anh hơn 10 năm kinh nghiệm giảng dạy chuyên sâu.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#e08400] font-bold text-lg leading-none mt-0.5">•</span>
                      <span>Kinh nghiệm đồng hành cùng 2 bạn nhỏ sinh năm 2015 và 2018 tự tin học tập & phát triển tư duy.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Ms Lâm Trần */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col"
            >
              <div className="w-full bg-[#fffbf5] p-6 flex justify-center items-center h-[340px] overflow-hidden">
                <img
                  alt="Ms Lâm Trần"
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-sm"
                  src="https://i.postimg.cc/qqbpGnJg/5727c354-0245-4ae6-91e7-1d195585721b.png"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-serif text-2xl font-bold text-gray-900">Ms Lâm Trần</h4>
                  <p className="text-[#e08400] text-sm font-semibold tracking-wider uppercase mt-1">CEO & Đồng sáng lập</p>
                  
                  <ul className="mt-5 space-y-3.5 text-gray-600 text-sm leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#e08400] font-bold text-lg leading-none mt-0.5">•</span>
                      <span>Giáo viên dạy giỏi trường THPT Nguyễn Hữu Thận, Quảng Trị.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#e08400] font-bold text-lg leading-none mt-0.5">•</span>
                      <span>Kinh nghiệm đồng hành cùng con tự tin làm chủ công nghệ, tiếng Anh vượt trội, teacher nhí 3 mùa.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
