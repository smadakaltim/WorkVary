import React, { useState } from 'react';
import { Announcement, SectorInfo } from '../types';

interface SidebarInfoProps {
  announcements: Announcement[];
  careerPool?: Record<string, SectorInfo>;
  onNavigateToEvaluator?: (name: string, sectorKey: string) => void;
}

export const SidebarInfo: React.FC<SidebarInfoProps> = ({
  announcements,
  careerPool,
  onNavigateToEvaluator,
}) => {
  const [candidateName, setCandidateName] = useState('Dr. Ir. Budi Santoso, M.Kom');
  const [sectorKey, setSectorKey] = useState(careerPool ? Object.keys(careerPool)[0] : 'cybersecurity');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNavigateToEvaluator) {
      onNavigateToEvaluator(candidateName, sectorKey);
    }
  };

  return (
    <aside className="w-full lg:w-[380px] bg-[#1C1C1E] border-t lg:border-t-0 lg:border-l border-[rgba(255,255,255,0.1)] p-6 space-y-6 overflow-y-auto flex-shrink-0">
      {/* Panel 1: Announcements */}
      <div className="bg-[#111113] border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="font-mono-geist text-[0.7rem] text-[#ffd700] uppercase tracking-wider flex items-center justify-between font-bold">
          <span className="flex items-center gap-2">
            <span>ANNOUNCEMENTS</span>
          </span>
          <div className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
        </div>

        <div className="divide-y divide-[rgba(255,255,255,0.08)]">
          {announcements.map((ann, idx) => (
            <div key={ann.id || idx} className="py-3 first:pt-0 last:pb-0 space-y-1">
              <h4 className="text-xs font-medium text-white leading-snug">
                {ann.title}
              </h4>
              <div className="font-mono-geist text-[0.6rem] text-[rgba(255,255,255,0.5)] flex items-center justify-between">
                <span>{ann.date}</span>
                <span className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 uppercase tracking-wider text-[0.55rem] text-[#ffd700]">
                  OFFICIAL
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panel 2: Quick Evaluation */}
      <div className="bg-[#111113] border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 space-y-4 shadow-sm">
        <div className="font-mono-geist text-[0.7rem] text-[#ffd700] uppercase tracking-wider font-bold">
          EVALUASI PERSONAL
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[0.65rem] font-semibold text-[rgba(255,255,255,0.5)] uppercase tracking-wider mb-1 font-mono-geist">
              Nama Lengkap
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full bg-[#252529] border border-[rgba(255,255,255,0.1)] text-white px-3 py-2 rounded-lg text-xs outline-none focus:border-[#ffd700]"
            />
          </div>

          <div>
            <label className="block text-[0.65rem] font-semibold text-[rgba(255,255,255,0.5)] uppercase tracking-wider mb-1 font-mono-geist">
              Sektor Target
            </label>
            <select
              value={sectorKey}
              onChange={(e) => setSectorKey(e.target.value)}
              className="w-full bg-[#252529] border border-[rgba(255,255,255,0.1)] text-white px-3 py-2 rounded-lg text-xs outline-none focus:border-[#ffd700]"
            >
              {careerPool ? (
                Object.entries(careerPool).map(([key, sec]) => {
                  const sector = sec as SectorInfo;
                  return (
                    <option key={key} value={key} className="bg-[#1C1C1E] text-white">
                      {sector.name}
                    </option>
                  );
                })
              ) : (
                <option value="cybersecurity" className="bg-[#1C1C1E] text-white">Keamanan Siber</option>
              )}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#ffd700] text-[#111113] font-bold text-xs py-2.5 rounded-lg btn-glow hover:bg-[#e6c200] transition-transform active:scale-95 cursor-pointer uppercase font-mono-geist tracking-wider mt-2"
          >
            PROSES EVALUASI KARIR
          </button>
        </form>
      </div>

      {/* Panel 3: Integrasi Lembaga */}
      <div className="border border-dashed border-[rgba(255,255,255,0.2)] rounded-2xl p-5 space-y-3">
        <div className="font-mono-geist text-[0.65rem] text-[#ffd700] uppercase tracking-wider font-bold">
          INTEGRASI LEMBAGA
        </div>
        <div className="flex flex-wrap gap-2">
          {['KOMINFO RI', 'BAPPENAS', 'KEMNAKER', 'BSSN & BNSP'].map((agency, i) => (
            <span
              key={i}
              className="font-mono-geist text-[0.6rem] px-2.5 py-1 bg-white/5 border border-[rgba(255,255,255,0.15)] text-[rgba(255,255,255,0.8)] rounded-md"
            >
              {agency}
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};
