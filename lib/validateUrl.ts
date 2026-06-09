const MAX_URL_LENGTH = 2048;

export interface ValidUrl {
  valid: true;
  url: string;
}

export interface InvalidUrl {
  valid: false;
  message: string;
}

export type UrlValidationResult = ValidUrl | InvalidUrl;

export function validateUrl(input: string): UrlValidationResult {
  const trimmed = input.trim();

  if (!trimmed) {
    return { valid: false, message: 'Please add a link' };
  }

  if (trimmed.length > MAX_URL_LENGTH) {
    return { valid: false, message: 'URL is too long' };
  }

  try {
    const normalized = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(normalized);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return { valid: false, message: 'Only HTTP and HTTPS links are supported' };
    }

    return { valid: true, url: url.href };
  } catch {
    return { valid: false, message: 'Please enter a valid URL' };
  }
}
