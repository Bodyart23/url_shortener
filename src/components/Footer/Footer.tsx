import logo from '../../assets/images/logo.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo} aria-label="Shortly home">
          <img src={logo} alt="Shortly" width={122} height={33} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
