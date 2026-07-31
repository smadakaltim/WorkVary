import app from '../backend/app';

/**
 * Single, stable Vercel Function entry point.
 *
 * Frontend requests use: /api?route=auth/login
 * This adapter restores the original Express path: /api/auth/login
 * so all existing Express handlers can be reused without catch-all routing.
 */
export default function handler(req: any, res: any) {
  const originalUrl = req.url || '/api';
  const parsed = new URL(originalUrl, 'http://localhost');
  const route = (parsed.searchParams.get('route') || 'health')
    .replace(/^\/+/, '')
    .replace(/\.\./g, '');

  parsed.searchParams.delete('route');
  const remainingQuery = parsed.searchParams.toString();

  req.url = `/api/${route}${remainingQuery ? `?${remainingQuery}` : ''}`;
  return app(req, res);
}
