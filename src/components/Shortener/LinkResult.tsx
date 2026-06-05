import { useState } from 'react';
import type { ShortLink } from '../../types';
import styles from './LinkResult.module.css';

interface LinkResultProps {
  link: ShortLink;
}

function LinkResult({ link }: LinkResultProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link.shortUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <li className={styles.card}>
      <p className={styles.original}>{link.originalUrl}</p>

      <div className={styles.actions}>
        <a
          href={link.shortUrl}
          className={styles.short}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.shortUrl}
        </a>

        <button
          type="button"
          className={`btn ${copied ? 'btn--copied' : 'btn--primary'} ${styles.copy}`}
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </li>
  );
}

export default LinkResult;
