import React, { useState } from 'react';
import { Menu, X, Settings } from 'lucide-react';

interface NavbarProps {
  onRegisterClick: () => void;
  onAdminClick: () => void;
  showAdminBtn: boolean;
}

export default function Navbar({ onRegisterClick, onAdminClick, showAdminBtn }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/85 backdrop-blur-md border-b border-gray-100 shadow-sm h-20 flex items-center">
      <div className="flex justify-between items-center w-full px-6 max-w-7xl mx-auto">
        {/* Logo and Branding */}
        <div 
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img
            alt="Global Kids Leaders Logo"
            className="h-11 sm:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
            src="https://i.postimg.cc/jSpv5SVf/cf997133-5395-4aba-83df-dbf657d38ac2.png"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col select-none">
            <span className="font-black text-[15px] sm:text-[17px] text-[#0f2d59] leading-none tracking-[0.05em] uppercase">
              GLOBAL
            </span>
            <span className="font-black text-[12px] sm:text-[13.5px] text-[#e08400] leading-none tracking-[0.02em] uppercase mt-0.5">
              KIDS LEADERS
            </span>
            <span className="text-[7.5px] sm:text-[8px] font-bold text-[#0f2d59]/80 leading-none tracking-[0.02em] mt-1 font-sans">
              Lead Today - Inspire Tomorrow
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide text-gray-600">
          <a href="#vision" className="hover:text-[#0f2d59] transition-colors py-2">
            Tầm nhìn
          </a>
          <a href="#program" className="hover:text-[#0f2d59] transition-colors py-2">
            Chương trình
          </a>
          <a href="#benefits" className="hover:text-[#0f2d59] transition-colors py-2">
            Đặc quyền
          </a>
          <a href="#eligibility" className="hover:text-[#0f2d59] transition-colors py-2">
            Đối tượng
          </a>
          <a href="#timeline" className="hover:text-[#0f2d59] transition-colors py-2">
            Lộ trình
          </a>
          
          {showAdminBtn && (
            <button
              onClick={onAdminClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all font-medium border border-gray-200"
            >
              <Settings size={14} />
              Quản lý ứng viên
            </button>
          )}

          <button
            onClick={onRegisterClick}
            className="bg-[#0f2d59] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#0a2142] active:scale-95 transition-all shadow-sm"
          >
            Đăng ký ứng tuyển
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
          {showAdminBtn && (
            <button
              onClick={onAdminClick}
              className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all border border-gray-200"
              title="Quản lý ứng viên"
            >
              <Settings size={18} />
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-[#0f2d59] p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-200 shadow-xl py-6 px-6 flex flex-col gap-4 animate-fadeIn">
          <a
            href="#vision"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#0f2d59] text-gray-700 font-semibold text-base py-1"
          >
            Tầm nhìn
          </a>
          <a
            href="#program"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#0f2d59] text-gray-700 font-semibold text-base py-1"
          >
            Chương trình
          </a>
          <a
            href="#benefits"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#0f2d59] text-gray-700 font-semibold text-base py-1"
          >
            Đặc quyền
          </a>
          <a
            href="#eligibility"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#0f2d59] text-gray-700 font-semibold text-base py-1"
          >
            Đối tượng
          </a>
          <a
            href="#timeline"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#0f2d59] text-gray-700 font-semibold text-base py-1"
          >
            Lộ trình
          </a>

          <div className="h-px bg-gray-100 my-2" />

          <button
            onClick={() => {
              setIsOpen(false);
              onRegisterClick();
            }}
            className="bg-[#0f2d59] text-white w-full py-3 rounded-xl font-bold text-center hover:bg-[#0a2142] active:scale-95 transition-all shadow-md"
          >
            Đăng ký ứng tuyển ngay
          </button>
        </div>
      )}
    </nav>
  );
}
