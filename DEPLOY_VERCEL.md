# Deploy WorkVary ke Vercel — Versi Login Fixed

## Arsitektur

- Frontend React/Vite dibangun ke `dist`.
- Backend Express dijalankan melalui satu Vercel Function resmi: `api/index.ts`.
- Semua permintaan frontend menggunakan format `/api?route=...` agar tidak bergantung pada catch-all route.
- Akun demo memiliki fallback lokal sehingga dashboard tetap bisa dibuka untuk presentasi walaupun Vercel Function sedang bermasalah.

## Deployment baru

1. Unggah seluruh isi folder ini ke root repository GitHub.
2. Pastikan file berikut terlihat di root repository:
   - `package.json`
   - `vercel.json`
   - `api/index.ts`
   - `backend/app.ts`
   - `src/`
3. Di Vercel pilih **Add New → Project**, lalu Import repository.
4. Gunakan konfigurasi:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Root Directory: kosong atau `./`
5. Tambahkan Environment Variables:
   - `GEMINI_API_KEY` = API key Google AI Studio
   - `GEMINI_MODEL` = `gemini-3.6-flash`
   - `OPERATOR_PASSCODE` = kode operator pilihan Anda
6. Klik **Deploy**.

## Memperbarui deployment yang sudah ada

1. Hapus file lama `api/[...path].ts` dari GitHub.
2. Unggah/replace seluruh file dari versi fixed ini.
3. Commit perubahan.
4. Vercel biasanya redeploy otomatis.
5. Bila belum, buka **Vercel → Deployments → Redeploy**.

## Tes backend

Buka:

```text
https://DOMAIN-ANDA.vercel.app/api?route=health
```

Respons yang benar:

```json
{
  "status": "ok",
  "service": "WorkVary Backend",
  "storageMode": "ephemeral-demo"
}
```

## Akun uji coba

ASN:

```text
Email: triyono@komdigi.go.id
Password: password123
```

Masyarakat:

```text
Email: siti.rahmawati@gmail.com
Password: password123
```

Klik kartu demo untuk mengisi formulir, lalu klik tombol **Masuk ke Dasbor Portal**.
