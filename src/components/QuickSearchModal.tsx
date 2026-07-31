import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Award, BarChart3, Bot, Bell, ArrowRight, Sparkles, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import { TabType } from './Navigation';

interface QuickSearchResult {
  id: string;
  type: 'skkni' | 'module' | 'announcement' | 'poster';
  category: string;
  title: string;
  subtitle: string;
  description: string;
  targetTab: TabType;
  sectorKey?: string;
  badge: string;
  imageUrl?: string;
  tools?: string[];
}

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (targetTab: TabType, sectorKey?: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<QuickSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  // Handle Search Input Change
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(true);
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.results) {
            setResults(data.results);
          }
        })
        .catch((err) => {
          console.warn('Search query error:', err);
        })
        .finally(() => setIsLoading(false));
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const quickFilterTopics = [
    { label: '🎬 Cinematografi & Film', query: 'cinematografi' },
    { label: '🛡️ Keamanan Siber (Cyber)', query: 'cybersecurity' },
    { label: '🤖 Kecerdasan Buatan (AI)', query: 'ai' },
    { label: '☁️ Cloud Architecture', query: 'cloud' },
    { label: '💻 Software Engineering', query: 'software' },
    { label: '🎨 UI/UX Design System', query: 'uiux' },
    { label: '🎮 Game Dev & VR', query: 'game' },
    { label: '🎓 Beasiswa DTS & SKKNI', query: 'beasiswa' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#161618] border border-white/20 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Header Bar */}
        <div className="p-4 sm:p-5 bg-[#09090B] border-b border-white/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#ffd700] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari minat (cinematografi, cyber, AI, game, UI/UX, cloud, DTS, dll)..."
            className="w-full bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-zinc-500 font-jakarta"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-white rounded-md cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 bg-zinc-800 text-zinc-300 hover:text-white rounded-lg text-xs font-mono cursor-pointer border border-zinc-700 flex-shrink-0"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Tag Recommendations (Shown when query is empty) */}
        {!query && (
          <div className="p-5 space-y-3 bg-[#111113]">
            <span className="text-[10px] font-outfit font-extrabold text-[#ffd700] uppercase tracking-wider block">
              REKOMENDASI TOPIK MINAT &amp; PORTOFOLIO POPULER:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickFilterTopics.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(item.query)}
                  className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ffd700]/40 rounded-xl text-xs text-zinc-200 hover:text-[#ffd700] font-outfit font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#ffd700]" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="p-10 text-center text-xs text-zinc-400 flex flex-col items-center justify-center gap-3">
            <div className="w-7 h-7 border-2 border-[#ffd700] border-t-transparent rounded-full animate-spin" />
            <span className="font-outfit font-bold text-zinc-300">Mencari dalam Database SATU DATA KOMPETENSI &amp; Portofolio Digital Internet...</span>
          </div>
        )}

        {/* Search Results List */}
        {!isLoading && results.length > 0 && (
          <div className="max-h-[65vh] overflow-y-auto p-3 space-y-2">
            <div className="px-2 pt-1 pb-2 flex items-center justify-between text-[11px] font-outfit text-zinc-400 border-b border-white/5">
              <span>Menampilkan {results.length} Hasil Pencarian Terkait &ldquo;{query}&rdquo;</span>
              <span className="text-[#ffd700] font-bold">Dilengkapi Gambar Internet &amp; Detail SKKNI</span>
            </div>

            {results.map((res) => (
              <div
                key={res.id}
                onClick={() => {
                  onSelectResult(res.targetTab, res.sectorKey);
                  onClose();
                }}
                className="w-full text-left p-3.5 bg-[#0e0e10] hover:bg-[#1c1c20] border border-white/10 hover:border-[#ffd700]/50 rounded-2xl transition-all flex flex-col sm:flex-row items-start gap-4 group cursor-pointer shadow-md"
              >
                {/* Result Image Thumbnail */}
                {res.imageUrl && (
                  <div className="relative w-full sm:w-36 h-24 sm:h-24 rounded-xl overflow-hidden bg-black flex-shrink-0 border border-white/15">
                    <img
                      src={res.imageUrl}
                      alt={res.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-black/80 text-[#ffd700] text-[9px] font-outfit font-extrabold rounded border border-[#ffd700]/30 uppercase">
                      {res.badge}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    {!res.imageUrl && (
                      <span className="px-2 py-0.5 bg-[#ffd700]/20 text-[#ffd700] text-[9px] font-outfit font-bold rounded border border-[#ffd700]/30 uppercase">
                        {res.badge}
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-zinc-400 truncate">
                      {res.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-white group-hover:text-[#ffd700] transition-colors leading-snug">
                    {res.title}
                  </h4>

                  <p className="text-xs text-zinc-300 font-jakarta line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>

                  <p className="text-[11px] text-zinc-400 font-mono">
                    {res.subtitle}
                  </p>

                  {/* Tools / Tags */}
                  {res.tools && res.tools.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {res.tools.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-black text-zinc-300 text-[10px] font-mono rounded border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow Action Button */}
                <div className="self-end sm:self-center flex items-center gap-1.5 px-3 py-1.5 bg-[#ffd700] text-black rounded-xl text-xs font-outfit font-extrabold opacity-90 group-hover:opacity-100 transition-opacity flex-shrink-0">
                  <span>Lihat Detail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && query && results.length === 0 && (
          <div className="p-10 text-center text-xs text-zinc-400 space-y-3">
            <p className="text-sm font-bold text-white">Tidak ditemukan hasil untuk kata kunci &ldquo;{query}&rdquo;</p>
            <p className="text-xs text-zinc-400">Coba kata kunci populer: <span className="text-[#ffd700] font-bold">cinematografi</span>, <span className="text-[#ffd700] font-bold">cybersecurity</span>, <span className="text-[#ffd700] font-bold">AI</span>, <span className="text-[#ffd700] font-bold">game</span>, <span className="text-[#ffd700] font-bold">cloud</span>, atau <span className="text-[#ffd700] font-bold">SKKNI</span>.</p>
          </div>
        )}

        {/* Footer Info */}
        <div className="p-3 bg-[#09090B] border-t border-white/10 px-5 flex items-center justify-between text-[11px] text-zinc-400 font-jakarta">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Terintegrasi Database SKKNI, Beasiswa Kominfo &amp; Portofolio Digital Internet</span>
          </div>
          <span className="font-mono text-[10px]">Tekan ESC untuk menutup</span>
        </div>

      </div>
    </div>
  );
};
