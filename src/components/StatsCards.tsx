import React from 'react';
import { MacroStats } from '../types';

interface StatsCardsProps {
  stats: MacroStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      label: "Transformasi",
      value: `${stats.transformationRate || 89.2}%`,
      sub: "Nasional",
    },
    {
      label: "Market Demand",
      value: stats.digitalJobDemand || "2.45M",
      sub: "Posisi Digital",
    },
    {
      label: "Comp. Index",
      value: `${stats.competencyIndex || 68.4}`,
      sub: "Rata-Rata SKKNI",
    },
    {
      label: "Certified",
      value: stats.certifiedTalents || "412K+",
      sub: "LSP / BNSP",
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-[#1C1C1E] p-5 sm:p-6 rounded-2xl border border-[rgba(255,255,255,0.1)] flex flex-col justify-between transition-all hover:border-[rgba(255,215,0,0.3)] shadow-sm"
        >
          <div className="font-mono-geist text-[0.65rem] uppercase tracking-wider text-[rgba(255,255,255,0.5)] mb-3">
            {card.label}
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {card.value}
          </div>
          <div className="mt-1 text-[0.65rem] font-mono-geist text-[rgba(255,255,255,0.4)]">
            {card.sub}
          </div>
        </div>
      ))}
    </div>
  );
};
