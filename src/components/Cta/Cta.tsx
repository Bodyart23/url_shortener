import bgBoostDesktop from '../../assets/images/bg-boost-desktop.svg';
import bgBoostMobile from '../../assets/images/bg-boost-mobile.svg';
import styles from './Cta.module.css';

function Cta() {
  return (
    <section className={styles.section} aria-labelledby="cta-heading">
      <picture className={styles.background} aria-hidden="true">
        <source media="(min-width: 64rem)" srcSet={bgBoostDesktop} />
        <img src={bgBoostMobile} alt="" />
      </picture>

      <div className={`container ${styles.inner}`}>
        <h2 id="cta-heading" className={styles.heading}>
          Boost your links today
        </h2>
        <a href="#shorten" className="btn btn--primary btn--large">
          Get Started
        </a>
      </div>
    </section>
  );
}

export default Cta;
