import illustration from '../../assets/images/illustration-working.svg';
import styles from './Hero.module.css';

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <h1 id="hero-heading" className={styles.heading}>
            More than just shorter links
          </h1>
          <p className={styles.description}>
            Shortly turns long URLs into compact links you can copy in one click,
            then creates QR codes ready to share on social posts, emails, and
            print materials.
          </p>
          <a href="#shorten" className="btn btn--primary btn--large">
            Shorten a link
          </a>
        </div>

        <div className={styles.illustration}>
          <img
            src={illustration}
            alt="Illustration of someone shortening and sharing links at a desk"
            width={733}
            height={482}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
