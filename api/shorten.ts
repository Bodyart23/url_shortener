import { validateUrl } from '../lib/validateUrl';

export const config = {
  runtime: 'edge',
};

const CLEANURI_ENDPOINT = 'https://cleanuri.com/api/v1/shorten';
const REQUEST_TIMEOUT_MS = 10_000;

interface CleanUriResponse {
  result_url?: string;
  error?: string;
}

function json(status: number, body: unknown, headers?: HeadersInit): Response {
  return Response.json(body, { status, headers });
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  if (request.method !== 'POST') {
    return json(405, { error: 'Method not allowed' }, { Allow: 'POST' });
  }

  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.includes('application/x-www-form-urlencoded')) {
    return json(415, { error: 'Unsupported content type' });
  }

  let rawUrl: string | undefined;

  try {
    const rawBody = await request.text();
    rawUrl = new URLSearchParams(rawBody).get('url') ?? undefined;
  } catch {
    return json(400, { error: 'Please add a link' });
  }

  if (!rawUrl) {
    return json(400, { error: 'Please add a link' });
  }

  const validation = validateUrl(rawUrl);
  if (!validation.valid) {
    return json(400, { error: validation.message });
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
      return json(502, {
        error: 'Shortly could not shorten this link. Please try again.',
      });
    }

    const data = (await response.json()) as CleanUriResponse;

    if (data.error || !data.result_url) {
      return json(502, {
        error: 'Shortly could not shorten this link. Please try again.',
      });
    }

    return json(200, { result_url: data.result_url });
  } catch {
    return json(502, {
      error: 'Shortly could not shorten this link. Please try again.',
    });
  }
}
