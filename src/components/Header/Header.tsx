import logo from '../../assets/images/logo.svg';
import styles from './Header.module.css';

function Header() {

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo} aria-label="Shortly home">
          <img src={logo} alt="Shortly" width={122} height={33} />
        </a>
      </div>
    </header>
  );
}

export default Header;
