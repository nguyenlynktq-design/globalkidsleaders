import React from 'react';
import { motion } from 'motion/react';
import { ClipboardEdit, MessagesSquare, GraduationCap, Trophy } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: ClipboardEdit,
    name: 'Registration',
    desc: 'Nộp hồ sơ ứng tuyển qua form trực tuyến.',
  },
  {
    num: '02',
    icon: MessagesSquare,
    name: 'Interview',
    desc: 'Phỏng vấn tiếng Anh và đánh giá kỹ năng mềm.',
  },
  {
    num: '03',
    icon: GraduationCap,
    name: 'Training',
    desc: 'Tham gia 1 tuần huấn luyện kỹ năng Host & AI.',
  },
  {
    num: '04',
    icon: Trophy,
    name: 'Challenge',
    desc: 'Thực hiện dự án thực tế và nhận Official Host.',
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0f2d59] font-bold tracking-tight"
          >
            Hành trình tuyển chọn
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-20 h-1 bg-[#e08400] mx-auto rounded-full"
          />
        </div>

        {/* Timeline Grid layout */}
        <div className="relative font-sans">
          
          {/* Connecting Line (Only visible on MD screens up) */}
          <div className="hidden md:block absolute top-[44px] left-[12%] right-[12%] h-[2px] bg-gray-100 z-0" />
          
          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white p-8 border border-gray-100 rounded-2xl text-center group hover:border-[#e08400] hover:shadow-md transition-all duration-300"
                >
                  {/* Step Number circular bubble */}
                  <div className="w-12 h-12 bg-[#0f2d59] text-white rounded-full flex items-center justify-center mx-auto mb-6 font-bold text-sm group-hover:bg-[#e08400] transition-colors shadow-sm relative z-10">
                    {step.num}
                    
                    {/* Tiny decorative inner dot indicator */}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#e08400] scale-0 group-hover:scale-100 transition-transform" />
                  </div>

                  <div className="inline-flex p-3 bg-gray-50 text-gray-500 rounded-xl mb-4 group-hover:bg-[#fffbf5] group-hover:text-[#e08400] transition-all">
                    <StepIcon size={20} />
                  </div>

                  <h4 className="font-serif text-lg font-bold text-gray-800 mb-2 tracking-tight group-hover:text-[#0f2d59] transition-colors">
                    {step.name}
                  </h4>
                  
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
