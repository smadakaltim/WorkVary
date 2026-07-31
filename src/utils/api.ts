export function apiUrl(route: string, params: Record<string, string | number | undefined> = {}): string {
  const search = new URLSearchParams({ route });

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      search.set(key, String(value));
    }
  }

  return `/api?${search.toString()}`;
}

export async function parseApiResponse<T = any>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') || '';
  const raw = await response.text();

  let data: any = null;
  if (raw) {
    if (contentType.includes('application/json')) {
      try {
        data = JSON.parse(raw);
      } catch {
        throw new Error('Server mengirim JSON yang rusak. Silakan deploy ulang versi terbaru.');
      }
    } else {
      // Vercel 404 pages and platform errors are commonly returned as text/html or text/plain.
      const compact = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      throw new Error(
        response.status === 404
          ? 'Endpoint backend tidak ditemukan. Pastikan file api/index.ts ikut terunggah, lalu Redeploy di Vercel.'
          : `Server tidak mengirim data JSON${compact ? `: ${compact.slice(0, 140)}` : '.'}`
      );
    }
  }

  if (!response.ok) {
    throw new Error(data?.error || `Permintaan gagal dengan status ${response.status}.`);
  }

  return data as T;
}
