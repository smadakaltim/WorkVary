import React, { useState } from 'react';
import { Lock, LayoutDashboard, Award, BarChart3, Bot, Bell, Menu, X, ShieldCheck, Search, LogOut, User, Sparkles } from 'lucide-react';
import { TabType } from './Navigation';
import { UserProfile } from '../types';

interface HeaderProps {
  siteTitle: string;
  subTitle: string;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  announcementCount?: number;
  user?: UserProfile | null;
  onLogout?: () => void;
  onOpenSearch?: () => void;
  onOpenOperatorModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  announcementCount = 0,
  user,
  onLogout,
  onOpenSearch,
  onOpenOperatorModal,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mainOptions = [
    {
      id: 'workvary' as TabType,
      label: 'WorkVary Twin',
      icon: Sparkles,
      color: 'text-[#ffd700]',
      badge: 'Minat & Poster',
    },
    {
      id: 'evaluator' as TabType,
      label: 'Evaluasi SKKNI',
      icon: Award,
      color: 'text-amber-400',
    },
    {
      id: 'analytics' as TabType,
      label: 'Data Makro',
      icon: BarChart3,
      color: 'text-emerald-400',
    },
    {
      id: 'consultant' as TabType,
      label: 'Konsultasi AI',
      icon: Bot,
      color: 'text-blue-400',
      badge: 'Gemini AI',
    },
    {
      id: 'announcements' as TabType,
      label: 'Maklumat',
      icon: Bell,
      color: 'text-amber-400',
      count: announcementCount,
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0C0C0E]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.1)] shadow-xl">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
        
        {/* BRAND & SEPARATED HOME SECTION */}
        <div className="flex items-center gap-3">
          {/* Main Logo & Brand */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 group text-left cursor-pointer select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/20 text-white flex items-center justify-center font-extrabold text-xs sm:text-sm shadow-md group-hover:scale-105 transition-transform font-outfit tracking-wider">
              WV
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs sm:text-sm tracking-tight text-[#ffd700] group-hover:text-amber-300 transition-colors leading-tight font-outfit">
                  WorkVary
                </span>
                <span className="hidden xs:inline-block px-1.5 py-0.2 bg-[#ffd700]/15 text-[#ffd700] text-[8px] font-mono-geist font-bold rounded border border-[#ffd700]/30 uppercase">
                  KOMDIGI
                </span>
              </div>
              <span className="font-mono-geist text-[0.5rem] sm:text-[0.55rem] tracking-[0.16em] text-zinc-400 uppercase">
                KOMPETENSI DIGITAL
              </span>
            </div>
          </button>

          {/* Vertical Divider */}
          <div className="hidden lg:block h-7 w-[1px] bg-white/15" />

          {/* SEPARATED HOME MENU BUTTON (Blockbench Style) */}
          <button
            onClick={() => setActiveTab('home')}
            className={`hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono-geist text-xs font-extrabold transition-all cursor-pointer border ${
              activeTab === 'home'
                ? 'bg-[#ffd700] text-[#111113] border-[#ffd700] shadow-md shadow-[#ffd700]/20 scale-[1.02]'
                : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <LayoutDashboard className={`w-3.5 h-3.5 ${activeTab === 'home' ? 'text-[#111113]' : 'text-[#ffd700]'}`} />
            <span>Beranda</span>
          </button>
        </div>

        {/* QUICK SEARCH BUTTON (FEATURE FOR SEARCHING SKKNI TOPICS & MODULES) */}
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-2 px-3.5 py-1.5 bg-[#161618] hover:bg-zinc-800 border border-white/15 hover:border-[#ffd700]/50 rounded-xl text-xs text-zinc-400 hover:text-white font-mono-geist transition-all cursor-pointer shadow-sm group"
        >
          <Search className="w-3.5 h-3.5 text-[#ffd700] group-hover:scale-110 transition-transform" />
          <span className="hidden xl:inline">Pencarian Cepat SKKNI / Modul...</span>
          <span className="xl:hidden">Cari SKKNI...</span>
          <span className="px-1.5 py-0.5 bg-black/60 border border-white/10 rounded text-[9px] text-zinc-400 font-bold">
            Ctrl+K
          </span>
        </button>

        {/* CENTER MAIN MENU OPTIONS */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#161618] border border-white/10 p-1 rounded-2xl shadow-inner">
          {mainOptions.map((opt) => {
            const Icon = opt.icon;
            const isActive = activeTab === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveTab(opt.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold font-mono-geist transition-all cursor-pointer relative ${
                  isActive
                    ? 'bg-[#215ecf] text-white font-bold shadow-md shadow-[#215ecf]/30 ring-1 ring-white/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : opt.color}`} />
                <span>{opt.label}</span>

                {opt.badge && (
                  <span className="px-1 py-0.2 text-[8px] font-extrabold bg-blue-500/20 text-blue-300 rounded-full border border-blue-400/30">
                    {opt.badge}
                  </span>
                )}

                {opt.count !== undefined && opt.count > 0 && (
                  <span className="px-1.5 py-0.2 text-[8px] font-extrabold bg-[#ffd700] text-[#111113] rounded-full">
                    {opt.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT CONTROLS: QUICK SEARCH (MOBILE), USER ACCOUNT PROFILE, OPERATOR ACCESS */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Mobile Search Button */}
          <button
            onClick={onOpenSearch}
            className="md:hidden p-2 bg-zinc-900 border border-white/15 text-[#ffd700] rounded-xl cursor-pointer"
            aria-label="Pencarian cepat"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* User Account Profile Pill */}
          {user && (
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-zinc-900 border border-white/15 rounded-xl text-xs font-mono-geist">
              <div className="w-6 h-6 rounded-lg bg-[#215ecf] text-white flex items-center justify-center text-[10px] font-extrabold">
                {user.name ? user.name.charAt(0) : 'U'}
              </div>
              <div className="flex flex-col text-left leading-none max-w-[120px] lg:max-w-[150px]">
                <span className="font-bold text-white text-[11px] truncate">{user.name}</span>
                <span className="text-[9px] text-zinc-400 truncate">{user.role}</span>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  title="Keluar (Logout)"
                  className="p-1 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer ml-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Access Operator Button */}
          <button
            onClick={onOpenOperatorModal}
            className="bg-zinc-900 hover:bg-zinc-800 border border-white/15 text-white hover:text-[#ffd700] px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer font-mono-geist active:scale-95 shadow-sm"
          >
            <Lock className="w-3.5 h-3.5 text-[#ffd700]" />
            <span className="hidden sm:inline">Operator</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 rounded-xl border border-white/15 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-[#ffd700]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#111113] border-b border-white/10 px-4 py-4 space-y-3 shadow-2xl">
          
          {/* User profile info in mobile view */}
          {user && (
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#215ecf] text-white flex items-center justify-center font-bold text-xs">
                  {user.name ? user.name.charAt(0) : 'U'}
                </div>
                <div>
                  <span className="font-bold text-xs text-white block">{user.name}</span>
                  <span className="text-[10px] text-zinc-400 block">{user.role}</span>
                </div>
              </div>
              {onLogout && (
                <button
                  onClick={onLogout}
                  className="px-2.5 py-1 bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg text-xs font-mono-geist font-bold flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Keluar</span>
                </button>
              )}
            </div>
          )}

          {/* Quick Search trigger in mobile menu */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenSearch?.();
            }}
            className="w-full p-2.5 bg-[#161618] border border-white/15 rounded-xl text-xs text-[#ffd700] font-mono-geist font-bold flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Pencarian Cepat Topik SKKNI &amp; Modul...</span>
          </button>

          {/* Separated Home Block */}
          <div className="pb-3 border-b border-white/10">
            <span className="text-[10px] font-mono-geist text-[#ffd700] font-bold uppercase tracking-widest block mb-1.5">
              [ BERANDA UTAMA ]
            </span>
            <button
              onClick={() => {
                setActiveTab('home');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3 rounded-xl font-mono-geist text-xs font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-[#ffd700] text-[#111113] shadow-md'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Beranda Utama</span>
              </div>
              <span className="text-[9px] font-mono-geist px-2 py-0.5 bg-black/30 rounded text-amber-200">
                AKTIF
              </span>
            </button>
          </div>

          {/* Main Sub-menu Options Block */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono-geist text-zinc-400 font-bold uppercase tracking-widest block mb-1">
              [ FITUR &amp; LAYANAN PORTAL ]
            </span>

            {mainOptions.map((opt) => {
              const Icon = opt.icon;
              const isActive = activeTab === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setActiveTab(opt.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold font-mono-geist transition-all ${
                    isActive
                      ? 'bg-[#215ecf] text-white font-bold shadow-md'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : opt.color}`} />
                    <span>{opt.label}</span>
                  </div>

                  {opt.badge && (
                    <span className="text-[9px] px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded-full font-bold">
                      {opt.badge}
                    </span>
                  )}

                  {opt.count !== undefined && opt.count > 0 && (
                    <span className="text-[9px] px-2 py-0.5 bg-[#ffd700] text-black font-extrabold rounded-full">
                      {opt.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

