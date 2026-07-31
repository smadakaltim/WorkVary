# Panduan Deploy WorkVary ke Vercel

## 1. Unggah proyek ke GitHub

1. Ekstrak ZIP.
2. Buat repository GitHub baru.
3. Unggah semua isi folder ini ke bagian paling atas repository.
4. Pastikan file `vercel.json`, folder `api`, folder `backend`, `src`, dan `package.json` terlihat di halaman utama repository.
5. Jangan unggah file `.env` atau `.env.local`.

## 2. Impor ke Vercel

1. Masuk ke Vercel.
2. Klik **Add New → Project**.
3. Pilih repository WorkVary.
4. Vercel seharusnya mendeteksi **Vite**.
5. Gunakan pengaturan berikut:

```text
Framework Preset : Vite
Root Directory   : ./
Build Command    : npm run build
Output Directory : dist
Install Command  : npm install
```

## 3. Tambahkan Environment Variables

Sebelum menekan Deploy, buka bagian **Environment Variables** dan tambahkan:

```text
GEMINI_API_KEY     = API key dari Google AI Studio
GEMINI_MODEL       = gemini-3.6-flash
OPERATOR_PASSCODE  = buat kode operator yang kuat
```

`GEMINI_API_KEY` wajib untuk fitur AI real-time. Tanpa key, aplikasi memakai respons fallback bawaan.

## 4. Deploy dan pengujian

Klik **Deploy**. Setelah selesai, tes:

```text
https://nama-proyek.vercel.app/api/health
```

Respons yang benar berisi `status: ok`. Lalu buka halaman utama dan tes login demo, pencarian, AI Consultant, dan Career Evaluator.

## 5. Bila API tidak ditemukan

Pastikan struktur repository bukan bertingkat seperti:

```text
repository/workvary-vercel-ready/package.json
```

Struktur yang benar adalah:

```text
repository/package.json
repository/vercel.json
repository/api/[...path].ts
repository/backend/app.ts
repository/src/...
```

Jika folder proyek memang berada di subfolder GitHub, isi **Root Directory** di Vercel dengan nama subfolder tersebut.

## 6. Redeploy setelah menambah API key

Masuk ke **Project → Settings → Environment Variables**, simpan variabel, kemudian buka **Deployments → Redeploy**.

## Batas penting versi demo

Vercel Functions tidak menyediakan filesystem permanen. Versi ini menyimpan registrasi, evaluasi, dan perubahan konfigurasi dalam memori Function. Data dapat hilang saat cold start, scaling, atau redeploy. Gunakan Supabase/Neon untuk data permanen. Jangan gunakan password contoh dan passcode bawaan untuk aplikasi produksi.
