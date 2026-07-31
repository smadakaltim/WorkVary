export interface ProjectPoster {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description: string;
  tools: string[];
  skkniUnit?: string;
  likesCount?: number;
}

export interface SectorInfo {
  id: string;
  name: string;
  desc: string;
  steps: string[];
  skkniCode: string;
  demandHistory: number[]; // 2022, 2023, 2024, 2025, 2026
  avgSalaryMin: number; // in millions IDR
  avgSalaryMax: number;
  lspProvider: string;
  topSkills: string[];
  bannerImage?: string;
  projectPosters?: ProjectPoster[];
  equipmentAndTools?: string[];
}

export interface MacroStats {
  transformationRate: number; // e.g. 89.2
  digitalJobDemand: string; // e.g. "2.4M Posisi"
  competencyIndex: number; // e.g. 68.4
  certifiedTalents: string; // e.g. "412.500+"
  lastUpdated: string;
}

export interface Announcement {
  id: string;
  icon: string;
  title: string;
  date: string;
  urgent?: boolean;
}

export interface PortalConfig {
  siteTitle: string;
  subTitle: string;
  macroStats: MacroStats;
  announcements: Announcement[];
  careerPool: Record<string, SectorInfo>;
}

export interface CareerEvaluationResult {
  candidateName: string;
  sector: string;
  employmentStatus: string;
  skkniLevel: string;
  recommendedRole: string;
  salaryRange: string;
  matchScore: number;
  timelineSteps: {
    stage: string;
    title: string;
    description: string;
    certRequired: string;
    duration: string;
  }[];
  skillGaps: string[];
  suggestedCourses: string[];
  aiAnalysisText: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isAiGenerated?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  nik?: string;
  role: string;
  institution?: string;
  createdAt?: string;
}

