import React, { useState } from 'react';
import { MapPin, Phone, UserCheck, MessageSquare, ExternalLink, Copy, Check, Navigation, Sparkles, ShieldCheck, Heart } from 'lucide-react';

export const ContactLocationSection: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState(false);

  const phoneNumber = '081257266587';
  const whatsappUrl = 'https://wa.me/6281257266587';
  const handleName = '@S.N.ANDRA';

  const copyToClipboard = (text: string, type: 'phone' | 'handle') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedHandle(true);
      setTimeout(() => setCopiedHandle(false), 2000);
    }
  };

  return (
    <div id="kontak-lokasi" className="w-full max-w-7xl mx-auto my-8 font-jakarta">
      {/* SECTION HEADER BADGE */}
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-gradient-to-r from-[#ffd700]/20 to-amber-500/10 text-[#ffd700] border border-[#ffd700]/30 rounded-full text-xs font-outfit font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          Kontak Layanan Resmi
        </span>
      </div>

      {/* CONTACT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CARD 1: WHATSAPP / PHONE NUMBER */}
        <div className="p-6 bg-gradient-to-br from-[#18181B] to-[#0F0F11] border border-white/15 rounded-3xl shadow-xl hover:border-[#ffd700]/50 transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-[#ffd700]/5 rounded-full blur-2xl group-hover:bg-[#ffd700]/15 transition-all pointer-events-none" />
          
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold shadow-md">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-outfit font-bold uppercase tracking-wider text-emerald-400 block">
                    Hotline &amp; Konsultasi WhatsApp
                  </span>
                  <h3 className="text-2xl font-extrabold text-white font-outfit tracking-tight">
                    {phoneNumber}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(phoneNumber, 'phone')}
                title="Salin Nomor Telepon"
                className="p-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xl border border-white/10 transition-colors cursor-pointer"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-jakarta">
              Layanan bantuan langsung, koordinasi program beasiswa digital, dan verifikasi sertifikasi via pesan singkat WhatsApp.
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-black font-outfit font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <MessageSquare className="w-4 h-4 fill-black" />
            <span>HUBUNGI VIA WHATSAPP (081257266587)</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
          </a>
        </div>

        {/* CARD 2: OFFICIAL CONTACT ACCOUNT @S.N.ANDRA */}
        <div className="p-6 bg-gradient-to-br from-[#18181B] to-[#0F0F11] border border-white/15 rounded-3xl shadow-xl hover:border-blue-500/50 transition-all group relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-all pointer-events-none" />

          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold shadow-md">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-outfit font-bold uppercase tracking-wider text-blue-400 block">
                    Penanggung Jawab / Kontak Resmi
                  </span>
                  <h3 className="text-2xl font-extrabold text-white font-outfit tracking-tight flex items-center gap-2">
                    <span>{handleName}</span>
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                  </h3>
                </div>
              </div>

              <button
                onClick={() => copyToClipboard(handleName, 'handle')}
                title="Salin Akun Handle"
                className="p-2 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xl border border-white/10 transition-colors cursor-pointer"
              >
                {copiedHandle ? <Check className="w-4 h-4 text-blue-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-jakarta">
              Akun person-in-charge resmi untuk penyesuaian jadwal asesmen, pendampingan uji kompetensi, dan konsultasi portofolio.
            </p>
          </div>

          <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-zinc-300 font-outfit">
            <span className="px-2.5 py-1 bg-blue-500/15 text-blue-300 rounded-lg border border-blue-500/30 font-bold">
              Status: Respon Cepat
            </span>
            <span className="text-zinc-400 font-medium">Terhubung langsung ke Admin</span>
          </div>
        </div>

      </div>
    </div>
  );
};
