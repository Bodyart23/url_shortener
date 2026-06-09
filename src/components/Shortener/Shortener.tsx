import { useState, type FormEvent } from 'react';
import { shortenUrl } from '../../api/shortenUrl';
import type { ShortLink } from '../../types';
import { validateUrl } from '../../utils/validateUrl';
import LinkResult from './LinkResult';
import styles from './Shortener.module.css';

interface ShortenerProps {
  links: ShortLink[];
  onAddLink: (link: ShortLink) => void;
}

function Shortener({ links, onAddLink }: ShortenerProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateUrl(url);

    if (!validation.valid) {
      setError(validation.message);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const shortUrl = await shortenUrl(validation.url);

      onAddLink({
        id: crypto.randomUUID(),
        originalUrl: validation.url,
        shortUrl,
      });

      setUrl('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="shorten" className={styles.section} aria-labelledby="shorten-heading">
      <h2 id="shorten-heading" className="visually-hidden">
        Shorten your link
      </h2>

      <div className={styles.wrapper}>
        <div className={styles.inner}>
          <div className="container">
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.inputGroup}>
              <label htmlFor="url-input" className="visually-hidden">
                Paste the long URL you want to shorten
              </label>
              <input
                id="url-input"
                type="url"
                name="url"
                value={url}
                placeholder="Paste your long link here..."
                className={`${styles.input} ${error ? styles.inputError : ''}`}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'url-error' : undefined}
                onChange={(event) => {
                  setUrl(event.target.value);
                  if (error) setError('');
                }}
              />
              {error && (
                <p id="url-error" className={styles.error} role="alert">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn--primary ${styles.submit}`}
              disabled={isLoading}
            >
              {isLoading ? 'Shortening...' : 'Shorten It!'}
            </button>
          </form>

          {links.length > 0 && (
            <ul
              className={styles.results}
              aria-label="Your Shortly links"
              tabIndex={links.length > 5 ? 0 : undefined}
            >
              {links.map((link) => (
                <LinkResult key={link.id} link={link} />
              ))}
            </ul>
          )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Shortener;
