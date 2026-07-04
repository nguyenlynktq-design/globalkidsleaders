import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, User, BookOpen, Phone, Mail, Award, AlertCircle, Send } from 'lucide-react';
import { Applicant, EnglishLevel } from '../types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newApplicant: Applicant) => void;
}

export default function RegisterModal({ isOpen, onClose, onSuccess }: RegisterModalProps) {
  // Form fields
  const [parentName, setParentName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentGrade, setStudentGrade] = useState('Lớp 5');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [englishLevel, setEnglishLevel] = useState<EnglishLevel>('Flyers');
  const [expectations, setExpectations] = useState('');

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!parentName.trim()) {
      newErrors.parentName = 'Vui lòng nhập họ tên phụ huynh.';
    }
    if (!studentName.trim()) {
      newErrors.studentName = 'Vui lòng nhập họ tên học sinh.';
    }
    if (!phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại liên hệ.';
    } else if (!/^\d{9,11}$/.test(phone.replace(/[\s\-\.]/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (yêu cầu từ 9 - 11 chữ số).';
    }
    if (!email.trim()) {
      newErrors.email = 'Vui lòng nhập địa chỉ email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Địa chỉ email không đúng định dạng.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const newApplicant: Applicant = {
      id: 'APP-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      parentName,
      studentName,
      studentGrade,
      phone,
      email,
      englishLevel,
      expectations,
      submittedAt: new Date().toISOString(),
      status: 'pending',
      notes: '',
    };

    // Try to sync with Google Sheets Apps Script Web App
    const defaultWebhook = 'https://script.google.com/macros/s/AKfycbxj-iM-HnNSPH6Ug4UDAcydPsX9nixoJ__ZsuhFH3t-3aTV6ih3NUCGoSVvjIO25G2TdA/exec';
    const webhookUrl = localStorage.getItem('google_sheet_webhook_url') || (import.meta as any).env?.VITE_GOOGLE_SHEETS_WEBHOOK || defaultWebhook;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          mode: 'no-cors', // Bypasses CORS browser preflight block for Google Apps Script
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: newApplicant.id,
            studentName: newApplicant.studentName,
            studentGrade: newApplicant.studentGrade,
            englishLevel: newApplicant.englishLevel,
            parentName: newApplicant.parentName,
            phone: newApplicant.phone,
            email: newApplicant.email,
            expectations: newApplicant.expectations,
            submittedAt: new Date(newApplicant.submittedAt).toLocaleString('vi-VN'),
            status: newApplicant.status,
          }),
        });
      } catch (err) {
        console.error('Lỗi đồng bộ Google Sheets:', err);
      }
    }

    // Get existing applicants
    const existing = localStorage.getItem('applicants');
    const list: Applicant[] = existing ? JSON.parse(existing) : [];
    list.push(newApplicant);
    localStorage.setItem('applicants', JSON.stringify(list));

    setIsSubmitting(false);
    setIsSuccess(true);
    onSuccess(newApplicant);
  };

  const handleReset = () => {
    setParentName('');
    setStudentName('');
    setStudentGrade('Lớp 5');
    setPhone('');
    setEmail('');
    setEnglishLevel('Flyers');
    setExpectations('');
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative bg-white text-gray-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-100 z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-[#0f2d59] text-white">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight">
                  {isSuccess ? 'Đăng Ký Thành Công' : 'Hồ Sơ Ứng Tuyển'}
                </h3>
                <p className="text-xs text-gray-300 font-light mt-0.5">
                  {isSuccess ? 'Chúc mừng quý phụ huynh và học sinh' : 'Founding Kid Leaders Program'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 font-sans">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
                    Quý phụ huynh vui lòng cung cấp thông tin chính xác của học sinh để bộ phận học thuật tiến hành liên hệ và kiểm tra trình độ tiếng Anh.
                  </p>

                  {/* Parent Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Họ tên Phụ huynh *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="Nguyễn Văn A"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                          errors.parentName ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:ring-[#e08400]/20 focus:border-[#0f2d59]'
                        } focus:outline-none focus:ring-4 transition-all text-sm`}
                      />
                    </div>
                    {errors.parentName && (
                      <p className="text-red-500 text-xs flex items-center gap-1 font-medium pt-0.5">
                        <AlertCircle size={12} /> {errors.parentName}
                      </p>
                    )}
                  </div>

                  {/* Student Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Họ tên Học sinh *
                    </label>
                    <div className="relative">
                      <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder="Nguyễn Thị B"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                          errors.studentName ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:ring-[#e08400]/20 focus:border-[#0f2d59]'
                        } focus:outline-none focus:ring-4 transition-all text-sm`}
                      />
                    </div>
                    {errors.studentName && (
                      <p className="text-red-500 text-xs flex items-center gap-1 font-medium pt-0.5">
                        <AlertCircle size={12} /> {errors.studentName}
                      </p>
                    )}
                  </div>

                  {/* Student Grade & English Level (Grid) */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Grade */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                        Đang học lớp *
                      </label>
                      <div className="relative">
                        <BookOpen size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          value={studentGrade}
                          onChange={(e) => setStudentGrade(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-[#e08400]/20 focus:border-[#0f2d59] focus:outline-none transition-all text-sm appearance-none bg-white"
                        >
                          {['Lớp 5', 'Lớp 6', 'Lớp 7', 'Lớp 8', 'Lớp 9', 'Lớp 10', 'Khác'].map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* English Level */}
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                        Trình độ tiếng Anh *
                      </label>
                      <div className="relative">
                        <Award size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select
                          value={englishLevel}
                          onChange={(e) => setEnglishLevel(e.target.value as EnglishLevel)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-[#e08400]/20 focus:border-[#0f2d59] focus:outline-none transition-all text-sm appearance-none bg-white"
                        >
                          <option value="Flyers">Flyers (hoặc tương đương)</option>
                          <option value="KET">KET (A2 Key)</option>
                          <option value="PET">PET (B1 Preliminary)</option>
                          <option value="IELTS">IELTS</option>
                          <option value="Other">Chưa xác định / Khác</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Số điện thoại phụ huynh *
                    </label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0912345678"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                          errors.phone ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:ring-[#e08400]/20 focus:border-[#0f2d59]'
                        } focus:outline-none focus:ring-4 transition-all text-sm`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-xs flex items-center gap-1 font-medium pt-0.5">
                        <AlertCircle size={12} /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Địa chỉ Email phụ huynh *
                    </label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="phuhuynh@example.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${
                          errors.email ? 'border-red-500 focus:ring-red-100' : 'border-gray-200 focus:ring-[#e08400]/20 focus:border-[#0f2d59]'
                        } focus:outline-none focus:ring-4 transition-all text-sm`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-xs flex items-center gap-1 font-medium pt-0.5">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Expectations */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                      Mong muốn / Yêu cầu riêng (nếu có)
                    </label>
                    <textarea
                      value={expectations}
                      onChange={(e) => setExpectations(e.target.value)}
                      placeholder="Ví dụ: Rèn luyện kỹ năng tự tin nói trước đám đông, học cách tự thuyết trình thiết kế Canva..."
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-[#e08400]/20 focus:border-[#0f2d59] focus:outline-none transition-all text-sm resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#0f2d59] hover:bg-[#0a2142] text-white py-3.5 rounded-xl font-semibold text-center text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Đang xử lý thông tin...
                      </>
                    ) : (
                      <>
                        Gửi Hồ Sơ Ứng Tuyển
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 100 }}
                    className="mx-auto w-20 h-20 bg-[#fffbf5] text-[#e08400] rounded-full flex items-center justify-center border border-amber-100 shadow-inner"
                  >
                    <CheckCircle2 size={48} className="stroke-[2.5]" />
                  </motion.div>

                  <div className="space-y-2">
                    <h4 className="font-serif text-2xl font-bold text-gray-900 leading-tight">
                      Gửi Hồ Sơ Thành Công!
                    </h4>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-sm mx-auto font-light">
                      Cảm ơn quý phụ huynh đã tin tưởng ứng tuyển dự án <strong className="font-semibold text-gray-800">Global Kids Leaders</strong> cho con em mình.
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl text-left border border-gray-100 space-y-3.5 max-w-md mx-auto">
                    <h5 className="text-xs font-bold text-[#0f2d59] uppercase tracking-wider">
                      Các bước tiếp theo:
                    </h5>
                    <ul className="space-y-2.5 text-xs text-gray-600 font-light">
                      <li className="flex gap-2">
                        <span className="w-5 h-5 bg-[#e08400] text-white font-bold rounded-full flex items-center justify-center shrink-0">1</span>
                        <span>Ban liên lạc dự án sẽ gọi điện thoại xác nhận trong vòng 24 - 48 giờ.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="w-5 h-5 bg-[#e08400] text-white font-bold rounded-full flex items-center justify-center shrink-0">2</span>
                        <span>Sắp xếp lịch phỏng vấn kiểm tra nói tiếng Anh 1:1 ngắn cho học sinh qua Zoom.</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="w-5 h-5 bg-[#e08400] text-white font-bold rounded-full flex items-center justify-center shrink-0">3</span>
                        <span>Công bố kết quả chọn lựa <span className="whitespace-nowrap">10 Founding Kid Leaders</span>.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 flex gap-3 justify-center">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2.5 border border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl text-sm font-semibold transition-colors"
                    >
                      Đăng ký học sinh khác
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 bg-[#0f2d59] hover:bg-[#0a2142] text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
                    >
                      Đóng cửa sổ
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
