import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

export default function Eligibility() {
  const criteria = [
    { num: '1', text: 'Học sinh lớp 5 - lớp 10 tại Việt Nam hoặc quốc tế.' },
    { num: '2', text: 'Trình độ tiếng Anh từ Flyers trở lên hoặc tương đương.' },
    { num: '3', text: 'Yêu thích tiếng Anh, ham học hỏi về công nghệ & AI.' },
    { num: '4', text: 'Tự tin, có tinh thần trách nhiệm và cam kết đồng hành.' },
  ];

  return (
    <section id="eligibility" className="py-24 bg-[#f8f9ff] border-y border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Student Image */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden shadow-xl border border-gray-100 group"
            >
              <img
                alt="A group of diverse, happy students learning"
                className="w-full h-full object-cover max-h-[480px] transition-transform duration-700 group-hover:scale-103"
                src="https://i.postimg.cc/fLKswPP0/2db091d4-a9f2-40e2-981b-b029b2f28112.png"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>
          </div>

          {/* Right Criteria List */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0f2d59] font-bold tracking-tight">
                Ai có thể ứng tuyển?
              </h2>
              <div className="w-20 h-1 bg-[#e08400] rounded-full" />
            </motion.div>

            <div className="space-y-6 font-sans">
              {criteria.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex items-center gap-4 group p-3 hover:bg-white rounded-2xl transition-all duration-200"
                >
                  {/* Beautiful numeric circular icon indicator */}
                  <div className="w-10 h-10 bg-[#e08400] text-white rounded-full flex items-center justify-center shrink-0 font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
                    {item.num}
                  </div>
                  
                  <span className="text-gray-700 text-sm sm:text-lg leading-relaxed font-light group-hover:text-gray-950 transition-colors">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
