import React, { useRef, useState } from 'react';
import { CareerEvaluationResult } from '../types';
import { Download, Printer, X, ShieldCheck, CheckCircle2, FileText, Sparkles, Building, Lock, FileSpreadsheet } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface OfficialPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: CareerEvaluationResult;
}

export const OfficialPdfModal: React.FC<OfficialPdfModalProps> = ({ isOpen, onClose, result }) => {
  const documentRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [adminPurpose, setAdminPurpose] = useState('Persyaratan Administrasi Sertifikasi LSP & Kepegawaian');
  const [includeQr, setIncludeQr] = useState(true);

  if (!isOpen || !result) return null;

  // Generate document reference number
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  
  // Deterministic ref number based on candidate name + sector
  const hash = Math.abs(
    (result.candidateName + result.sector).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  ).toString(16).toUpperCase().padStart(4, '0');
  
  const refNumber = `800.1.2/SDK-RI/${currentDate.getFullYear()}/${hash}`;
  const verificationUrl = `https://satudata.komdigi.go.id/verifikasi?ref=${refNumber}`;

  // Download PDF functionality using html2canvas & jsPDF
  const handleDownloadPdf = async () => {
    if (!documentRef.current) return;
    setIsGenerating(true);

    try {
      const element = documentRef.current;
      
      // Temporarily set dark background or light theme for capturing high quality
      const canvas = await html2canvas(element, {
        scale: 2, // High DPI resolution
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false,
        windowWidth: 1024
      });

      const imgData = canvas.toDataURL('image/png');
      
      // A4 dimensions in mm: 210 x 297
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // First page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Handle multi-page if content overflows A4 height
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      // Save file with candidate name
      const sanitizedName = (result.candidateName || 'Peserta').replace(/[^a-zA-Z0-9]/g, '_');
      pdf.save(`Ringkasan_SKKNI_${sanitizedName}_${currentDate.getFullYear()}.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
      alert('Gagal mengunduh berkas PDF. Silakan gunakan tombol Cetak Langsung.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Direct print trigger
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-[#18181B] border border-[rgba(255,255,255,0.15)] rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden print:border-none print:shadow-none print:max-w-none print:max-h-none print:h-auto print:rounded-none">
        
        {/* Modal Top Toolbar (Hidden on Print) */}
        <div className="p-4 bg-[#09090B] border-b border-[rgba(255,255,255,0.1)] flex flex-wrap items-center justify-between gap-3 print:hidden">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#E5B01A]/10 text-[#E5B01A] rounded-lg border border-[#E5B01A]/30">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <span>Dokumen Resmi Evaluasi SKKNI</span>
                <span className="text-[10px] font-mono-geist bg-[#E5B01A] text-black font-extrabold px-2 py-0.5 rounded">PDF READY</span>
              </h3>
              <p className="text-xs text-zinc-400">
                Format standar pelaporan administrasi Kementerian Komunikasi dan Digital RI
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="px-4 py-2 bg-[#E5B01A] hover:bg-[#d4a215] text-black font-extrabold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all active:scale-95 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Mengekspor PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Unduh PDF</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs rounded-xl border border-zinc-700 flex items-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Cetak</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Purpose Customization Bar (Hidden on Print) */}
        <div className="bg-[#111113] p-3 border-b border-[rgba(255,255,255,0.08)] px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-300 print:hidden">
          <div className="flex items-center gap-2 flex-1 min-w-[280px]">
            <span className="font-mono-geist font-semibold text-[#E5B01A] whitespace-nowrap">Keperluan Administrasi:</span>
            <input
              type="text"
              value={adminPurpose}
              onChange={(e) => setAdminPurpose(e.target.value)}
              placeholder="Contoh: Lampiran Lamaran Kerja / Verifikasi Portofolio LSP"
              className="w-full bg-[#000] border border-zinc-700 rounded-lg px-3 py-1 text-xs text-white focus:border-[#E5B01A] outline-none"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none text-xs">
            <input
              type="checkbox"
              checked={includeQr}
              onChange={(e) => setIncludeQr(e.target.checked)}
              className="rounded border-zinc-700 text-[#E5B01A] focus:ring-0"
            />
            <span>Tampilkan QR Code Verifikasi Otentikasi</span>
          </label>
        </div>

        {/* Scrollable Printable Document Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-zinc-950 flex justify-center print:p-0 print:bg-white print:overflow-visible">
          
          {/* THE DOCUMENT CANVAS (Standard White Administrative A4 Layout) */}
          <div
            ref={documentRef}
            id="official-pdf-content"
            className="w-full max-w-[800px] bg-white text-slate-900 p-8 sm:p-10 shadow-2xl rounded-sm text-left border border-slate-200 relative print:border-none print:shadow-none print:p-0 print:w-full print:max-w-none font-sans"
            style={{ minHeight: '1080px' }}
          >
            
            {/* OFFICIAL KOP SURAT (LETTERHEAD) */}
            <div className="border-b-4 border-slate-900 pb-3 mb-6 relative">
              <div className="flex items-center gap-4">
                {/* Government Emblem / Crest */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center bg-slate-100 rounded-full border border-slate-300 text-slate-800">
                  <Building className="w-10 h-10 text-slate-800" />
                </div>

                <div className="flex-1 text-center pr-4">
                  <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wide text-slate-900 leading-snug">
                    KEMENTERIAN KOMUNIKASI DAN DIGITAL REPUBLIK INDONESIA
                  </h2>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
                    DIREKTORAT JENDERAL APLIKASI INFORMATIKA
                  </h3>
                  <p className="text-[10px] sm:text-xs text-slate-600 font-medium mt-0.5">
                    DIREKTORAT PENGEMBANGAN SDM DIGITAL &amp; STANDARISASI KOMPETENSI
                  </p>
                  <p className="text-[9px] text-slate-500 mt-1">
                    Jl. Medan Merdeka Barat No. 9, Jakarta Pusat 10110 | Telp: (021) 3456789 | Website: komdigi.go.id
                  </p>
                </div>
              </div>
              <div className="mt-3 border-t border-slate-400"></div>
            </div>

            {/* DOCUMENT TITLE & METADATA */}
            <div className="text-center my-6 space-y-1">
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 uppercase tracking-wide underline underline-offset-4">
                SURAT RINGKASAN EVALUASI STANDAR KOMPETENSI KERJA NASIONAL (SKKNI)
              </h1>
              <p className="text-xs font-mono font-semibold text-slate-700">
                Nomor: {refNumber}
              </p>
              <div className="inline-block mt-2 px-3 py-1 bg-slate-100 border border-slate-300 rounded text-[10px] font-bold text-slate-800 uppercase tracking-widest">
                Sifat: RAHASIA / PERUNTUKAN ADMINISTRASI
              </div>
            </div>

            {/* PURPOSE NOTICE */}
            {adminPurpose && (
              <div className="mb-6 p-2.5 bg-slate-50 border-l-4 border-slate-800 text-xs text-slate-700 font-medium">
                <span className="font-bold text-slate-900">Maksud &amp; Tujuan Penggunaan: </span>
                {adminPurpose}
              </div>
            )}

            {/* SECTION 1: CANDIDATE IDENTIFICATION */}
            <div className="mb-6 space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 p-2 border-l-4 border-amber-500 flex items-center justify-between">
                <span>I. IDENTITAS &amp; PROFIL PESERTA EVALUASI</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  STATUS: TERVERIFIKASI SISTEM
                </span>
              </h2>

              <table className="w-full text-xs text-slate-800 border-collapse border border-slate-200">
                <tbody>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <td className="p-2.5 font-bold w-1/3 border-r border-slate-200 text-slate-700">Nama Lengkap Peserta</td>
                    <td className="p-2.5 font-extrabold text-slate-900">{result.candidateName || 'Peserta Terdaftar'}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2.5 font-bold border-r border-slate-200 text-slate-700">Status Ketenagakerjaan</td>
                    <td className="p-2.5 font-semibold text-slate-800">{result.employmentStatus}</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <td className="p-2.5 font-bold border-r border-slate-200 text-slate-700">Sektor Digital Target</td>
                    <td className="p-2.5 font-bold text-slate-900">{result.sector}</td>
                  </tr>
                  <tr className="border-b border-slate-200">
                    <td className="p-2.5 font-bold border-r border-slate-200 text-slate-700">Kode &amp; Acuan SKKNI</td>
                    <td className="p-2.5 font-mono text-slate-800">{result.skkniLevel}</td>
                  </tr>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <td className="p-2.5 font-bold border-r border-slate-200 text-slate-700">Tingkat Kesesuaian SKKNI</td>
                    <td className="p-2.5 font-extrabold text-amber-700 flex items-center gap-2">
                      <span>{result.matchScore}% Kualifikasi Terpenuhi</span>
                      <span className="text-[10px] font-normal text-slate-600">(Kategori Layak Sertifikasi)</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* SECTION 2: RECOMMENDATIONS & SALARY MATRIX */}
            <div className="mb-6 space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 p-2 border-l-4 border-amber-500">
                II. REKOMENDASI PENEMPATAN &amp; PROYEKSI KARIR
              </h2>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase">Peran / Jabatan Rekomendasi</span>
                  <p className="font-extrabold text-slate-900 mt-1">{result.recommendedRole}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="block text-[10px] font-bold text-slate-500 uppercase">Standar Proyeksi Gaji Sektor</span>
                  <p className="font-extrabold text-emerald-700 mt-1">{result.salaryRange}</p>
                </div>
              </div>
            </div>

            {/* SECTION 3: COMPETENCY ROADMAP TABLE */}
            <div className="mb-6 space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 p-2 border-l-4 border-amber-500">
                III. MATRIKS ROADMAP &amp; TAHAPAN PENGEMBANGAN KOMPETENSI
              </h2>

              <table className="w-full text-xs border-collapse border border-slate-300">
                <thead>
                  <tr className="bg-slate-800 text-white font-bold text-left">
                    <th className="p-2 border border-slate-300 w-16 text-center">Tahap</th>
                    <th className="p-2 border border-slate-300">Modul / Target Kualifikasi</th>
                    <th className="p-2 border border-slate-300 w-24">Durasi</th>
                    <th className="p-2 border border-slate-300">Persyaratan Sertifikasi</th>
                  </tr>
                </thead>
                <tbody>
                  {result.timelineSteps.map((step, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="p-2 border border-slate-300 text-center font-bold text-slate-800">{step.stage}</td>
                      <td className="p-2 border border-slate-300">
                        <p className="font-bold text-slate-900">{step.title}</p>
                        <p className="text-[10px] text-slate-600 mt-0.5">{step.description}</p>
                      </td>
                      <td className="p-2 border border-slate-300 text-slate-700 font-medium">{step.duration}</td>
                      <td className="p-2 border border-slate-300 font-semibold text-emerald-800">{step.certRequired}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* SECTION 4: AI ANALYSIS & RECOMMENDED TRAINING PROGRAMS */}
            <div className="mb-6 space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 p-2 border-l-4 border-amber-500">
                IV. ANALISIS STRATEGIS AI &amp; REKOMENDASI BEASISWA
              </h2>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
                <p className="text-slate-800 leading-relaxed italic">
                  &ldquo;{result.aiAnalysisText}&rdquo;
                </p>
                <div className="pt-2 border-t border-slate-200">
                  <span className="font-bold text-slate-900 block mb-1">Rekomendasi Program Akselerasi Kominfo:</span>
                  <ul className="list-disc list-inside text-slate-700 space-y-0.5 pl-1">
                    {result.suggestedCourses.map((course, idx) => (
                      <li key={idx} className="font-medium">{course}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* FOOTER VERIFICATION & SIGNATURE BLOCK */}
            <div className="mt-10 pt-4 border-t border-slate-300 flex items-end justify-between text-xs">
              
              {/* QR Code Verification Box */}
              {includeQr ? (
                <div className="flex items-center gap-3 border border-slate-300 p-2.5 rounded bg-slate-50">
                  <div className="w-16 h-16 bg-white p-1 border border-slate-300 flex flex-col items-center justify-center">
                    {/* SVG QR Code Graphic */}
                    <svg className="w-14 h-14" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="100" height="100" fill="white"/>
                      <rect x="5" y="5" width="30" height="30" fill="black"/>
                      <rect x="10" y="10" width="20" height="20" fill="white"/>
                      <rect x="15" y="15" width="10" height="10" fill="black"/>
                      
                      <rect x="65" y="5" width="30" height="30" fill="black"/>
                      <rect x="70" y="10" width="20" height="20" fill="white"/>
                      <rect x="75" y="15" width="10" height="10" fill="black"/>
                      
                      <rect x="5" y="65" width="30" height="30" fill="black"/>
                      <rect x="10" y="70" width="20" height="20" fill="white"/>
                      <rect x="15" y="75" width="10" height="10" fill="black"/>
                      
                      <rect x="45" y="10" width="10" height="20" fill="black"/>
                      <rect x="40" y="40" width="20" height="20" fill="black"/>
                      <rect x="65" y="45" width="15" height="10" fill="black"/>
                      <rect x="45" y="70" width="15" height="25" fill="black"/>
                      <rect x="70" y="70" width="25" height="10" fill="black"/>
                      <rect x="80" y="85" width="15" height="10" fill="black"/>
                    </svg>
                  </div>
                  <div className="text-[10px] space-y-0.5 text-slate-600">
                    <span className="font-extrabold text-slate-900 block">DOKUMEN TERVERIFIKASI</span>
                    <p>Pindai untuk otentikasi keaslian berkas di portal resmi SATU DATA KOMPETENSI.</p>
                    <p className="font-mono text-[9px] text-slate-500">Hash: {hash}-SDK-2026</p>
                  </div>
                </div>
              ) : (
                <div className="text-[10px] text-slate-500 italic max-w-xs">
                  Dokumen ini diterbitkan secara elektronik oleh Sistem Informasi SATU DATA KOMPETENSI RI.
                </div>
              )}

              {/* Administrative Signature Stamp */}
              <div className="text-center space-y-1 pr-4">
                <p className="text-slate-700">Jakarta, {formattedDate}</p>
                <p className="font-bold text-slate-900 text-[11px]">
                  Plt. Direktur Pengembangan SDM Digital,
                </p>

                {/* Digital Stamp Simulation */}
                <div className="my-2 h-16 flex items-center justify-center relative">
                  <div className="w-24 h-12 border-2 border-dashed border-blue-600 rounded-full flex items-center justify-center opacity-80 transform -rotate-6">
                    <span className="text-[8px] font-extrabold text-blue-800 uppercase tracking-tighter text-center leading-tight">
                      KEMKOMDIGI RI<br />TERVERIFIKASI<br />ELEKTRONIK
                    </span>
                  </div>
                </div>

                <p className="font-extrabold text-slate-900 underline">
                  Dr. Eng. Haryanto, M.Sc., IPU.
                </p>
                <p className="text-[10px] font-mono text-slate-600">
                  NIP. 19780512 200312 1 002
                </p>
              </div>

            </div>

            {/* LEGAL DISCLAIMER FOOTNOTE */}
            <div className="mt-8 pt-2 border-t border-slate-200 text-[9px] text-slate-500 text-center font-mono">
              Dokumen ini disahkan secara elektronik sesuai Undang-Undang ITE No. 11 Tahun 2008 &amp; PP No. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik.
            </div>

          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-3 bg-[#09090B] border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between text-xs text-zinc-400 px-6 print:hidden">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Format Cetak A4 Standar Kementerian Komunikasi dan Digital RI</span>
          </div>
          
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg cursor-pointer transition-colors"
          >
            Tutup Preview
          </button>
        </div>

      </div>
    </div>
  );
};
