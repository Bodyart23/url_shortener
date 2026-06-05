import logo from '../../assets/images/logo.svg';
import iconFacebook from '../../assets/images/icon-facebook.svg';
import iconTwitter from '../../assets/images/icon-twitter.svg';
import iconPinterest from '../../assets/images/icon-pinterest.svg';
import iconInstagram from '../../assets/images/icon-instagram.svg';
import styles from './Footer.module.css';

const FOOTER_LINKS = [
  {
    title: 'Features',
    links: ['Link Shortening', 'Branded Links', 'Analytics'],
  },
  {
    title: 'Resources',
    links: ['Blog', 'Developers', 'Support'],
  },
  {
    title: 'Company',
    links: ['About', 'Our Team', 'Careers', 'Contact'],
  },
] as const;

const SOCIAL_LINKS = [
  { icon: iconFacebook, label: 'Facebook', href: 'https://facebook.com' },
  { icon: iconTwitter, label: 'Twitter', href: 'https://twitter.com' },
  { icon: iconPinterest, label: 'Pinterest', href: 'https://pinterest.com' },
  { icon: iconInstagram, label: 'Instagram', href: 'https://instagram.com' },
] as const;

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <a href="#" className={styles.logo} aria-label="Shortly home">
          <img src={logo} alt="Shortly" width={122} height={33} />
        </a>

        <nav className={styles.nav} aria-label="Footer">
          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className={styles.group}>
              <h2 className={styles.groupTitle}>{group.title}</h2>
              <ul className={styles.links}>
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <ul className={styles.social}>
          {SOCIAL_LINKS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <img src={social.icon} alt="" width={24} height={24} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
