import type { VercelRequest, VercelResponse } from '@vercel/node';
import { validateUrl } from '../lib/validateUrl';

const CLEANURI_ENDPOINT = 'https://cleanuri.com/api/v1/shorten';
const REQUEST_TIMEOUT_MS = 10_000;

interface CleanUriResponse {
  result_url?: string;
  error?: string;
}

function parseUrlFromBody(req: VercelRequest): string | undefined {
  if (typeof req.body === 'string') {
    return new URLSearchParams(req.body).get('url') ?? undefined;
  }

  if (req.body && typeof req.body === 'object' && 'url' in req.body) {
    const { url } = req.body as { url?: unknown };
    return typeof url === 'string' ? url : undefined;
  }

  return undefined;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const contentType = req.headers['content-type'] ?? '';
  if (!contentType.includes('application/x-www-form-urlencoded')) {
    return res.status(415).json({ error: 'Unsupported content type' });
  }

  const rawUrl = parseUrlFromBody(req);
  if (!rawUrl) {
    return res.status(400).json({ error: 'Please add a link' });
  }

  const validation = validateUrl(rawUrl);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.message });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    const response = await fetch(CLEANURI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ url: validation.url }).toString(),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return res
        .status(502)
        .json({ error: 'Shortly could not shorten this link. Please try again.' });
    }

    const data: CleanUriResponse = await response.json();

    if (data.error || !data.result_url) {
      return res
        .status(502)
        .json({ error: 'Shortly could not shorten this link. Please try again.' });
    }

    return res.status(200).json({ result_url: data.result_url });
  } catch {
    return res
      .status(502)
      .json({ error: 'Shortly could not shorten this link. Please try again.' });
  }
}
