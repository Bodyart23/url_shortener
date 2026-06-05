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
            Build your brand&apos;s recognition and get detailed insights on how
            your links are performing.
          </p>
          <a href="#shorten" className="btn btn--primary btn--large">
            Get Started
          </a>
        </div>

        <div className={styles.illustration}>
          <img
            src={illustration}
            alt="Person working at a desk with a computer"
            width={733}
            height={482}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
