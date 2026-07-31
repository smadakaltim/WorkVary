import { PortalConfig } from '../types';

export const DEFAULT_PORTAL_CONFIG: PortalConfig = {
  siteTitle: "WorkVary",
  subTitle: "{smada.title}",
  macroStats: {
    transformationRate: 89.2,
    digitalJobDemand: "2.450.000 Posisi",
    competencyIndex: 68.4,
    certifiedTalents: "412.500+ Ahli",
    lastUpdated: "30 Juli 2026"
  },
  announcements: [
    {
      id: "ann-1",
      icon: "📢",
      title: "Peluncuran Batch 3 Digital Talent Scholarship (DTS) 2026 Kuota 50.000 Peserta.",
      date: "28 Jul 2026",
      urgent: true
    },
    {
      id: "ann-2",
      icon: "🎬",
      title: "Program Sertifikasi Kominfo & FFI: Modul Cinematography & Virtual Production 2026.",
      date: "26 Jul 2026",
      urgent: true
    },
    {
      id: "ann-3",
      icon: "📉",
      title: "Peningkatan Tren Permintaan Ahli Cybersecurity & Data Governance di Instansi Pusat.",
      date: "25 Jul 2026"
    },
    {
      id: "ann-4",
      icon: "🎓",
      title: "Jadwal Uji Sertifikasi Gratis LSP BSSN & Kominfo untuk ASN dan Lulusan Baru.",
      date: "20 Jul 2026"
    }
  ],
  careerPool: {
    "Cinematografi & Produksi Audio-Visual": {
      id: "cinematography",
      name: "Cinematografi & Produksi Audio-Visual",
      desc: "Seni dan teknik tata kamera, penataan cahaya, penyutradaraan sinematik, serta pascaproduksi film digital.",
      steps: [
        "Kamera Operator & Lighting Technician (SKKNI Level IV)",
        "Director of Photography (DoP) & Colorist / LSP Film Nusantara",
        "Executive Producer & Creative Director Industri Kreatif Digital"
      ],
      skkniCode: "SKKNI No. 118/2018 - Film & Pertelevisian",
      demandHistory: [12, 22, 39, 58, 88],
      avgSalaryMin: 7.0,
      avgSalaryMax: 25.0,
      lspProvider: "LSP Film & Televisi Indonesia / BNSP",
      topSkills: [
        "Director of Photography",
        "Color Grading (DaVinci)",
        "Lighting Setup & Lighting Design",
        "Anamorphic & Prime Lens Optics",
        "Unreal Engine Virtual Production"
      ],
      bannerImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80",
      equipmentAndTools: ["RED V-Raptor / ARRI Alexa", "DaVinci Resolve Studio", "Aputure 1200d Lighting", "Adobe Premiere Pro / After Effects", "Unreal Engine 5 LED Wall"],
      projectPosters: [
        {
          id: "cinema-p1",
          title: "Film Dokumenter Kedaulatan Budaya Kalimantan & IKN",
          imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
          category: "Dokumenter Sinematik 4K",
          description: "Produksi film dokumenter panjang berstandar festival internasional dengan teknik visual drone 6K & lighting naturalistic.",
          tools: ["ARRI Alexa Mini", "Cooke Anamorphic Lenses", "DaVinci Colorist"],
          skkniUnit: "M.591110.001.01 - Merancang Pencahayaan Sinematografi",
          likesCount: 1420
        },
        {
          id: "cinema-p2",
          title: "Iklan Komersial Bangga Buatan Indonesia (BBI)",
          imageUrl: "https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=800&q=80",
          category: "Komersial & TVC",
          description: "Pengambilan gambar kecepatan tinggi (High-Speed Phantom 1000fps) untuk promosi pariwisata super prioritas.",
          tools: ["RED Komodo 6K", "Gimbal Ronin 2", "Aputure Nova P600c"],
          skkniUnit: "M.591110.004.01 - Mengoperasikan Kamera Sinema Profesional",
          likesCount: 980
        },
        {
          id: "cinema-p3",
          title: "Virtual Production & LED Stage Sci-Fi Short",
          imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80",
          category: "Virtual Production & VFX",
          description: "Integrasi studio LED latar nyata dengan background 3D Unreal Engine secara real-time camera tracking.",
          tools: ["Unreal Engine 5", "Mo-Sys Camera Tracking", "Blackmagic URSA Mini Pro"],
          skkniUnit: "M.591110.008.01 - Tata Kamera Virtual Production",
          likesCount: 1850
        }
      ]
    },
    "Keamanan Siber & Cyber Defense": {
      id: "cybersec",
      name: "Keamanan Siber & Cyber Defense",
      desc: "Urusan krusial pelindungan infrastruktur informasi vital negara dan kedaulatan data nasional.",
      steps: [
        "Junior SOC Analyst (SKKNI Level IV)",
        "Sertifikasi Penetration Tester & CISSP / LSP BSSN",
        "Gov Cyber Defense & CSIRT Incident Response Manager"
      ],
      skkniCode: "SKKNI No. 323/2019 - Keamanan Informasi",
      demandHistory: [18, 32, 54, 78, 110], // in thousands
      avgSalaryMin: 8.5,
      avgSalaryMax: 22.0,
      lspProvider: "LSP BSSN & LSP Kominfo",
      topSkills: ["Network Security", "Incident Response", "Penetration Testing", "ISO 27001", "Threat Hunting"],
      bannerImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
      equipmentAndTools: ["Wireshark", "Burp Suite Pro", "Splunk SIEM", "Metasploit Framework", "Kali Linux RedTeam"],
      projectPosters: [
        {
          id: "cyber-p1",
          title: "National Security Operations Center (SOC) Dashboard",
          imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
          category: "Monitoring Real-Time",
          description: "Audit dan deteksi ancaman siber secara real-time pada infrastruktur kritis instansi pemerintah.",
          tools: ["Splunk SIEM", "Palo Alto Firewall", "Python Threat Intel"],
          skkniUnit: "J.620900.001.01 - Melakukan Pemantauan Keamanan Informasi",
          likesCount: 1210
        },
        {
          id: "cyber-p2",
          title: "Red Team Ethical Hacking & Penetration Test",
          imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
          category: "Auditing & Pentest",
          description: "Simulasi serangan siber terkendali untuk menguji ketahanan aplikasi kementerian.",
          tools: ["Kali Linux", "Burp Suite", "Nmap", "Cobalt Strike"],
          skkniUnit: "J.620900.005.01 - Menguji Penetrasi Keamanan Aplikasi",
          likesCount: 1650
        }
      ]
    },
    "Data Analyst & Artificial Intelligence": {
      id: "data-ai",
      name: "Data Analyst & Artificial Intelligence",
      desc: "Pengolahan big data publik dan penerapan model AI/ML untuk perumusan kebijakan berbasis bukti.",
      steps: [
        "Data Associate & SQL Governance (SKKNI Level IV)",
        "Certified Data Scientist / AI Practitioner (LSP Kominfo)",
        "Chief Data & AI Ethics Architect"
      ],
      skkniCode: "SKKNI No. 299/2017 - Sains Data",
      demandHistory: [25, 42, 68, 95, 135],
      avgSalaryMin: 7.5,
      avgSalaryMax: 20.0,
      lspProvider: "LSP Kominfo & BNSP",
      topSkills: ["Python/R", "SQL Govt Schema", "Machine Learning", "Tableau/PowerBI", "Ethical AI"],
      bannerImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
      equipmentAndTools: ["Python PyTorch/TensorFlow", "PostgreSQL / ClickHouse", "Tableau Enterprise", "JupyterLab Cluster", "Apache Spark"],
      projectPosters: [
        {
          id: "data-p1",
          title: "AI Demand Forecasting Layanan Publik Nasional",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
          category: "Machine Learning & Analytics",
          description: "Prediksi lonjakan beban pelayananpublik dengan model XGBoost dan LSTM teruji.",
          tools: ["Python", "XGBoost", "PowerBI", "BigQuery"],
          skkniUnit: "J.620100.012.01 - Mengembangkan Model Data Mining",
          likesCount: 1430
        },
        {
          id: "data-p2",
          title: "NLP Chatbot Asisten Hukum & Peraturan Pemerintah",
          imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
          category: "Generative AI & LLM",
          description: "RAG Pipeline berbasis LLM Gemini untuk konsultasi cepat pasal-pasal peraturan daerah.",
          tools: ["Gemini API", "Pinecone VectorDB", "LangChain", "FastAPI"],
          skkniUnit: "J.620100.015.01 - Menerapkan Algoritma Kecerdasan Buatan",
          likesCount: 2100
        }
      ]
    },
    "Cloud Architecture & Smart Infrastructure": {
      id: "cloud-infra",
      name: "Cloud Architecture & Smart Infrastructure",
      desc: "Pengelolaan Pusat Data Nasional (PDN) dan arsitektur komputasi awan skala makro.",
      steps: [
        "Cloud & SysAdmin Associate",
        "Multi-Cloud Architect & DevOps Engineer",
        "Pusat Data Nasional Infrastructure Principal"
      ],
      skkniCode: "SKKNI No. 056/2018 - Infrastruktur IT",
      demandHistory: [15, 28, 48, 72, 105],
      avgSalaryMin: 8.0,
      avgSalaryMax: 24.0,
      lspProvider: "LSP Informatika & AWS/RedHat Certified",
      topSkills: ["Kubernetes", "Docker", "Terraform", "Cloud Security", "Linux Hardening"],
      bannerImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      equipmentAndTools: ["Kubernetes (k8s)", "Terraform / Ansible", "AWS / Google Cloud / OpenStack", "Prometheus & Grafana"],
      projectPosters: [
        {
          id: "cloud-p1",
          title: "Arsitektur Multi-Cloud Pusat Data Nasional 2026",
          imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
          category: "Cloud Infrastructure",
          description: "Klaster High-Availability dengan zero-downtime deployment untuk 100+ aplikasi kementerian.",
          tools: ["Kubernetes", "Terraform", "Google Cloud", "Grafana"],
          skkniUnit: "J.620200.003.01 - Merancang Infrastruktur Komputasi Awan",
          likesCount: 1150
        }
      ]
    },
    "Smart City & IoT Systems": {
      id: "smart-city",
      name: "Smart City & IoT Systems",
      desc: "Penerapan sistem sensor cerdas dan IoT untuk tata kelola perkotaan modern di Indonesia.",
      steps: [
        "IoT Hardware & Network Technician",
        "Smart Governance & IoT Integration Architect",
        "Director of Urban Digital Innovation"
      ],
      skkniCode: "SKKNI No. 125/2020 - Internet of Things",
      demandHistory: [10, 20, 38, 62, 90],
      avgSalaryMin: 7.0,
      avgSalaryMax: 18.0,
      lspProvider: "LSP Digital Technology",
      topSkills: ["Embedded C/C++", "MQTT/CoAP Protocols", "GIS Mapping", "Edge Computing", "Sensor Networks"],
      bannerImage: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
      equipmentAndTools: ["ESP32 / Raspberry Pi", "LoRaWAN Gateway", "MQTT Broker (EMQX)", "QGIS Mapping Tool"],
      projectPosters: [
        {
          id: "iot-p1",
          title: "Sistem Sensor Kualitas Air & Udara Cerdas IKN",
          imageUrl: "https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80",
          category: "Environmental IoT",
          description: "Jaringan sensor LoRaWAN bertenaga surya untuk pemantauan lingkungan terpadu.",
          tools: ["ESP32", "LoRaWAN", "ThingsBoard", "Grafana"],
          skkniUnit: "J.620900.010.01 - Mengintegrasikan Perangkat IoT",
          likesCount: 890
        }
      ]
    },
    "Software Engineering & Public Service Apps": {
      id: "software-eng",
      name: "Software Engineering & Public Service Apps",
      desc: "Pengembangan aplikasi layanan publik terpadu yang aman, fleksibel, dan terintegrasi API Nasional.",
      steps: [
        "Junior Web & Mobile Developer (SKKNI Level V)",
        "Full-Stack Engineer & Microservices Architect",
        "Enterprise System Architect Sektor Publik"
      ],
      skkniCode: "SKKNI No. 282/2016 - Pemrograman",
      demandHistory: [40, 65, 90, 120, 160],
      avgSalaryMin: 7.0,
      avgSalaryMax: 19.5,
      lspProvider: "LSP Kominfo & BNSP",
      topSkills: ["TypeScript / Node.js", "React/Flutter", "REST & gRPC API", "PostgreSQL/Redis", "CI/CD Pipeline"],
      bannerImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
      equipmentAndTools: ["VS Code", "TypeScript / React", "Docker Containers", "PostgreSQL", "GitHub Actions"],
      projectPosters: [
        {
          id: "soft-p1",
          title: "SuperApp Layanan Masyarakat SatuPintu",
          imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
          category: "Mobile & Web App",
          description: "Aplikasi seluler terpadu untuk pengurusan administrasi kependudukan cepat & transparan.",
          tools: ["Flutter", "Node.js", "Redis", "PostgreSQL"],
          skkniUnit: "J.620100.004.01 - Mengimplementasikan Pemrograman Terstruktur",
          likesCount: 1780
        }
      ]
    },
    "UI/UX Design & Human-Centered Civic Tech": {
      id: "ui-ux",
      name: "UI/UX Design & Human-Centered Civic Tech",
      desc: "Perancangan antarmuka digital publik yang inklusif, dapat diakses semua kalangan, dan mudah digunakan.",
      steps: [
        "Junior UI/UX Designer (SKKNI Level IV)",
        "Senior Product Designer & Civic Tech Specialist",
        "Design System & Accessibility Lead"
      ],
      skkniCode: "SKKNI No. 391/2020 - Desain Grafis & UI/UX",
      demandHistory: [14, 26, 42, 60, 82],
      avgSalaryMin: 6.5,
      avgSalaryMax: 16.5,
      lspProvider: "LSP Multimedia Nusantara",
      topSkills: ["Figma / Design Systems", "User Research", "WCAG 2.1 Accessibility", "Prototyping", "Usability Testing"],
      bannerImage: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
      equipmentAndTools: ["Figma Enterprise", "Maze Usability Testing", "Stark Accessibility Checker", "Principle Animation"],
      projectPosters: [
        {
          id: "uiux-p1",
          title: "Design System Layanan Digital Pemerintah (Garuda Design)",
          imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
          category: "Design System & UI Component",
          description: "Sistem komponen UI terstandarisasi untuk aksesibilitas WCAG 2.1 AA di seluruh situs daerah.",
          tools: ["Figma", "Tokens Studio", "Storybook"],
          skkniUnit: "M.741000.002.01 - Merancang Antarmuka Pengguna (UI)",
          likesCount: 1390
        }
      ]
    }
  }
};

export const REGIONAL_DEMAND_DATA = [
  { region: "DKI Jakarta & Banten", count: 850000, percentage: 35 },
  { region: "Jawa Barat", count: 480000, percentage: 20 },
  { region: "Jawa Tengah & DIY", count: 340000, percentage: 14 },
  { region: "Jawa Timur", count: 320000, percentage: 13 },
  { region: "Sumatera", count: 220000, percentage: 9 },
  { region: "Kalimantan (IKN)", count: 120000, percentage: 5 },
  { region: "Sulawesi, Bali, Papua", count: 120000, percentage: 4 },
];

export const CERTIFICATION_GAP_MATRIX = [
  { category: "Cybersecurity Analyst", certified: 14500, required: 45000, gap: 30500 },
  { category: "Data Engineer & AI", certified: 18200, required: 58000, gap: 39800 },
  { category: "Cloud & DevOps", certified: 12100, required: 38000, gap: 25900 },
  { category: "Software Developer", certified: 42000, required: 85000, gap: 43000 },
  { category: "UI/UX Specialist", certified: 11000, required: 28000, gap: 17000 },
];
