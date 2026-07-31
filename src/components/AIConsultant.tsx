import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Copy, Check, Volume2, Trash2, ShieldCheck, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';
import { apiUrl, parseApiResponse } from '../utils/api';

export const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: 'Halo! Saya Konsultan AI Nasional SATU DATA SDM Digital dari Kementerian Komunikasi dan Digital RI.\n\nAnda dapat menanyakan informasi tentang Standar SKKNI, Beasiswa Digital Talent Scholarship (DTS), Sertifikasi Profesi LSP/BNSP, atau proyeksi kebutuhan pasar kerja digital Indonesia. Silakan ajukan pertanyaan Anda secara formal.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isAiGenerated: true
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "Berapa proyeksi kebutuhan SDM Cybersecurity 2026?",
    "Bagaimana syarat pendaftaran beasiswa Digitalent Kominfo?",
    "Apa perbedaan Sertifikasi BNSP dan Sertifikasi LSP Kominfo?",
    "Berapa standar gaji sektor AI & Data Analyst di Indonesia?",
    "Bagaimana penyesuaian kualifikasi SKKNI untuk ASN?"
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputPrompt.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setIsLoading(true);

    try {
      // Build history payload
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text
      }));

      const res = await fetch(apiUrl('chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload
        })
      });

      const data = await parseApiResponse<any>(res);
      const botReply = data.reply || "Maaf, sistem AI Konsultan sedang mengalami kendala teknis. Silakan coba kembali.";

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAiGenerated: true
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Error sending message to AI consultant:", err);
      const errorMsg: ChatMessage = {
        id: `bot-err-${Date.now()}`,
        sender: 'bot',
        text: "Gagal terhubung dengan server AI Konsultan. Pastikan koneksi internet Anda stabil atau coba beberapa saat lagi.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTextToSpeech = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: 'Sesi percakapan telah diperbarui. Silakan ajukan pertanyaan baru mengenai kompetensi digital dan standar SKKNI.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="bg-[#161618] rounded-2xl border border-[rgba(237,238,240,0.1)] shadow-md flex flex-col h-[650px]">
      {/* Header */}
      <div className="p-4 border-b border-[rgba(237,238,240,0.1)] flex items-center justify-between bg-[#000000]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#161618] text-[#E5B01A] rounded-xl border border-[rgba(237,238,240,0.1)] shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#EDEEF0]">
                Layanan Konsultasi Universal AI (Government Standard)
              </h3>
              <span className="px-2 py-0.5 bg-[#E5B01A]/20 text-[#E5B01A] font-extrabold font-mono-geist text-[10px] rounded border border-[#E5B01A]/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#E5B01A]" />
                Gemini 3.6 Flash
              </span>
            </div>
            <p className="text-xs text-[rgba(237,238,240,0.5)]">
              Integrasi Data Kominfo RI, BSSN, BNSP & Bappenas untuk Konsultasi Publik.
            </p>
          </div>
        </div>

        <button
          onClick={handleClear}
          title="Bersihkan Percakapan"
          className="p-1.5 text-[rgba(237,238,240,0.4)] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#000000]/60">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[88%] ${isBot ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                  isBot
                    ? 'bg-[#161618] text-[#E5B01A] border border-[rgba(237,238,240,0.15)]'
                    : 'bg-[#E5B01A] text-[#000000]'
                }`}
              >
                {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Content Bubble */}
              <div
                className={`p-4 rounded-xl text-xs leading-relaxed shadow-xs relative group ${
                  isBot
                    ? 'bg-[#161618] border border-[rgba(237,238,240,0.1)] text-[#EDEEF0]'
                    : 'bg-[#E5B01A] text-[#000000] font-semibold'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                <div
                  className={`mt-2 flex items-center justify-between text-[10px] border-t pt-1.5 ${
                    isBot ? 'border-[rgba(237,238,240,0.1)] text-[rgba(237,238,240,0.4)]' : 'border-black/20 text-black/70'
                  }`}
                >
                  <span className="flex items-center gap-1 font-mono-geist">
                    {isBot && <ShieldCheck className="w-3 h-3 text-[#E5B01A]" />}
                    {msg.timestamp}
                  </span>

                  {isBot && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTextToSpeech(msg.text)}
                        title="Dengarkan Suara"
                        className="hover:text-[#E5B01A] cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        title="Salin Teks"
                        className="hover:text-[#E5B01A] cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-[80%]">
            <div className="w-8 h-8 rounded-full bg-[#161618] text-[#E5B01A] border border-[rgba(237,238,240,0.15)] flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 animate-bounce text-[#E5B01A]" />
            </div>
            <div className="p-3.5 bg-[#161618] border border-[rgba(237,238,240,0.1)] rounded-xl text-xs text-[rgba(237,238,240,0.7)] flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 text-[#E5B01A] animate-spin" />
              <span>📡 Mengakses basis data nasional dan memproses konsultasi AI...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="px-4 py-2.5 bg-[#161618] border-t border-[rgba(237,238,240,0.1)] flex gap-2 overflow-x-auto no-scrollbar">
        <span className="text-[11px] font-bold text-[rgba(237,238,240,0.5)] font-mono-geist flex items-center gap-1 whitespace-nowrap">
          <Sparkles className="w-3 h-3 text-[#E5B01A]" /> CONTOH:
        </span>
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            className="text-[11px] font-medium px-3 py-1 bg-[#000000] hover:bg-white/5 text-[#EDEEF0] border border-[rgba(237,238,240,0.15)] rounded-full whitespace-nowrap transition-all shadow-xs active:scale-95 cursor-pointer disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <div className="p-3 border-t border-[rgba(237,238,240,0.1)] bg-[#000000]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ketik pertanyaan resmi Anda (Contoh: Proyeksi SDM Data Analyst 2026)..."
            disabled={isLoading}
            className="flex-1 px-3.5 py-2.5 text-xs bg-[#161618] border border-[rgba(237,238,240,0.15)] text-[#EDEEF0] rounded-xl focus:border-[#E5B01A] outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !inputPrompt.trim()}
            className="px-5 py-2.5 bg-[#E5B01A] hover:bg-[#d4a215] text-[#000000] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <span>Tanya</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
