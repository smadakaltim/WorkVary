import React from 'react';
import { Phone, MapPin, UserCheck, ExternalLink, ShieldCheck, Heart, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#09090B] border-t border-white/10 text-zinc-400 font-jakarta z-40 relative">
      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ffd700] via-[#e5b01a] to-[#c49208] text-[#111113] flex items-center justify-center font-extrabold text-sm shadow-md font-outfit">
                RI
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white font-outfit tracking-tight flex items-center gap-2">
                  <span>SATU DATA KOMPETENSI RI</span>
                  <span className="px-2 py-0.5 bg-[#ffd700]/15 text-[#ffd700] text-[9px] font-outfit font-bold rounded-full border border-[#ffd700]/30">
                    SANGATTA
                  </span>
                </h3>
                <p className="text-xs text-zinc-400 font-jakarta">
                  Kementerian Komunikasi dan Digital Republik Indonesia
                </p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed font-jakarta">
              Portal Terpadu Standar Kompetensi Kerja Nasional Indonesia (SKKNI), Beasiswa Digitalent DTS, dan Proyeksi Karir Digital Terakreditasi BNSP.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[11px] font-outfit font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Terhubung ke SMAN 2 Sangatta Utara
              </span>
            </div>
          </div>

          {/* APPLICATION NAVIGATION */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-outfit font-extrabold uppercase tracking-widest text-[#ffd700]">
              NAVIGASI APLIKASI
            </h4>
            <ul className="space-y-2 text-xs font-jakarta">
              <li>
                <a href="#beranda" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>• Beranda Utama Portal</span>
                </a>
              </li>
              <li>
                <a href="#evaluator" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>• Evaluator Kompetensi SKKNI</span>
                </a>
              </li>
              <li>
                <a href="#makro" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>• Makro Analitik &amp; Proyeksi Karir</span>
                </a>
              </li>
              <li>
                <a href="#konsultan" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>• Konsultan AI Kominfo</span>
                </a>
              </li>
              <li>
                <a href="#kontak-lokasi" className="hover:text-white transition-colors flex items-center gap-2">
                  <span>• Lokasi SMAN 2 Sangatta Utara</span>
                </a>
              </li>
            </ul>
          </div>

          {/* QUICK CONTACT & LOCATION COLUMN */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-outfit font-extrabold uppercase tracking-widest text-[#ffd700]">
              KONTAK &amp; LOKASI RESMI
            </h4>
            
            <div className="space-y-2 text-xs font-jakarta">
              {/* Phone */}
              <div className="flex items-center gap-2.5 p-2 bg-white/5 rounded-xl border border-white/10">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-400 block leading-tight">Nomor Telepon / WA:</span>
                  <a
                    href="https://wa.me/6281257266587"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    081257266587
                  </a>
                </div>
              </div>

              {/* Contact Account */}
              <div className="flex items-center gap-2.5 p-2 bg-white/5 rounded-xl border border-white/10">
                <UserCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <div>
                  <span className="text-[10px] text-zinc-400 block leading-tight">Akun Kontak:</span>
                  <span className="font-bold text-white">@S.N.ANDRA</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-2.5 p-2 bg-white/5 rounded-xl border border-white/10">
                <MapPin className="w-4 h-4 text-[#ffd700] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="text-[10px] text-zinc-400 block leading-tight">Lokasi Asesmen:</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=SMAN+2+SANGATTA+UTARA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-white hover:text-[#ffd700] transition-colors flex items-center justify-between"
                  >
                    <span>SMAN 2 SANGATTA UTARA</span>
                    <ExternalLink className="w-3 h-3 text-[#ffd700]" />
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout Button */}
            <a
              href="https://wa.me/6281257266587"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black font-outfit font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
            >
              <MessageSquare className="w-4 h-4 fill-black" />
              <span>Hubungi WA 081257266587</span>
            </a>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-jakarta text-zinc-500">
          <div>
            &copy; 2026 SOJATA / Satu Data Kompetensi. SMAN 2 Sangatta Utara, Kutai Timur.
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>Dibuat untuk pelayanan masyarakat Sangatta Utara</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

