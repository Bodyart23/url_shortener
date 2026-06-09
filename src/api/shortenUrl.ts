interface ShortenResponse {
  result_url?: string;
  error?: string;
}

const SHORTEN_ENDPOINT = '/api/shorten';

export async function shortenUrl(url: string): Promise<string> {
  const response = await fetch(SHORTEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ url: url.trim() }).toString(),
  });

  let data: ShortenResponse = {};

  try {
    data = await response.json();
  } catch {
    throw new Error('Shortly could not shorten this link. Please try again.');
  }

  if (!response.ok || data.error || !data.result_url) {
    throw new Error(data.error ?? 'Shortly could not shorten this link. Please try again.');
  }

  return data.result_url;
}
