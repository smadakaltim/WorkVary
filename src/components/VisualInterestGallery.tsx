import React, { useState } from 'react';
import { Camera, Shield, Cpu, Cloud, Globe, Layout, Gamepad2, Sparkles, Heart, Eye, ExternalLink, Code2, Wrench, X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ProjectPoster } from '../types';

interface CategoryInterest {
  id: string;
  name: string;
  icon: any;
  bannerImage: string;
  tagline: string;
  equipmentAndTools: string[];
  posters: ProjectPoster[];
}

export const INTEREST_CATEGORIES: Record<string, CategoryInterest> = {
  cinematography: {
    id: 'cinematography',
    name: 'Cinematografi & Audio-Visual',
    icon: Camera,
    bannerImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Seni tata kamera, penataan cahaya sinematik, penyutradaraan visual, dan pascaproduksi film digital 4K.',
    equipmentAndTools: ['RED V-Raptor / ARRI Alexa Mini', 'DaVinci Resolve Studio 18', 'Aputure 1200d & Nova P600c', 'Adobe Premiere & After Effects', 'Unreal Engine 5 Virtual Production'],
    posters: [
      {
        id: 'cinema-1',
        title: 'Film Dokumenter Kedaulatan Budaya Nusantara & IKN',
        imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
        category: 'Dokumenter Sinematik',
        description: 'Produksi film dokumenter panjang berstandar festival sinema internasional dengan teknik visual drone 6K & lighting naturalistic.',
        tools: ['ARRI Alexa Mini', 'Cooke Anamorphic Lenses', 'DaVinci Resolve'],
        skkniUnit: 'M.591110.001.01 - Merancang Pencahayaan Sinematografi',
        likesCount: 1420
      },
      {
        id: 'cinema-2',
        title: 'Iklan Komersial TVC Bangga Buatan Indonesia (BBI)',
        imageUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80',
        category: 'Iklan Komersial & TVC',
        description: 'Pengambilan gambar kecepatan tinggi (High-Speed Phantom 1000fps) untuk promosi pariwisata super prioritas.',
        tools: ['RED Komodo 6K', 'Gimbal Ronin 2', 'Aputure Nova P600c'],
        skkniUnit: 'M.591110.004.01 - Mengoperasikan Kamera Sinema Profesional',
        likesCount: 980
      },
      {
        id: 'cinema-3',
        title: 'Virtual Production & Studio Stage LED Wall',
        imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
        category: 'Virtual Production & VFX',
        description: 'Integrasi panggung studio LED latar nyata dengan background 3D Unreal Engine secara real-time camera tracking.',
        tools: ['Unreal Engine 5', 'Mo-Sys Camera Tracking', 'Blackmagic URSA Mini Pro'],
        skkniUnit: 'M.591110.008.01 - Tata Kamera Virtual Production',
        likesCount: 1850
      },
      {
        id: 'cinema-4',
        title: 'Video Musik Off-Grid Sinematik & Color Grading',
        imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
        category: 'Video Musik & Pascaproduksi',
        description: 'Tata warna moods sinematik tinggi, kurva kontras tinggi, dan penyesuaian skin tone alami untuk rilisan musik nasional.',
        tools: ['DaVinci Resolve Studio', 'Sony FX6', 'Sachtler Tripod System'],
        skkniUnit: 'M.591110.012.01 - Penataan Warna (Color Grading) Pascaproduksi',
        likesCount: 1240
      }
    ]
  },
  cybersecurity: {
    id: 'cybersecurity',
    name: 'Keamanan Siber & Cyber Defense',
    icon: Shield,
    bannerImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Pelindungan infrastruktur informasi vital negara, audit penetrasi keamanan, dan respons insiden siber.',
    equipmentAndTools: ['Wireshark Network Analyzer', 'Burp Suite Professional', 'Splunk Enterprise SIEM', 'Metasploit RedTeam', 'Kali Linux CyberSuite'],
    posters: [
      {
        id: 'cyber-1',
        title: 'National Security Operations Center (SOC) Command Center',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
        category: 'Monitoring Real-Time SOC',
        description: 'Audit dan deteksi ancaman siber secara real-time pada infrastruktur kritis instansi pemerintah.',
        tools: ['Splunk SIEM', 'Palo Alto Firewall', 'Python Threat Intel'],
        skkniUnit: 'J.620900.001.01 - Melakukan Pemantauan Keamanan Informasi',
        likesCount: 1210
      },
      {
        id: 'cyber-2',
        title: 'Red Team Ethical Hacking & Penetration Testing',
        imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        category: 'Pentesting & Ethical Hack',
        description: 'Simulasi serangan siber terkendali untuk menguji ketahanan aplikasi dan jaringan kementerian.',
        tools: ['Kali Linux', 'Burp Suite', 'Nmap', 'Cobalt Strike'],
        skkniUnit: 'J.620900.005.01 - Menguji Penetrasi Keamanan Aplikasi',
        likesCount: 1650
      },
      {
        id: 'cyber-3',
        title: 'CSIRT Government Cyber Incident Response & Forensics',
        imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        category: 'Digital Forensics',
        description: 'Isolasi, analisis artefak malware, dan pemulihan sistem pasca-insiden insiden peretasan.',
        tools: ['Autopsy Forensics', 'FTK Imager', 'Volatility RAM Analyzer'],
        skkniUnit: 'J.620900.009.01 - Analisis Forensik Digital & Respons Insiden',
        likesCount: 1120
      }
    ]
  },
  ai_data: {
    id: 'ai_data',
    name: 'Artificial Intelligence & Data Science',
    icon: Cpu,
    bannerImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Pengolahan big data publik, penerapan Machine Learning, Deep Learning, dan Generative AI terintegrasi.',
    equipmentAndTools: ['Python (PyTorch / TensorFlow)', 'JupyterLab GPU Cluster', 'PostgreSQL / ClickHouse', 'Gemini & OpenAI API', 'Tableau / Power BI'],
    posters: [
      {
        id: 'ai-1',
        title: 'AI Forecasting & Prediksi Beban Pelayanan Publik',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        category: 'Machine Learning & Predictive',
        description: 'Prediksi lonjakan permintaan pelayanan publik nasional menggunakan model XGBoost dan LSTM time-series.',
        tools: ['Python', 'XGBoost', 'PowerBI', 'BigQuery'],
        skkniUnit: 'J.620100.012.01 - Mengembangkan Model Data Mining',
        likesCount: 1430
      },
      {
        id: 'ai-2',
        title: 'NLP Asisten AI Konsultasi Regulasi & Peraturan Daerah',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
        category: 'Generative AI & LLM RAG',
        description: 'RAG Pipeline berbasis LLM Gemini untuk penjelajahan cepat dokumen hukum dan UU nasional.',
        tools: ['Gemini API', 'Pinecone VectorDB', 'LangChain', 'FastAPI'],
        skkniUnit: 'J.620100.015.01 - Menerapkan Algoritma Kecerdasan Buatan',
        likesCount: 2100
      },
      {
        id: 'ai-3',
        title: 'Computer Vision Pemantauan Lalu Lintas Smart City',
        imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
        category: 'Computer Vision',
        description: 'Deteksi plat kendaraan, pengukuran kepadatan jalan, dan kualifikasi pelanggaran otomatis.',
        tools: ['YOLOv8', 'OpenCV', 'PyTorch', 'NVIDIA Jetson'],
        skkniUnit: 'J.620100.018.01 - Pengolahan Citra Digital & Vision AI',
        likesCount: 1350
      }
    ]
  },
  cloud_devops: {
    id: 'cloud_devops',
    name: 'Cloud Architecture & Infrastructure',
    icon: Cloud,
    bannerImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Pengelolaan Pusat Data Nasional (PDN), arsitektur microservices Kubernetes, dan otomatisasi CI/CD.',
    equipmentAndTools: ['Kubernetes (k8s)', 'Terraform Infrastructure as Code', 'Docker Engine', 'Prometheus & Grafana', 'AWS / Google Cloud Platform'],
    posters: [
      {
        id: 'cloud-1',
        title: 'Arsitektur Multi-Cloud Pusat Data Nasional 2026',
        imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
        category: 'Cloud Infrastructure',
        description: 'Klaster High-Availability dengan zero-downtime deployment untuk 100+ aplikasi kementerian.',
        tools: ['Kubernetes', 'Terraform', 'Google Cloud', 'Grafana'],
        skkniUnit: 'J.620200.003.01 - Merancang Infrastruktur Komputasi Awan',
        likesCount: 1150
      },
      {
        id: 'cloud-2',
        title: 'Pipeline CI/CD Automation & Security Hardening',
        imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80',
        category: 'DevOps & GitOps',
        description: 'Otomatisasi pengujian kode, pembentukan kontainer Docker, dan penyebaran aman ke klaster Kubernetes.',
        tools: ['GitHub Actions', 'ArgoCD', 'SonarQube', 'Trivy Scanner'],
        skkniUnit: 'J.620200.008.01 - Mengelola Deployment & Integrasi Berkelanjutan',
        likesCount: 980
      }
    ]
  },
  software_eng: {
    id: 'software_eng',
    name: 'Software Engineering & App Dev',
    icon: Code2,
    bannerImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Pengembangan aplikasi web dan mobile berskala enterprise yang fleksibel, aman, dan berperforma tinggi.',
    equipmentAndTools: ['VS Code / WebStorm', 'React / Next.js & TypeScript', 'Flutter Cross-Platform', 'Node.js Express & Go', 'PostgreSQL & Redis'],
    posters: [
      {
        id: 'soft-1',
        title: 'SuperApp Portal Layanan Terpadu Warga Digital',
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
        category: 'Mobile SuperApp',
        description: 'Aplikasi seluler terpadu untuk pengurusan administrasi kependudukan cepat & transparan.',
        tools: ['Flutter', 'Node.js', 'Redis', 'PostgreSQL'],
        skkniUnit: 'J.620100.004.01 - Mengimplementasikan Pemrograman Terstruktur',
        likesCount: 1780
      },
      {
        id: 'soft-2',
        title: 'Enterprise Microservices REST & gRPC API Engine',
        imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=800&q=80',
        category: 'Backend Microservices',
        description: 'Engine API kecepatan tinggi pendukung transaksi massal data kependudukan nasional.',
        tools: ['Go (Golang)', 'gRPC', 'RabbitMQ', 'PostgreSQL'],
        skkniUnit: 'J.620100.008.01 - Membangun Layanan Backend Terdistribusi',
        likesCount: 1320
      }
    ]
  },
  ui_ux: {
    id: 'ui_ux',
    name: 'UI/UX Design & Civic Tech',
    icon: Layout,
    bannerImage: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Perancangan antarmuka digital publik yang ramah pengguna, mudah diakses, dan memenuhi standar WCAG 2.1 AA.',
    equipmentAndTools: ['Figma Enterprise System', 'Maze Prototyping Research', 'Stark Accessibility Tools', 'Principle Animation Engine'],
    posters: [
      {
        id: 'uiux-1',
        title: 'Design System Layanan Digital Pemerintah (Garuda UI)',
        imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
        category: 'Design System & Token',
        description: 'Sistem komponen UI terstandarisasi untuk aksesibilitas WCAG 2.1 AA di seluruh portal publik.',
        tools: ['Figma', 'Tokens Studio', 'Storybook'],
        skkniUnit: 'M.741000.002.01 - Merancang Antarmuka Pengguna (UI)',
        likesCount: 1390
      },
      {
        id: 'uiux-2',
        title: 'Riset Pengguna & Usability Testing Layanan Publik',
        imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80',
        category: 'UX Research & Testing',
        description: 'Pengujian kegunaan antarmuka bersama kelompok disabilitas dan masyarakat senior.',
        tools: ['Maze', 'Figma Prototype', 'Screen Readers'],
        skkniUnit: 'M.741000.005.01 - Evaluasi Pengalaman Pengguna (UX)',
        likesCount: 1040
      }
    ]
  },
  game_vr: {
    id: 'game_vr',
    name: 'Game Dev & Interactive VR/AR',
    icon: Gamepad2,
    bannerImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Pengembangan gim edukasi, simulasi VR interaktif, serta metaverse kebudayaan dan sejarah Nusantara.',
    equipmentAndTools: ['Unreal Engine 5 / Unity 3D', 'Blender 3D Modeling', 'Meta Quest VR Headset', 'Substance 3D Painter'],
    posters: [
      {
        id: 'game-1',
        title: 'Virtual Reality Tour Candi Borobudur & Candi Prambanan',
        imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80',
        category: 'Simulasi VR & Kebudayaan',
        description: 'Simulasi interaktif kembara sejarah Nusantara berbasis headset VR dengan grafis photorealistic Unreal Engine 5.',
        tools: ['Unreal Engine 5', 'Blender 3D', 'Meta Quest 3'],
        skkniUnit: 'J.620100.020.01 - Merancang Aplikasi Virtual Reality Interaktif',
        likesCount: 1920
      },
      {
        id: 'game-2',
        title: 'EduGame Cerdas Literasi Finansial & Karir Anak Bangsa',
        imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
        category: 'Gim Edukasi Cross-Platform',
        description: 'Game petualangan 2.5D interaktif untuk meningkatkan pemahaman kognitif dan ketrampilan digital.',
        tools: ['Unity 3D', 'C#', 'Spine 2D Animation'],
        skkniUnit: 'J.620100.022.01 - Mengembangkan Logika & Gameplay Permainan',
        likesCount: 1180
      }
    ]
  }
};

