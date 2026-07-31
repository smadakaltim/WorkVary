# Perbaikan Login WorkVary di Vercel

## Penyebab error

Versi sebelumnya memakai fungsi catch-all:

```text
api/[...path].ts
```

Pada deployment ini, permintaan seperti `/api/auth/login` tidak masuk ke Express dan Vercel mengembalikan halaman 404 berupa teks. Frontend lalu mencoba membaca teks tersebut sebagai JSON sehingga muncul:

```text
Unexpected token 'T', "The page c..." is not valid JSON
```

## Perbaikan yang diterapkan

- Mengganti catch-all dengan satu entry point resmi: `api/index.ts`.
- Semua frontend API mengarah ke `/api?route=...`.
- Adapter di `api/index.ts` meneruskan permintaan ke route Express asli.
- Menambahkan parser respons yang dapat menjelaskan error Vercel tanpa menampilkan error JSON mentah.

## Tes setelah deploy

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

Akun demo:

```text
triyono@komdigi.go.id
password123
```

atau:

```text
siti.rahmawati@gmail.com
password123
```
