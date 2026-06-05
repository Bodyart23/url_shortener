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

  if (!response.ok) {
    throw new Error('Unable to shorten the link. Please try again.');
  }

  const data: ShortenResponse = await response.json();

  if (data.error || !data.result_url) {
    throw new Error(data.error ?? 'Unable to shorten the link. Please try again.');
  }

  return data.result_url;
}
