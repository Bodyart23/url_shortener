import { useMemo, useState, type FormEvent } from 'react';
import type { ShortLink } from '../../types';
import { buildQrCodeUrl } from '../../utils/buildQrCodeUrl';
import { validateUrl } from '../../utils/validateUrl';
import styles from './QrGenerator.module.css';

interface QrGeneratorProps {
  links: ShortLink[];
}

function QrGenerator({ links }: QrGeneratorProps) {
  const [url, setUrl] = useState('');
  const [activeUrl, setActiveUrl] = useState('');
  const [error, setError] = useState('');
  const [imageError, setImageError] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const qrImageUrl = useMemo(
    () => (activeUrl ? buildQrCodeUrl(activeUrl) : ''),
    [activeUrl],
  );

  const generateQr = (value: string) => {
    const result = validateUrl(value);

    if (!result.valid) {
      setError(result.message);
      return;
    }

    setError('');
    setImageError(false);
    setDownloadError('');
    setActiveUrl(result.url);
    setUrl(result.url);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    generateQr(url);
  };

  const handleDownload = async () => {
    if (!activeUrl || isDownloading) return;

    setDownloadError('');
    setIsDownloading(true);

    try {
      const { downloadQrCodePdf } = await import('../../utils/downloadQrCodePdf');
      await downloadQrCodePdf(activeUrl);
    } catch {
      setDownloadError('Unable to download the PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section
      id="qr-generator"
      className={styles.section}
      aria-labelledby="qr-generator-heading"
    >
      <div className="container">
        <header className={styles.header}>
          <h2 id="qr-generator-heading" className={styles.heading}>
            QR codes for your links
          </h2>
          <p className={styles.description}>
            Generate a scannable QR code for any URL — or pick a link you have
            already shortened with Shortly — then download it as a PDF.
          </p>
        </header>

        <div className={styles.panel}>
          <div className={styles.controls}>
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <label htmlFor="qr-url-input" className={styles.label}>
                URL for your QR code
              </label>

              <div className={styles.inputRow}>
                <input
                  id="qr-url-input"
                  type="url"
                  name="url"
                  value={url}
                  placeholder="Paste a Shortly link or any URL..."
                  className={`${styles.input} ${error ? styles.inputError : ''}`}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'qr-url-error' : undefined}
                  onChange={(event) => {
                    setUrl(event.target.value);
                    if (error) setError('');
                  }}
                />

                <button type="submit" className={`btn btn--primary ${styles.submit}`}>
                  Generate QR
                </button>
              </div>

              {error && (
                <p id="qr-url-error" className={styles.error} role="alert">
                  {error}
                </p>
              )}
            </form>

            {links.length > 0 && (
              <div className={styles.recent}>
                <h3 className={styles.recentTitle}>Create a QR from a Shortly link</h3>
                <ul
                  className={styles.recentList}
                  tabIndex={links.length > 5 ? 0 : undefined}
                >
                  {links.map((link) => (
                    <li key={link.id}>
                      <button
                        type="button"
                        className={styles.recentButton}
                        onClick={() => generateQr(link.shortUrl)}
                      >
                        <span className={styles.recentShort} title={link.shortUrl}>
                          {link.shortUrl}
                        </span>
                        <span className={styles.recentOriginal} title={link.originalUrl}>
                          {link.originalUrl}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={styles.preview} aria-live="polite">
            {activeUrl && !imageError ? (
              <>
                <img
                  src={qrImageUrl}
                  alt={`QR code for ${activeUrl}`}
                  width={220}
                  height={220}
                  className={styles.qrImage}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                />

                <p className={styles.activeUrl} title={activeUrl}>
                  {activeUrl}
                </p>

                {downloadError && (
                  <p className={styles.downloadError} role="alert">
                    {downloadError}
                  </p>
                )}

                <button
                  type="button"
                  className={`btn btn--primary ${styles.download}`}
                  onClick={handleDownload}
                  disabled={isDownloading}
                >
                  {isDownloading ? 'Preparing PDF...' : 'Download as PDF'}
                </button>
              </>
            ) : (
              <div className={styles.placeholder}>
                {imageError ? (
                  <p role="alert">
                    Unable to load the QR code. Please try again in a moment.
                  </p>
                ) : (
                  <p>Paste a URL or select a Shortly link to preview your QR code.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default QrGenerator;
