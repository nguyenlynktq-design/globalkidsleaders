import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Users, CheckCircle2, Clock, Trash2, Search, ArrowLeft, Download, 
  MessageSquare, BookOpen, AlertCircle, Phone, Mail, Award, Check,
  Database, Copy, ExternalLink
} from 'lucide-react';
import { Applicant } from '../types';

interface AdminDashboardProps {
  onBack: () => void;
  applicants: Applicant[];
  onApplicantsUpdate: (updatedList: Applicant[]) => void;
}

export default function AdminDashboard({ onBack, applicants, onApplicantsUpdate }: AdminDashboardProps) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [editingNotes, setEditingNotes] = useState('');

  // Google Sheets integration state
  const [webhookUrl, setWebhookUrl] = useState(() => localStorage.getItem('google_sheet_webhook_url') || 'https://script.google.com/macros/s/AKfycbxj-iM-HnNSPH6Ug4UDAcydPsX9nixoJ__ZsuhFH3t-3aTV6ih3NUCGoSVvjIO25G2TdA/exec');
  const [showSheetsConfig, setShowSheetsConfig] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  // Count status statistics
  const totalCount = applicants.length;
  const pendingCount = applicants.filter(a => a.status === 'pending').length;
  const contactedCount = applicants.filter(a => a.status === 'contacted' || a.status === 'interviewed').length;
  const acceptedCount = applicants.filter(a => a.status === 'accepted').length;

  // Search/Filter logic
  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = 
      applicant.studentName.toLowerCase().includes(search.toLowerCase()) ||
      applicant.parentName.toLowerCase().includes(search.toLowerCase()) ||
      applicant.phone.includes(search) ||
      applicant.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || applicant.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: Applicant['status']) => {
    const updated = applicants.map(app => {
      if (app.id === id) {
        return { ...app, status: newStatus };
      }
      return app;
    });
    onApplicantsUpdate(updated);
    if (selectedApplicant?.id === id) {
      setSelectedApplicant(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleNotesSave = (id: string) => {
    const updated = applicants.map(app => {
      if (app.id === id) {
        return { ...app, notes: editingNotes };
      }
      return app;
    });
    onApplicantsUpdate(updated);
    if (selectedApplicant?.id === id) {
      setSelectedApplicant(prev => prev ? { ...prev, notes: editingNotes } : null);
    }
    alert('Đã cập nhật ghi chú thành công!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa hồ sơ ứng cử này?')) {
      const updated = applicants.filter(app => app.id !== id);
      onApplicantsUpdate(updated);
      if (selectedApplicant?.id === id) {
        setSelectedApplicant(null);
      }
    }
  };

  // Browser-based CSV Export
  const exportToCSV = () => {
    if (applicants.length === 0) {
      alert('Không có dữ liệu ứng viên để xuất file!');
      return;
    }

    const headers = ['Mã hồ sơ', 'Họ tên Học sinh', 'Lớp', 'Trình độ Tiếng Anh', 'Họ tên Phụ huynh', 'Số điện thoại', 'Email', 'Ngày nộp', 'Trạng thái', 'Yêu cầu riêng', 'Ghi chú'];
    const rows = applicants.map(app => [
      app.id,
      app.studentName,
      app.studentGrade,
      app.englishLevel,
      app.parentName,
      `'${app.phone}`, // force string format in excel
      app.email,
      new Date(app.submittedAt).toLocaleDateString('vi-VN'),
      app.status === 'pending' ? 'Chờ xử lý' : 
      app.status === 'contacted' ? 'Đã liên hệ' : 
      app.status === 'interviewed' ? 'Đã phỏng vấn' : 
      app.status === 'accepted' ? 'Trúng tuyển' : 'Từ chối',
      app.expectations.replace(/"/g, '""'),
      app.notes.replace(/"/g, '""')
    ]);

    const csvContent = "\uFEFF" + [ // BOM for excel UTF-8
      headers.join(','),
      ...rows.map(e => e.map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `GKL_Applicants_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const selectApplicant = (app: Applicant) => {
    setSelectedApplicant(app);
    setEditingNotes(app.notes);
  };

  const appsScriptCode = `function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Tạo tiêu đề cột tự động nếu bảng đang trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Mã hồ sơ", 
        "Họ tên Học sinh", 
        "Lớp", 
        "Trình độ Tiếng Anh", 
        "Họ tên Phụ huynh", 
        "Số điện thoại", 
        "Email", 
        "Mong muốn / Yêu cầu riêng", 
        "Ngày đăng ký", 
        "Trạng thái"
      ]);
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#dbeafe").setHorizontalAlignment("center");
    }
    
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      data.id,
      data.studentName,
      data.studentGrade,
      data.englishLevel,
      data.parentName,
      "'" + data.phone, // Giữ số 0 ở đầu số điện thoại
      data.email,
      data.expectations,
      data.submittedAt,
      data.status === "pending" ? "Chờ xử lý" : data.status
    ]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleSaveWebhook = () => {
    localStorage.setItem('google_sheet_webhook_url', webhookUrl);
    alert('Đã lưu cấu hình URL kết nối Google Sheets thành công!');
  };

  const handleTestConnection = async () => {
    if (!webhookUrl) {
      alert('Vui lòng điền Web App URL của Google Sheets!');
      return;
    }
    setIsTesting(true);
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: 'TEST-123',
          studentName: 'Học sinh Thử nghiệm',
          studentGrade: 'Lớp 6',
          englishLevel: 'PET',
          parentName: 'Phụ huynh Thử nghiệm',
          phone: '0987654321',
          email: 'test@example.com',
          expectations: 'Kiểm tra đường truyền đồng bộ Google Sheets tự động.',
          submittedAt: new Date().toLocaleString('vi-VN'),
          status: 'TEST_SUCCESS',
        }),
      });
      alert('Đã gửi yêu cầu thử nghiệm! Hãy kiểm tra Google Sheet của bạn để xem dòng dữ liệu "Học sinh Thử nghiệm" đã được thêm thành công chưa.');
    } catch (err) {
      console.error(err);
      alert('Lỗi gửi thử nghiệm. Hãy đảm bảo bạn đã triển khai Apps Script với tùy chọn "Anyone" (Bất kỳ ai).');
    } finally {
      setIsTesting(false);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(appsScriptCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const formatDateTime = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      if (isNaN(d.getTime())) return isoStr;
      return d.toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-6 space-y-8">
        
        {/* Upper Action Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-[#0f2d59] hover:border-[#0f2d59] transition-colors shadow-sm"
              title="Quay lại Landing Page"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                Hệ Thống Quản Lý Ứng Viên
              </h2>
              <p className="text-xs text-gray-500 font-light mt-0.5">
                Ms Lý AI - Global Kids Leaders Candidate CRM
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowSheetsConfig(!showSheetsConfig)}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm ${
                showSheetsConfig 
                  ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-[#e08400] hover:text-[#0f2d59]'
              }`}
            >
              <Database size={16} />
              {showSheetsConfig ? 'Đóng cấu hình' : 'Đồng bộ Google Sheets'}
            </button>

            <button
              onClick={exportToCSV}
              className="flex items-center justify-center gap-2 bg-[#0f2d59] hover:bg-[#0a2142] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              <Download size={16} />
              Xuất Excel (CSV)
            </button>
          </div>
        </div>

        {/* Google Sheets Integration Config Card */}
        {showSheetsConfig && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 sm:p-8 space-y-6 font-sans">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <div className="p-2 bg-[#fffbf5] text-[#e08400] rounded-xl">
                <Database size={24} />
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-gray-900">Cấu hình Đồng bộ Google Sheets tự động</h3>
                <p className="text-xs text-gray-500 font-light">Kết nối trực tiếp form ứng tuyển của phụ huynh vào bảng tính của bạn</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100 space-y-2">
                <p className="text-xs text-amber-800 font-semibold uppercase tracking-wider">Đường link Google Sheet của bạn:</p>
                <a 
                  href="https://docs.google.com/spreadsheets/d/1VMsf3GEhiS9pCx6kr6EQcQOVQTMXvYU3qYyRgT08qGE/edit"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[#0f2d59] font-medium hover:underline flex items-center gap-1.5"
                >
                  https://docs.google.com/spreadsheets/d/1VMsf3GEhiS9pCx6kr6EQcQOVQTMXvYU3qYyRgT08qGE/edit
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {/* Steps */}
                <div className="space-y-4 text-xs text-gray-600 leading-relaxed font-light">
                  <h4 className="font-bold text-gray-800 uppercase tracking-wider text-sm mb-2 text-[#0f2d59]">Hướng dẫn thiết lập (3 phút)</h4>
                  <ul className="space-y-3">
                    <li className="flex gap-2">
                      <span className="w-5 h-5 bg-[#e08400] text-white font-bold rounded-full flex items-center justify-center shrink-0">1</span>
                      <span>Mở link Google Sheet ở trên, chọn <strong>Tiện ích mở rộng (Extensions) &gt; Apps Script</strong>.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="w-5 h-5 bg-[#e08400] text-white font-bold rounded-full flex items-center justify-center shrink-0">2</span>
                      <span>Xóa sạch code hiện tại trong ô soạn thảo, click nút <strong>"Sao chép Code"</strong> bên phải và dán vào. Sau đó nhấn biểu tượng <strong>Lưu</strong>.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="w-5 h-5 bg-[#e08400] text-white font-bold rounded-full flex items-center justify-center shrink-0">3</span>
                      <span>Nhấp <strong>Triển khai (Deploy) &gt; Triển khai mới (New deployment)</strong>. Click icon bánh răng chọn <strong>Ứng dụng web (Web app)</strong>.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="w-5 h-5 bg-[#e08400] text-white font-bold rounded-full flex items-center justify-center shrink-0">4</span>
                      <span>Cấu hình: Thực thi dưới tên <strong>"Tôi"</strong>, Ai có quyền truy cập chọn <strong>"Bất kỳ ai" (Anyone)</strong>. Rồi nhấp <strong>Triển khai</strong>.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="w-5 h-5 bg-[#e08400] text-white font-bold rounded-full flex items-center justify-center shrink-0">5</span>
                      <span>Sao chép <strong>URL ứng dụng web (Web app URL)</strong> nhận được, dán vào ô bên dưới và nhấn <strong>Lưu cấu hình</strong>.</span>
                    </li>
                  </ul>
                </div>

                {/* Code editor snippet and webhook URL configuration */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Mã nguồn Google Apps Script:</span>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1.5 text-xs font-semibold text-[#0f2d59] hover:text-[#0a2142] transition-colors bg-amber-50 px-2.5 py-1.5 rounded-lg border border-amber-100"
                      >
                        <Copy size={12} />
                        {isCopied ? 'Đã sao chép!' : 'Sao chép Code'}
                      </button>
                    </div>
                    <pre className="p-3 bg-gray-900 text-gray-100 text-[10px] font-mono rounded-xl overflow-x-auto max-h-[160px] border border-gray-800">
                      {appsScriptCode}
                    </pre>
                  </div>

                  <div className="space-y-2.5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">URL Ứng dụng Web đã triển khai:</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="url"
                        value={webhookUrl}
                        onChange={(e) => setWebhookUrl(e.target.value)}
                        placeholder="https://script.google.com/macros/s/.../exec"
                        className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-4 focus:ring-[#e08400]/15 focus:border-[#0f2d59] bg-white text-gray-800 font-mono"
                      />
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={handleSaveWebhook}
                          className="px-4 py-2.5 bg-[#0f2d59] hover:bg-[#0a2142] text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
                        >
                          Lưu cấu hình
                        </button>
                        <button
                          onClick={handleTestConnection}
                          disabled={isTesting || !webhookUrl}
                          className="px-4 py-2.5 bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 text-gray-600 rounded-xl text-xs font-semibold transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                        >
                          {isTesting ? 'Đang gửi...' : 'Gửi Test'}
                        </button>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 font-light italic">
                      * Khi đã cấu hình thành công, bất kỳ phụ huynh nào đăng ký trên website sẽ được lưu tự động và đẩy vào Google Sheets của bạn ngay lập tức!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Statistics Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Applicants */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Tổng số ứng tuyển</span>
              <span className="text-3xl font-bold text-gray-900">{totalCount}</span>
            </div>
            <div className="p-4 bg-gray-50 text-gray-500 rounded-xl">
              <Users size={24} />
            </div>
          </div>

          {/* Pending Reviews */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider block">Chờ xử lý</span>
              <span className="text-3xl font-bold text-amber-600">{pendingCount}</span>
            </div>
            <div className="p-4 bg-amber-50 text-amber-500 rounded-xl">
              <Clock size={24} />
            </div>
          </div>

          {/* Contacted / Interviewed */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider block">Đang trao đổi / PV</span>
              <span className="text-3xl font-bold text-blue-600">{contactedCount}</span>
            </div>
            <div className="p-4 bg-blue-50 text-blue-500 rounded-xl">
              <MessageSquare size={24} />
            </div>
          </div>

          {/* Admitted */}
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider block">Trúng tuyển (F. Host)</span>
              <span className="text-3xl font-bold text-[#e08400]">{acceptedCount} / 10</span>
            </div>
            <div className="p-4 bg-amber-50 text-[#e08400] rounded-xl">
              <CheckCircle2 size={24} />
            </div>
          </div>

        </div>

        {/* Main CRM Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Table Panel (Spans 8) */}
          <div className="lg:col-span-8 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            
            {/* Filter controls header */}
            <div className="p-5 border-b border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-gray-50/50">
              {/* Search */}
              <div className="relative w-full sm:max-w-xs">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm kiếm ứng viên..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-[#e08400]/15 focus:border-[#0f2d59] text-sm bg-white"
                />
              </div>

              {/* Status Select Filter */}
              <div className="flex gap-2 items-center w-full sm:w-auto">
                <span className="text-xs text-gray-400 whitespace-nowrap">Bộ lọc:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-4 focus:ring-[#e08400]/15 focus:border-[#0f2d59] bg-white text-gray-700 font-medium"
                >
                  <option value="all">Tất cả hồ sơ</option>
                  <option value="pending">Chờ xử lý</option>
                  <option value="contacted">Đã liên hệ</option>
                  <option value="interviewed">Đã phỏng vấn</option>
                  <option value="accepted">Trúng tuyển</option>
                  <option value="rejected">Từ chối</option>
                </select>
              </div>
            </div>

            {/* Candidate Table Data */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="py-4 px-5">Học sinh</th>
                    <th className="py-4 px-5">Phụ huynh / Liên hệ</th>
                    <th className="py-4 px-5">T.Anh</th>
                    <th className="py-4 px-5">Trạng thái</th>
                    <th className="py-4 px-5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredApplicants.length > 0 ? (
                    filteredApplicants.map((applicant) => (
                      <tr 
                        key={applicant.id}
                        onClick={() => selectApplicant(applicant)}
                        className={`hover:bg-[#0f2d59]/5 cursor-pointer transition-colors ${selectedApplicant?.id === applicant.id ? 'bg-[#0f2d59]/10' : ''}`}
                      >
                        {/* Student Column */}
                        <td className="py-4.5 px-5">
                          <div className="font-semibold text-gray-800">{applicant.studentName}</div>
                          <div className="text-xs text-gray-500 font-medium mt-0.5 flex items-center gap-1.5">
                            <BookOpen size={12} className="text-gray-400" />
                            {applicant.studentGrade}
                          </div>
                        </td>

                        {/* Parent Column */}
                        <td className="py-4.5 px-5">
                          <div className="font-medium text-gray-700">{applicant.parentName}</div>
                          <div className="text-xs text-gray-500 font-light mt-0.5 space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <Phone size={10} className="text-gray-400" />
                              <span>{applicant.phone}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Mail size={10} className="text-gray-400" />
                              <span>{applicant.email}</span>
                            </div>
                          </div>
                        </td>

                        {/* English Level Column */}
                        <td className="py-4.5 px-5">
                          <span className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-full text-xs font-semibold">
                            {applicant.englishLevel}
                          </span>
                        </td>

                        {/* Status badge */}
                        <td className="py-4.5 px-5">
                          {applicant.status === 'pending' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 border border-amber-100 text-amber-700">
                              Chờ xử lý
                            </span>
                          )}
                          {applicant.status === 'contacted' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 border border-blue-100 text-blue-700">
                              Đã liên hệ
                            </span>
                          )}
                          {applicant.status === 'interviewed' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 border border-purple-100 text-purple-700">
                              Đã phỏng vấn
                            </span>
                          )}
                          {applicant.status === 'accepted' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 border border-amber-100 text-[#e08400]">
                              Trúng tuyển
                            </span>
                          )}
                          {applicant.status === 'rejected' && (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 border border-gray-100 text-gray-500">
                              Từ chối
                            </span>
                          )}
                        </td>

                        {/* Quick Delete Column */}
                        <td className="py-4.5 px-5 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleDelete(applicant.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                            title="Xóa hồ sơ"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400 font-light">
                        <AlertCircle size={24} className="mx-auto mb-2 opacity-50" />
                        Không tìm thấy hồ sơ ứng viên nào phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer row displaying counts */}
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 font-light flex justify-between items-center">
              <span>Đang hiển thị {filteredApplicants.length} trên {applicants.length} ứng viên</span>
              <span>Hệ thống CRM lưu trữ cục bộ</span>
            </div>

          </div>

          {/* Right Candidate Profile Panel (Spans 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {selectedApplicant ? (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 space-y-6 font-sans">
                
                {/* Header Information block */}
                <div className="border-b border-gray-100 pb-5 space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-0.5 rounded">
                      {selectedApplicant.id}
                    </span>
                    <span className="text-xs text-gray-400 font-light">
                      {formatDateTime(selectedApplicant.submittedAt)}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-xl font-bold text-gray-900 leading-tight">
                      {selectedApplicant.studentName}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mt-1 flex items-center gap-1">
                      <BookOpen size={12} />
                      Đang học {selectedApplicant.studentGrade}
                    </p>
                  </div>
                </div>

                {/* Personal Information items */}
                <div className="space-y-4 text-xs">
                  <h4 className="font-bold text-gray-800 uppercase tracking-wider">Thông tin chi tiết</h4>
                  
                  <div className="grid grid-cols-1 gap-3.5 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div>
                      <span className="text-gray-400 font-medium block">Phụ huynh:</span>
                      <span className="text-gray-700 font-semibold">{selectedApplicant.parentName}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium block">Điện thoại:</span>
                      <span className="text-gray-700 font-mono font-medium">{selectedApplicant.phone}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium block">Email:</span>
                      <span className="text-gray-700 font-medium">{selectedApplicant.email}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium block">Trình độ tiếng Anh:</span>
                      <span className="text-gray-700 font-semibold flex items-center gap-1.5 mt-0.5">
                        <Award size={14} className="text-[#e08400]" />
                        {selectedApplicant.englishLevel}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Parent's Expectations text */}
                <div className="space-y-2 text-xs">
                  <h4 className="font-bold text-gray-800 uppercase tracking-wider">Mong muốn của phụ huynh</h4>
                  <div className="p-3 bg-indigo-50/40 border border-indigo-100/50 rounded-xl text-gray-600 italic leading-relaxed">
                    {selectedApplicant.expectations || 'Không có yêu cầu đặc biệt.'}
                  </div>
                </div>

                {/* Status CRM Actions dropdown */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">Cập nhật trạng thái</label>
                  <select
                    value={selectedApplicant.status}
                    onChange={(e) => handleStatusChange(selectedApplicant.id, e.target.value as Applicant['status'])}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-4 focus:ring-[#e08400]/15 focus:border-[#0f2d59] bg-white font-medium text-gray-700"
                  >
                    <option value="pending">Chờ xử lý</option>
                    <option value="contacted">Đã liên hệ</option>
                    <option value="interviewed">Đã phỏng vấn</option>
                    <option value="accepted">Trúng tuyển (Kid Leader)</option>
                    <option value="rejected">Từ chối ứng cử</option>
                  </select>
                </div>

                {/* Private Administrative Notes */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-800 uppercase tracking-wider block">Ghi chú quản trị</label>
                  <textarea
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="Nhập ghi chú liên hệ, kết quả phỏng vấn học bổng..."
                    rows={4}
                    className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-4 focus:ring-[#e08400]/15 focus:border-[#0f2d59] bg-white text-gray-700 resize-none font-light"
                  />
                  <button
                    onClick={() => handleNotesSave(selectedApplicant.id)}
                    className="w-full bg-[#0f2d59] hover:bg-[#0a2142] text-white py-2 rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Check size={14} />
                    Lưu ghi chú
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 text-center py-16 text-gray-400 font-sans font-light">
                <Users size={32} className="mx-auto mb-3 opacity-30" />
                <h4 className="font-semibold text-gray-700 text-sm mb-1">Hồ sơ ứng viên</h4>
                <p className="text-xs max-w-[200px] mx-auto">Chọn một ứng cử viên từ danh sách bên cạnh để xem chi tiết và thực hiện xử lý.</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
