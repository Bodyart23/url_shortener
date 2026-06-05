import { useState } from 'react';
import logo from '../../assets/images/logo.svg';
import styles from './Header.module.css';

const NAV_LINKS = ['Features', 'Pricing', 'Resources'] as const;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo} aria-label="Shortly home">
          <img src={logo} alt="Shortly" width={122} height={33} />
        </a>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={toggleMenu}
        >
          <span className={styles.menuIcon} aria-hidden="true" />
        </button>

        <nav
          id="primary-navigation"
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}
          aria-label="Primary"
        >
          <ul className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} onClick={closeMenu}>
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.authLinks}>
            <a href="#login" className={styles.login} onClick={closeMenu}>
              Login
            </a>
            <a href="#signup" className="btn btn--primary" onClick={closeMenu}>
              Sign Up
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
