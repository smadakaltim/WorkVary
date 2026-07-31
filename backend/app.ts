import express from 'express';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import initialDb from '../data/db.json';
import { DEFAULT_PORTAL_CONFIG } from '../src/data/defaultConfig';

dotenv.config();

type WorkVaryDatabase = {
  users: any[];
  evaluations: any[];
};

type WorkVaryRuntimeState = {
  db?: WorkVaryDatabase;
  config?: typeof DEFAULT_PORTAL_CONFIG;
};

// Vercel Functions are stateless. This global cache can survive warm invocations,
// but it is not a permanent database and can reset on cold start or redeploy.
const runtimeGlobal = globalThis as typeof globalThis & {
  __workVaryRuntimeState?: WorkVaryRuntimeState;
};
const runtimeState = runtimeGlobal.__workVaryRuntimeState ??= {};

function loadDb(): WorkVaryDatabase {
  if (!runtimeState.db) {
    runtimeState.db = structuredClone(initialDb) as WorkVaryDatabase;
  }
  return runtimeState.db;
}

function saveDb(data: WorkVaryDatabase) {
  runtimeState.db = data;
}

const app = express();
app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

const currentConfig = runtimeState.config ??= structuredClone(DEFAULT_PORTAL_CONFIG);
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.6-flash';
const OPERATOR_PASSCODE = process.env.OPERATOR_PASSCODE || 'gov123';

function getGenAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not configured in process.env');
    return null;
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'workvary-vercel',
      },
    },
  });
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'WorkVary Backend',
    timestamp: new Date().toISOString(),
    storageMode: 'ephemeral-demo'
  });
});

// AUTHENTICATION & USER DATABASE ENDPOINTS
app.post('/api/auth/register', (req, res) => {
  const { name, email, nik, role, institution, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nama, Email, dan Kata Sandi wajib diisi.' });
  }

  const db = loadDb();
  const existingUser = db.users.find((u: any) => u.email.toLowerCase() === email.toLowerCase() || (nik && u.nik === nik));
  if (existingUser) {
    return res.status(400).json({ error: 'Email atau NIK/NIP sudah terdaftar dalam database portal.' });
  }

  const newUser = {
    id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name,
    email,
    nik: nik || '-',
    role: role || 'Masyarakat Umum / Professional',
    institution: institution || 'Umum / Mandiri',
    password,
    createdAt: new Date().toISOString()
  };

  db.users.push(newUser);
  saveDb(db);

  const { password: _, ...userWithoutPassword } = newUser;
  return res.json({
    success: true,
    user: userWithoutPassword,
    token: `token_${newUser.id}_${Date.now()}`
  });
});

app.post('/api/auth/login', (req, res) => {
  const { identity, password } = req.body;
  if (!identity || !password) {
    return res.status(400).json({ error: 'Email / NIK / NIP dan Kata Sandi wajib diisi.' });
  }

  const db = loadDb();
  const cleanId = identity.trim().toLowerCase();
  const user = db.users.find(
    (u: any) =>
      u.email.toLowerCase() === cleanId ||
      u.nik.toLowerCase() === cleanId ||
      (cleanId === 'demo' && u.email === 'triyono@komdigi.go.id')
  );

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Otentikasi gagal. Silakan periksa Email / NIK dan Kata Sandi Anda.' });
  }

  const { password: _, ...userWithoutPassword } = user;
  return res.json({
    success: true,
    user: userWithoutPassword,
    token: `token_${user.id}_${Date.now()}`
  });
});

