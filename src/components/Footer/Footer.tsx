import logo from '../../assets/images/logo.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo} aria-label="Shortly home">
          <img src={logo} alt="Shortly" width={122} height={33} />
        </a>
        <p className={styles.tagline}>
          Shortly shortens long URLs and helps you share them with QR codes.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
