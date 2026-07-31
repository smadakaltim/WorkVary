import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { SectorInfo } from '../types';
import { REGIONAL_DEMAND_DATA, CERTIFICATION_GAP_MATRIX } from '../data/defaultConfig';
import { Filter, Layers, MapPin, AlertTriangle, TrendingUp } from 'lucide-react';

interface MacroAnalyticsProps {
  careerPool: Record<string, SectorInfo>;
}

export const MacroAnalytics: React.FC<MacroAnalyticsProps> = ({ careerPool }) => {
  const sectorList: SectorInfo[] = Object.values(careerPool || {});
  const [selectedSectorId, setSelectedSectorId] = useState<string>('all');

  // Prepare time series data for line chart
  const years = ['2022', '2023', '2024', '2025', '2026 (Proj.)'];
  const demandLineData = years.map((year, idx) => {
    const item: any = { year };
    sectorList.forEach((sec) => {
      item[sec.name] = sec.demandHistory[idx] || 0;
    });
    return item;
  });

  const COLORS = ['#215ecf', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];

  return (
    <div className="space-y-6">
      {/* Chart Header */}
      <div className="bg-[#161618] p-6 rounded-2xl border border-[rgba(237,238,240,0.1)] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#EDEEF0] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#E5B01A]" />
              <span>Proyeksi & Tren Permintaan Pasar Kerja Digital RI (2022 - 2026)</span>
            </h3>
            <p className="text-xs text-[rgba(237,238,240,0.5)]">
              Data teragregasi dari portal lowongan nasional, BPS, Kemenkominfo, dan Sistem Informasi Ketenagakerjaan Kemnaker.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[rgba(237,238,240,0.4)]" />
            <select
              value={selectedSectorId}
              onChange={(e) => setSelectedSectorId(e.target.value)}
              className="text-xs font-semibold px-3 py-1.5 border border-[rgba(237,238,240,0.15)] rounded-lg bg-[#000000] text-[#EDEEF0] outline-none focus:border-[#E5B01A]"
            >
              <option value="all" className="bg-[#161618] text-white">Semua Sektor Digital</option>
              {sectorList.map((sec) => (
                <option key={sec.id} value={sec.id} className="bg-[#161618] text-white">
                  {sec.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Line Chart */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={demandLineData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(237,238,240,0.05)" />
              <XAxis dataKey="year" tick={{ fontSize: 11, fill: 'rgba(237,238,240,0.6)' }} />
              <YAxis tick={{ fontSize: 11, fill: 'rgba(237,238,240,0.6)' }} unit="rb" />
              <Tooltip
                contentStyle={{ backgroundColor: '#000000', borderRadius: '8px', fontSize: '12px', border: '1px solid rgba(237,238,240,0.2)', color: '#EDEEF0' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: '#EDEEF0' }} />
              {sectorList
                .filter((sec) => selectedSectorId === 'all' || sec.id === selectedSectorId)
                .map((sec, idx) => (
                  <Line
                    key={sec.id}
                    type="monotone"
                    dataKey={sec.name}
                    stroke={COLORS[idx % COLORS.length]}
                    strokeWidth={2.5}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid: Regional Distribution & Certification Gap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Regional Distribution */}
        <div className="bg-[#161618] p-6 rounded-2xl border border-[rgba(237,238,240,0.1)] shadow-xs">
          <h3 className="text-sm font-bold text-[#EDEEF0] mb-1 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#E5B01A]" />
            <span>Distribusi Geografis Permintaan SDM Digital</span>
          </h3>
          <p className="text-xs text-[rgba(237,238,240,0.5)] mb-4">
            Persentase alokasi formasi kebutuhan tenaga terampil di Wilayah Indonesia.
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REGIONAL_DEMAND_DATA} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(237,238,240,0.05)" />
                <XAxis type="number" tick={{ fontSize: 11, fill: 'rgba(237,238,240,0.6)' }} unit="%" />
                <YAxis dataKey="region" type="category" tick={{ fontSize: 10, fill: 'rgba(237,238,240,0.8)' }} width={110} />
                <Tooltip
                  formatter={(value: any) => [`${value}% Total Posisi`, 'Porsi']}
                  contentStyle={{ fontSize: '12px', borderRadius: '8px', backgroundColor: '#000', border: '1px solid rgba(237,238,240,0.2)', color: '#fff' }}
                />
                <Bar dataKey="percentage" fill="#E5B01A" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Certification Gap Matrix */}
        <div className="bg-[#161618] p-6 rounded-2xl border border-[rgba(237,238,240,0.1)] shadow-xs">
          <h3 className="text-sm font-bold text-[#EDEEF0] mb-1 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Gap Ketersediaan Sertifikasi Profesi vs Kebutuhan</span>
          </h3>
          <p className="text-xs text-[rgba(237,238,240,0.5)] mb-4">
            Perbandingan jumlah talenta tersertifikasi vs total posisi yang dibutuhkan.
          </p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CERTIFICATION_GAP_MATRIX} margin={{ top: 5, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(237,238,240,0.05)" />
                <XAxis dataKey="category" tick={{ fontSize: 9, fill: 'rgba(237,238,240,0.6)' }} interval={0} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 10, fill: 'rgba(237,238,240,0.6)' }} />
                <Tooltip contentStyle={{ fontSize: '12px', borderRadius: '8px', backgroundColor: '#000', border: '1px solid rgba(237,238,240,0.2)', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="certified" name="Tersertifikasi" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="required" name="Dibutuhkan" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Sector Standards Table */}
      <div className="bg-[#161618] p-6 rounded-2xl border border-[rgba(237,238,240,0.1)] shadow-xs">
        <h3 className="text-sm font-bold text-[#EDEEF0] mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#E5B01A]" />
          <span>Matriks Standar SKKNI & Lembaga Sertifikasi Profesi (LSP) Per Sektor</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#000000] text-[#E5B01A] font-mono-geist uppercase tracking-wider">
                <th className="p-3.5 font-bold rounded-tl-lg">Sektor Digital</th>
                <th className="p-3.5 font-bold">Kode Standar SKKNI</th>
                <th className="p-3.5 font-bold">Lembaga Sertifikasi (LSP)</th>
                <th className="p-3.5 font-bold">Rentang Gaji Sektor</th>
                <th className="p-3.5 font-bold rounded-tr-lg">Kompetensi Utama</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(237,238,240,0.08)] text-[rgba(237,238,240,0.8)]">
              {sectorList.map((sec, i) => (
                <tr key={sec.id} className={i % 2 === 0 ? 'bg-[#161618]' : 'bg-[#000000]/40'}>
                  <td className="p-3.5 font-bold text-[#EDEEF0]">{sec.name}</td>
                  <td className="p-3.5 font-mono-geist text-[#E5B01A] text-[11px]">{sec.skkniCode}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 bg-blue-500/10 text-blue-300 font-bold rounded border border-blue-400/20 text-[10px]">
                      {sec.lspProvider}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-emerald-400">
                    Rp {sec.avgSalaryMin.toFixed(1)} - {sec.avgSalaryMax.toFixed(1)} Jt
                  </td>
                  <td className="p-3.5 text-[11px]">
                    {sec.topSkills.slice(0, 2).join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* WorkVary B2G Market Projections & EdTech Growth Section */}
      <div className="bg-[#111113] border border-[#ffd700]/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div>
            <span className="text-[10px] font-outfit font-extrabold text-[#ffd700] uppercase tracking-wider block">
              WORKVARY B2G MARKET INTELLIGENCE 2026-2034
            </span>
            <h3 className="text-base font-extrabold text-white font-outfit">
              Proyeksi Pertumbuhan Industri EdTech &amp; Vokasi Indonesia
            </h3>
          </div>
          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold border border-blue-500/30">
            CAGR 11,42% - 11,79%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-jakarta">
          <div className="p-4 bg-black/50 rounded-xl border border-white/10 space-y-1">
            <span className="text-zinc-400 text-[10px] block">EdTech Pasar Indonesia</span>
            <span className="text-lg font-extrabold text-[#ffd700]">USD 3,23M → USD 10,04M</span>
            <p className="text-zinc-400 text-[11px]">Proyeksi kenaikan signifikan hingga 2034</p>
          </div>
          <div className="p-4 bg-black/50 rounded-xl border border-white/10 space-y-1">
            <span className="text-zinc-400 text-[10px] block">Pelatihan Vokasi Kerja</span>
            <span className="text-lg font-extrabold text-emerald-400">USD 5,00M → USD 9,50M</span>
            <p className="text-zinc-400 text-[11px]">Permintaan reskilling lulusan SMK &amp; Vokasi</p>
          </div>
          <div className="p-4 bg-black/50 rounded-xl border border-white/10 space-y-1">
            <span className="text-zinc-400 text-[10px] block">Pelatihan Korporasi B2B</span>
            <span className="text-lg font-extrabold text-blue-400">USD 3,00M → USD 6,20M</span>
            <p className="text-zinc-400 text-[11px]">Audit skills &amp; upskilling karyawan internal</p>
          </div>
        </div>
      </div>
    </div>
  );
};