// QUICK SEARCH ENDPOINT (With Rich Internet Images, Posters & SKKNI Items)
app.get('/api/search', (req, res) => {
  const query = (req.query.q as string || '').toLowerCase().trim();
  if (!query) {
    return res.json({ results: [] });
  }

  const results: any[] = [];

  // 1. Comprehensive Database of Project Posters & Interests from Internet
  const internetProjectPosters = [
    {
      id: 'poster_cinema_1',
      type: 'poster',
      category: 'Cinematografi & Audio-Visual',
      title: 'Film Dokumenter Kedaulatan Budaya Nusantara & IKN',
      subtitle: 'SKKNI M.591110.001.01 | Production 4K/6K',
      description: 'Dokumenter sinematik panjang festival internasional dengan kamera ARRI Alexa Mini & lensa anamorphic.',
      imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
      targetTab: 'workvary',
      sectorKey: 'cinematography',
      badge: 'PROYEK FILM',
      tools: ['ARRI Alexa', 'Cooke Anamorphic', 'DaVinci Resolve'],
      tags: ['cinematografi', 'film', 'kamera', 'dokumenter', 'audio-visual', 'sinema', 'video']
    },
    {
      id: 'poster_cinema_2',
      type: 'poster',
      category: 'Cinematografi Komersial',
      title: 'Iklan TVC Bangga Buatan Indonesia High-Speed 1000fps',
      subtitle: 'SKKNI M.591110.004.01 | Commercial Production',
      description: 'Iklan televisi sinematik kecepatan tinggi untuk promosi destinasi wisata super prioritas.',
      imageUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?auto=format&fit=crop&w=600&q=80',
      targetTab: 'workvary',
      sectorKey: 'cinematography',
      badge: 'PROYEK TVC',
      tools: ['RED Komodo 6K', 'Gimbal Ronin 2', 'Aputure Nova'],
      tags: ['cinematografi', 'tvc', 'iklan', 'kamera', 'shooting', 'lighting']
    },
    {
      id: 'poster_cinema_3',
      type: 'poster',
      category: 'Virtual Production & VFX',
      title: 'Studio Virtual LED Stage & Real-Time Unreal Engine 5',
      subtitle: 'SKKNI M.591110.008.01 | Next-Gen Cinema',
      description: 'Integrasi panggung studio layar LED latar nyata dengan background 3D Unreal Engine 5.',
      imageUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
      targetTab: 'workvary',
      sectorKey: 'cinematography',
      badge: 'VIRTUAL PROD',
      tools: ['Unreal Engine 5', 'Mo-Sys Tracking', 'Blackmagic URSA'],
      tags: ['cinematografi', 'virtual production', 'vfx', '3d', 'unreal engine', 'led wall']
    },
    {
      id: 'poster_cinema_4',
      type: 'poster',
      category: 'Color Grading & Pascaproduksi',
      title: 'Master Color Grading & Finishing Film Layar Lebar',
      subtitle: 'SKKNI M.591110.012.01 | DaVinci Resolve Studio',
      description: 'Penataan warna moods sinematik tinggi, kurva kontras tinggi, dan skin tone alami film nasional.',
      imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
      targetTab: 'workvary',
      sectorKey: 'cinematography',
      badge: 'PASCA PRODUKSI',
      tools: ['DaVinci Resolve Studio', 'Sony FX6', 'Colorist Deck'],
      tags: ['cinematografi', 'color grading', 'editing', 'davinci', 'pascaproduksi', 'video']
    },
    {
      id: 'poster_cyber_1',
      type: 'poster',
      category: 'Keamanan Siber & SOC',
      title: 'National Security Operations Center (SOC) Command Center',
      subtitle: 'SKKNI J.620900.001.01 | Real-Time Monitoring',
      description: 'Audit dan deteksi ancaman siber secara real-time pada infrastruktur kritis instansi pemerintah.',
      imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
      targetTab: 'workvary',
      sectorKey: 'cybersec',
      badge: 'CYBER SOC',
      tools: ['Splunk SIEM', 'Palo Alto', 'Python Threat Intel'],
      tags: ['cybersecurity', 'keamanan siber', 'soc', 'hacking', 'threat', 'bssn', 'network']
    },
    {
      id: 'poster_cyber_2',
      type: 'poster',
      category: 'Ethical Hacking & Pentest',
      title: 'Red Team Ethical Hacking & Penetration Testing',
      subtitle: 'SKKNI J.620900.005.01 | RedTeam Security',
      description: 'Simulasi serangan siber terkendali untuk menguji ketahanan aplikasi kementerian.',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      targetTab: 'workvary',
      sectorKey: 'cybersec',
      badge: 'RED TEAM',
      tools: ['Kali Linux', 'Burp Suite Pro', 'Cobalt Strike'],
      tags: ['cybersecurity', 'ethical hacking', 'pentest', 'red team', 'kali linux', 'security']
    },
    {
      id: 'poster_ai_1',
      type: 'poster',
      category: 'Artificial Intelligence & Data',
      title: 'AI Forecasting & Prediksi Beban Pelayanan Publik',
      subtitle: 'SKKNI J.620100.012.01 | Machine Learning',
      description: 'Prediksi lonjakan permintaan pelayanan publik nasional menggunakan model XGBoost & LSTM.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      targetTab: 'workvary',
      sectorKey: 'data-ai',
      badge: 'AI & DATA',
      tools: ['Python', 'XGBoost', 'PowerBI', 'BigQuery'],
      tags: ['ai', 'data science', 'machine learning', 'python', 'analytics', 'forecasting']
    },
    {
      id: 'poster_ai_2',
      type: 'poster',
      category: 'Generative AI & LLM',
      title: 'NLP Chatbot Asisten Hukum & Regulasi Pemerintah (Gemini RAG)',
      subtitle: 'SKKNI J.620100.015.01 | GenAI Assistant',
      description: 'RAG Pipeline berbasis LLM Gemini untuk konsultasi cepat pasal-pasal peraturan daerah.',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
      targetTab: 'consultant',
      sectorKey: 'data-ai',
      badge: 'GEN AI',
      tools: ['Gemini API', 'Pinecone VectorDB', 'LangChain'],
      tags: ['ai', 'generative ai', 'gemini', 'llm', 'rag', 'nlp', 'chatbot']
    },
    {
      id: 'poster_cloud_1',
      type: 'poster',
      category: 'Cloud & Infrastructure',
      title: 'Arsitektur Multi-Cloud Pusat Data Nasional 2026',
      subtitle: 'SKKNI J.620200.003.01 | High-Availability Cluster',
      description: 'Klaster Kubernetes High-Availability dengan zero-downtime deployment untuk 100+ aplikasi kementerian.',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80',
      targetTab: 'workvary',
      sectorKey: 'cloud-infra',
      badge: 'CLOUD DATA',
      tools: ['Kubernetes', 'Terraform', 'Google Cloud', 'Grafana'],
      tags: ['cloud', 'kubernetes', 'terraform', 'aws', 'gcp', 'devops', 'infrastructure']
    },
    {
      id: 'poster_soft_1',
      type: 'poster',
      category: 'Software Engineering',
      title: 'SuperApp Portal Layanan Terpadu Warga Digital',
      subtitle: 'SKKNI J.620100.004.01 | Enterprise App',
      description: 'Aplikasi seluler terpadu untuk pengurusan administrasi kependudukan cepat & transparan.',
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80',
      targetTab: 'workvary',
      sectorKey: 'software-eng',
      badge: 'SUPERAPP',
      tools: ['Flutter', 'Node.js', 'Redis', 'PostgreSQL'],
      tags: ['software', 'mobile', 'flutter', 'react', 'web', 'app', 'developer', 'coding']
    },
    {
      id: 'poster_uiux_1',
      type: 'poster',
      category: 'UI/UX Design',
      title: 'Design System Layanan Digital Pemerintah (Garuda UI)',
      subtitle: 'SKKNI M.741000.002.01 | Accessibility WCAG 2.1',
      description: 'Sistem komponen UI terstandarisasi untuk aksesibilitas WCAG 2.1 AA di seluruh situs daerah.',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
      targetTab: 'workvary',
      sectorKey: 'ui-ux',
      badge: 'UI/UX DESIGN',
      tools: ['Figma', 'Tokens Studio', 'Storybook'],
      tags: ['ui', 'ux', 'design', 'figma', 'prototype', 'antarmuka', 'garuda ui']
    },
    {
      id: 'poster_game_1',
      type: 'poster',
      category: 'Game Dev & VR',
      title: 'Virtual Reality Tour Candi Borobudur & Candi Prambanan',
      subtitle: 'SKKNI J.620100.020.01 | Photorealistic VR',
      description: 'Simulasi interaktif kembara sejarah Nusantara berbasis headset VR dengan grafis Unreal Engine 5.',
      imageUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80',
      targetTab: 'workvary',
      sectorKey: 'game-vr',
      badge: 'VR & GAME',
      tools: ['Unreal Engine 5', 'Blender 3D', 'Meta Quest 3'],
      tags: ['game', 'vr', 'virtual reality', 'unreal engine', 'unity', '3d', 'borobudur']
    }
  ];

  // Match Project Posters first
  internetProjectPosters.forEach((poster) => {
    const isMatched =
      poster.title.toLowerCase().includes(query) ||
      poster.category.toLowerCase().includes(query) ||
      poster.description.toLowerCase().includes(query) ||
      poster.tools.some((t) => t.toLowerCase().includes(query)) ||
      poster.tags.some((tg) => tg.toLowerCase().includes(query));

    if (isMatched) {
      results.push({
        id: poster.id,
        type: poster.type,
        category: poster.category,
        title: poster.title,
        subtitle: poster.subtitle,
        description: poster.description,
        targetTab: poster.targetTab,
        sectorKey: poster.sectorKey,
        badge: poster.badge,
        imageUrl: poster.imageUrl,
        tools: poster.tools
      });
    }
  });

  // 2. Search in SKKNI Career Sectors
  const sectorImageMap: Record<string, string> = {
    cinematography: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
    cybersec: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    'data-ai': 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    'cloud-infra': 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80',
    'smart-city': 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80',
    'software-eng': 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    'ui-ux': 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80',
    'game-vr': 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80'
  };

  Object.entries(currentConfig.careerPool).forEach(([key, sector]) => {
    if (
      sector.name.toLowerCase().includes(query) ||
      sector.skkniCode.toLowerCase().includes(query) ||
      sector.desc.toLowerCase().includes(query) ||
      sector.topSkills.some((s) => s.toLowerCase().includes(query)) ||
      sector.steps.some((st) => st.toLowerCase().includes(query))
    ) {
      results.push({
        id: `sector_${key}`,
        type: 'skkni',
        category: 'Sektor Kompetensi SKKNI',
        title: sector.name,
        subtitle: `Acuan: ${sector.skkniCode} | Provider: ${sector.lspProvider}`,
        description: sector.desc,
        targetTab: 'evaluator',
        sectorKey: key,
        badge: 'SEKTOR SKKNI',
        imageUrl: sectorImageMap[key] || sectorImageMap.cinematography,
        tools: sector.topSkills.slice(0, 3)
      });
    }
  });

  // 3. Search in DTS Training Programs & Modules
  const dtsModules = [
    { title: 'Fresh Graduate Academy (FGA) - Cinematography & Video Editing 4K', cat: 'Modul Beasiswa Kominfo', tab: 'workvary', sectorKey: 'cinematography', img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80' },
    { title: 'Fresh Graduate Academy (FGA) - Cybersecurity Defensive Specialist', cat: 'Modul Beasiswa Kominfo', tab: 'evaluator', sectorKey: 'cybersec', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80' },
    { title: 'Vocational School Graduate Academy (VSGA) - Machine Learning & AI Engineering', cat: 'Modul Beasiswa Kominfo', tab: 'evaluator', sectorKey: 'data-ai', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80' },
    { title: 'Professional Academy (DTS) - AWS & GCP Cloud Architecture', cat: 'Modul Beasiswa Kominfo', tab: 'evaluator', sectorKey: 'cloud-infra', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80' },
    { title: 'Digital Leadership Academy (DLA) - Governance & BSSN Compliance', cat: 'Modul Beasiswa Kominfo', tab: 'evaluator', sectorKey: 'cybersec', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80' },
    { title: 'Uji Kompetensi BNSP - Sertifikasi Ahli Utama Software Engineering', cat: 'Sertifikasi Profesi LSP', tab: 'evaluator', sectorKey: 'software-eng', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80' }
  ];

  dtsModules.forEach((m, idx) => {
    if (m.title.toLowerCase().includes(query) || m.cat.toLowerCase().includes(query)) {
      results.push({
        id: `dts_${idx}`,
        type: 'module',
        category: m.cat,
        title: m.title,
        subtitle: 'Program Beasiswa Digital Talent Scholarship (DTS) Kominfo RI',
        description: 'Modul pelatihan standar nasional terakreditasi Kemkomdigi & BNSP.',
        targetTab: m.tab,
        sectorKey: m.sectorKey,
        badge: 'BEASISWA DTS',
        imageUrl: m.img
      });
    }
  });

  // 4. Dynamic Contextual Fallback for any user query if no exact result matched
  if (results.length === 0) {
    const queryCapitalized = query.charAt(0).toUpperCase() + query.slice(1);
    
    // Choose relevant image topic according to query keywords
    let dynamicImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80';
    let targetSector = 'cinematography';
    
    if (query.includes('foto') || query.includes('kamera') || query.includes('video') || query.includes('film') || query.includes('cinema')) {
      dynamicImage = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80';
      targetSector = 'cinematography';
    } else if (query.includes('sec') || query.includes('hack') || query.includes('cyber') || query.includes('siber')) {
      dynamicImage = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80';
      targetSector = 'cybersec';
    } else if (query.includes('ai') || query.includes('data') || query.includes('python')) {
      dynamicImage = 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80';
      targetSector = 'data-ai';
    } else if (query.includes('design') || query.includes('ui') || query.includes('ux') || query.includes('figma')) {
      dynamicImage = 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80';
      targetSector = 'ui-ux';
    } else if (query.includes('game') || query.includes('vr') || query.includes('3d')) {
      dynamicImage = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80';
      targetSector = 'game-vr';
    }

    results.push({
      id: `dynamic_${Date.now()}_1`,
      type: 'poster',
      category: `Minat & Kompetensi Internet: ${queryCapitalized}`,
      title: `Modul & Portofolio Karya Digital (${queryCapitalized})`,
      subtitle: `Hasil Pencarian Internet Terintegrasi Satu Data Kominfo`,
      description: `Eksplorasi sertifikasi SKKNI, poster proyek internet, dan modul kompetensi digital untuk kata kunci "${query}".`,
      targetTab: 'workvary',
      sectorKey: targetSector,
      badge: 'PROYEK INTERNET',
      imageUrl: dynamicImage,
      tools: [queryCapitalized, 'SKKNI 2026', 'BNSP Certification']
    });

    results.push({
      id: `dynamic_${Date.now()}_2`,
      type: 'skkni',
      category: `Konsultasi AI Copilot: ${queryCapitalized}`,
      title: `Panduan Roadmap & Sertifikasi Karir (${queryCapitalized})`,
      subtitle: `Analisis AI Real-time untuk Minat ${queryCapitalized}`,
      description: `Tanyakan langsung kepada AI Konsultan Nasional mengenai standar gaji, proyeksi industri, dan modul pelatihan untuk ${queryCapitalized}.`,
      targetTab: 'consultant',
      sectorKey: targetSector,
      badge: 'AI COPILOT',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
      tools: ['Gemini 3.6 Flash', 'SKKNI Evaluator']
    });
  }

  return res.json({ results });
});

// EVALUATIONS DATABASE ENDPOINTS
app.get('/api/evaluations', (req, res) => {
  const { userId } = req.query;
  const db = loadDb();
  if (userId) {
    const userEvals = db.evaluations.filter((e: any) => e.userId === userId);
    return res.json({ evaluations: userEvals });
  }
  return res.json({ evaluations: db.evaluations });
});

app.post('/api/evaluations', (req, res) => {
  const { userId, evaluation } = req.body;
  if (!evaluation) {
    return res.status(400).json({ error: 'Data evaluasi tidak lengkap.' });
  }

  const db = loadDb();
  const newRecord = {
    id: `eval_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    userId: userId || 'guest',
    ...evaluation,
    savedAt: new Date().toISOString()
  };

  db.evaluations.unshift(newRecord);
  saveDb(db);

  return res.json({ success: true, savedRecord: newRecord });
});

app.delete('/api/evaluations/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDb();
  db.evaluations = db.evaluations.filter((e: any) => e.id !== id);
  saveDb(db);
  return res.json({ success: true });
});

// GET Portal Configuration
app.get('/api/config', (req, res) => {
  res.json(currentConfig);
});

// POST Portal Configuration (Operator Panel Update)
app.post('/api/config', (req, res) => {
  const { siteTitle, subTitle, announcements, passcode } = req.body;
  if (passcode !== OPERATOR_PASSCODE) {
    return res.status(401).json({ error: 'Kode Otentikasi Operator tidak valid' });
  }

  if (siteTitle) currentConfig.siteTitle = siteTitle;
  if (subTitle) currentConfig.subTitle = subTitle;
  if (announcements) currentConfig.announcements = announcements;

  return res.json({ success: true, config: currentConfig });
});

// POST AI Consultant Chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Pesan tidak boleh kosong' });
    }

    const ai = getGenAIClient();
    if (!ai) {
      // Fallback response if API Key is not set yet
      return res.json({
        reply: "Sistem AI Konsultan berjalan dalam mode standar. Untuk analisis lengkap berbasis AI real-time, pastikan Kunci API Gemini telah terkonfigurasi. Berdasarkan basis data SATU DATA Kominfo, program sertifikasi SKKNI dan Digital Talent Scholarship (DTS) dapat diakses melalui portal resmi Kemenkominfo.",
        source: 'system-fallback'
      });
    }

    const systemInstruction = `Anda adalah "AI Konsultan Nasional SATU DATA SDM Digital", asisten AI resmi dari Kementerian Komunikasi dan Digital Republik Indonesia (Kominfo RI), bekerja sama dengan Bappenas, Kemnaker, dan BSSN.

Tugas Anda:
1. Memberikan jawaban yang sangat profesional, sopan, berwibawa, dan informatif mengenai:
   - Standar Kompetensi Kerja Nasional Indonesia (SKKNI) di bidang ICT/Digital.
   - Sertifikasi Profesi Lembaga Sertifikasi Profesi (LSP) & BNSP / BSSN.
   - Program Beasiswa Digital Talent Scholarship (DTS) Kominfo.
   - Proyeksi kebutuhan tenaga kerja digital nasional menuju Indonesia Emas 2045.
   - Penyelarasan karir ASN/Pemerintahan, Swasta, BUMN, dan Lulusan Baru.
2. Gaya bahasa harus menggunakan Bahasa Indonesia formal, komunikatif, dan terstruktur dengan poin-poin yang mudah dipahami.
3. Sertakan referensi regulasi atau lembaga terkait secara tepat (seperti Kominfo, BSSN, BNSP, LSP, Bappenas, Kemnaker).`;

    // Construct message history
    let contents = message;
    if (history && Array.isArray(history) && history.length > 0) {
      const formattedHistory = history.map(item => `${item.role === 'user' ? 'Masyarakat' : 'Konsultan AI'}: ${item.text}`).join('\n');
      contents = `Riwayat Diskusi:\n${formattedHistory}\n\nPertanyaan Baru Masyarakat:\n${message}`;
    }

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text || "Permohonan maaf, sistem tidak dapat memproses jawaban saat ini. Silakan coba beberapa saat lagi.";
    return res.json({ reply, source: GEMINI_MODEL });

  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return res.status(500).json({
      error: "Gagal terhubung dengan layanan AI Konsultan",
      details: error?.message || String(error)
    });
  }
});

// POST Evaluate Career Roadmap
app.post('/api/evaluate-career', async (req, res) => {
  try {
    const { name, sectorKey, employmentStatus, competencyLevel } = req.body;
    const sectorData = currentConfig.careerPool[sectorKey] || Object.values(currentConfig.careerPool)[0];

    const ai = getGenAIClient();
    if (!ai) {
      // Offline calculated fallback
      return res.json({
        candidateName: name || "Peserta",
        sector: sectorData.name,
        employmentStatus: employmentStatus || "Masyarakat Umum",
        skkniLevel: sectorData.skkniCode,
        recommendedRole: `${sectorData.name} - Grade Utama (Rekomendasi Nasional)`,
        salaryRange: `Rp ${sectorData.avgSalaryMin.toFixed(1)} Juta - Rp ${sectorData.avgSalaryMax.toFixed(1)} Juta / bulan`,
        matchScore: 88,
        timelineSteps: [
          {
            stage: "TAHAP 1: Pondasi Kompetensi Dasar",
            title: sectorData.steps[0] || "Level Dasar SKKNI",
            description: "Penguasaan prinsip teknis awal dan regulasi standar nasional.",
            certRequired: "Sertifikasi SKKNI Tingkat Dasar",
            duration: "1-3 Bulan"
          },
          {
            stage: "TAHAP 2: Sertifikasi Profesi Unggulan",
            title: sectorData.steps[1] || "Level Menengah & Spesialis",
            description: "Uji kompetensi terakreditasi LSP / BNSP dan praktik proyek nyata.",
            certRequired: `Sertifikasi Terakreditasi ${sectorData.lspProvider}`,
            duration: "3-6 Bulan"
          },
          {
            stage: "TAHAP 3: Kepemimpinan & Pengelolaan Strategis",
            title: sectorData.steps[2] || "Level Manajerial Strategis",
            description: "Keterampilan manajerial dan kepemimpinan transformasi digital.",
            certRequired: "Sertifikasi Ahli Utama BNSP",
            duration: "6-12 Bulan"
          }
        ],
        skillGaps: sectorData.topSkills.slice(0, 3),
        suggestedCourses: [
          `Akademi Fresh Graduate / Professional Academy Digitalent (${sectorData.name})`,
          `Uji Kompetensi Nasional LSP BNSP Terkait`,
          `Modul Pelatihan Tata Kelola Data & Keamanan Informasi`
        ],
        aiAnalysisText: `Berdasarkan kualifikasi ${name || 'Peserta'} pada sektor ${sectorData.name}, profil Anda memiliki kesesuaian sebesar 88% dengan standar kebutuhan industri dan instansi pemerintah tahun 2026. Disarankan mengambil jalur beasiswa Digitalent Kominfo untuk mempercepat perolehan sertifikasi LSP.`
      });
    }

    const prompt = `Lakukan evaluasi terperinci untuk peserta roadmap kompetensi digital nasional berikut:
- Nama Peserta: ${name || 'Peserta'}
- Sektor Target: ${sectorData.name} (${sectorData.skkniCode})
- Status Kerja: ${employmentStatus || 'Masyarakat Umum'}
- Tingkat Pengalaman Saat Ini: ${competencyLevel || 'Pemula / Intermediate'}

Buat analisis dalam bentuk JSON dengan format persis berikut:
{
  "candidateName": "${name || 'Peserta'}",
  "sector": "${sectorData.name}",
  "employmentStatus": "${employmentStatus || 'Masyarakat Umum'}",
  "skkniLevel": "${sectorData.skkniCode}",
  "recommendedRole": "Judul Posisi Rekomendasi Resmi",
  "salaryRange": "Rp X Juta - Rp Y Juta / bulan",
  "matchScore": 88,
  "timelineSteps": [
    {
      "stage": "TAHAP 1: [Nama Tahap]",
      "title": "[Judul Modul/Kompetensi]",
      "description": "[Deskripsi singkat perbaikan skill]",
      "certRequired": "[Nama Sertifikasi LSP/BNSP/Vendor]",
      "duration": "[1-3 Bulan]"
    },
    {
      "stage": "TAHAP 2: [Nama Tahap]",
      "title": "[Judul Modul/Kompetensi]",
      "description": "[Deskripsi singkat]",
      "certRequired": "[Nama Sertifikasi]",
      "duration": "[3-6 Bulan]"
    },
    {
      "stage": "TAHAP 3: [Nama Tahap]",
      "title": "[Judul Modul/Kompetensi]",
      "description": "[Deskripsi singkat]",
      "certRequired": "[Nama Sertifikasi]",
      "duration": "[6-12 Bulan]"
    }
  ],
  "skillGaps": ["Skill 1", "Skill 2", "Skill 3"],
  "suggestedCourses": ["Nama Program Beasiswa Kominfo/DTS 1", "Nama Program 2"],
  "aiAnalysisText": "[Paragraf evaluasi resmi dari Kominfo RI tentang kesiapan karir peserta]"
}`;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      }
    });

    if (response.text) {
      try {
        const parsed = JSON.parse(response.text.trim());
        return res.json(parsed);
      } catch (parseErr) {
        console.error("JSON parse error from Gemini evaluation:", parseErr);
      }
    }

    // Fallback if JSON generation fails
    return res.json({
      candidateName: name || "Peserta",
      sector: sectorData.name,
      employmentStatus: employmentStatus || "Masyarakat Umum",
      skkniLevel: sectorData.skkniCode,
      recommendedRole: `${sectorData.name} - Ahli Madya (Kominfo SKKNI)`,
      salaryRange: `Rp ${sectorData.avgSalaryMin} Juta - Rp ${sectorData.avgSalaryMax} Juta / bulan`,
      matchScore: 85,
      timelineSteps: sectorData.steps.map((s, idx) => ({
        stage: `TAHAP ${idx + 1}`,
        title: s,
        description: `Modul pelatihan dan uji kompetensi tingkat ${idx + 1}`,
        certRequired: sectorData.lspProvider,
        duration: `${(idx + 1) * 3} Bulan`
      })),
      skillGaps: sectorData.topSkills,
      suggestedCourses: ["Digital Talent Scholarship (DTS) Kominfo 2026", "Pelatihan LSP BNSP"],
      aiAnalysisText: `Rekomendasi karir disesuaikan dengan Standar Kompetensi Kerja Nasional Indonesia (SKKNI).`
    });

  } catch (err: any) {
    console.error("Error evaluating career:", err);
    return res.status(500).json({ error: "Gagal memproses evaluasi karir" });
  }
});

export default app;
