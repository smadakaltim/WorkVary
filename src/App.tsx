import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { StatsCards } from './components/StatsCards';
import { CareerEvaluator } from './components/CareerEvaluator';
import { MacroAnalytics } from './components/MacroAnalytics';
import { AIConsultant } from './components/AIConsultant';
import { SidebarInfo } from './components/SidebarInfo';
import { OperatorModal } from './components/OperatorModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { ContactLocationSection } from './components/ContactLocationSection';
import { WorkVaryTwin } from './components/WorkVaryTwin';
import { LoginScreen } from './components/LoginScreen';
import { Footer } from './components/Footer';
import { DEFAULT_PORTAL_CONFIG } from './data/defaultConfig';
import { PortalConfig, Announcement, UserProfile } from './types';
import { ArrowRight, Sparkles, Award, BarChart2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<PortalConfig>(DEFAULT_PORTAL_CONFIG);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isOperatorModalOpen, setIsOperatorModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [targetSectorKey, setTargetSectorKey] = useState<string | undefined>(undefined);

  // Authentication state
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('satudata_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Handle Ctrl+K or Cmd+K keyboard shortcut for Quick Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Fetch Portal configuration on load
  useEffect(() => {
    fetch('/api/config')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to load config");
      })
      .then((data) => {
        if (data && data.siteTitle) {
          setConfig(data);
        }
      })
      .catch((err) => {
        console.warn("Using default portal config:", err);
      });
  }, []);

  const handleLoginSuccess = (loggedInUser: UserProfile, token: string) => {
    setUser(loggedInUser);
    try {
      localStorage.setItem('satudata_user', JSON.stringify(loggedInUser));
      localStorage.setItem('satudata_token', token);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const handleLogout = () => {
    setUser(null);
    try {
      localStorage.removeItem('satudata_user');
      localStorage.removeItem('satudata_token');
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const handleSelectSearchResult = (targetTab: TabType, sectorKey?: string) => {
    setActiveTab(targetTab);
    if (sectorKey) {
      setTargetSectorKey(sectorKey);
    }
  };

  const handleSaveConfig = async (
    newTitle: string,
    newSub: string,
    newAnnouncements: Announcement[]
  ) => {
    const res = await fetch('/api/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siteTitle: newTitle,
        subTitle: newSub,
        announcements: newAnnouncements,
        passcode: 'gov123'
      })
    });

    if (!res.ok) {
      throw new Error("Gagal menyimpan konfigurasi operator");
    }

    const data = await res.json();
    if (data.config) {
      setConfig(data.config);
    }
  };

  // IF USER IS NOT LOGGED IN, RENDER THE LOGIN GATEWAY SCREEN FIRST
  if (!user) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#111113] text-[#FFFFFF] flex flex-col font-geist selection:bg-[#ffd700] selection:text-black relative">
      {/* Background Radial Glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,#1c2d5a_0%,transparent_40%),radial-gradient(circle_at_20%_80%,#215ecf_0%,transparent_40%)] opacity-30 pointer-events-none z-0"></div>
      
      {/* Header with Blockbench-style separated navigation menu, Quick Search, and User Logout */}
      <Header
        siteTitle={config.siteTitle}
        subTitle={config.subTitle}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        announcementCount={config.announcements.length}
        user={user}
        onLogout={handleLogout}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenOperatorModal={() => setIsOperatorModalOpen(true)}
      />

      {/* Main Body Grid Layout */}
      <div className="flex-1 flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto min-h-0">
        {/* Scroll Container (Center Main View) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Section Date & Title */}
          <div className="space-y-1 mb-6">
            <span className="text-[0.7rem] font-mono-geist uppercase tracking-widest text-[#ffd700] block">
              [ PORTAL NASIONAL - {user.role.toUpperCase()} ]
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-none">
              Satu Pintu Kedaulatan<br />Talenta Digital.
            </h1>
          </div>

          {/* Stats Strip */}
          <StatsCards stats={config.macroStats} />

          {/* TAB CONTENT AREAS */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* TAB 1: Home Dashboard */}
              {activeTab === 'home' && (
                <div className="space-y-6">
                  {/* Feature Hero Card matching Design Specification */}
                  <div className="bg-gradient-to-br from-[#1C1C1E] via-[#161618] to-[#215ecf]/80 rounded-3xl p-8 sm:p-10 border border-[rgba(255,255,255,0.15)] relative overflow-hidden shadow-2xl space-y-4">
                    <span className="inline-block px-3 py-1 bg-[#ffd700]/20 text-[#ffd700] font-extrabold font-mono-geist text-[10px] uppercase tracking-widest rounded-md border border-[#ffd700]/30">
                      Standardisasi SKKNI 2026
                    </span>
                    
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight max-w-2xl">
                      Akselerasi Standarisasi Kualifikasi Nasional
                    </h2>

                    <p className="text-sm text-[rgba(255,255,255,0.8)] leading-relaxed max-w-2xl">
                      Evaluasi kesesuaian kualifikasi Anda dengan SKKNI &amp; kebutuhan industri masa depan menuju Indonesia Emas 2045.
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => setActiveTab('evaluator')}
                        className="px-6 py-3 bg-[#ffd700] text-[#111113] font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer btn-glow active:scale-95 font-mono-geist"
                      >
                        <span>PROSES EVALUASI KARIR</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setActiveTab('consultant')}
                        className="px-6 py-3 bg-black/40 hover:bg-black/60 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all border border-white/20 flex items-center gap-2 cursor-pointer active:scale-95 font-mono-geist"
                      >
                        <Sparkles className="w-4 h-4 text-[#ffd700]" />
                        <span>Konsultasi AI Kominfo</span>
                      </button>
                    </div>
                  </div>

                  {/* Main Career Evaluator View */}
                  <CareerEvaluator
                    careerPool={config.careerPool}
                    selectedSectorKeyProp={targetSectorKey}
                    user={user}
                  />

                  {/* WorkVary Intelligence Teaser Card on Home */}
                  <div className="bg-gradient-to-r from-[#18181C] via-[#121215] to-[#1A1A22] p-6 rounded-2xl border border-[#ffd700]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#ffd700]/20 text-[#ffd700] text-[10px] font-outfit font-extrabold rounded uppercase tracking-wider">
                          Integrasi Modul WorkVary
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-white font-outfit flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#ffd700]" />
                        <span>WorkVary — AI Workforce Digital Twin &amp; 8 Modul AI</span>
                      </h3>
                      <p className="text-xs text-zinc-300 font-jakarta">
                        Gunakan Resume Understanding AI (OCR+NER), Skill Gap Analysis XGBoost, &amp; Interview Simulator secara langsung.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('workvary')}
                      className="px-5 py-2.5 bg-[#ffd700] hover:bg-amber-400 text-black text-xs font-outfit font-extrabold rounded-xl transition-all whitespace-nowrap cursor-pointer active:scale-95 shadow-md flex items-center gap-2"
                    >
                      <span>Coba WorkVary AI Twin</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Macro Analytics Preview Teaser */}
                  <div className="bg-[#161618] p-6 rounded-2xl border border-[rgba(237,238,240,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-[#EDEEF0] flex items-center gap-2">
                        <BarChart2 className="w-4 h-4 text-[#E5B01A]" />
                        <span>Ingin Melihat Proyeksi Makro Permintaan Pasar Kerja?</span>
                      </h3>
                      <p className="text-xs text-[rgba(237,238,240,0.5)]">
                        Akses grafik statistik tren 2022-2026, peta kualifikasi regional, dan matriks gap sertifikasi.
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('analytics')}
                      className="px-4 py-2.5 bg-[#000000] hover:bg-white/5 text-[#E5B01A] border border-[rgba(237,238,240,0.15)] text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer active:scale-95"
                    >
                      Buka Visualisasi Makro
                    </button>
                  </div>
                </div>
              )}

              {/* TAB WORKVARY: AI Workforce Digital Twin & 8 Modul */}
              {activeTab === 'workvary' && (
                <WorkVaryTwin user={user} onNavigateTab={setActiveTab} />
              )}

              {/* TAB 2: Evaluasi SKKNI Personal */}
              {activeTab === 'evaluator' && (
                <CareerEvaluator
                  careerPool={config.careerPool}
                  selectedSectorKeyProp={targetSectorKey}
                  user={user}
                />
              )}

              {/* TAB 3: Visualisasi Data Makro */}
              {activeTab === 'analytics' && (
                <MacroAnalytics careerPool={config.careerPool} />
              )}

              {/* TAB 4: Konsultasi AI Nasional */}
              {activeTab === 'consultant' && (
                <AIConsultant />
              )}

              {/* TAB 5: Maklumat & Pengumuman */}
              {activeTab === 'announcements' && (
                <div className="bg-[#161618] p-6 rounded-2xl border border-[rgba(237,238,240,0.1)] shadow-xs space-y-5">
                  <div className="border-b border-[rgba(237,238,240,0.1)] pb-4">
                    <h3 className="text-base font-bold text-[#EDEEF0]">
                      Maklumat Pelayanan & Informasi Pengumuman Resmi
                    </h3>
                    <p className="text-xs text-[rgba(237,238,240,0.5)] mt-1">
                      Standar transparansi publik dan rilis resmi Kementerian Komunikasi dan Digital RI.
                    </p>
                  </div>

                  <div className="p-4 bg-[#000000] border border-[rgba(237,238,240,0.1)] rounded-xl text-xs leading-relaxed space-y-3">
                    <h4 className="font-bold text-[#EDEEF0] text-sm flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#E5B01A]" />
                      <span>Prinsip Penyelenggaraan WorkVary</span>
                    </h4>
                    <ul className="space-y-2 text-[rgba(237,238,240,0.7)]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>Data SKKNI terintegrasi secara standar umum.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>Kerahasiaan data pribadi masyarakat dilindungi Undang-Undang Pelindungan Data Pribadi (UU PDP).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>Layanan AI Konsultan bersifat sebagai pendukung acuan ilmiah & regulasi publik secara gratis.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <h4 className="text-xs font-bold font-mono-geist text-[#E5B01A] uppercase tracking-wider mb-3">
                      Daftar Pengumuman Aktif
                    </h4>
                    <div className="space-y-2.5">
                      {config.announcements.map((ann) => (
                        <div key={ann.id} className="p-3.5 bg-[#000000] rounded-xl border border-[rgba(237,238,240,0.1)] text-xs">
                          <div className="flex items-start gap-3">
                            <span className="text-lg">{ann.icon}</span>
                            <div>
                              <span className="font-bold text-[#EDEEF0] block">{ann.title}</span>
                              <span className="text-[10px] text-[rgba(237,238,240,0.4)] font-mono-geist mt-0.5 block">{ann.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar Panel (Fixed/Sticky Right) */}
        <SidebarInfo announcements={config.announcements} />
      </div>

      {/* Quick Search Modal */}
      <QuickSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      {/* Operator Settings Modal */}
      <OperatorModal
        isOpen={isOperatorModalOpen}
        onClose={() => setIsOperatorModalOpen(false)}
        siteTitle={config.siteTitle}
        subTitle={config.subTitle}
        announcements={config.announcements}
        onSaveConfig={handleSaveConfig}
      />

      {/* Contact & Location Desktop Section */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <ContactLocationSection />
      </div>

      {/* Footer Bar */}
      <Footer />
    </div>
  );
}

