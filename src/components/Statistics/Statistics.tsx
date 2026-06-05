import iconBrandRecognition from '../../assets/images/icon-brand-recognition.svg';
import iconDetailedRecords from '../../assets/images/icon-detailed-records.svg';
import iconFullyCustomizable from '../../assets/images/icon-fully-customizable.svg';
import FeatureCard from './FeatureCard';
import styles from './Statistics.module.css';

const FEATURES = [
  {
    icon: iconBrandRecognition,
    title: 'Brand Recognition',
    description:
      'Boost your brand recognition with each click. Generic links don\u2019t mean a thing. Branded links help instil confidence in your content.',
  },
  {
    icon: iconDetailedRecords,
    title: 'Detailed Records',
    description:
      'Gain insights into who is clicking your links. Knowing when and where people engage with your content helps inform better decisions.',
  },
  {
    icon: iconFullyCustomizable,
    title: 'Fully Customizable',
    description:
      'Improve brand awareness and content discoverability through customizable links, supercharging audience engagement.',
  },
] as const;

function Statistics() {
  return (
    <section
      id="features"
      className={styles.section}
      aria-labelledby="statistics-heading"
    >
      <div className="container">
        <header className={styles.header}>
          <h2 id="statistics-heading" className={styles.heading}>
            Advanced Statistics
          </h2>
          <p className={styles.description}>
            Track how your links are performing across the web with our
            advanced statistics dashboard.
          </p>
        </header>

        <ul className={styles.grid}>
          {FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              offset={index}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Statistics;