interface VisualInterestGalleryProps {
  onSelectInterestForEvaluation?: (interestKey: string) => void;
  onConsultAiCopilot?: (interestName: string) => void;
}

export const VisualInterestGallery: React.FC<VisualInterestGalleryProps> = ({
  onSelectInterestForEvaluation,
  onConsultAiCopilot
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('cinematography');
  const [selectedPosterModal, setSelectedPosterModal] = useState<ProjectPoster | null>(null);
  const [likedPosters, setLikedPosters] = useState<Record<string, boolean>>({});

  const activeCategory = INTEREST_CATEGORIES[selectedCategoryId] || INTEREST_CATEGORIES.cinematography;
  const CategoryIcon = activeCategory.icon;

  const handleToggleLike = (posterId: string) => {
    setLikedPosters((prev) => ({
      ...prev,
      [posterId]: !prev[posterId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-[#ffd700]/20 text-[#ffd700] text-[10px] font-outfit font-extrabold uppercase rounded tracking-wider border border-[#ffd700]/30">
              Showcase Visual Minat &amp; Portofolio Real
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white font-outfit mt-1 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#ffd700]" />
            <span>Peta Minat &amp; Galeri Poster Proyek Digital</span>
          </h2>
          <p className="text-xs text-zinc-300 font-jakarta mt-0.5">
            Jelajahi contoh karya, poster produksi, alat industri, dan unit SKKNI sesuai minat bidang Anda (Cinematografi, Cyber, AI, Game, UI/UX, dll).
          </p>
        </div>
      </div>

      {/* CATEGORY SELECTOR TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {Object.values(INTEREST_CATEGORIES).map((cat) => {
          const IconComp = cat.icon;
          const isActive = cat.id === selectedCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategoryId(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-outfit font-bold flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#ffd700] text-black shadow-lg shadow-[#ffd700]/20 scale-[1.02]'
                  : 'bg-[#161618] hover:bg-[#202025] text-zinc-300 border border-white/10'
              }`}
            >
              <IconComp className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[#ffd700]'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* ACTIVE CATEGORY HERO BANNER */}
      <div className="relative rounded-2xl overflow-hidden border border-[#ffd700]/30 shadow-2xl group">
        <img
          src={activeCategory.bannerImage}
          alt={activeCategory.name}
          className="w-full h-48 sm:h-64 object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent p-6 flex flex-col justify-end">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-black/70 backdrop-blur-md text-[#ffd700] text-[11px] font-outfit font-extrabold rounded-md border border-[#ffd700]/40 flex items-center gap-1.5">
                <CategoryIcon className="w-3.5 h-3.5" />
                <span>KATEGORI UTAMA</span>
              </span>
              <span className="text-xs text-zinc-300 font-jakarta">
                {activeCategory.posters.length} Poster Proyek Tersedia
              </span>
            </div>
            <h3 className="text-xl sm:text-3xl font-extrabold text-white font-outfit">
              {activeCategory.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-200 font-jakarta leading-relaxed">
              {activeCategory.tagline}
            </p>

            {/* Equipment & Tools Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold text-[#ffd700] uppercase tracking-wider mr-1 flex items-center gap-1">
                <Wrench className="w-3 h-3" />
                Alat &amp; Software:
              </span>
              {activeCategory.equipmentAndTools.map((tool, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 bg-black/80 backdrop-blur-xs text-white border border-white/20 text-[10px] font-mono rounded"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PROJECT POSTERS GRID */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-extrabold text-white font-outfit uppercase tracking-wider flex items-center gap-2">
            <Camera className="w-4 h-4 text-[#ffd700]" />
            <span>Galeri Poster &amp; Karya Proyek Internet ({activeCategory.name})</span>
          </h4>
          {onSelectInterestForEvaluation && (
            <button
              onClick={() => onSelectInterestForEvaluation(activeCategory.id)}
              className="text-xs font-outfit font-bold text-[#ffd700] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Evaluasi Kualifikasi Saya di Minat Ini</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activeCategory.posters.map((poster) => {
            const isLiked = likedPosters[poster.id];
            const currentLikes = (poster.likesCount || 100) + (isLiked ? 1 : 0);

            return (
              <div
                key={poster.id}
                className="bg-[#161618] border border-white/10 rounded-2xl overflow-hidden hover:border-[#ffd700]/50 transition-all duration-300 shadow-xl flex flex-col group cursor-pointer"
                onClick={() => setSelectedPosterModal(poster)}
              >
                {/* Poster Image Container */}
                <div className="relative h-48 overflow-hidden bg-black">
                  <img
                    src={poster.imageUrl}
                    alt={poster.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161618] via-transparent to-transparent opacity-80" />

                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 backdrop-blur-md text-[#ffd700] text-[10px] font-outfit font-bold rounded-lg border border-[#ffd700]/30">
                    {poster.category}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleLike(poster.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                      isLiked ? 'bg-red-500 text-white' : 'bg-black/60 text-zinc-300 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] text-zinc-300">
                    <span className="flex items-center gap-1 font-mono">
                      <Heart className="w-3 h-3 text-red-400 fill-current" />
                      {currentLikes} Apresiasi
                    </span>
                    <span className="bg-black/60 px-2 py-0.5 rounded text-[10px] text-[#ffd700] font-bold">
                      Klik Detail
                    </span>
                  </div>
                </div>

                {/* Poster Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h5 className="text-sm font-extrabold text-white font-outfit group-hover:text-[#ffd700] transition-colors leading-snug">
                      {poster.title}
                    </h5>
                    <p className="text-xs text-zinc-400 font-jakarta mt-1 line-clamp-2 leading-relaxed">
                      {poster.description}
                    </p>
                  </div>

                  {/* Tools list */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex flex-wrap gap-1">
                      {poster.tools.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-black text-zinc-300 text-[10px] font-mono rounded border border-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {poster.skkniUnit && (
                      <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1 truncate">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{poster.skkniUnit}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAIL MODAL FOR SELECTED POSTER */}
      {selectedPosterModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#18181B] border border-[#ffd700]/40 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-0 my-8">
            {/* Modal Header Image */}
            <div className="relative h-64 sm:h-80 bg-black">
              <img
                src={selectedPosterModal.imageUrl}
                alt={selectedPosterModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-transparent to-transparent" />

              <button
                onClick={() => setSelectedPosterModal(null)}
                className="absolute top-4 right-4 p-2.5 bg-black/80 text-white hover:text-[#ffd700] rounded-full border border-white/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-3 py-1 bg-[#ffd700] text-black text-xs font-outfit font-extrabold rounded-md uppercase tracking-wider">
                  {selectedPosterModal.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-outfit mt-2">
                  {selectedPosterModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 space-y-5 font-jakarta">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-zinc-400 font-mono uppercase tracking-wider">
                  Deskripsi Proyek Sinematik &amp; Spesifikasi Teknis
                </h4>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
                  {selectedPosterModal.description}
                </p>
              </div>

              {/* Tools & Equipment Used */}
              <div className="p-4 bg-black/60 rounded-xl border border-white/10 space-y-2">
                <span className="text-xs font-bold text-[#ffd700] uppercase font-outfit flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  Peralatan Kamera / Software Utama:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedPosterModal.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-zinc-800 text-white text-xs font-mono rounded-lg border border-white/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* SKKNI Unit Reference */}
              {selectedPosterModal.skkniUnit && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold block">Unit Kompetensi SKKNI Terkait:</span>
                    <span className="font-mono">{selectedPosterModal.skkniUnit}</span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                {onConsultAiCopilot && (
                  <button
                    onClick={() => {
                      onConsultAiCopilot(selectedPosterModal.title);
                      setSelectedPosterModal(null);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 bg-[#ffd700] hover:bg-amber-400 text-black font-outfit font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Konsultasi Roadmap Proyek Ini via AI Copilot</span>
                  </button>
                )}

                <button
                  onClick={() => setSelectedPosterModal(null)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white/10 hover:bg-white/15 text-white font-outfit font-bold text-xs rounded-xl border border-white/15 transition-all cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
