import React from 'react';
import { LayoutDashboard, Award, BarChart3, Bot, Bell, Sparkles } from 'lucide-react';

export type TabType = 'home' | 'evaluator' | 'workvary' | 'analytics' | 'consultant' | 'announcements';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  announcementCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  announcementCount = 4,
}) => {
  const tabs = [
    {
      id: 'home' as TabType,
      label: 'Beranda Utama',
      icon: LayoutDashboard,
      isHome: true,
    },
    {
      id: 'workvary' as TabType,
      label: 'WorkVary Digital Twin',
      icon: Sparkles,
      badge: '8 Modul AI',
    },
    {
      id: 'evaluator' as TabType,
      label: 'Evaluasi SKKNI',
      icon: Award,
    },
    {
      id: 'analytics' as TabType,
      label: 'Data Makro & B2G',
      icon: BarChart3,
    },
    {
      id: 'consultant' as TabType,
      label: 'Konsultasi AI',
      icon: Bot,
      badge: 'Gemini',
    },
    {
      id: 'announcements' as TabType,
      label: 'Maklumat',
      icon: Bell,
      count: announcementCount,
    },
  ];

  return (
    <div className="w-full bg-[#161618]/60 border-b border-[rgba(237,238,240,0.08)] py-2 px-4 sm:px-6">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
        {/* Home option separated on left */}
        <div className="flex items-center gap-2">
          {tabs.filter(t => t.isHome).map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono-geist flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#ffd700] text-[#111113] border-[#ffd700] shadow-sm'
                    : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Other menu options separated on right */}
        <div className="flex items-center gap-1.5">
          {tabs.filter(t => !t.isHome).map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono-geist flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? 'bg-[#215ecf] text-white border-[#215ecf] font-bold shadow-sm'
                    : 'bg-transparent text-zinc-400 border-transparent hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="text-[8px] px-1 py-0.2 bg-blue-500/20 text-blue-300 rounded font-bold">
                    {tab.badge}
                  </span>
                )}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="text-[8px] px-1.5 py-0.2 bg-[#ffd700] text-black font-extrabold rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
