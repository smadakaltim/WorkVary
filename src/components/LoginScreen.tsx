import React, { useState } from 'react';
import { Lock, Mail, ShieldCheck, UserCheck, ArrowRight, Building, KeyRound, AlertCircle, Sparkles, LogIn, UserPlus, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (user: UserProfile, token: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Login form state
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  
  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regNik, setRegNik] = useState('');
  const [regRole, setRegRole] = useState('Masyarakat Umum / Professional');
  const [regInstitution, setRegInstitution] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Otentikasi gagal. Silakan periksa kembali data akun Anda.');
      }

      setSuccessMsg('Otentikasi berhasil. Membuka Dasbor Portal...');
      setTimeout(() => {
        onLoginSuccess(data.user, data.token);
      }, 600);
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem saat menghubungi server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          nik: regNik,
          role: regRole,
          institution: regInstitution,
          password: regPassword
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Pendaftaran gagal. Silakan periksa formulir pendaftaran.');
      }

      setSuccessMsg('Akun terdaftar dalam Database Nasional SATU DATA! Membuka Portal...');
      setTimeout(() => {
        onLoginSuccess(data.user, data.token);
      }, 800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Terjadi kesalahan sistem saat mendaftar akun.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Demo Logins
  const handleDemoLogin = (demoType: 'asn' | 'public') => {
    if (demoType === 'asn') {
      setIdentity('triyono@komdigi.go.id');
      setPassword('password123');
    } else {
      setIdentity('siti.rahmawati@gmail.com');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#EDEEF0] flex flex-col justify-between font-geist relative overflow-x-hidden selection:bg-[#ffd700] selection:text-black">
      {/* Background Decorative Radial Glows */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,#215ecf_0%,transparent_40%),radial-gradient(circle_at_80%_80%,#1c2d5a_0%,transparent_50%)] opacity-30 pointer-events-none z-0"></div>

      {/* TOP GOVERNMENT BADGE HEADER */}
      <header className="relative z-10 border-b border-white/10 bg-[#000000]/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/20 text-white flex items-center justify-center font-extrabold text-xs sm:text-sm shadow-md font-outfit tracking-wider">
              WV
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>WorkVary</span>
                <span className="hidden md:inline-block px-2 py-0.5 bg-[#ffd700]/15 text-[#ffd700] text-[9px] font-mono-geist font-extrabold rounded border border-[#ffd700]/30">
                  PORTAL RESMI
                </span>
              </h1>
              <p className="text-[10px] text-zinc-400 font-mono-geist">
                WorkVary
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-mono-geist font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              SSO Terproteksi AES-256
            </span>
          </div>
        </div>
      </header>

      {/* CENTER LOGIN / REGISTER CARD */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md bg-[#161618] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl space-y-6">
          
          {/* Subtle Top Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ffd700] via-[#215ecf] to-[#ffd700]" />

          {/* Title & Badge */}
          <div className="text-center space-y-2 pt-2">
            <span className="inline-block px-3 py-1 bg-[#ffd700]/10 text-[#ffd700] text-[10px] font-mono-geist font-extrabold uppercase tracking-widest rounded-md border border-[#ffd700]/30">
              Otentikasi Akses Pengguna
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {mode === 'login' ? 'Masuk ke Portal Nasional' : 'Daftar Akun Baru'}
            </h2>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
              {mode === 'login'
                ? 'Akses dasbor evaluasi SKKNI, proyeksi makro karir digital, dan layanan konsultasi AI.'
                : 'Lengkapi profil Anda untuk mengunci sertifikasi dan riwayat evaluasi kompetensi.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 bg-black/60 rounded-xl border border-white/10 font-mono-geist text-xs font-bold">
            <button
              type="button"
              onClick={() => { setMode('login'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'login'
                  ? 'bg-[#ffd700] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Masuk (Login)</span>
            </button>

            <button
              type="button"
              onClick={() => { setMode('register'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                mode === 'register'
                  ? 'bg-[#215ecf] text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Registrasi</span>
            </button>
          </div>

          {/* Alerts */}
          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-mono-geist uppercase tracking-wider text-zinc-300 font-bold block">
                  Email Terdaftar / NIK / NIP
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    placeholder="contoh: triyono@komdigi.go.id atau 1982..."
                    className="w-full bg-black/80 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:border-[#ffd700] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono-geist uppercase tracking-wider text-zinc-300 font-bold block">
                  Kata Sandi (Password)
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 absolute left-3 top-3 text-zinc-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password Anda..."
                    className="w-full bg-black/80 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white focus:border-[#ffd700] outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#ffd700] hover:bg-[#e5b01a] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#ffd700]/20 active:scale-95 disabled:opacity-50 font-mono-geist"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    <span>Memverifikasi Akses...</span>
                  </>
                ) : (
                  <>
                    <span>MASUK KE DASBOR PORTAL</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-[11px] font-mono-geist uppercase tracking-wider text-zinc-300 font-bold block">
                  Nama Lengkap &amp; Gelar
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Contoh: Budi Santoso, S.Kom"
                  className="w-full bg-black/80 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-[#215ecf] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono-geist uppercase tracking-wider text-zinc-300 font-bold block">
                    Email Aktif
                  </label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="email@domain.com"
                    className="w-full bg-black/80 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-[#215ecf] outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono-geist uppercase tracking-wider text-zinc-300 font-bold block">
                    NIK / NIP
                  </label>
                  <input
                    type="text"
                    value={regNik}
                    onChange={(e) => setRegNik(e.target.value)}
                    placeholder="16 Digit NIK / NIP"
                    className="w-full bg-black/80 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-[#215ecf] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono-geist uppercase tracking-wider text-zinc-300 font-bold block">
                  Kategori Profil Pengguna
                </label>
                <select
                  value={regRole}
                  onChange={(e) => setRegRole(e.target.value)}
                  className="w-full bg-black/80 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-[#215ecf] outline-none"
                >
                  <option value="Masyarakat Umum / Professional">Masyarakat Umum / Professional Private Sector</option>
                  <option value="ASN Pemprov / Kementrian / Pemkot">ASN / Pegawai Instansi Pemerintah (Pusat/Daerah)</option>
                  <option value="Peserta Beasiswa Digitalent DTS">Peserta Beasiswa Digital Talent Scholarship (DTS)</option>
                  <option value="Operator LSP / Asesor Kominfo">Asesor / Operator LSP &amp; BNSP</option>
                  <option value="Mahasiswa / Fresh Graduate">Mahasiswa / Fresh Graduate</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono-geist uppercase tracking-wider text-zinc-300 font-bold block">
                  Instansi / Perusahaan
                </label>
                <input
                  type="text"
                  value={regInstitution}
                  onChange={(e) => setRegInstitution(e.target.value)}
                  placeholder="Contoh: PT Telkom / Diskominfo DKI / Universitas X"
                  className="w-full bg-black/80 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-[#215ecf] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono-geist uppercase tracking-wider text-zinc-300 font-bold block">
                  Buat Kata Sandi
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Minimal 6 karakter..."
                  className="w-full bg-black/80 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-[#215ecf] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#215ecf] hover:bg-blue-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50 font-mono-geist"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Mendaftarkan Ke Database...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>DAFTAR AKUN &amp; BUKA PORTAL</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* DEMO ACCOUNTS QUICK TEST BOX */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <span className="text-[10px] font-mono-geist text-zinc-400 font-bold uppercase tracking-wider block text-center">
              [ AKSES UJI COBA CEPAT (DEMO ACCOUNTS) ]
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('asn')}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors cursor-pointer"
              >
                <span className="text-[10px] font-bold text-[#ffd700] block">Demo ASN Kominfo</span>
                <span className="text-[9px] text-zinc-400 block truncate">triyono@komdigi.go.id</span>
              </button>

              <button
                type="button"
                onClick={() => handleDemoLogin('public')}
                className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-left transition-colors cursor-pointer"
              >
                <span className="text-[10px] font-bold text-emerald-400 block">Demo Masyarakat</span>
                <span className="text-[9px] text-zinc-400 block truncate">siti.rahmawati@gmail.com</span>
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER DISCLOSURE */}
      <footer className="relative z-10 py-4 border-t border-white/10 text-center text-[10px] text-zinc-500 font-mono-geist">
        SATU DATA KOMPETENSI RI &copy; 2026 Kementerian Komunikasi dan Digital Republik Indonesia
      </footer>
    </div>
  );
};
