import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Vision from './components/Vision';
import About from './components/About';
import Scarcity from './components/Scarcity';
import BentoGrid from './components/BentoGrid';
import Eligibility from './components/Eligibility';
import Timeline from './components/Timeline';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import RegisterModal from './components/RegisterModal';
import VideoModal from './components/VideoModal';
import AdminDashboard from './components/AdminDashboard';
import { Applicant } from './types';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [userSubmissionCount, setUserSubmissionCount] = useState(0);

  // Initialize/retrieve applicants from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('applicants');
    if (stored) {
      const parsed: Applicant[] = JSON.parse(stored);
      setApplicants(parsed);
      
      // Calculate how many were added on top of the initial 6
      // Let's filter out the default mock items to see how many custom entries exist
      const customSubmissions = parsed.filter(app => !app.id.startsWith('MOCK-'));
      setUserSubmissionCount(customSubmissions.length);
    } else {
      // Setup default mock applicants for a fully working dashboard representation on initial boot
      const mockApplicants: Applicant[] = [
        {
          id: 'MOCK-1',
          parentName: 'Nguyễn Hoàng Nam',
          studentName: 'Nguyễn Hoàng Hải',
          studentGrade: 'Lớp 6',
          phone: '0912112233',
          email: 'nam.nguyenhoang@example.com',
          englishLevel: 'Flyers',
          expectations: 'Mong muốn rèn luyện kỹ năng tự tin nói trước đám đông và điều hành các chương trình nhỏ học tiếng Anh.',
          submittedAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
          status: 'contacted',
          notes: 'Đã gọi điện thoại xác thực thông tin. Phụ huynh nhiệt tình, con phản xạ tiếng Anh cơ bản tương đối tốt.',
        },
        {
          id: 'MOCK-2',
          parentName: 'Lê Thị Hồng',
          studentName: 'Trần Minh Khôi',
          studentGrade: 'Lớp 5',
          phone: '0988776655',
          email: 'hong.le@example.com',
          englishLevel: 'Flyers',
          expectations: 'Cần nâng cao ngữ điệu và phát âm tiếng Anh, khao khát được học về vẽ tranh AI và Canva.',
          submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
          status: 'pending',
          notes: 'Học sinh có chứng nhận Flyers 12 khiên. Đang sắp xếp lịch phỏng vấn Zoom ngày mai.',
        },
        {
          id: 'MOCK-3',
          parentName: 'Trần Thu Hương',
          studentName: 'Phạm Mỹ Linh',
          studentGrade: 'Lớp 7',
          phone: '0904321987',
          email: 'huong.tran77@example.com',
          englishLevel: 'PET',
          expectations: 'Mong con rèn luyện tư duy phản biện, kịch bản thuyết trình khoa học và cách ứng dụng AI trong trường học.',
          submittedAt: new Date(Date.now() - 3600000 * 48).toISOString(), // 2 days ago
          status: 'interviewed',
          notes: 'Đã hoàn thành phỏng vấn Zoom. Mỹ Linh cực kỳ tự tin, phát âm lưu loát, xứng đáng là một Kid Leader xuất sắc.',
        },
        {
          id: 'MOCK-4',
          parentName: 'Vũ Thành Trung',
          studentName: 'Vũ Gia Bảo',
          studentGrade: 'Lớp 8',
          phone: '0936123456',
          email: 'trung.vu@example.com',
          englishLevel: 'KET',
          expectations: 'Tìm kiếm môi trường cọ xát thực chiến để con bớt nhút nhát và năng động hơn.',
          submittedAt: new Date(Date.now() - 3600000 * 72).toISOString(), // 3 days ago
          status: 'accepted',
          notes: 'Hồ sơ đã duyệt trúng tuyển Founding Host. Đã gửi thư mời nhập học và được phụ huynh xác nhận tham gia.',
        }
      ];

      localStorage.setItem('applicants', JSON.stringify(mockApplicants));
      setApplicants(mockApplicants);
      setUserSubmissionCount(0);
    }
  }, []);

  const handleRegisterSuccess = (newApplicant: Applicant) => {
    // Re-sync with storage
    const stored = localStorage.getItem('applicants');
    if (stored) {
      const parsed: Applicant[] = JSON.parse(stored);
      setApplicants(parsed);
      
      const customSubmissions = parsed.filter(app => !app.id.startsWith('MOCK-'));
      setUserSubmissionCount(customSubmissions.length);
    }
  };

  const handleApplicantsUpdate = (updatedList: Applicant[]) => {
    setApplicants(updatedList);
    localStorage.setItem('applicants', JSON.stringify(updatedList));
    
    const customSubmissions = updatedList.filter(app => !app.id.startsWith('MOCK-'));
    setUserSubmissionCount(customSubmissions.length);
  };

  if (isAdminView) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Navigation link specifically to go back to Landing page */}
        <div className="fixed top-0 left-0 w-full z-40 bg-white/95 border-b border-gray-100 py-3 px-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e08400] animate-pulse" />
            <span className="text-xs text-gray-500 font-bold uppercase tracking-widest font-sans">
              Hệ Thống CRM Quản Trị
            </span>
          </div>
          <button
            onClick={() => setIsAdminView(false)}
            className="text-xs font-semibold text-[#0f2d59] hover:underline"
          >
            Quay lại trang chủ Landing Page →
          </button>
        </div>

        <AdminDashboard 
          applicants={applicants}
          onBack={() => setIsAdminView(false)}
          onApplicantsUpdate={handleApplicantsUpdate}
        />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* 1. Header Navigation */}
      <Navbar 
        onRegisterClick={() => setIsRegisterOpen(true)}
        onAdminClick={() => setIsAdminView(true)}
        showAdminBtn={true} // subtle panel accessibility to let user verify submissions work!
      />

      {/* 2. Hero Header Banner */}
      <Hero onRegisterClick={() => setIsRegisterOpen(true)} />

      {/* 3. Global Challenges (Vision: Thế giới đang thay đổi) */}
      <Vision />

      {/* 4. Core introduction (About: Global Kids Leaders là gì?) */}
      <About onPlayClick={() => setIsVideoOpen(true)} />

      {/* 5. Limited slots indicator (Scarcity: Cơ hội trở thành 10 Host) */}
      <Scarcity currentCount={userSubmissionCount} />

      {/* 6. Benefits (BentoGrid: Đặc quyền Kid Leaders) */}
      <BentoGrid />

      {/* 7. Eligibility (Ai có thể tham gia?) */}
      <Eligibility />

      {/* 8. Selection Stages (Timeline: Hành trình tuyển chọn) */}
      <Timeline />

      {/* 9. Final call-to-action */}
      <FinalCTA onRegisterClick={() => setIsRegisterOpen(true)} />

      {/* 10. Footer info */}
      <Footer 
        onAdminClick={() => setIsAdminView(true)} 
        showAdminBtn={true} 
      />

      {/* --- Overlay Modals --- */}
      
      {/* Registration Portal slide-over/dialog */}
      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={handleRegisterSuccess}
      />

      {/* Video Presentation overlay dialog */}
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)}
      />

    </div>
  );
}
