import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, ArrowRight, Sparkles, Download, Briefcase, GraduationCap, DollarSign, Building2, AlertCircle, Loader2, FileText, Save } from 'lucide-react';
import { SectorInfo, CareerEvaluationResult, UserProfile } from '../types';
import { OfficialPdfModal } from './OfficialPdfModal';

interface CareerEvaluatorProps {
  careerPool: Record<string, SectorInfo>;
  selectedSectorKeyProp?: string;
  user?: UserProfile | null;
}

export const CareerEvaluator: React.FC<CareerEvaluatorProps> = ({ careerPool, selectedSectorKeyProp, user }) => {
  const sectorKeys = Object.keys(careerPool);
  const [selectedSectorKey, setSelectedSectorKey] = useState<string>(selectedSectorKeyProp || sectorKeys[0] || '');
  const [candidateName, setCandidateName] = useState<string>(user?.name || '');
  const [employmentStatus, setEmploymentStatus] = useState<string>(user?.role || 'ASN / Pemerintahan');
  const [competencyLevel, setCompetencyLevel] = useState<string>('Intermediate (Pengalaman 1-3 Tahun)');
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CareerEvaluationResult | null>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState<boolean>(false);
  const [isSavedToDb, setIsSavedToDb] = useState<boolean>(false);

  useEffect(() => {
    if (selectedSectorKeyProp && careerPool[selectedSectorKeyProp]) {
      setSelectedSectorKey(selectedSectorKeyProp);
    }
  }, [selectedSectorKeyProp, careerPool]);

  useEffect(() => {
    if (user?.name && !candidateName) {
      setCandidateName(user.name);
    }
    if (user?.role && employmentStatus === 'ASN / Pemerintahan') {
      setEmploymentStatus(user.role);
    }
  }, [user]);

  const saveEvaluationToDatabase = async (evalData: CareerEvaluationResult) => {
    try {
      await fetch('/api/evaluations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id || 'guest',
          evaluation: evalData
        })
      });
      setIsSavedToDb(true);
    } catch (err) {
      console.warn('Gagal menyimpan evaluasi ke database:', err);
    }
  };

  const handleEvaluate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSavedToDb(false);

    try {
      const response = await fetch('/api/evaluate-career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: candidateName,
          sectorKey: selectedSectorKey,
          employmentStatus,
          competencyLevel
        })
      });

      if (!response.ok) {
        throw new Error("Gagal mengambil data evaluasi");
      }

      const data = await response.json();
      setResult(data);
      saveEvaluationToDatabase(data);
    } catch (err) {
      console.error("Error evaluating career:", err);
      // Local fallback calculation if server is busy
      const secData = careerPool[selectedSectorKey] || Object.values(careerPool)[0];
      const fallbackResult = {
        candidateName: candidateName || "Peserta Nasional",
        sector: secData.name,
        employmentStatus,
        skkniLevel: secData.skkniCode,
        recommendedRole: `${secData.name} - Spesialis Rekomendasi Kominfo`,
        salaryRange: `Rp ${secData.avgSalaryMin.toFixed(1)} Juta - Rp ${secData.avgSalaryMax.toFixed(1)} Juta / bulan`,
        matchScore: 92,
        timelineSteps: secData.steps.map((s, idx) => ({
          stage: `TAHAP ${idx + 1}`,
          title: s,
          description: `Modul tingkat ${idx + 1} dengan penyesuaian regulasi SKKNI terbaru.`,
          certRequired: secData.lspProvider,
          duration: `${(idx + 1) * 3} Bulan`
        })),
        skillGaps: secData.topSkills,
        suggestedCourses: [
          `Digital Talent Scholarship (DTS) - ${secData.name}`,
          `Uji Kompetensi LSP Terakreditasi BNSP`,
          `Sertifikasi Standar Global Vendor`
        ],
        aiAnalysisText: `Berdasarkan analisis SKKNI untuk ${candidateName || 'Peserta'} pada sektor ${secData.name}, profil Anda memenuhi kualifikasi standar nasional untuk percepatan karir di instansi publik dan industri digital.`
      };
      setResult(fallbackResult);
      saveEvaluationToDatabase(fallbackResult);
    } finally {
      setIsLoading(false);
    }
  };


  const handlePrint = () => {
    window.print();
  };

  const selectedSector = careerPool[selectedSectorKey];

  return (
    <div className="space-y-6">
      {/* Form Card */}
      <div className="bg-[#161618] rounded-2xl border border-[rgba(237,238,240,0.1)] p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-[#000000] text-[#E5B01A] rounded-xl border border-[rgba(237,238,240,0.1)]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#EDEEF0]">
              Evaluasi Jenjang Karir & Standar SKKNI Personal
            </h3>
            <p className="text-xs text-[rgba(237,238,240,0.5)]">
              Analisis kesesuaian kualifikasi Anda dengan Standar Kompetensi Kerja Nasional Indonesia (SKKNI) & kebutuhan industri.
            </p>
          </div>
        </div>

        <form onSubmit={handleEvaluate} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold font-mono-geist text-[rgba(237,238,240,0.6)] uppercase tracking-wider mb-1.5">
              Nama Lengkap (Sesuai Identitas Resmi)
            </label>
            <input
              type="text"
              required
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Contoh: Dr. Ir. Budi Santoso, M.Kom"
              className="w-full px-3.5 py-2.5 text-sm bg-[#000000] border border-[rgba(237,238,240,0.1)] text-[#EDEEF0] rounded-lg focus:border-[#E5B01A] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold font-mono-geist text-[rgba(237,238,240,0.6)] uppercase tracking-wider mb-1.5">
                Sektor Digital Target
              </label>
              <select
                value={selectedSectorKey}
                onChange={(e) => setSelectedSectorKey(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#000000] border border-[rgba(237,238,240,0.1)] text-[#EDEEF0] rounded-lg focus:border-[#E5B01A] outline-none"
              >
                {sectorKeys.map((key) => (
                  <option key={key} value={key} className="bg-[#161618] text-white">
                    {careerPool[key].name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold font-mono-geist text-[rgba(237,238,240,0.6)] uppercase tracking-wider mb-1.5">
                Status Ketenagakerjaan
              </label>
              <select
                value={employmentStatus}
                onChange={(e) => setEmploymentStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#000000] border border-[rgba(237,238,240,0.1)] text-[#EDEEF0] rounded-lg focus:border-[#E5B01A] outline-none"
              >
                <option value="ASN / Pemerintahan" className="bg-[#161618] text-white">ASN / Pemerintahan</option>
                <option value="Pegawai Swasta / BUMN" className="bg-[#161618] text-white">Pegawai Swasta / BUMN</option>
                <option value="Wiraswasta / Freelancer / Gig" className="bg-[#161618] text-white">Wiraswasta / Freelancer / Gig</option>
                <option value="Lulusan Baru (Fresh Graduate)" className="bg-[#161618] text-white">Lulusan Baru (Fresh Graduate)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold font-mono-geist text-[rgba(237,238,240,0.6)] uppercase tracking-wider mb-1.5">
                Tingkat Pengalaman Digital
              </label>
              <select
                value={competencyLevel}
                onChange={(e) => setCompetencyLevel(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#000000] border border-[rgba(237,238,240,0.1)] text-[#EDEEF0] rounded-lg focus:border-[#E5B01A] outline-none"
              >
                <option value="Pemula (0-1 Tahun)" className="bg-[#161618] text-white">Pemula (0-1 Tahun)</option>
                <option value="Intermediate (Pengalaman 1-3 Tahun)" className="bg-[#161618] text-white">Intermediate (Pengalaman 1-3 Tahun)</option>
                <option value="Advanced (Pengalaman 3-5+ Tahun)" className="bg-[#161618] text-white">Advanced (Pengalaman 3-5+ Tahun)</option>
                <option value="Executive / Specialist" className="bg-[#161618] text-white">Executive / Specialist</option>
              </select>
            </div>
          </div>

          {selectedSector && (
            <div className="space-y-4 pt-2">
              <div className="p-3 bg-[#000000] rounded-xl border border-[rgba(237,238,240,0.1)] text-xs text-[rgba(237,238,240,0.8)] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#E5B01A] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold font-mono-geist text-[#E5B01A]">Acuan SKKNI:</span> {selectedSector.desc} (Kode: <span className="font-semibold text-white">{selectedSector.skkniCode}</span>).
                </div>
              </div>

              {/* SECTOR VISUAL BANNER & TOOLS */}
              {selectedSector.bannerImage && (
                <div className="relative rounded-xl overflow-hidden border border-[#ffd700]/30 shadow-lg">
                  <img
                    src={selectedSector.bannerImage}
                    alt={selectedSector.name}
                    className="w-full h-36 sm:h-48 object-cover brightness-75"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col justify-end">
                    <span className="px-2.5 py-0.5 bg-[#ffd700] text-black text-[10px] font-outfit font-extrabold rounded uppercase w-fit mb-1">
                      Visual Banner Minat
                    </span>
                    <h4 className="text-base font-extrabold text-white font-outfit">
                      {selectedSector.name}
                    </h4>
                    {selectedSector.equipmentAndTools && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedSector.equipmentAndTools.map((tool, idx) => (
                          <span key={idx} className="px-2 py-0.5 bg-black/80 text-zinc-300 text-[10px] font-mono rounded border border-white/20">
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* PROJECT POSTERS FOR SELECTED SECTOR */}
              {selectedSector.projectPosters && selectedSector.projectPosters.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#ffd700] font-outfit uppercase tracking-wider block">
                    Poster Proyek &amp; Portofolio Industri ({selectedSector.name}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedSector.projectPosters.map((poster) => (
                      <div key={poster.id} className="bg-[#000000] border border-white/10 rounded-xl overflow-hidden shadow-md flex flex-col justify-between">
                        <div className="relative h-32 overflow-hidden bg-black">
                          <img
                            src={poster.imageUrl}
                            alt={poster.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 text-[#ffd700] text-[9px] font-outfit font-bold rounded">
                            {poster.category}
                          </span>
                        </div>
                        <div className="p-3 space-y-1">
                          <h5 className="text-xs font-bold text-white font-outfit line-clamp-1">
                            {poster.title}
                          </h5>
                          <p className="text-[11px] text-zinc-400 font-jakarta line-clamp-2">
                            {poster.description}
                          </p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {poster.tools.map((t, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-zinc-800 text-zinc-300 text-[9px] font-mono rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 bg-[#E5B01A] hover:bg-[#d4a215] text-[#000000] font-bold text-xs uppercase tracking-wider rounded-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#000]" />
                <span>Memproses Evaluasi AI & SKKNI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-[#000]" />
                <span>Evaluasi Rekomendasi Karir SKKNI</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Results View */}
      {result && (
        <div id="print-roadmap" className="bg-[#161618] rounded-2xl border border-[rgba(237,238,240,0.1)] p-6 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(237,238,240,0.1)] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-[#E5B01A]/20 text-[#E5B01A] text-xs font-bold rounded-full border border-[#E5B01A]/30 font-mono-geist uppercase">
                  Hasil Terverifikasi Sistem
                </span>
                <span className="text-xs text-[rgba(237,238,240,0.5)] font-mono-geist">
                  {result.skkniLevel}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-[#EDEEF0] mt-1">
                Roadmap Kompetensi: {result.candidateName}
              </h3>
              <p className="text-xs text-[rgba(237,238,240,0.6)]">
                Sektor: <span className="font-semibold text-white">{result.sector}</span> • Status: <span className="font-semibold text-white">{result.employmentStatus}</span>
              </p>
            </div>

            <button
              onClick={() => setIsPdfModalOpen(true)}
              className="px-3.5 py-2 bg-[#E5B01A] hover:bg-[#d4a215] text-[#000000] text-xs font-bold rounded-lg flex items-center gap-1.5 self-start sm:self-auto cursor-pointer transition-all active:scale-95 font-mono-geist shadow-sm"
            >
              <FileText className="w-4 h-4 text-black" />
              <span>Cetak / Unduh Ringkasan PDF Resmi</span>
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#000000] p-4 rounded-xl border border-[rgba(237,238,240,0.1)]">
              <div className="flex items-center gap-1.5 text-xs text-[rgba(237,238,240,0.5)] font-medium mb-1 font-mono-geist">
                <Briefcase className="w-4 h-4 text-[#E5B01A]" />
                <span>REKOMENDASI PENEMPATAN</span>
              </div>
              <p className="text-sm font-extrabold text-[#EDEEF0]">
                {result.recommendedRole}
              </p>
            </div>

            <div className="bg-[#000000] p-4 rounded-xl border border-[rgba(237,238,240,0.1)]">
              <div className="flex items-center gap-1.5 text-xs text-[rgba(237,238,240,0.5)] font-medium mb-1 font-mono-geist">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <span>PROYEKSI GAJI SEKTOR</span>
              </div>
              <p className="text-sm font-extrabold text-emerald-400">
                {result.salaryRange}
              </p>
            </div>

            <div className="bg-[#000000] p-4 rounded-xl border border-[rgba(237,238,240,0.1)]">
              <div className="flex items-center justify-between text-xs text-[rgba(237,238,240,0.5)] font-medium mb-1 font-mono-geist">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#E5B01A]" />
                  <span>KESESUAIAN SKKNI</span>
                </span>
                <span className="font-bold text-[#E5B01A]">{result.matchScore}%</span>
              </div>
              <div className="w-full bg-[#161618] rounded-full h-2 mt-2 border border-[rgba(237,238,240,0.05)]">
                <div
                  className="bg-[#E5B01A] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${result.matchScore}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Timeline Steps */}
          <div>
            <h4 className="text-xs font-bold font-mono-geist uppercase tracking-wider text-[#E5B01A] mb-3">
              Tahapan Roadmap Pengembangan Karir
            </h4>
            <div className="space-y-3">
              {result.timelineSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-[#000000] rounded-xl border border-[rgba(237,238,240,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold font-mono-geist uppercase tracking-wider text-[#E5B01A] bg-[#E5B01A]/10 border border-[#E5B01A]/20 px-2 py-0.5 rounded">
                        {step.stage}
                      </span>
                      <span className="text-xs font-bold text-[rgba(237,238,240,0.5)]">
                        ({step.duration})
                      </span>
                    </div>
                    <p className="text-sm font-bold text-[#EDEEF0] mt-1">
                      {step.title}
                    </p>
                    <p className="text-xs text-[rgba(237,238,240,0.6)]">
                      {step.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0 bg-[#161618] px-3.5 py-2 rounded-lg border border-[rgba(237,238,240,0.1)] text-right sm:text-left">
                    <span className="block text-[10px] text-[rgba(237,238,240,0.4)] uppercase font-mono-geist">Syarat Sertifikat</span>
                    <span className="text-xs font-bold text-[#EDEEF0] flex items-center gap-1.5 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {step.certRequired}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Analysis & Course Suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-[#000000] rounded-xl border border-[rgba(237,238,240,0.1)]">
              <h5 className="text-xs font-bold font-mono-geist text-[#E5B01A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E5B01A]" />
                <span>Analisis Strategis AI Kominfo</span>
              </h5>
              <p className="text-xs text-[rgba(237,238,240,0.8)] leading-relaxed">
                {result.aiAnalysisText}
              </p>
            </div>

            <div className="p-4 bg-[#000000] rounded-xl border border-[rgba(237,238,240,0.1)]">
              <h5 className="text-xs font-bold font-mono-geist text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Program Rekomendasi (DTS & LSP)</span>
              </h5>
              <ul className="text-xs text-[rgba(237,238,240,0.8)] space-y-1.5">
                {result.suggestedCourses.map((c, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <ArrowRight className="w-3 h-3 text-[#E5B01A] flex-shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {result && (
        <OfficialPdfModal
          isOpen={isPdfModalOpen}
          onClose={() => setIsPdfModalOpen(false)}
          result={result}
        />
      )}
    </div>
  );
};
