import React, { useState } from 'react';
import { Lock, X, Save, KeyRound, Check, AlertCircle } from 'lucide-react';
import { Announcement } from '../types';

interface OperatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteTitle: string;
  subTitle: string;
  announcements: Announcement[];
  onSaveConfig: (title: string, sub: string, ann: Announcement[]) => Promise<void>;
}

export const OperatorModal: React.FC<OperatorModalProps> = ({
  isOpen,
  onClose,
  siteTitle,
  subTitle,
  announcements,
  onSaveConfig,
}) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editTitle, setEditTitle] = useState(siteTitle);
  const [editSub, setEditSub] = useState(subTitle);
  const [editAnnouncements, setEditAnnouncements] = useState<Announcement[]>(announcements);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'gov123') {
      setIsAuthenticated(true);
      setErrorMsg('');
      setEditTitle(siteTitle);
      setEditSub(subTitle);
      setEditAnnouncements(announcements);
    } else {
      setErrorMsg('Kode otentikasi tidak valid. Silakan gunakan "gov123"');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSaveConfig(editTitle, editSub, editAnnouncements);
      setSuccessMsg('Konfigurasi Portal Operator berhasil diperbarui!');
      setTimeout(() => {
        setSuccessMsg('');
        onClose();
      }, 1500);
    } catch (err) {
      setErrorMsg('Gagal menyimpan perubahan konfigurasi.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#161618] rounded-2xl max-w-lg w-full border border-[rgba(237,238,240,0.15)] shadow-2xl overflow-hidden text-[#EDEEF0]">
        {/* Header */}
        <div className="p-4 bg-[#000000] text-white flex items-center justify-between border-b border-[rgba(237,238,240,0.1)]">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#E5B01A]" />
            <div>
              <h3 className="text-sm font-bold tracking-wide">Operator Panel Portal</h3>
              <p className="text-[11px] text-[rgba(237,238,240,0.5)] font-mono-geist">
                {isAuthenticated ? 'Status: Authenticated Admin Operator' : 'Verifikasi Otentikasi Operator'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {!isAuthenticated ? (
            <form onSubmit={handleAuthenticate} className="space-y-4">
              <div className="p-3 bg.black bg-[#000000] border border-[rgba(237,238,240,0.1)] rounded-xl text-xs text-[rgba(237,238,240,0.8)] flex items-start gap-2">
                <KeyRound className="w-4 h-4 text-[#E5B01A] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white">Akses Terbatas Operator:</span> Masukkan Kode Otentikasi Portal untuk mengelola judul, pengumuman, dan data portal.
                  <span className="block mt-1 text-[rgba(237,238,240,0.5)] font-mono-geist">(Kode standar demo: <strong className="text-[#E5B01A]">gov123</strong>)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold font-mono-geist text-[rgba(237,238,240,0.6)] uppercase tracking-wider mb-1.5">
                  Kode Otentikasi Operator
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Masukkan Kode (Contoh: gov123)"
                  className="w-full px-3.5 py-2.5 text-sm bg-[#000000] border border-[rgba(237,238,240,0.15)] text-[#EDEEF0] rounded-xl outline-none focus:border-[#E5B01A]"
                />
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-[#E5B01A] hover:bg-[#d4a215] text-[#000000] font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Verifikasi Akses
              </button>
            </form>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              {successMsg && (
                <div className="p-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold font-mono-geist text-[rgba(237,238,240,0.6)] uppercase tracking-wider mb-1.5">
                  Nama Portal Utama
                </label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#000000] border border-[rgba(237,238,240,0.15)] text-[#EDEEF0] rounded-xl outline-none focus:border-[#E5B01A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold font-mono-geist text-[rgba(237,238,240,0.6)] uppercase tracking-wider mb-1.5">
                  Sub-Judul & Instansi
                </label>
                <input
                  type="text"
                  value={editSub}
                  onChange={(e) => setEditSub(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#000000] border border-[rgba(237,238,240,0.15)] text-[#EDEEF0] rounded-xl outline-none focus:border-[#E5B01A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold font-mono-geist text-[rgba(237,238,240,0.6)] uppercase tracking-wider mb-1.5">
                  Pengumuman Utama (Urgent Banner)
                </label>
                <textarea
                  rows={3}
                  value={editAnnouncements[0]?.title || ''}
                  onChange={(e) => {
                    const newArr = [...editAnnouncements];
                    if (newArr[0]) newArr[0].title = e.target.value;
                    setEditAnnouncements(newArr);
                  }}
                  className="w-full px-3.5 py-2.5 text-xs bg-[#000000] border border-[rgba(237,238,240,0.15)] text-[#EDEEF0] rounded-xl outline-none focus:border-[#E5B01A]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-[rgba(237,238,240,0.1)]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-[#000000] hover:bg-white/5 text-[#EDEEF0] text-xs font-semibold rounded-xl border border-[rgba(237,238,240,0.1)] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-[#E5B01A] hover:bg-[#d4a215] text-[#000000] text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-3 h-3" />
                  <span>Simpan Konfigurasi Portal</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
