import React, { useState } from 'react';
import { UserProfile } from '../types';
import { VisualInterestGallery } from './VisualInterestGallery';
import {
  Sparkles,
  Bot,
  FileText,
  Target,
  BookOpen,
  TrendingUp,
  GitGraph,
  BrainCircuit,
  Mic,
  ArrowRight,
  CheckCircle2,
  BarChart2,
  Building2,
  Zap,
  RefreshCw,
  Search,
  ChevronRight,
  Cpu,
  Download,
  Play,
  Check,
  ShieldCheck,
  HelpCircle,
  Clock
} from 'lucide-react';

interface WorkVaryTwinProps {
  user: UserProfile;
  onNavigateTab: (tab: any) => void;
}

export const WorkVaryTwin: React.FC<WorkVaryTwinProps> = ({ user, onNavigateTab }) => {
  const [activeModule, setActiveModule] = useState<number | null>(1);
  const [cvInputText, setCvInputText] = useState(
    `NAMA: ${user.name}\nEMAIL: ${user.email}\nROLE: ${user.role}\nKETERAMPILAN: React, TypeScript, Python, Data Analytics, Node.js, SQL\nPENDIDIKAN: S1 Teknik Informatika / Vokasi Digital\nSER TIFIKASI: BNSP Junior Web Developer, Google Data Analytics`
  );
  const [isParsingCv, setIsParsingCv] = useState(false);
  const [parsedProfile, setParsedProfile] = useState<any>(null);

  // Skill Gap State
  const [selectedTargetRole, setSelectedTargetRole] = useState('AI Software Engineer');
  const [calculatingGap, setCalculatingGap] = useState(false);
  const [gapResult, setGapResult] = useState<any>(null);

  // Interview Simulator state
  const [interviewQuestionIndex, setInterviewQuestionIndex] = useState(0);
  const [userAnswerText, setUserAnswerText] = useState('');
  const [interviewFeedback, setInterviewFeedback] = useState<any>(null);
  const [isAnalyzingInterview, setIsAnalyzingInterview] = useState(false);

  const interviewQuestions = [
    "Jelaskan pengalaman Anda dalam membangun aplikasi fullstack modern menggunakan React dan TypeScript!",
    "Bagaimana cara Anda mengoptimalkan performa kueri database pada sistem skala besar?",
    "Bagaimana langkah Anda jika menemukan bug kritis saat sistem dalam fase produksi live?"
  ];

  // Handle CV Parsing simulation
  const handleParseCV = () => {
    setIsParsingCv(true);
    setTimeout(() => {
      setParsedProfile({
        name: user.name,
        role: user.role,
        skillsExtracted: ['React', 'TypeScript', 'Python', 'Data Analytics', 'Node.js', 'SQL', 'REST API'],
        experienceYears: 2.5,
        education: 'S1 Teknik Informatika / Vokasi Digital',
        certificationsExtracted: ['BNSP Junior Web Developer', 'Google Data Analytics'],
        confidenceScore: 96.4,
        suggestedNextRole: 'AI Software Engineer & Cloud Developer'
      });
      setIsParsingCv(false);
    }, 1200);
  };

  // Handle Skill Gap Calculation simulation
  const handleCalculateGap = () => {
    setCalculatingGap(true);
    setTimeout(() => {
      setGapResult({
        targetRole: selectedTargetRole,
        matchScore: 82,
        skillsOwned: ['React.js', 'TypeScript', 'SQL Database', 'RESTful API'],
        skillsMissing: ['Deep Learning / PyTorch', 'Vector DB (ChromaDB/Pinecone)', 'Docker & Kubernetes'],
        estimatedReskillingWeeks: 6,
        recommendedPath: [
          'Modul 1: Advanced Python & PyTorch Basics (2 Minggu)',
          'Modul 2: Vector Database & Embeddings Deployment (2 Minggu)',
          'Modul 3: Containerization & Deployment ML Ops (2 Minggu)'
        ]
      });
      setCalculatingGap(false);
    }, 1000);
  };

  // Handle Interview Simulator
  const handleAnalyzeInterview = () => {
    if (!userAnswerText.trim()) return;
    setIsAnalyzingInterview(true);
    setTimeout(() => {
      setInterviewFeedback({
        score: 88,
        structureRating: 'Sangat Terstruktur (STAR Method)',
        fluencyScore: '92%',
        fillerWordsCount: 2,
        strengths: 'Jawaban lugas, menyebutkan teknologi yang relevan (React, Node.js), serta menjelaskan mekanisme error-handling.',
        areasToImprove: 'Tambahkan contoh kuantitatif dampak bisnis (misal: meningkatkan waktu muat hingga 35%).'
      });
      setIsAnalyzingInterview(false);
    }, 1300);
  };

  const aiModules = [
    {
      id: 1,
      title: 'AI Career Copilot',
      modelTech: 'Large Language Model (Gemini 2.5)',
      category: 'Pendamping Karier Interaktif',
      desc: 'LLM interaktif untuk konsultasi karier real-time, penjelasan skill gap, roadmap belajar, perancangan portofolio, dan persiapan asesmen.',
      icon: Bot,
      color: 'from-[#ffd700]/20 to-[#ffd700]/5 text-[#ffd700] border-[#ffd700]/30'
    },
    {
      id: 2,
      title: 'Resume Understanding AI',
      modelTech: 'LayoutLM + OCR + NER Engine',
      category: 'Profil Otomatis dari CV',
      desc: 'Mengekstraksi pendidikan, riwayat kerja, sertifikasi BNSP, dan keahlian dari berkas CV menjadi data JSON terstruktur.',
      icon: FileText,
      color: 'from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/30'
    },
    {
      id: 3,
      title: 'Skill Gap Analysis AI',
      modelTech: 'XGBoost + Cosine Vector Matching',
      category: 'Analisis Presisi Kompetensi',
      desc: 'Mengukur prosentase kecocokan profil dengan standar okupasi SKKNI, memetakan keahlian yang telah dikuasai, dan menemukan skill gap prioritas.',
      icon: Target,
      color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 4,
      title: 'Learning Recommendation Engine',
      modelTech: 'Multi-Criteria Recommendation Algorithm',
      category: 'Jalur Belajar Personal',
      desc: 'Menyusun kurikulum belajar adaptif berdasarkan batas kemampuan awal, domisili, minat, dan target okupasi industri.',
      icon: BookOpen,
      color: 'from-purple-500/20 to-purple-500/5 text-purple-400 border-purple-500/30'
    },
    {
      id: 5,
      title: 'Labor Market Forecasting AI',
      modelTech: 'LSTM Time Series + Prophet Engine',
      category: 'Prediksi Tren Kebutuhan Pasar',
      desc: 'Mengolah tren lowongan kerja nasional dan statistik BPS untuk memproyeksikan kebutuhan tenaga kerja 6–24 bulan ke depan.',
      icon: TrendingUp,
      color: 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30'
    },
    {
      id: 6,
      title: 'Knowledge Graph Skill Intelligence',
      modelTech: 'Neo4j + Semantic Vector Embeddings',
      category: 'Peta Relasi Kompetensi & Gaji',
      desc: 'Menghubungkan simpul keahlian, profesi digital, sertifikasi LSP, mitra perusahaan, dan rentang gaji industri terverifikasi.',
      icon: GitGraph,
      color: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30'
    },
    {
      id: 7,
      title: 'Adaptive Learning AI',
      modelTech: 'Reinforcement Learning Curriculum Optimizer',
      category: 'Kurikulum Belajar Adaptif',
      desc: 'Menyesuaikan tingkat kesulitan kuis, rekomendasi latihan, dan evaluasi berbasis kecepatan pemahaman setiap pengguna.',
      icon: BrainCircuit,
      color: 'from-pink-500/20 to-pink-500/5 text-pink-400 border-pink-500/30'
    },
    {
      id: 8,
      title: 'AI Interview Simulator',
      modelTech: 'Whisper Speech Audio + LLM Feedback',
      category: 'Simulasi Wawancara Kerja',
      desc: 'Mengevaluasi struktur jawaban (STAR), kelancaran ucapan, tingkat percaya diri, filler words, serta skor kesiapan wawancara kerja.',
      icon: Mic,
      color: 'from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/30'
    }
  ];

  return (
    <div className="space-y-8 font-jakarta">
      {/* HERO BANNER WORKVARY INTEGRATION */}
      <div className="bg-gradient-to-br from-[#18181C] via-[#121214] to-[#0A0A0C] border border-white/15 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[#ffd700]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 bg-[#ffd700]/15 text-[#ffd700] border border-[#ffd700]/30 rounded-full text-[11px] font-outfit font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              WorkVary x Satu Data Kompetensi RI
            </span>
            <span className="px-3 py-1 bg-blue-500/15 text-blue-300 border border-blue-500/30 rounded-full text-[11px] font-outfit font-bold">
              AI Workforce Digital Twin Engine
            </span>
            <span className="px-3 py-1 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full text-[11px] font-outfit font-bold">
              Database Sync Active ({user.role})
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-outfit tracking-tight leading-tight">
            WorkVary — <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ffd700] via-amber-200 to-amber-500">AI Workforce Digital Twin</span> &amp; 8 Modul Reskilling
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-jakarta">
            Platform reskilling dan career intelligence terintegrasi untuk memetakan kompetensi individu, menutup skill gap dengan presisi berbasis XGBoost &amp; Vector Embeddings, serta menyelaraskan kurikulum dengan kebutuhan industri nasional.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveModule(2)}
              className="px-5 py-2.5 bg-[#ffd700] hover:bg-amber-400 text-black font-outfit font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-[#ffd700]/20 active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Ekstraksi CV (Resume AI)</span>
            </button>
            <button
              onClick={() => setActiveModule(3)}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-outfit font-bold text-xs rounded-xl border border-white/15 transition-all cursor-pointer flex items-center gap-2"
            >
              <Target className="w-4 h-4 text-[#ffd700]" />
              <span>Analisis Skill Gap</span>
            </button>
            <button
              onClick={() => onNavigateTab('consultant')}
              className="px-5 py-2.5 bg-blue-600/30 hover:bg-blue-600/40 text-blue-200 font-outfit font-bold text-xs rounded-xl border border-blue-500/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <Bot className="w-4 h-4 text-blue-400" />
              <span>Buka Career Copilot</span>
            </button>
          </div>
        </div>
      </div>

      {/* NATIONAL METRICS BANNER (WORKVARY MARKET INTELLIGENCE) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 bg-[#161618] border border-white/10 rounded-2xl flex items-center gap-4 shadow-md">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-[#ffd700] border border-[#ffd700]/30 flex items-center justify-center font-bold font-outfit text-xl flex-shrink-0">
            01
          </div>
          <div>
            <span className="text-[10px] uppercase font-outfit font-bold text-amber-400 tracking-wider block">
              Pengangguran Terbuka
            </span>
            <h3 className="text-xl font-extrabold text-white font-outfit">7,20 - 7,28 Juta</h3>
            <p className="text-[11px] text-zinc-400">TPT Nasional 4,76% - 4,82% (Membutuhkan Reskilling)</p>
          </div>
        </div>

        <div className="p-5 bg-[#161618] border border-white/10 rounded-2xl flex items-center gap-4 shadow-md">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold font-outfit text-xl flex-shrink-0">
            02
          </div>
          <div>
            <span className="text-[10px] uppercase font-outfit font-bold text-blue-400 tracking-wider block">
              Kebutuhan Talenta Digital
            </span>
            <h3 className="text-xl font-extrabold text-white font-outfit">600.000 / Tahun</h3>
            <p className="text-[11px] text-zinc-400">Target 9 Juta Talenta Baru Hingga 2030</p>
          </div>
        </div>

        <div className="p-5 bg-[#161618] border border-white/10 rounded-2xl flex items-center gap-4 shadow-md">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold font-outfit text-xl flex-shrink-0">
            03
          </div>
          <div>
            <span className="text-[10px] uppercase font-outfit font-bold text-emerald-400 tracking-wider block">
              Labor Forecasting Horizon
            </span>
            <h3 className="text-xl font-extrabold text-white font-outfit">6 - 24 Bulan</h3>
            <p className="text-[11px] text-zinc-400">Prediksi Kebutuhan Sektor Industri Terakurat</p>
          </div>
        </div>
      </div>

      {/* 8 AI MODULES SHOWCASE SELECTION GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-outfit font-extrabold uppercase tracking-widest text-[#ffd700]">
              EKOSISTEM KECERDASAN WORKVARY
            </span>
            <h2 className="text-xl font-extrabold text-white font-outfit tracking-tight">
              8 Modul AI Utama Workforce Digital Twin
            </h2>
          </div>
          <span className="text-xs text-zinc-400 font-jakarta hidden sm:inline-block">
            Pilih modul di bawah untuk mencoba fitur simulator live
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {aiModules.map((mod) => {
            const Icon = mod.icon;
            const isSelected = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#1D1D22] border-[#ffd700] ring-1 ring-[#ffd700]/50 shadow-xl'
                    : 'bg-[#141416] border-white/10 hover:border-white/20 hover:bg-[#18181B]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${mod.color} border shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-outfit font-extrabold text-zinc-500 uppercase tracking-widest">
                    MODUL 0{mod.id}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-white font-outfit leading-snug">
                    {mod.title}
                  </h3>
                  <span className="text-[10px] font-mono-geist text-zinc-400 block mt-0.5">
                    {mod.modelTech}
                  </span>
                </div>

                <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">
                  {mod.desc}
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between w-full text-[11px] font-outfit font-bold">
                  <span className={isSelected ? 'text-[#ffd700]' : 'text-zinc-400'}>
                    {isSelected ? 'Simulator Aktif' : 'Coba Modul Ini'}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90 text-[#ffd700]' : 'text-zinc-500'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* LIVE INTERACTIVE SIMULATOR PANEL FOR SELECTED MODULE */}
      <div className="bg-[#141416] border border-white/15 rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* MODULE 1: AI CAREER COPILOT */}
        {activeModule === 1 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-[#ffd700]/20 text-[#ffd700] border border-[#ffd700]/30">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-outfit font-bold uppercase tracking-wider text-[#ffd700] block">
                  MODUL 01 - SIMULATOR LIVE
                </span>
                <h3 className="text-lg font-extrabold text-white font-outfit">
                  AI Career Copilot (LLM Gemini 2.5)
                </h3>
              </div>
            </div>

            <p className="text-xs text-zinc-300">
              Asisten AI interaktif yang terhubung langsung dengan mesin Gemini untuk menjawab konsultasi karir, analisis SKKNI, dan perancangan portofolio kerja.
            </p>

            <div className="p-4 bg-[#1A1A1E] rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#ffd700] text-black font-extrabold flex items-center justify-center text-xs flex-shrink-0">
                  AI
                </div>
                <div className="p-3 bg-white/5 rounded-2xl text-xs text-zinc-200 leading-relaxed font-jakarta">
                  Halo <strong>{user.name}</strong>! Saya adalah WorkVary AI Career Copilot. Berdasarkan profil Anda sebagai <strong>{user.role}</strong>, saya siap membantu memetakan standar SKKNI, menyiapkan pertanyaan interview, atau memberikan rekomendasi reskilling. Ada yang ingin ditanyakan?
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => onNavigateTab('consultant')}
                  className="px-4 py-2 bg-[#ffd700] text-black font-outfit font-bold text-xs rounded-xl hover:bg-amber-400 transition-all flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Bot className="w-4 h-4" />
                  <span>Buka Ruang Obrolan Konsultasi Penuh</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 2: RESUME UNDERSTANDING AI */}
        {activeModule === 2 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-outfit font-bold uppercase tracking-wider text-blue-400 block">
                  MODUL 02 - SIMULATOR LIVE
                </span>
                <h3 className="text-lg font-extrabold text-white font-outfit">
                  Resume Understanding AI (LayoutLM + OCR + NER)
                </h3>
              </div>
            </div>

            <p className="text-xs text-zinc-300">
              Tempelkan atau edit ringkasan CV Anda di bawah ini untuk melihat ekstraksi otomatis menjadi profil JSON terstruktur.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-outfit font-bold text-zinc-300 block">
                  Input Teks / Berkas CV:
                </label>
                <textarea
                  rows={7}
                  value={cvInputText}
                  onChange={(e) => setCvInputText(e.target.value)}
                  className="w-full p-3 bg-[#0D0D0E] border border-white/15 rounded-xl text-xs text-white font-mono-geist focus:border-[#ffd700] outline-none"
                />
                <button
                  onClick={handleParseCV}
                  disabled={isParsingCv}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-outfit font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
                >
                  {isParsingCv ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Ekstraksi dengan LayoutLM + NER Engine...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Jalankan Ekstraksi Profil Otomatis</span>
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-outfit font-bold text-zinc-300 block">
                  Hasil Ekstraksi JSON Digital Twin:
                </label>
                <div className="h-[230px] p-3 bg-[#08080A] border border-white/15 rounded-xl overflow-y-auto font-mono-geist text-[11px] text-emerald-400">
                  {parsedProfile ? (
                    <pre>{JSON.stringify(parsedProfile, null, 2)}</pre>
                  ) : (
                    <div className="h-full flex items-center justify-center text-zinc-500 italic text-center p-4">
                      Klik tombol "Jalankan Ekstraksi Profil Otomatis" untuk mengekstrak entitas skill, pendidikan, dan sertifikasi BNSP dari CV.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODULE 3: SKILL GAP ANALYSIS AI */}
        {activeModule === 3 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-outfit font-bold uppercase tracking-wider text-emerald-400 block">
                  MODUL 03 - SIMULATOR LIVE
                </span>
                <h3 className="text-lg font-extrabold text-white font-outfit">
                  Skill Gap Analysis AI (XGBoost + Cosine Similarity)
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 p-4 bg-[#1A1A1E] rounded-2xl border border-white/10">
                <label className="text-xs font-outfit font-bold text-zinc-200 block">
                  Pilih Target Profesi Okupasi SKKNI:
                </label>
                <select
                  value={selectedTargetRole}
                  onChange={(e) => setSelectedTargetRole(e.target.value)}
                  className="w-full p-2.5 bg-[#0D0D0E] border border-white/15 rounded-xl text-xs text-white font-jakarta focus:border-[#ffd700] outline-none"
                >
                  <option value="AI Software Engineer">AI Software Engineer</option>
                  <option value="Fullstack Web Developer SKKNI Level 6">Fullstack Web Developer (SKKNI Level 6)</option>
                  <option value="Data Engineer & Analytics Specialist">Data Engineer &amp; Analytics Specialist</option>
                  <option value="Cybersecurity Analyst BNSP">Cybersecurity Analyst BNSP</option>
                  <option value="Cloud Infrastructure Architect">Cloud Infrastructure Architect</option>
                </select>

                <button
                  onClick={handleCalculateGap}
                  disabled={calculatingGap}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-outfit font-extrabold text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                  {calculatingGap ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Menghitung Cosine Distance &amp; Gap...</span>
                    </>
                  ) : (
                    <>
                      <Target className="w-4 h-4" />
                      <span>Hitung Skill Gap dengan Profil Saya</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-4 bg-[#0D0D0E] rounded-2xl border border-white/10 space-y-3">
                {gapResult ? (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <span className="text-zinc-400">Tingkat Kecocokan Profil:</span>
                      <span className="text-lg font-extrabold text-emerald-400 font-outfit">
                        {gapResult.matchScore}% Match
                      </span>
                    </div>

                    <div>
                      <span className="text-zinc-400 block font-bold mb-1">Skill Gap Prioritas (Harus Ditingkatkan):</span>
                      <div className="flex flex-wrap gap-1.5">
                        {gapResult.skillsMissing.map((sk: string, idx: number) => (
                          <span key={idx} className="px-2 py-0.5 bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded text-[10px] font-bold">
                            • {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-zinc-400 block font-bold mb-1">Rekomendasi Reskilling ({gapResult.estimatedReskillingWeeks} Minggu):</span>
                      <ul className="space-y-1 text-zinc-300 font-mono-geist text-[11px]">
                        {gapResult.recommendedPath.map((step: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-zinc-500 italic text-center text-xs p-4">
                    Pilih target okupasi di sebelah kiri dan klik "Hitung Skill Gap" untuk melihat analisis kecocokan presisi XGBoost.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODULE 8: AI INTERVIEW SIMULATOR */}
        {activeModule === 8 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-white/10">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-outfit font-bold uppercase tracking-wider text-rose-400 block">
                  MODUL 08 - SIMULATOR LIVE
                </span>
                <h3 className="text-lg font-extrabold text-white font-outfit">
                  AI Interview Simulator (Whisper + LLM Feedback)
                </h3>
              </div>
            </div>

            <div className="p-4 bg-[#1A1A1E] rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-outfit font-bold text-[#ffd700]">
                  Pertanyaan Simulasi {interviewQuestionIndex + 1} dari {interviewQuestions.length}:
                </span>
                <button
                  onClick={() => setInterviewQuestionIndex((prev) => (prev + 1) % interviewQuestions.length)}
                  className="text-[11px] text-zinc-400 hover:text-white underline cursor-pointer"
                >
                  Ganti Pertanyaan
                </button>
              </div>

              <p className="text-sm font-bold text-white bg-black/40 p-3 rounded-xl border border-white/10">
                "{interviewQuestions[interviewQuestionIndex]}"
              </p>

              <div className="space-y-2">
                <label className="text-xs text-zinc-300 font-bold block">
                  Ketikkan atau Bisikkan Jawaban Anda:
                </label>
                <textarea
                  rows={3}
                  value={userAnswerText}
                  onChange={(e) => setUserAnswerText(e.target.value)}
                  placeholder="Contoh: Saya pernah membangun portal web terpadu berbasis React dan TypeScript yang melayani ribuan pengguna aktif dengan arsitektur RESTful API..."
                  className="w-full p-3 bg-[#0D0D0E] border border-white/15 rounded-xl text-xs text-white focus:border-[#ffd700] outline-none"
                />
              </div>

              <button
                onClick={handleAnalyzeInterview}
                disabled={isAnalyzingInterview || !userAnswerText.trim()}
                className="w-full py-2.5 bg-rose-500 hover:bg-rose-400 text-black font-outfit font-extrabold text-xs uppercase rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-rose-500/20 disabled:opacity-50"
              >
                {isAnalyzingInterview ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Menganalisis Struktur STAR &amp; Kelancaran...</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    <span>Evaluasi Jawaban Saya dengan AI</span>
                  </>
                )}
              </button>

              {interviewFeedback && (
                <div className="mt-4 p-4 bg-[#0D0D0E] rounded-xl border border-rose-500/30 space-y-2 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-bold text-white">Skor Kesiapan Wawancara:</span>
                    <span className="text-base font-extrabold text-rose-400 font-outfit">
                      {interviewFeedback.score} / 100
                    </span>
                  </div>
                  <p className="text-zinc-300">
                    <strong>Struktur:</strong> {interviewFeedback.structureRating}
                  </p>
                  <p className="text-zinc-300">
                    <strong>Kelebihan:</strong> {interviewFeedback.strengths}
                  </p>
                  <p className="text-amber-300">
                    <strong>Saran Perbaikan:</strong> {interviewFeedback.areasToImprove}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* DEFAULT FALLBACK INFO FOR OTHER MODULES */}
        {![1, 2, 3, 8].includes(activeModule || 0) && (
          <div className="p-6 bg-[#1A1A1E] rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-base font-extrabold text-white font-outfit">
              {aiModules.find((m) => m.id === activeModule)?.title}
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {aiModules.find((m) => m.id === activeModule)?.desc}
            </p>
            <div className="p-3 bg-black/40 rounded-xl text-xs font-mono-geist text-[#ffd700] border border-[#ffd700]/20">
              Modul ini terhubung langsung dengan mesin pemroses WorkVary Digital Twin ({aiModules.find((m) => m.id === activeModule)?.modelTech}).
            </div>
          </div>
        )}

      </div>

      {/* VISUAL INTEREST & PROJECT POSTER GALLERY */}
      <div className="bg-[#111113] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <VisualInterestGallery
          onSelectInterestForEvaluation={() => onNavigateTab('evaluator')}
          onConsultAiCopilot={() => onNavigateTab('consultant')}
        />
      </div>

      {/* B2G DASHBOARD & MARKET INTELLIGENCE SECTION */}
      <div className="bg-[#111113] border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span className="text-xs font-outfit font-extrabold uppercase tracking-widest text-blue-400">
              DASBOR B2G &amp; FUTURE OF WORK
            </span>
            <h2 className="text-2xl font-extrabold text-white font-outfit tracking-tight">
              Proyeksi Pasar EdTech &amp; Vokasi Indonesia
            </h2>
          </div>
          <span className="px-3 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/30 rounded-full text-xs font-outfit font-bold self-start sm:self-auto">
            Estimasi CAGR 11,42% - 11,79%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-[#18181C] rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-outfit text-zinc-400 font-bold block">EdTech Indonesia</span>
            <div className="text-lg font-extrabold text-white font-outfit">USD 3.23M → 10.04M</div>
            <p className="text-[11px] text-emerald-400">Pertumbuhan menuju 2033–2034</p>
          </div>

          <div className="p-4 bg-[#18181C] rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-outfit text-zinc-400 font-bold block">EdTech Asia Tenggara</span>
            <div className="text-lg font-extrabold text-white font-outfit">USD 12.26M → 41.52M</div>
            <p className="text-[11px] text-blue-400">14,52% CAGR Regional</p>
          </div>

          <div className="p-4 bg-[#18181C] rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-outfit text-zinc-400 font-bold block">Pelatihan Vokasi Indonesia</span>
            <div className="text-lg font-extrabold text-white font-outfit">USD 5.00M → 9.50M</div>
            <p className="text-[11px] text-amber-400">Proyeksi Hingga 2030</p>
          </div>

          <div className="p-4 bg-[#18181C] rounded-2xl border border-white/10 space-y-1">
            <span className="text-[10px] uppercase font-outfit text-zinc-400 font-bold block">Pelatihan Korporasi</span>
            <div className="text-lg font-extrabold text-white font-outfit">USD 3.00M → 6.20M</div>
            <p className="text-[11px] text-purple-400">±10,80% CAGR B2B</p>
          </div>
        </div>
      </div>

    </div>
  );
};
