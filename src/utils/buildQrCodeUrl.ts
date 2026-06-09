const QR_API_ORIGIN = 'https://quickchart.io';

interface QrCodeOptions {
  size?: number;
  margin?: number;
  dark?: string;
  light?: string;
  ecLevel?: 'L' | 'M' | 'Q' | 'H';
  format?: 'png' | 'svg' | 'base64';
}

const DEFAULT_OPTIONS: Required<QrCodeOptions> = {
  size: 220,
  margin: 2,
  dark: '34313D',
  light: 'ffffff',
  ecLevel: 'M',
  format: 'png',
};

export function buildQrCodeUrl(text: string, options: QrCodeOptions = {}): string {
  const { size, margin, dark, light, ecLevel, format } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const params = new URLSearchParams({
    text,
    size: String(size),
    margin: String(margin),
    dark,
    light,
    ecLevel,
    format,
  });

  return `${QR_API_ORIGIN}/qr?${params.toString()}`;
}
