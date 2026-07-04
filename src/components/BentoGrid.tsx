import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, Sparkles, Award, TrendingUp, Presentation, X, Check, 
  ArrowUpRight, Users, Laptop, GraduationCap, Coins, ChevronRight 
} from 'lucide-react';

interface BentoDetail {
  title: string;
  subtitle: string;
  tag: string;
  icon: React.ElementType;
  description: string;
  bullets: string[];
  visualBadges?: string[];
}

export default function BentoGrid() {
  const [activeCard, setActiveCard] = useState<BentoDetail | null>(null);

  const bentoDetails: Record<string, BentoDetail> = {
    host: {
      title: 'Làm Chủ Phòng Zoom Lên Tới Hàng Trăm Người',
      subtitle: 'Trở thành người điều hành chuyên nghiệp',
      tag: 'Bản lĩnh chỉ huy',
      icon: Presentation,
      description: 'Chương trình huấn luyện độc quyền giúp con làm chủ hoàn toàn các phòng Zoom quy mô lên tới hàng trăm người, tự tin điều phối và dẫn dắt sự kiện trực tuyến.',
      bullets: [
        'Kỹ thuật điều phối phòng họp trực tuyến và quản lý micro/camera của hàng chục người tham dự.',
        'Quản lý tương tác thông minh qua Chat, Breakout Rooms (phòng thảo luận nhóm), Polls và Whiteboard.',
        'Kịch bản xử lý khủng hoảng sự cố kỹ thuật (mất kết nối, tiếng ồn ngoài ý muốn, lỗi chia sẻ màn hình).',
        'Tư duy làm chủ sân khấu số, phân bổ thời lượng (Agenda) và quản trị thời gian chặt chẽ.'
      ],
      visualBadges: ['Zoom Pro', 'Breakout Rooms', 'Host Mastery', 'Event Agenda']
    },
    aiDesign: {
      title: 'Thiết Kế & Sáng Tạo Cùng AI',
      subtitle: 'Kiến tạo tương lai với công nghệ số',
      tag: 'Kỷ nguyên AI',
      icon: Sparkles,
      description: 'Khai phá sức mạnh của trí tuệ nhân tạo để tự học, soạn thảo kịch bản, thiết kế bài thuyết trình và biên tập video đỉnh cao.',
      bullets: [
        'Cách viết Prompt thông minh trên ChatGPT/Claude để tự soạn dàn ý bài nói, câu chuyện sáng tạo.',
        'Thiết kế bài thuyết trình sinh động, hiện đại và lôi cuốn cực nhanh với Canva và Gamma AI.',
        'Tạo lập hình ảnh minh họa chuyên nghiệp từ ý tưởng bằng Midjourney và Leonardo AI.',
        'Biên tập video ngắn ấn tượng để thuyết trình dự án cá nhân một cách tự tin.'
      ],
      visualBadges: ['ChatGPT & Claude', 'Canva & Gamma AI', 'Midjourney', 'Video Editing']
    },
    portfolio: {
      title: 'Xây Dựng Website Portfolio',
      subtitle: 'Kiến tạo hồ sơ năng lực cá nhân số hóa',
      tag: 'Săn học bổng lớn',
      icon: Award,
      description: 'Hệ thống hóa toàn bộ dự án, chứng nhận và video bài thuyết trình của con thành một website lý lịch năng lực số chuyên nghiệp.',
      bullets: [
        'Tổng hợp trực quan các hoạt động ngoại khóa, chứng nhận học thuật và dự án cộng đồng.',
        'Tích hợp các bài giảng trực tuyến, sự kiện mà con đã trực tiếp làm Host dẫn dắt.',
        'Tập viết Personal Statement (Tuyên bố cá nhân) thể hiện rõ nét tư duy lãnh đạo.',
        'Cố vấn định hướng phát triển kỹ năng cốt lõi dựa trên thế mạnh và sở trường cá nhân.'
      ],
      visualBadges: ['E-Portfolio', 'Personal Brand', 'Scholarship Ready', 'Career Path']
    },
    workshop: {
      title: 'Thực Chiến Thực Tế Cộng Đồng',
      subtitle: 'Hành động thực tế - Tạo giá trị thực tế',
      tag: 'Cọ xát thực tế',
      icon: TrendingUp,
      description: 'Không chỉ học lý thuyết, con sẽ trực tiếp cọ xát bằng cách dẫn dắt các sự kiện và lớp học English Workshop thực tế.',
      bullets: [
        'Trực tiếp làm Host điều phối phòng Zoom cho hơn 50 học sinh nhí khác trong cộng đồng.',
        'Thực hành chuẩn bị Agenda, Slide bài giảng và kịch bản tương tác hoàn chỉnh.',
        'Nhận đánh giá và sửa lỗi trực tiếp từ Ms Lý AI cùng hội đồng học thuật sau mỗi buổi thực hành.',
        'Rèn luyện bản lĩnh sân khấu, vượt qua nỗi sợ đám đông qua áp dụng thực tiễn.'
      ],
      visualBadges: ['Live Host', '50+ Students Zoom', 'Ms Lý AI Feedback', 'Real Value']
    },
    officialHost: {
      title: 'Cơ Hội Trở Thành Đại Sứ Có Thù Lao',
      subtitle: 'Official Host & Scholarship',
      tag: 'Đặc quyền tối cao',
      icon: Award,
      description: 'Nhận vinh dự trở thành đại sứ điều phối chính thức của dự án, mở ra cơ hội hợp tác lâu dài và tự tạo thu nhập.',
      bullets: [
        'Trở thành đại sứ chính thức đồng hành cùng Ms Lý AI trong các dự án giáo dục quốc tế.',
        'Được trao tặng chứng nhận Kid Leader Host danh giá nâng tầm hồ sơ du học.',
        'Cơ hội nhận thù lao trợ giảng (income) xứng đáng cho công sức đóng góp tổ chức.',
        'Nhận học bổng toàn phần bảo trợ cho các khóa học huấn luyện chuyên sâu tiếp theo.'
      ],
      visualBadges: ['Thù lao trợ giảng', 'Chứng nhận Danh giá', 'Học bổng bảo trợ', 'Global Network']
    }
  };

  return (
    <section id="benefits" className="py-24 bg-gradient-to-b from-[#f8f9ff] to-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="px-4 py-1.5 bg-[#fffbf5] border border-amber-200 text-[#e08400] text-xs font-bold uppercase tracking-widest rounded-full inline-block"
          >
            Đầu tư cho tương lai tinh hoa
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#0f2d59] font-bold tracking-tight"
          >
            Đặc Quyền Của Kid Leaders
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-1.5 bg-[#e08400] mx-auto rounded-full"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
          >
            Không chỉ là một chương trình học tiếng Anh, đây là hành trình ươm mầm toàn diện để con bứt phá tư duy chỉ huy, làm chủ công nghệ AI và sẵn sàng kiến tạo giá trị xã hội.
          </motion.p>
        </div>

        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-auto md:h-[820px] font-sans">
          
          {/* Card 1: Đào tạo Host Zoom (Col span 2, Row span 2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(15, 45, 89, 0.18)' }}
            onClick={() => setActiveCard(bentoDetails.host)}
            className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-[#091b35] via-[#0d2a52] to-[#091b35] text-white p-8 sm:p-10 rounded-3xl flex flex-col justify-between relative overflow-hidden group cursor-pointer border border-white/10"
          >
            {/* Background design elements */}
            <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity" style={{ backgroundImage: 'radial-gradient(circle, #e08400 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all duration-500" />
            <div className="absolute top-8 right-8 text-7xl font-serif font-extrabold text-white/5 group-hover:text-[#e08400]/10 transition-all duration-500">01</div>
            
            <div>
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 text-[#e08400] mb-6 shadow-inner">
                <Presentation size={28} />
              </div>
              
              <span className="text-[#e08400] text-xs font-bold tracking-widest uppercase bg-amber-500/10 border border-amber-500/25 px-3 py-1 rounded-full w-fit inline-block">
                {bentoDetails.host.tag}
              </span>
            </div>
            
            <div className="space-y-4 relative z-10 mt-6">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight group-hover:text-[#e08400] transition-colors">
                {bentoDetails.host.title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-light">
                {bentoDetails.host.subtitle}. Con tự tin làm chủ các công cụ điều khiển phòng họp trực tiếp lớn, tương tác thông minh và tự điều hành chương trình.
              </p>
              
              {/* Visual badges directly on card */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {bentoDetails.host.visualBadges?.map((b) => (
                  <span key={b} className="text-[10px] bg-white/5 border border-white/10 text-gray-300 px-2.5 py-1 rounded-md font-medium">
                    {b}
                  </span>
                ))}
              </div>

              <div className="text-xs text-[#e08400] font-bold flex items-center gap-1 pt-3 group-hover:translate-x-1 transition-transform">
                Nhấp xem chi tiết kỹ năng đào tạo <ArrowUpRight size={14} />
              </div>
            </div>
          </motion.div>

          {/* Card 2: AI for Design (Col span 1, Row span 2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(15, 45, 89, 0.12)' }}
            onClick={() => setActiveCard(bentoDetails.aiDesign)}
            className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-[#f0f4f8] to-[#dbeafe]/70 border border-blue-100/80 p-6 sm:p-8 rounded-3xl flex flex-col justify-between group cursor-pointer hover:bg-white transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute -right-12 -bottom-12 w-36 h-36 bg-[#0f2d59]/5 rounded-full blur-2xl" />
            <div className="absolute top-6 right-6 text-6xl font-serif font-extrabold text-[#0f2d59]/5">AI</div>
            
            <div>
              <div className="w-12 h-12 bg-[#0f2d59]/10 rounded-xl flex items-center justify-center text-[#0f2d59] mb-4">
                <Sparkles size={24} className="animate-pulse" />
              </div>
              <span className="text-[#0f2d59] text-[10px] font-bold tracking-widest uppercase bg-[#0f2d59]/10 px-2.5 py-0.5 rounded-full inline-block">
                {bentoDetails.aiDesign.tag}
              </span>
            </div>

            <div className="space-y-4 mt-6">
              <h4 className="font-serif text-xl font-bold text-gray-800 leading-tight group-hover:text-[#0f2d59] transition-colors">
                {bentoDetails.aiDesign.title}
              </h4>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                {bentoDetails.aiDesign.subtitle}. Con tự viết prompts thông minh, dựng slide đẹp mắt và sáng tạo ảnh chuyên nghiệp bằng công cụ AI thời đại mới.
              </p>
              
              {/* Visual badges for tools */}
              <div className="flex flex-wrap gap-1 pt-1">
                {bentoDetails.aiDesign.visualBadges?.slice(0, 3).map((b) => (
                  <span key={b} className="text-[9px] bg-[#0f2d59]/10 text-[#0f2d59] px-2 py-0.5 rounded font-medium">
                    {b}
                  </span>
                ))}
              </div>

              <span className="text-xs text-[#0f2d59] font-bold inline-flex items-center gap-1 group-hover:underline">
                Xem bộ công cụ AI <ChevronRight size={14} />
              </span>
            </div>
          </motion.div>

          {/* Card 3: Portfolio (Col span 1, Row span 2) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(245, 158, 11, 0.12)' }}
            onClick={() => setActiveCard(bentoDetails.portfolio)}
            className="md:col-span-1 md:row-span-2 bg-gradient-to-b from-[#fffbeb] to-[#fef3c7] border border-amber-100 p-6 sm:p-8 rounded-3xl flex flex-col justify-between hover:bg-white transition-all duration-300 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute -right-12 -bottom-12 w-36 h-36 bg-amber-400/5 rounded-full blur-2xl" />
            <div className="absolute top-6 right-6 text-6xl font-serif font-extrabold text-[#b45309]/5">WEB</div>
            
            <div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                <Award size={24} />
              </div>
              <span className="text-amber-700 text-[10px] font-bold tracking-widest uppercase bg-amber-100 px-2.5 py-0.5 rounded-full inline-block">
                {bentoDetails.portfolio.tag}
              </span>
            </div>

            <div className="space-y-4 mt-6">
              <h4 className="font-serif text-xl font-bold text-gray-800 leading-tight group-hover:text-amber-600 transition-colors">
                {bentoDetails.portfolio.title}
              </h4>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                {bentoDetails.portfolio.subtitle}. Chuẩn bị bộ hồ sơ cá nhân năng lực số hóa khác biệt.
              </p>
              
              {/* Visual badges for portfolio */}
              <div className="flex flex-wrap gap-1 pt-1">
                {bentoDetails.portfolio.visualBadges?.slice(0, 3).map((b) => (
                  <span key={b} className="text-[9px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded font-medium">
                    {b}
                  </span>
                ))}
              </div>

              <span className="text-xs text-amber-600 font-bold inline-flex items-center gap-1 group-hover:underline">
                Xem mẫu Portfolio <ChevronRight size={14} />
              </span>
            </div>
          </motion.div>

          {/* Card 4: Thực chiến thực tế (Col span 2, Row span 1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ y: -6, boxShadow: '0 15px 30px rgba(0,0,0,0.06)' }}
            onClick={() => setActiveCard(bentoDetails.workshop)}
            className="md:col-span-2 md:row-span-1 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200/60 p-8 rounded-3xl hover:bg-white transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-gray-200/20 rounded-full blur-xl" />
            
            <div className="space-y-4 max-w-full sm:max-w-[70%]">
              <div className="flex items-center gap-2.5">
                <span className="text-[#e08400] text-[10px] font-bold tracking-widest uppercase bg-[#fffbf5] border border-[#e08400]/20 px-2.5 py-0.5 rounded-full">
                  {bentoDetails.workshop.tag}
                </span>
                <span className="text-xs text-gray-400 font-semibold uppercase">Thực hành thật</span>
              </div>
              
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-[#e08400] transition-colors leading-tight">
                {bentoDetails.workshop.title}
              </h4>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed font-light">
                {bentoDetails.workshop.subtitle}. Con trực tiếp dẫn dắt sự kiện English Workshop thực tế của dự án, tự điều phối từ kịch bản tới slide bài học.
              </p>
              <span className="text-xs text-[#e08400] font-bold inline-flex items-center gap-1 group-hover:underline">
                Tìm hiểu lộ trình cọ xát <ChevronRight size={14} />
              </span>
            </div>
            
            <div className="w-20 h-20 bg-[#e08400]/10 rounded-2xl shrink-0 flex items-center justify-center shadow-md border border-gray-100 group-hover:scale-105 group-hover:border-[#e08400]/40 transition-all duration-300 self-end sm:self-center">
              <TrendingUp size={36} className="text-[#e08400]" />
            </div>
          </motion.div>

          {/* Card 5: Official Host Opportunity (Col span 2, Row span 1) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ y: -6, scale: 1.01, boxShadow: '0 20px 40px rgba(15, 45, 89, 0.25)' }}
            onClick={() => setActiveCard(bentoDetails.officialHost)}
            className="md:col-span-2 md:row-span-1 bg-gradient-to-br from-[#0f2d59] to-[#0a2142] p-8 rounded-3xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group cursor-pointer border border-[#0f2d59]/80 shadow-lg relative overflow-hidden"
          >
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-white/5 rounded-full blur-xl" />
            
            <div className="space-y-4 max-w-full sm:max-w-[70%]">
              <div className="flex items-center gap-2.5">
                <span className="text-[#e08400] text-[10px] font-bold tracking-wider uppercase bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-full">
                  {bentoDetails.officialHost.tag}
                </span>
                <span className="text-xs text-amber-200 font-semibold uppercase">Cơ hội bứt phá</span>
              </div>

              <h4 className="font-serif text-xl sm:text-2xl font-bold leading-tight text-white group-hover:scale-102 transition-transform duration-300">
                {bentoDetails.officialHost.title}
              </h4>
              <p className="text-amber-100/80 text-xs sm:text-sm leading-snug font-light">
                {bentoDetails.officialHost.subtitle}. Nhận cơ hội học bổng bảo trợ chuyên sâu & thù lao trợ giảng đóng góp từ các buổi học.
              </p>
              <span className="text-xs text-[#e08400] font-bold block group-hover:underline pt-1">
                Xem điều kiện ứng cử →
              </span>
            </div>

            <div className="w-20 h-20 bg-white/10 rounded-2xl shrink-0 flex items-center justify-center shadow-md border border-white/10 group-hover:scale-105 group-hover:border-[#e08400]/40 transition-all duration-300 self-end sm:self-center">
              <Coins size={36} className="text-[#e08400]" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bento Grid Detail Overlay Modal */}
      <AnimatePresence>
        {activeCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCard(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            
            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 25 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative bg-white text-gray-800 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 z-10 p-6 sm:p-10 font-sans"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCard(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-[#fffbf5] text-[#e08400] rounded-2xl border border-[#e08400]/25 shadow-inner shrink-0">
                  {React.createElement(activeCard.icon, { size: 30 })}
                </div>
                <div>
                  <span className="text-[10px] bg-[#fffbf5] text-[#e08400] border border-amber-200 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-widest inline-block mb-1">
                    {activeCard.tag}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-950 leading-tight">
                    {activeCard.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wider mt-0.5">
                    {activeCard.subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-light">
                  {activeCard.description}
                </p>

                {/* Bullets */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-[#e08400] uppercase tracking-widest border-b border-gray-100 pb-2">
                    Nội dung huấn luyện & Quyền lợi chi tiết:
                  </h4>
                  <ul className="space-y-3.5">
                    {activeCard.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                        <span className="p-1 bg-[#fffbf5] border border-amber-200 text-[#e08400] rounded-full shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                          <Check size={12} className="stroke-[3]" />
                        </span>
                        <span className="text-gray-700 text-xs sm:text-sm leading-relaxed font-normal">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modal Visual Badges */}
                {activeCard.visualBadges && (
                  <div className="pt-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">Thành tựu và kỹ năng đạt được:</span>
                    <div className="flex flex-wrap gap-2">
                      {activeCard.visualBadges.map((badge) => (
                        <span key={badge} className="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1 rounded-full font-medium">
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setActiveCard(null)}
                    className="bg-[#e08400] text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-[#c67500] transition-all hover:scale-102 active:scale-98 shadow-md"
                  >
                    Tôi đã hiểu
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
