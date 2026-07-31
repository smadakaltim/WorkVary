# WorkVary — Vercel Ready

Versi ini telah disesuaikan untuk Vercel:

- frontend React/Vite dibangun ke folder `dist`;
- backend Express dijalankan sebagai Vercel Function melalui `api/[...path].ts`;
- Gemini API key dibaca dari Environment Variables Vercel;
- server tidak lagi menulis ke filesystem Vercel.

Lihat `DEPLOY_VERCEL.md` untuk langkah deployment.

## Menjalankan secara lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`.

## Catatan database

Registrasi, riwayat evaluasi, dan perubahan panel operator saat ini memakai memori sementara agar demo dapat berjalan di Vercel. Data dapat kembali ke data awal ketika Function mengalami cold start atau saat deployment baru. Untuk penyimpanan permanen, hubungkan Supabase, Neon, atau database lain.
